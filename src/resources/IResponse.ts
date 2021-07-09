import { IResource } from "./IResource";

export interface IResponse<TResource extends IResource> {
  result: boolean;
  data: TResource;
}
