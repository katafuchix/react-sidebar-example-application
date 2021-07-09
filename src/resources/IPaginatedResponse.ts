import { IResource } from "./IResource";

export interface IPaginatedResponse<TResource extends IResource> {
  result: boolean;
  meta: {
    limit_value: number;
    total_pages: number;
    current_page: number;
    next_page: number;
    prev_page: number;
  }
  data: TResource[];
}
