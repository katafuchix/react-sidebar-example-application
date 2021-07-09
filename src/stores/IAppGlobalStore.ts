//import { IAppMasterData } from "./IAppMasterData";
import { IAppNotification } from "./IAppNotification";
import { IAppUiLocker } from "./IAppUiLocker";

export interface IAppGlobalStore {
  authorized: boolean;
  //masterData: IAppMasterData;
  notifications: IAppNotification[];
  uiLocker: IAppUiLocker;
}
