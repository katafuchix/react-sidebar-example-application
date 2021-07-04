
import React from "react";
import classNames from "classnames";
import { Container, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import NavBar from "../components/content/Navbar";
//import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBRow, MDBCol } from "mdbreact";

import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn, MDBRipple } from 'mdb-react-ui-kit';


class List extends React.Component {

  render() {
    return (
      <Container
        fluid
        className={classNames("content", { "is-open": this.props.isOpen })}
      >
        <NavBar toggle={this.props.toggle} />


        <MDBRow>
          <MDBCol>
            <MDBCard wide>
              <MDBCardImage cascade className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/People/6-col/img%20%283%29.jpg" />
              <MDBCardBody cascade>
                <MDBCardTitle>MDBCard title</MDBCardTitle>
                <MDBCardText>Some quick example text to build on the card title and make up the bulk of the card's content.</MDBCardText>
                <MDBBtn href="#">MDBBtn</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol>
            <MDBCard narrow>
              <MDBCardImage cascade className="img-fluid" src="https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(147).jpg" />
              <MDBCardBody cascade>
                <MDBCardTitle>MDBCard title</MDBCardTitle>
                <MDBCardText>Some quick example text to build on the card title and make up the bulk of the card's content.</MDBCardText>
                <MDBBtn href="#">MDBBtn</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol>
            <MDBCard cascade>
              <MDBCardImage cascade className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/men.jpg" />
              <MDBCardBody cascade>
                <MDBCardTitle>MDBCard title</MDBCardTitle>
                <MDBCardText>Some quick example text to build on the card title and make up the bulk of the card's content.</MDBCardText>
                <MDBBtn href="#">MDBBtn</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>

      </Container>
    );
  }
}

export default List;
