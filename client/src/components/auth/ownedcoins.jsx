/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { Component } from 'react';
import { Button, Alert, Jumbotron } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { app, facebookProvider } from "../../firebase/firebase";
import axios from 'axios';


class OwnedCoins extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <div>
        <Jumbotron>
          <h1 className="display-3">Hello, world!</h1>
          <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
          <hr className="my-2" />
          <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
          <p className="lead">
            <Button color="primary">Learn More</Button>
          </p>
        </Jumbotron>

        <OwnedCoins portfolio={this.state.portfolio} />
      </div>
    );
  }
}

export default OwnedCoins;