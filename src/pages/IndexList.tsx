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
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn, MDBRipple } from 'mdb-react-ui-kit';


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
      //console.log(this.state.response?.data);
      //console.log(this.state.response?.data.length)
      /*for (var i = 0; i < this.state.response?.data.length; i++) {
        console.log(i);
        console.log(this.state.response?.data[i]);
      }*/
      var part = 3;
      for(var i = 0; i < this.state.response?.data.length; i += part) {
          tmp.push(this.state.response?.data.slice(i, i + part));
      }
    }
    console.log(tmp);
    return (
      <React.Fragment>
        <LoadingIndicator watch={this.state.response}>
        <div className="row align-items-stretch retro-layout-2">
            {tmp.map((data,index) => (
              <>
              {data.map((item, i) => (
                <>
                <div className="col-lg-4 col-md-4 col-sm-4 post_item_block">
      						<div className="post_item">
      							<div className="post_item_img img-overlay-70">
      								<Image style={{ width: '100%'}} src={Utils.toThumbImageUrl(item)} className="img-overlay-70" alt="" />
                        <div className="date">{item.date?.split(' ')[0]}</div>
                        <div className="views">{item.view_count} views</div>
                        <div className="mask-content-sm">
                          <h3 className="title-medium-light">
                            {item.title}
                          </h3>
                        </div>
                        <span className={Utils.getMovieTypeClass(item.movie)}>{Utils.getMovieType(item.movie)}</span>
      							</div>
      							<div className="post_item_content">
      								<ul className="post_item_inf">
                        {item.keywords.map((word: any, k: any) => (
                          <li><a href="">{word}</a></li>
                          ))}
      								</ul>
      							</div>
      						</div>
      					</div>
                </>
              ))}
              </>
            ))}
            </div>
            {this.state.response?.data.length === 0 && (
              <MDBRow>
                データが見つかりません。
              </MDBRow>
            )}
          <Paginator currentPage={this.state.response?.meta.current_page}
            totalPage={this.state.response?.meta.total_pages}
            onPageSelected={(page) => this.selectPage(page)} />
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
