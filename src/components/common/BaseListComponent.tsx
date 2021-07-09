import * as common from './BaseComponent';
import { BaseApiClient } from '../../actions/clients/BaseApiClient';
import { IPaginatedResponse } from '../../resources/IPaginatedResponse';
import { IResource } from '../../resources/IResource';

export interface IProps<TResource extends IResource> extends common.IProps {
  page?: number;
  onResourceSelected?: (resource: TResource) => void;
  onSelectedResourcesChanged?: (resources?: TResource[]) => void;
  onPageSelected?: (page: number) => void;
};

export interface IState<TResource extends IResource> extends common.IState {
  selectedResource?: TResource;
  selectedResources?: TResource[];
  response?: IPaginatedResponse<TResource>;
};

export abstract class BaseListComponent<TResource extends IResource, TProps extends IProps<TResource>, TState extends IState<TResource>> extends common.BaseComponent<TProps, TState> {
  private _client: BaseApiClient<TResource> | null = null;

  async componentDidMount() {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        this.loadResources(this.props.page)
          .then(() => {
            resolve(null);
          })
          .catch((error) => {
            reject(error);
          });
      }, 0);
    });
  }

  protected get client(): BaseApiClient<TResource> {
    if (!this._client) {
      this._client = this.createClient();
    }
    return this._client;
  }

  protected get enableMultipleSelection(): boolean {
    return false;
  }

  protected async loadResources(page?: number) {
    const response = await this.client.list(this.buildSearchCondition(page));
    if (response !== null) {
      this.setState({ response: response });
    }
    else {
      this.setState({ response: undefined });
    }
  }

  protected buildSearchCondition(page?: number) {
    return { page: page };
  }

  protected selectResource(resource: TResource) {
    this.setState({ selectedResource: resource });
    if (this.props.onResourceSelected) {
      this.props.onResourceSelected(resource);
    }

    let resources = this.state.selectedResources;
    if (this.enableMultipleSelection) {
      if (resources) {
        const index = resources.findIndex((o) => o.id === resource.id);
        if (index >= 0) {
          resources.splice(index, 1);
        }
        else {
          resources.push(resource);
        }
      }
      else {
        resources = [resource];
      }
    }
    else {
      resources = [resource];
    }

    this.setState({ selectedResources: resources });
    if (this.props.onSelectedResourcesChanged) {
      this.props.onSelectedResourcesChanged(resources)
    }
  }

  protected isSelected(resource: TResource): boolean {
    if (!resource) {
      return false;
    }

    if (this.enableMultipleSelection) {
      const resources = this.state.selectedResources;
      if (resources) {
        const index = resources.findIndex((o) => o.id === resource.id);
        return index >= 0;
      }
      else {
        return false;
      }
    }
    else {
      return this.state.selectedResource?.id === resource.id;
    }
  }

  protected async selectPage(page: number) {
    await this.loadResources(page);
    if (this.props.onPageSelected) {
      this.props.onPageSelected(page);
    }
  }

  protected abstract createClient(): BaseApiClient<TResource>;
}
