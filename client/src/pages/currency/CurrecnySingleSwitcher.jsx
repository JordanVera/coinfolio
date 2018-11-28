import React, { Component, Fragment } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import CurrencySingleModal from './CurrencySingleModal';
import CurrencySingle from './CurrencySingle';
import Home from '../home/Home';
import NotFound from '../not-found/NotFound';
import SignInForm from '../../components/auth/signin';
import Logout from '../../components/auth/signout';
import HoldCoin from '../../components/auth/holdcoin';
import Portfolio from '../../components/auth/portfolio';
import { ROUTE_CURRENCY_SINGLE, ROUTE_NOT_FOUND } from '../../components/RootRoutes';

class CurrencySingleSwitcher extends Component {

  previousLocation = this.props.location;

  componentWillUpdate(nextProps) {
    const { location,uid } = this.props;
    // set previousLocation if props.location is not modal
    if (
      nextProps.history.action !== "POP" &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location;
    }
  }

  render() {
    const { location } = this.props;

    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    );
    return (
      <Fragment>
        {console.log(this.props)}
        <Switch location={isModal ? this.previousLocation : location}>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={SignInForm} />
          <Route exact path='/logout' component={Logout} />
          <Route exact path='/portfolio' render={ props => <Portfolio {...props} uid={this.props.uid} data={this.props.data} />} />
          <Route exact path='/holdcoin/:currency' render={ props => <HoldCoin {...props} uid={this.props.uid} />} />
          <Route path={ROUTE_CURRENCY_SINGLE} component={CurrencySingle} />
          <Route path={ROUTE_NOT_FOUND} component={NotFound} />
          <Redirect from='*' exact to={ROUTE_NOT_FOUND} component={NotFound} />
        </Switch>
        {isModal ? <Route path={ROUTE_CURRENCY_SINGLE} component={CurrencySingleModal} /> : null}
      </Fragment>
    )
  }
}

export default CurrencySingleSwitcher;
