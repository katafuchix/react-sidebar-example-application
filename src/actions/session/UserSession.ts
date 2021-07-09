import axios from "axios";
import moment from "moment";
import { Store } from "undux";
import { IAppGlobalStore } from "../../stores/IAppGlobalStore";
import { Logger } from "../../utils/Logger";
import { Notifier } from "../Notifier";

export class UserSession {
  private _notifer: Notifier;
  private _store: Store<IAppGlobalStore>;

  constructor(store: Store<IAppGlobalStore>) {
    this._notifer = new Notifier(store);
    this._store = store;
  }

  get isAuthenticated(): boolean {
    return this.idToken !== null;
  }

  async signIn(credentials: any) {
    Logger.debug('Signing in');
    try {
      const response = await axios.post(this.signinEndpointUrl, credentials);
      this.idToken = response.data.data.id_token;
      this.refreshToken = response.data.data.refresh_token;
      return true;
    }
    catch (e) {
      Logger.error('Failed to sign in', { error: e });
      const message = e.response?.data?.error?.message;
      if (message) {
        this._notifer.error(message);
      }
      else {
        this._notifer.error('ログインできません。');
      }
      return false;
    }
  }

  async signOut() {
    Logger.debug('Signing out');
    this.idToken = null;
    this.refreshToken = null;
  }

  async resolveIdToken(): Promise<string | null> {
    if (!this.idToken) {
      Logger.error('ID token not cached.');
      return null;
    }

    const payload = this.idTokenPayload;
    if (!payload) {
      Logger.error('Failed to parse cached ID token.')
      return null;
    }

    const expiryDate = moment.unix(payload.exp);
    Logger.info('Checking ID Token expiration', { expiry_date: expiryDate, diff: expiryDate.diff(moment(), 'minutes') });
    if (expiryDate.diff(moment(), 'minutes') > 5) {
      return this.idToken;
    }

    await this.refreshSession();

    return this.idToken;
  }

  private get idToken(): string | null {
    return localStorage.getItem('id_token') || null;
  }

  private set idToken(value: string | null) {
    if (value !== undefined && value !== null) {
      localStorage.setItem('id_token', value);
    }
    else {
      localStorage.removeItem('id_token');
    }
  }

  private get idTokenPayload(): any | null {
    if (!this.idToken) {
      return null;
    }
    try {
      return this.base64Decode(this.idToken.split('.')[1].replace(/-/gi, '+'));
    }
    catch (error) {
      Logger.error('Failed to decode id token', { error: error.message });
      return null;
    }
  }
 
  private get refreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  private set refreshToken(value: string | null) {
    if (value !== null) {
      localStorage.setItem('refresh_token', value);
    }
    else {
      localStorage.removeItem('refresh_token');
    }
  }

  private get signinEndpointUrl(): string {
    const endpoint = process.env.REACT_APP_API_ENDPOINT;
    return `${endpoint}/trickster/v1/tokens`;
  }

  private base64Decode(text: string) {
    const percentEncodedStr = atob(text).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join('');
    return JSON.parse(decodeURIComponent(percentEncodedStr));
  }

  private async refreshSession() {
    Logger.info('Refreshing session.')
    const params = { id_token: this.idToken, refresh_token: this.refreshToken };
    try {
      const response = await axios.post(this.signinEndpointUrl, params);
      this.idToken = response.data.data.id_token;
      Logger.info('Refreshed.');
    }
    catch (error) {
      Logger.error('Failed to refresh id token', { data: error.response?.data });
      await this.signOut();
      this._notifer.error('自動的にログアウトされました。再ログインしてください。');
    }
  }
}
