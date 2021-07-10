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
    console.log("this.state.response?.data");
    console.log(this.state.response?.data);
    return (
      <React.Fragment>
        <LoadingIndicator watch={this.state.response}>
          <div text-align="right">
            <button className="message_refresh_btn" type="button" onClick={() => this.onReload()}>
              <FontAwesomeIcon icon={faRedo}  size="sm" />
            </button>
          </div>


            {this.state.response?.data.map((index,room) => (
              <>
              {room%3==0 ? '<div className="row mt-5">' : ''}
              <div className="col-lg-4 mb-4 grid-margin">
                <div className="card h-100">
                    <h4 className="card-header">{room}{room%3==0 ? 'a' : ''}{index.title}</h4>
                    <div className="card-body">
                      <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis ipsam eos, nam perspiciatis natus commodi similique totam consectetur praesentium molestiae atque exercitationem ut consequuntur, sed eveniet, magni nostrum sint fuga.</p>
                    </div>
                    <div className="card-footer">
                      <Button variant="btn btn-primary">Learn More</Button>
                    </div>
                </div>
              </div>
              </>
            ))}
            {this.state.response?.data.length === 0 && (
              <tr>
                <td colSpan={3}>データが見つかりません。</td>
              </tr>
            )}
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
