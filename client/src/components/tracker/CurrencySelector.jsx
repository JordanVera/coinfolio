import React, { PureComponent } from 'react';
import Loader from '../Loader/Loader';
import Select from 'react-select';
import { API_URL_COINCAP } from '../../constans';
import '../../../node_modules/react-select/dist/react-select.css';

const prepareCurrencies = (list) => {
  const currencies = Object.keys(list).map(item => ({ value: item, label: item }));
  return currencies;
}

class CurrencySelector extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      currenciesDisplay: [],
      loading: true,
    };
    this._fetchData();
  }

  handleChange = (selectedOption) => {
    const { onChange } = this.props;
    const { currencies } = this.state;
    this.setState({ selectedOption });
    let val;
    if (selectedOption && selectedOption.value) {
      val = {
        key: selectedOption.value,
        coef: currencies[selectedOption.value],
      }
    } else {
      val = null;
    }
    onChange(val);
  }

  _fetchData() {
    fetch(`${API_URL_COINCAP}/exchange_rates`)
      .then(resp => resp.json())
      .then(data => {
        const rates = {
          "USD": 1,
          ...data.rates
        };
        const currencies = prepareCurrencies(rates);
        return this.setState({
          currencies: rates,
          loading: false,
          currenciesDisplay: currencies,
          selectedOption: currencies[0],
        });
      })
      .catch(function (error) {
        console.log('Request failed', error);
      });
  }

  render() {
    const { loading, currenciesDisplay, selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;
    return (
      <div className="currency-selector">
        {!loading ?
          <Select
            name="form-field-name"
            value={value}
            clearable={false}
            onChange={this.handleChange}
            options={currenciesDisplay}
            placeholder="Currency"
          />
          :
          <Loader />
        }
      </div>
    )
  }
}

export default CurrencySelector;
