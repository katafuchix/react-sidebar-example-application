import * as common from './BaseComponent';
import { RouteComponentProps } from 'react-router-dom';
import querystring from 'querystring';

export interface IParams {
  page?: string;
}

export interface IProps<TParams extends IParams> extends common.IProps, RouteComponentProps<TParams> {
};

export interface IState extends common.IState {
  page?: number;
};

export abstract class BasePage<TProps extends IProps<IParams>, TState extends IState> extends common.BaseComponent<TProps, TState> {
  componentDidMount() {
    const query = querystring.parse(this.props.location.search.substr(1));
    const page = Number(query.page) || 1;
    this.setState({ page });
  }

  protected selectPage(page: number) {
    this.setState({ page });
    const query = querystring.parse(this.props.location.search.substr(1));
    query.page = page.toString();
    this.props.history.push({
      pathname: this.props.history.location.pathname,
      search: querystring.stringify(query),
      hash: this.props.history.location.hash,
      state: this.props.history.location.state
    });
  }
}
