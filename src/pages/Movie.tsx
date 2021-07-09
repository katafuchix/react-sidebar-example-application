
import React from "react";
import classNames from "classnames";
import { Container, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import NavBar from "../components/content/Navbar";
//import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBRow, MDBCol } from "mdbreact";

import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn, MDBRipple } from 'mdb-react-ui-kit';

import { withRouter } from 'react-router-dom';
import AppDataStore from '../stores/AppDataStore';
import * as common from '../components/common/BasePage';

interface IParams extends common.IParams {
}

interface IProps extends common.IProps<IParams> {
  isOpen: boolean;
  toggle: () => void;
}

interface IState extends common.IState {
}

class Movie extends common.BasePage<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    console.log(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
      <Container
        fluid
        className={classNames("content", { "is-open": this.props.isOpen })}
      >
        <NavBar toggle={() => this.props.toggle()} />
        Movie
      </Container>
      </React.Fragment>
    );
  }
}

export default AppDataStore.withStores(withRouter(Movie));
