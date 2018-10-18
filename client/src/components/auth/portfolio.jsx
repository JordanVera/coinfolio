/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React, { Component } from 'react';
import { Button, Alert, Jumbotron, Row, Col, Container } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { app, facebookProvider } from "../../firebase/firebase";
import axios from 'axios';
import PortfolioHeader from './portfolioHeader';
import './portfolio.css';
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

  
  componentDidMount = _ => {
    
     // axios post request
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


  render() {
    return (
        <div>
          <Container>
            <div className="portfolioJumbotron">
              <Row>
                <Col>
                  <ul>
                    <h3>$
                      <CountUp
                      start={0}
                      end={1200.33}
                      duration={3}
                      separator=","
                      decimals={2}
                      decimal="." />
                    </h3>
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
                    end={444}
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
                    end={888.21}
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
                    end={220.11}
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
                  <Col sm={2}>
                    <p id="ticker">{trade.buyPrice} <Button color="danger" style={{marginLeft: "24px"}}>Delete</Button></p>
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