import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import NavBar from "../components/content/Navbar";
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
import Utils from '../utils/Utils';

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
    //console.log("this.state.response?.data");
    var tmp = [];
    if (this.state.response?.data) {
      console.log(this.state.response?.data);
      console.log(this.state.response?.data.length)
      for (var i = 0; i < this.state.response?.data.length; i++) {
        console.log(i);
        console.log(this.state.response?.data[i]);
      }
      var part = 4;
      for(var i = 0; i < this.state.response?.data.length; i += part) {
          tmp.push(this.state.response?.data.slice(i, i + part));
      }
    }
    //console.log(tmp);
    return (
      <React.Fragment>
        <LoadingIndicator watch={this.state.response}>
            <div className="row mt-5">
            {tmp.map((data,index) => (
              <>
              {data.map((item, i) => (
                <>
                <div className="col-lg-3 mb-3 grid-margin">
                  <div className="card h-100">
                      <h6 className="card-header">{item.title}</h6>
                      <div className="card-body">
                      <Image width={200} src={Utils.toThumbImageUrl(item)} alt="アイコン" />
                        <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis ipsam eos, nam perspiciatis natus commodi similique totam consectetur praesentium molestiae atque exercitationem ut consequuntur, sed eveniet, magni nostrum sint fuga.</p>
                      </div>
                      <div className="card-footer">
                        <Button variant="btn btn-primary">Learn More</Button>
                      </div>
                  </div>
                </div>
                </>
              ))}
              </>
            ))}
            </div>
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
