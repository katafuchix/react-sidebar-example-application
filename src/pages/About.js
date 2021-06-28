
import React from "react";
import classNames from "classnames";
import { Container, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import NavBar from "../components/content/Navbar";

class About extends React.Component {

handleClick(path) {
  const history = useHistory();
  history.push(path);
}

  render() {
    return (
      <Container
        fluid
        className={classNames("content", { "is-open": this.props.isOpen })}
      >
        <NavBar toggle={this.props.toggle} />


        <div className="container">
          <div className="row mt-5">
              <div className="col-lg-4 mb-4 grid-margin">
                <div className="card h-100">
                    <h4 className="card-header">Card Title</h4>
                    <div className="card-body">
                      <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente esse necessitatibus neque.</p>
                    </div>
                    <div className="card-footer">
                    <Link
className="btn btn-outline-light btn-lg"
role="button"
to="/about"
>
about
</Link>
                    </div>
                </div>
              </div>
              <div className="col-lg-4 mb-4 grid-margin">
                <div className="card h-100">
                    <h4 className="card-header">Card Title</h4>
                    <div className="card-body">
                      <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis ipsam eos, nam perspiciatis natus commodi similique totam consectetur praesentium molestiae atque exercitationem ut consequuntur, sed eveniet, magni nostrum sint fuga.</p>
                    </div>
                    <div className="card-footer">
                      <Button variant="btn btn-primary">Learn More</Button>
                    </div>
                </div>
              </div>
              <div className="col-lg-4 mb-4 grid-margin">
                <div className="card h-100">
                    <h4 className="card-header">Card Title</h4>
                    <div className="card-body">
                      <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente esse necessitatibus neque.</p>
                    </div>
                    <div className="card-footer">
                      <Button onClick={() => this.handleClick("/detail")} variant="btn btn-primary">Learn More</Button>
                    </div>
                </div>
              </div>
          </div>
        </div>
      </Container>
    );
  }
}

export default About;
