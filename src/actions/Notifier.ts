import { Store } from 'undux';
import { IAppGlobalStore } from '../stores/IAppGlobalStore';

export class Notifier {
  private _store: Store<IAppGlobalStore>;

  constructor(store: Store<IAppGlobalStore>) {
    this._store = store;
  }

  error(message: string, options?: any) {
    this._store.set('notifications')([{
      type: 'error',
      message: this.format(message, options)
    }]);
  }

  info(message: string, options?: any) {
    this._store.set('notifications')([{
      type: 'info',
      message: this.format(message, options)
    }]);
  }

  warn(message: string, options?: any) {
    this._store.set('notifications')([{
      type: 'warn',
      message: this.format(message, options)
    }]);
  }

  clear() {
    this._store.set('notifications')([]);
  }

  private format(message: string, options?: any): string {
    if (options) {
      const args = JSON.stringify(options)
      return `${message} (${args})`;
    }
    else {
      return `${message}`
    }
  }
}