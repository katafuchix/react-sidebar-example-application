import { Store, createConnectedStoreAs, EffectsAs } from 'undux'
import { IAppGlobalStore } from './IAppGlobalStore';

const initialGlobalStore: IAppGlobalStore = {
  authorized: false,
  //masterData: { isLoaded: false },
  notifications: [],
  uiLocker: { isLocked: false }
};

export default createConnectedStoreAs({
  globalStore: initialGlobalStore
});

export type AppDataStoreProps = {
  globalStore: Store<IAppGlobalStore>
}

export type AppDataStoreEffects = EffectsAs<{
  globalStore: IAppGlobalStore
}>;
