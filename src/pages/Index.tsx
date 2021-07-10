
import React from "react";
import classNames from "classnames";
import { Container, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import NavBar from "../components/content/Navbar";
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn, MDBRipple } from 'mdb-react-ui-kit';
import AppDataStore from '../stores/AppDataStore';
import * as common from '../components/common/BasePage';
import Movie from "./Movie";

interface IParams extends common.IParams {
}

interface IProps extends common.IProps<IParams> {
  isOpen: boolean;
  toggle: () => void;
}

interface IState extends common.IState {
}

class Index extends common.BasePage<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    console.log(props);
    this.state = {};
  }

  render() {
    console.log("process.env.REACT_APP_API_ENDPOINT");
    console.log(process.env.REACT_APP_API_ENDPOINT);
    return (
      <React.Fragment>
      <Container
        fluid
        className={classNames("content", { "is-open": this.props.isOpen })}
      >
        <NavBar toggle={() => this.props.toggle()} />
        index
      </Container>
      </React.Fragment>
    );
  }

  click() {
    console.log("click");
    this.props.history.push({
      pathname: `/movie`,
      state: { }
    });
  }
}

export default withRouter(AppDataStore.withStores(Index));
