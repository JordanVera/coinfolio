/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Button, Alert } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { Toaster, Intent } from '@blueprintjs/core';
import { app, facebookProvider } from "../../firebase/firebase";
import axios from 'axios';

const holdCoinStyles = {
  width: "90%",
  maxWidth: "315px",
  margin: "80px auto",
  border: "1px solid #ddd",
  padding: "10px",
}

class HoldCoin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false
    };
  }

  addCoinToPortfolio = (e) => {
    e.preventDefault(); 
    const shares = this.sharesInput.value,
          ticker = this.props.match.params.currency,
          buyPrice = this.buyPriceInput.value;
    this.setState({redirect: true});


    axios.post(`/api/users/${this.props.uid}`, {
      ticker: ticker.substring(1),
      shares: shares, 
      buyPrice: buyPrice
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to='/' />
    }
    return (
      <div style={holdCoinStyles}>

        <h3>Add {this.props.match.params.currency.substring(1)} To Your Coinfolio</h3>
        <hr style={{ marginTop: '10px', marginBottom: '10px' }} />

        <form onSubmit={(e) => { this.addCoinToPortfolio(e) }} ref={(form) => { this.holdCoin = form}}>
            <div className="container">
                <label htmlFor="shares" style={{paddingRight: '10px'}}><b>shares</b></label>
                <input type="number" step="any" name="shares" required ref={(input) => { this.sharesInput = input }} /> 

                <label htmlFor="buyPrice" style={{paddingRight: '10px'}}><b>buy price</b></label>
                <input type="number" step="any" name="buyPrice" required ref={(input) => { this.buyPriceInput = input }} />

                <input type="submit" value="submit" />
            </div>
        </form>
      </div>
    );
  }
}

export default HoldCoin;