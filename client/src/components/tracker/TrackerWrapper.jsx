import React, { Component, Fragment } from 'react';
import TrackerList from './TrackerList';
import TrackerHeader from './TrackerHeader';
import { Container, Row, Col } from 'reactstrap';
import CurrencySelector from './CurrencySelector';
import Loader from '../Loader/Loader';
import { withRouter } from 'react-router';
import TrackerFilter from './TrackerFilter';
import filter from 'lodash/filter';
import orderByFunc from 'lodash/orderBy';
import { API_URL_COINCAP } from '../../constans';
import { subscribeToTrades } from '../Socket';
import './Tracker.css';

const scrollToTop = () => window.scrollTo(0, 0);

class TrackerWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      dataOriginal: [],
      currency: {
        key: 'USD',
        coef: 1
      },
      selectedPage: 0,
      orderBy: {
        field: null,
        order: 'asc'
      }
    };
    subscribeToTrades((trades) => {
      const { data } = this.state;
      const newTrade = trades && trades.msg ? trades.msg : null;
      if (newTrade.short) {
        var index = data.findIndex((item) => {
          return item.short === newTrade.short;
        });

        if (index >= 0) {
          data[index] = newTrade;
          this.setState({
            data: data
          })
        }
      }
    });
    this.fetchData();
  }

  fetchData() {
    fetch(`${API_URL_COINCAP}/front`)
      .then(resp => resp.json())
      .then(data => {
        return this.setState({
          data: data,
          dataOriginal: data,
          loading: false
        });
      })
      .catch(function (error) {
        console.log('Request failed', error);
      });
  }

  onChangeSort = (mode) => {
    const { data, orderBy } = this.state;
    const order = orderBy.order === 'asc' ? 'desc' : 'asc';
    const sortedData = orderByFunc(data, mode, order);
    scrollToTop();
    this.setState({
      data: sortedData,
      orderBy: {
        order: order,
        field: mode
      }
    });
  }

  onChangeCurrency = (currency) => {
    this.setState({
      currency: currency
    })
  }

  onChageSearch = (query) => {
    const searchQuery = query ? query.toLowerCase() : '';
    const { dataOriginal, orderBy } = this.state;
    let filteredData = filter(dataOriginal, (item) => {
      return item.long && item.long.toLowerCase().indexOf(searchQuery) >= 0;
    });

    if (orderBy && orderBy.field) {
      filteredData = orderByFunc(filteredData, orderBy.field, orderBy.order);
    }

    this.setState({
      data: filteredData
    });
    scrollToTop();
  }

  render() {
    const { loading, data, orderBy, currency } = this.state;
    return (
      <div className="loader-wrapper app-h">
        {!loading ?
          <Fragment>
            <div className="tracker-sticky-header">
              <Container>
                <Row className="mb-1">
                  <Col xs={12} sm={4} lg={3}>
                    <TrackerFilter onChageSearch={this.onChageSearch} />
                  </Col>
                  <Col>
                    <CurrencySelector onChange={this.onChangeCurrency} />
                  </Col>
                </Row>

                <TrackerHeader orderBy={orderBy} onChangeSort={this.onChangeSort} />
              </Container>
            </div>
            <Container className="tracker-wrapper">
              <TrackerList list={[...data]} currency={currency} />
            </Container>
          </Fragment>
          :
          <Loader />
        }
      </div>
    )
  }
}

export default withRouter(TrackerWrapper);
