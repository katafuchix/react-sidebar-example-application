import { IResource } from "../../resources/IResource";

export interface InputEventReflectorOptions {
  type?: string;
}

export class InputEventReflector {
  execute<TResource extends IResource>(resource: TResource, e: any, options?: InputEventReflectorOptions): TResource {
    options = options || {};

    if (!resource) {
      return resource;
    }

    const target = e.target;
    if (!target) {
      return resource;
    }

    const value = this.resolveTargetValue(target);
    const names = target.name.split('.');
    let obj: any = resource;
    for (let i = 0; i < names.length - 1; i++) {
      obj = obj[names[i]];
    }

    switch(options.type) {
      case 'number':
        if (value === undefined || value === null || value === '') {
          obj[names[names.length - 1]] = null;
        }
        else {
          obj[names[names.length - 1]] = Number(value);
        }
        break;
      default:
        obj[names[names.length - 1]] = value;
        break;
    }

    return resource;
  }

  private resolveTargetValue(target: any) {
    return target.type === 'checkbox' ? target.checked : target.value;
  }
}
