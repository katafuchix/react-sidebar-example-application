import React, { ReactNode } from 'react';
import * as common from './BaseComponent';
import { Spinner } from 'react-bootstrap';
import AppDataStore from '../../stores/AppDataStore';

interface IProps extends common.IProps {
  children: ReactNode
  watch: any;
};

class LoadingIndicator extends common.BaseComponent<IProps, common.IState> {
  render() {
    if (!this.props.watch) {
      return (
        <React.Fragment>
          <div className="d-flex align-items-center justify-content-center p-5">
            <Spinner animation="border"/>
            <span className="ml-3">データを読み込んでいます。</span>
          </div>
        </React.Fragment>
      );
    }
    else {
      return this.props.children;
    }
  }
}

export default AppDataStore.withStores(LoadingIndicator);
