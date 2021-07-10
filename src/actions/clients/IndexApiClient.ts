import { IResource } from "../../resources/IResource";
import { BaseApiClient } from "./BaseApiClient"

export class IndexApiClient extends BaseApiClient<IResource> {
  protected get endpoint(): string {
    return process.env.REACT_APP_API_ENDPOINT || 'http://localhost';
  }

  protected basePath(): string {
    return 'trickster/v1/message_rooms';
  }
}
