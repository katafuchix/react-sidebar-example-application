import React from "react";
import classNames from "classnames";
import { Container, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import NavBar from "../components/content/Navbar";
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn, MDBRipple } from 'mdb-react-ui-kit';
import { Table, Image, Popover, OverlayTrigger　} from 'react-bootstrap';
import AppDataStore from '../stores/AppDataStore';
import * as common from '../components/common/BaseListComponent';
import LoadingIndicator from '../components/common/LoadingIndicator';
import Paginator from '../components/common/Paginator';
import Movie from "./Movie";
import { IResource } from '../resources/IResource';
import { BaseApiClient } from '../actions/clients/BaseApiClient';
import { IndexApiClient } from '../actions/clients/IndexApiClient';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";

interface IProps extends common.IProps<IResource> {
    onReload?: () => void;
}

interface IState extends common.IState<IResource> {

}

class IndexList extends common.BaseListComponent<IResource, IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { };
  }

  async componentDidMount() {
    await super.componentDidMount();
    /*if (this.props.onSearchConditionChanged) {
      this.props.onSearchConditionChanged();
    }*/
  }

  render() {
    console.log(this.state.response?.data);
    return (
      <React.Fragment>
        <LoadingIndicator watch={this.state.response}>
          <div text-align="right">
            <button className="message_refresh_btn" type="button" onClick={() => this.onReload()}>
              <FontAwesomeIcon icon={faRedo}  size="sm" />
            </button>
          </div>

          <Table bordered>
            <thead>
              <tr>
                <th>ID</th>
                <th>サクラ会員</th>
                <th>相手</th>
                <th>最終メッセージ</th>
                <th>男性側最終更新</th>
              </tr>
            </thead>
            <tbody>
            {this.state.response?.data.map((room) => (
              <tr>
                <td colSpan={3}>データが見つかりません。</td>
              </tr>
            ))}
            {this.state.response?.data.length === 0 && (
              <tr>
                <td colSpan={3}>データが見つかりません。</td>
              </tr>
            )}
            </tbody>
          </Table>
          <Paginator currentPage={this.state.response?.meta.current_page} totalPage={this.state.response?.meta.total_pages} onPageSelected={(page) => this.selectPage(page)}/>
        </LoadingIndicator>
      </React.Fragment>
    );
  }

  protected createClient(): BaseApiClient<IResource> {
    return new IndexApiClient(this.props.globalStore);
  }

  protected buildSearchCondition(page?: number) {
    return Object.assign({}, {}, { page: page });
  }

  private async search() {
    this.setState({});
    /*if (this.props.onSearchConditionChanged) {
      this.props.onSearchConditionChanged();
    }*/
    await this.loadResources(1);
  }

  private onReload () {
    (async () => this.loadResources(1) )();
  }
}

export default AppDataStore.withStores(IndexList);
