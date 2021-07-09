import React from 'react';
import * as common from './BaseComponent';
import { Pagination } from 'react-bootstrap';
import { ChevronDoubleLeft, ChevronDoubleRight, ChevronLeft, ChevronRight, ThreeDots } from 'react-bootstrap-icons';
import AppDataStore from '../../stores/AppDataStore';

interface IProps extends common.IProps {
  currentPage?: number;
  totalPage?: number;
  onPageSelected: (page: number) => void;
};

class Paginator extends common.BaseComponent<IProps, common.IState> {
  private get isFirstPage(): boolean {
    return Number(this.props.currentPage) === 1;
  }

  private get isLastPage(): boolean {
    return Number(this.props.currentPage) === Number(this.props.totalPage);
  }

  render() {
    const items = [];
    let min = Math.max(Number(this.props.currentPage) - 2, 1);
    let max = Math.min(Number(this.props.totalPage), min + 4);
    if (max === Number(this.props.totalPage)) {
      min = Math.max(max - 4, 1);
    }

    if (min > 1) {
      items.push(
        <Pagination.Item key="has_more_previous" disabled={true}>
          <ThreeDots/>
        </Pagination.Item>
      )
    }

    for (let i = min; i <= max; i++) {
      items.push(
        <Pagination.Item key={i} active={i === this.props.currentPage} onClick={() => this.selectPage(i)}>
          {i}
        </Pagination.Item>
      )
    }

    if (max < Number(this.props.totalPage)) {
      items.push(
        <Pagination.Item key="has_more_next" disabled={true}>
          <ThreeDots/>
        </Pagination.Item>
      )
    }

    return (
      <React.Fragment>
        {items.length >= 2 && (
          <div className="d-flex justify-content-center">
            <Pagination>
              <Pagination.Item key="first" disabled={this.isFirstPage} onClick={() => this.selectFirstPage()}>
                <ChevronDoubleLeft/>
              </Pagination.Item>
              <Pagination.Item key="previous" disabled={this.isFirstPage} onClick={() => this.selectPreviousPage()}>
                <ChevronLeft/>
              </Pagination.Item>
              {items}
              <Pagination.Item key="next" disabled={this.isLastPage} onClick={() => this.selectNextPage()}>
                <ChevronRight/>
              </Pagination.Item>
              <Pagination.Item key="last" disabled={this.isLastPage} onClick={() => this.selectLastPage()}>
                <ChevronDoubleRight/>
              </Pagination.Item>
            </Pagination>
          </div>
        )}
      </React.Fragment>
    );
  }

  private selectPage(page: number) {
    this.props.onPageSelected(page);
  }

  private selectFirstPage() {
    this.props.onPageSelected(1);
  }

  private selectPreviousPage() {
    this.props.onPageSelected(Number(this.props.currentPage) - 1);
  }

  private selectNextPage() {
    this.props.onPageSelected(Number(this.props.currentPage) + 1);
  }

  private selectLastPage() {
    this.props.onPageSelected(Number(this.props.totalPage));
  }
}

export default AppDataStore.withStores(Paginator);
