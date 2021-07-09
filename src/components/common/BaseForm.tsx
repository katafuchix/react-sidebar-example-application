import * as common from './BaseComponent';
import { BaseApiClient } from '../../actions/clients/BaseApiClient';
import { IResource } from '../../resources/IResource';
import { InputEventReflector, InputEventReflectorOptions } from './InputEventReflector';

export interface IProps<TResource extends IResource> extends common.IProps {
  id?: number;
  onResourceChanged?: (resource?: TResource) => void;
  onResourceDeleted?: (resource?: TResource) => void;
  onResourceLoaded?: (resource?: TResource) => void;
  onResourceSaved?: (resource?: TResource) => void;
};

export interface IState<TResource extends IResource> extends common.IState {
  resource?: TResource;
  errors?: any;
}

export abstract class BaseForm<TResource extends IResource, TProps extends IProps<TResource>, TState extends IState<TResource>> extends common.BaseComponent<TProps, TState> {
  private _client: BaseApiClient<TResource> | null = null;
  private _reflector: InputEventReflector;

  constructor(props: TProps) {
    super(props);
    this._reflector = new InputEventReflector();
  }

  async componentDidMount() {
    await this.loadResource();
  }

  protected get client(): BaseApiClient<TResource> {
    if (!this._client) {
      this._client = this.createClient();
    }
    return this._client;
  }

  protected get editingMode(): string {
    return this.state.resource?.id ? 'edit' : 'new';
  }

  protected get isNewMode(): boolean {
    return this.editingMode === 'new';
  }

  protected get isEditMode(): boolean {
    return this.editingMode === 'edit';
  }

  protected changeResource(e: any, options?: InputEventReflectorOptions) {
    const resource = this.state.resource;
    if (resource) {
      const result = this._reflector.execute(resource!, e, options);
      if (result) {
        this.setState({ resource: result || resource });
        this.notifyResourceChange();
      }
    }
  }

  protected async loadResource() {
    let resource = null;
    if (this.props.id) {
      resource = await this.retrieveResource(this.props.id);
    }
    else {
      resource = this.generateDefaultResource()
    }
    if (resource) {
      this.onResourceLoaded(resource);
    }
  }

  protected async retrieveResource(id?: number): Promise<TResource | null> {
    return await this.client.get(id);
  }

  protected async submit(e: any) {
    e.preventDefault();
    this.setState({ errors: null });

    try {
      const response = await this.client.save(this.state.resource);
      if (response !== null) {
        this.setState({ resource: response });
      }
      this.notifier.info(this.actionCompletedMessage);
      if (response && this.props.onResourceSaved) {
        this.props.onResourceSaved(response);
      }
    }
    catch (error) {
      if (error.response?.data?.error?.code === 'validation_error') {
        console.log('error', error.response.data.error);
        this.setState({ errors: error.response.data.error.validation_error });
      }
      else {
        this.setState({ errors: {} });
      }
    }
  }

  protected async delete(e: any) {
    e.preventDefault();

    if (!this.state.resource?.id) {
      return;
    }

    if (window.confirm('削除してよろしいですか？')) {
      await this.client.delete(this.state.resource.id);
      this.notifier.info(`${this.resourceName}を削除しました。`);
      if (this.props.onResourceDeleted) {
        this.props.onResourceDeleted(this.state.resource);
      }

    }
  }

  protected get actionCompletedMessage(): string {
    return `${this.resourceName}を保存しました。`;
  }

  protected onResourceLoaded(resource: TResource) {
    this.setState({ resource: resource });
    if (this.props.onResourceLoaded) {
      this.props.onResourceLoaded(resource);
    }
  }

  protected abstract createClient(): BaseApiClient<TResource>;

  protected abstract get resourceName(): string;

  protected abstract generateDefaultResource(): TResource;

  private notifyResourceChange() {
    if (this.props.onResourceChanged) {
      const resource = this.state.resource;
      this.props.onResourceChanged(resource);
    }
  }
}
