
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
//import * as common from '../components/common/BaseComponent';

import Movie from "./Movie";


interface IParams extends common.IParams {

}

interface IProps extends common.IProps<IParams> {
  isOpen: boolean;
  toggle: () => void;
}
/*
interface IProps extends common.IProps {
  toggle: () => void;
  isOpen: boolean;
}
*/
interface IState extends common.IState {
}

//class List extends React.Component<any, IState> {
class List extends common.BasePage<IProps, IState> {
//class List extends common.BaseComponent<IProps, IState> {
//class List extends common.BaseComponent<common.IProps<common.IParams>, IState> {

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

        <MDBRow>
          <MDBCol>
            <MDBCard>
              <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/People/6-col/img%20%283%29.jpg" />
              <MDBCardBody>
                <MDBCardTitle>MDBCard title1</MDBCardTitle>
                <MDBCardText>Some quick example text to build on the card title and make up the bulk of the card's content.</MDBCardText>
                <MDBBtn href="#">MDBBtn</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol>
            <MDBCard>
              <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(147).jpg" />
              <MDBCardBody cascade>
                <MDBCardTitle>MDBCard title</MDBCardTitle>
                <MDBCardText>Some quick example text to build on the card title and make up the bulk of the card's content.</MDBCardText>
                <MDBBtn href="#">MDBBtn</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol>
            <MDBCard>
              <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/men.jpg" />
              <MDBCardBody>
                <MDBCardTitle>MDBCard title</MDBCardTitle>
                <MDBCardText>Some quick example text to build on the card title and make up the bulk of the card's content.</MDBCardText>
                <MDBBtn href="#" onClick={() => this.click()}>MDBBtn</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>

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

//export default List;
//export default withRouter(List);
//export default AppDataStore.withStores(withRouter(List));
export default withRouter(AppDataStore.withStores(List));
