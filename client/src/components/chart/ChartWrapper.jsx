import React, { PureComponent } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { API_URL_COINCAP } from '../../constans';
import Loader from '../Loader/Loader';
import Chart from './Chart';
import { ThemeConsumer } from '../theme/Theme';

const CHART_DATES = [
  { key: '365day', label: 'Year' },
  { key: '30day', label: 'Month' },
  { key: '7day', label: 'Week' },
  { key: '1day', label: 'Day' },
];

class ChartWrapper extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectedKey: CHART_DATES[CHART_DATES.length - 1].key
    };
  }

  componentDidMount() {
    this.getChartData(CHART_DATES[CHART_DATES.length - 1]);
  }

  getChartData = (item) => {
    const { id } = this.props;
    this.setState({ loading: true, selectedKey: item.key });
    fetch(`${API_URL_COINCAP}/history/${item.key}/${id}`)
      .then(resp => resp.json())
      .then(data => {
        return this.setState({ data: data, loading: false });
      })
      .catch(function (error) {
        console.log('Request failed', error);
      });
  }

  render() {
    const { selectedKey, loading, data } = this.state;
    return (
      <div className="loader-wrapper mb-3">
        <div className="clearfix">
          <Nav pills className="mb-2 float-right">
            {CHART_DATES.map((navItem) =>
              <NavItem key={navItem.key}>
                <NavLink href="#" active={navItem.key === selectedKey} onClick={this.getChartData.bind(this, navItem)}>{navItem.label}</NavLink>
              </NavItem>)}
          </Nav>
        </div>
        <ThemeConsumer>
          <Chart data={data} selected={selectedKey} />
        </ThemeConsumer>
        {loading ? <Loader /> : null}
      </div>
    )
  }
}

export default ChartWrapper;
