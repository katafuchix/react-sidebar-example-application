import axios from 'axios';
import { Store } from 'undux';
import { IAppGlobalStore } from '../../stores/IAppGlobalStore';
import { UserSession } from '../session/UserSession';
import { Notifier } from '../Notifier';
import { IResource } from '../../resources/IResource';
import { IPaginatedResponse } from '../../resources/IPaginatedResponse';

export abstract class BaseApiClient<TResource extends IResource> {
  private _notifier: Notifier;
  private _session: UserSession;
  private _store: Store<IAppGlobalStore>;

  constructor(store: Store<IAppGlobalStore>) {
    this._store = store;
    this._notifier = new Notifier(store);
    this._session = new UserSession(store);
  }

  protected abstract get endpoint(): string;

  protected get baseUrl(): string {
    return `${this.endpoint}/${this.basePath()}`;
  }

  protected get notifier(): Notifier {
    return this._notifier;
  }

  async get(id?: number): Promise<TResource | null> {
    console.log(`Retrieving a resource (id='${id}').`);
    return await this.invoke(async (headers) => {
      const response = await axios.get(this.getGetUrl(id), { headers });
      return this.reverseResource(response.data.data);
    });
  }

  async getWithParams(options?: any): Promise<TResource | null> {
    var querystring = Object.keys(options).map((o) => options[o] ? `${o}=${encodeURIComponent(options[o])}` : null).filter((o) => !!o).join('&');
    return await this.invoke(async (headers) => {
      const response = await axios.get(this.getGetUrl() + '?' + querystring, { headers });
      return this.reverseResource(response.data.data);
    });
  }
  
  async list(options?: any): Promise<IPaginatedResponse<TResource> | null> {
    console.log(`Retrieving resources.`);
    const querystring = Object.keys(options).map((o) => options[o] ? `${o}=${encodeURIComponent(options[o])}` : null).filter((o) => !!o).join('&');
    return await this.invoke(async (headers) => {
      const response = await axios.get(`${this.getListUrl()}?${querystring}`, { headers });
      if (response.data && response.data.data) {
        for (let i = 0; i < response.data.data.length; i++) {
          response.data.data[i] = this.reverseListItemResource(response.data.data[i]);
        }
      }
      return response.data as IPaginatedResponse<TResource>;
    });
  }

  async save(resource?: TResource): Promise<TResource | null> {
    if (!resource) {
      throw new Error(`The 'resource' parameter is not specified.`);
    }

    console.log(`Saving a resource (resource='${JSON.stringify(resource)}').`);
    return await this.invoke(async (headers) => {
      let response;
      if (!resource.id) {
        response = await axios.post(this.getPostUrl(), this.convertResource(resource), { headers });
      }
      else {
        response = await axios.put(this.getPutUrl(resource.id), this.convertResource(resource), { headers });
      }
      return this.reverseResource(response.data.data);
    });
  }

  async update(resource?: TResource): Promise<TResource | null> {
    if (!resource) {
      throw new Error(`The 'resource' parameter is not specified.`);
    }

    console.log(`Updating a resource (resource='${JSON.stringify(resource)}').`);
    return await this.invoke(async (headers) => {
      const response = await axios.put(this.getPutUrl(resource.id), this.convertResource(resource), { headers });
      return this.reverseResource(response.data.data);
    });
  }

  async delete(id: number) {
    console.log(`Deleting a resource (id='${id}').`);
    return await this.invoke(async (headers) => {
      await axios.delete(this.getDeleteUrl(id), { headers });
    });
  }

  protected abstract basePath(): string;

  protected getGetUrl(id?: number): string {
    return id ? `${this.baseUrl}/${id}` : this.baseUrl;
  }

  protected getListUrl(): string {
    return this.baseUrl;
  }

  protected getPostUrl(): string {
    return this.baseUrl;
  }

  protected getPutUrl(id?: number): string {
    return id ? `${this.baseUrl}/${id}` : this.baseUrl;
  }

  protected getDeleteUrl(id?: number): string {
    return id ? `${this.baseUrl}/${id}` : this.baseUrl;
  }

  protected convertResource(resource: TResource): any {
    return resource;
  }

  protected reverseResource(resource: any): TResource {
    return resource;
  }

  protected reverseListItemResource(resource: any): TResource {
    return resource;
  }

  protected async invoke<T>(action: (headers: any) => Promise<T>): Promise<T | null> {
    const headers: any = {};
    const idToken = await this._session.resolveIdToken();
    if (idToken !== null) {
      headers.Authorization = `Bearer ${idToken}`;
    }

    this._store.set('uiLocker')({ isLocked: true });
    try {
      return await action(headers);
    }
    catch(error) {
      console.error('Failed to invoke api.', error.response.data);
      if (error.response.status === 401) {
        this.notifier.error('未ログイン状態のためシステムにアクセスすることができません。再度ログインしてください。');
        this._store.set('authorized')(false);
      }
      else if (error.response.status === 403) {
        this.notifier.error('セッションが切れているためシステムにアクセスすることができません。再度ログインしてください。');
        this._store.set('authorized')(false);
      }
      else {
        this.notifier.error(error.response.data.message);
      }
      throw error;
    }
    finally {
      this._store.set('uiLocker')({ isLocked: false });
    }
  }
}
