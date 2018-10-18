/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { app } from "../../firebase/firebase";


class Logout extends React.Component {
  constructor() {
    super()
    this.state = {
      redirect: false
    }
  }

  componentWillMount() {
    app.auth().signOut().then((user) => {
      this.setState({
        redirect: true
      })
    })
  }

  render() {
      if (this.state.redirect === true) {
        return <Redirect to="/" />
      }
      return (
        null
      )
  }
}

export default Logout;