import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SideBar from "./components/sidebar/SideBar";
import Content from "./components/content/Content";
import Home from './pages/Home'
import About from './pages/About'
import Detail from './pages/Detail'
import List from './pages/List'
import Movie from './pages/Movie'
import Index from './pages/Index'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import AppDataStore from './stores/AppDataStore';
import * as common from './components/common/BasePage';
import { IResource } from './resources/IResource';

interface IParams extends common.IParams {
}

interface IProps extends common.IProps<IParams> {
}

interface IState extends common.IState {
  isOpen: boolean;
  isMobile: boolean;
}

//class App extends React.Component<any, any>  {
class App extends common.BasePage<IProps, IState> {

  constructor(props: any) {
    super(props);

    // Moblie first
    this.state = {
      isOpen: false,
      isMobile: true
    };
  }

  previousWidth: Number = -1;

  updateWidth() {
    const width = window.innerWidth;
    const widthLimit = 576;
    const isMobile = width <= widthLimit;
    const wasMobile = this.previousWidth <= widthLimit;

    if (isMobile !== wasMobile) {
      this.setState({
        isOpen: !isMobile
      });
    }

    this.previousWidth = width;
  }

  /**
   * Add event listener
   */
  componentDidMount() {
    this.updateWidth();
    window.addEventListener("resize", this.updateWidth.bind(this));
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWidth.bind(this));
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <AppDataStore.Container>
        <div className="App wrapper">
          <SideBar isOpen={this.state.isOpen} toggle={() => this.toggle()} />
          <Router>
              <Switch>
                <Route exact path="/">
                  <Index toggle={() => this.toggle()} isOpen={this.state.isOpen} />
                </Route>
                <Route path="/about">
                  <About toggle={() => this.toggle()} isOpen={this.state.isOpen} />
                </Route>
                <Route path="/detail">
                  <Detail toggle={() => this.toggle()} isOpen={this.state.isOpen} />
                </Route>
                <Route path="/list">
                  <List isOpen={this.state.isOpen} toggle={() => this.toggle()}  />
                </Route>
                <Route path="/movie">
                  <Movie  isOpen={this.state.isOpen} toggle={() => this.toggle()} />
                </Route>
              </Switch>
          </Router>
        </div>
      </AppDataStore.Container>
    );
  }
/*
  render() {
    return (
      <div className="App wrapper">
        <SideBar toggle={this.toggle} isOpen={this.state.isOpen} />
        <Content toggle={this.toggle} isOpen={this.state.isOpen} />
      </div>
    );
  }
*/
}

export default App;
