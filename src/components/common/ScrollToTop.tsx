import React from 'react';
import { withRouter } from 'react-router-dom';
import AppDataStore from '../../stores/AppDataStore';
import * as common from './BaseComponent';

class ScrollToTop extends common.BaseComponent<common.IProps, common.IState> {
//class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps: common.IProps) {
    //if (this.props.location.pathname !== prevProps.location.pathname) {
    console.log("ScrollToTop");
      window.scrollTo(0, 0);
    //}
  }

  render() {
    return null;
  }
}

export default AppDataStore.withStores(ScrollToTop);
