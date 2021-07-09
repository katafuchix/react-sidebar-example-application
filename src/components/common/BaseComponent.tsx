import React from 'react';
import { Notifier } from '../../actions/Notifier';
import { AppDataStoreProps } from '../../stores/AppDataStore';

export interface IProps extends AppDataStoreProps {
};

export interface IState {
};

export abstract class BaseComponent<TProps extends IProps, TState extends IState> extends React.Component<TProps, TState> {
  private _notifier: Notifier;

  constructor(props: TProps) {
    super(props);
    this._notifier = new Notifier(props.globalStore);
  }

  protected get notifier(): Notifier {
    return this._notifier;
  }
}
