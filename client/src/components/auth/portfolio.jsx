/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React, { Component } from 'react';
import { Button, Alert, Jumbotron, Row, Col, Container } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { app, facebookProvider } from "../../firebase/firebase";
import axios from 'axios';
import PortfolioHeader from './portfolioHeader';
import './portfolio.css';
import { subscribeToTrades } from '../Socket';
import { API_URL_COINCAP } from '../../constans';
import CountUp from 'react-countup';
import OwnedCoins from './ownedcoins';


class Portfolio extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      portfolio: []
    };
  }
  CalcCost = _=>{
    let temp = 0;
    this.state.portfolio.forEach( portfolioItem => {
     temp=temp + portfolioItem.buyPrice * portfolioItem.shares; 
    })

    return temp;

  }

  calcCurrentValue = _ => {
    let temp = 0;
    this.data.forEach( dataElement => {
      this.state.portfolio.forEach( portfolioElement => {
        if(dataElement.short == portfolioElement.ticker ) {
          temp= temp + (dataElement.price * portfolioElement.shares);
        }
      })
      
    })

    return temp;

  }

  totalProfitAsPercentage(totalProfit, totalCost) {
    return Math.floor((totalProfit / totalCost) * 100)
  }

    data=[];
    dataOriginal=[];

  componentWillMount = _ => {
    this.fetchData();
  }

  componentDidMount = _ => {
    console.log("componentdid mount")

    //  axios post request
    axios.get(`/api/users/${this.props.uid}`)
      .then( response => {
        console.log("Getting portfolio data");
        console.log(response.data[0].portfolio);
        const portf = response.data[0].portfolio;
        this.setState({ portfolio: portf });
    })
    .catch( error => {
      console.log(error);
    });
  }

  
  fetchData() {
    fetch(`${API_URL_COINCAP}/front`)
      .then(resp => resp.json())
      .then(data => {
        this.data = data
        this.dataOriginal = data;
        console.log(this.data);
        return;
      })
      .catch(function (error) {
        console.log('Request failed', error);
      });
  }

  render() {
    const totalCost = this.CalcCost();
    const currentValue = this.calcCurrentValue();
    const totalProfit = currentValue-totalCost;

    // console.log(`total cost: ${totalCost}`);
    // console.log(`current port value: ${totalProfit}`);
    const totalProfitAsPercentage = setTimeout(this.totalProfitAsPercentage(totalProfit, totalCost) , 1000);
    // console.log("total profit as %: " + totalProfitAsPercentage);
    return (
      
        <div>
          {this.componentDidMount()}
          <Container>
            <div className="portfolioJumbotron">
              <Row>
                <Col>
                  <ul>
                    <h3>$
                      <CountUp
                      start={0}
                      end={currentValue}
                      duration={3}
                      separator=","
                      decimals={2}
                      decimal="." />
                    </h3>

                    {/* {this.CalcCost()} */}
                  {/* {
                    this.state.portfolio.map(portfolioItem => {
                      return <li>{portfolioItem.buyPrice * portfolioItem.shares}</li>; 
                    })
                  } */}
                  </ul>
                  <h3 className="portfolioDescription">Current Portfolio Value </h3>
                </Col>
              </Row>
              <hr/>
              <Row>
                <Col xs={12} sm={4}>
                  <h3>$
                    <CountUp
                    start={0}
                    end={totalCost}
                    duration={3}
                    separator=","
                    decimals={2}
                    decimal="." /></h3>
                  <h3 className="portfolioDescription">Total Cost</h3>
                </Col>
          
                <Col xs={12} sm={4}>
                  <h3>$
                  <CountUp
                    start={0}
                    end={totalProfit}
                    duration={3}
                    separator=","
                    decimals={2}
                    decimal="." />
                  </h3>
                  <h3 className="portfolioDescription">Total Profit</h3>
                </Col>

                <Col xs={12} sm={4}>
                  <h3>
                    <CountUp
                    start={0}
                    end={totalProfitAsPercentage}
                    duration={3}
                    separator=","
                    decimals={2}
                    decimal="." />%</h3>
                  <h3 className="portfolioDescription">Total Profit</h3>
                </Col>
              </Row>
            </div>
            <PortfolioHeader />
            <hr />
            { this.state.portfolio.map(trade => 
              <li className="indivCoin">
                <Row>
                  <Col sm={8}>
                    <p id="ticker">{trade.ticker}</p>
                  </Col>
                  <Col sm={2}>
                    <p id="ticker">{trade.shares}</p>
                  </Col>
                  <Col sm={1}>
                    <p id="ticker">{trade.buyPrice}</p>
                  </Col>
                  <Col sm={1}>
                    <Button color="danger" size="sm">Delete</Button>
                  </Col>
                </Row>
              </li>
          )}
            </Container>
        </div>
    );
  }
}

export default Portfolio;