import React, { Component, Fragment } from 'react';
import { Container, Navbar, Button } from 'reactstrap';
import { Timeline, Close, Menu, MailOutline, VpnKey } from '@material-ui/icons';
import { ROUTE_HOME } from '../../RootRoutes';
import { Link } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import { FormattedMessage } from 'react-intl';
import { APP_MAIL, APP_NAME } from '../../../constans';
import { ThemeConsumer } from '../../theme/Theme';
import ThemeSwitcher from '../../theme/ThemeSwitcher';
import './Header.css';

const DURATION = 150;

class Header extends Component {
  constructor(props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: false
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    const { collapsed } = this.state;
    return (
      <Fragment>
        <Navbar className="app-header" fixed="top" light>
          <Container >
            <Link to={ROUTE_HOME} className="mr-auto navbar-brand">
              <div className="logo">
                <Timeline /> {APP_NAME}
              </div>
            </Link>
            <ThemeConsumer>
              <ThemeSwitcher />
            </ThemeConsumer>
            {!collapsed ?
              <Menu onClick={this.toggleNavbar} className="mr-2 ml-3 ml-sm-5" />
              :
              <Close onClick={this.toggleNavbar} className="mr-2 ml-3 ml-sm-5" />}
          </Container >
        </Navbar>

        <Transition in={collapsed} timeout={DURATION}>
          {(state) => (
            <div className={`anim-bg anim-nav anim-nav-${state}`}>
              <Container className="text-right">
                <nav>
                  {(this.props.authenticated === false)
                    ? <Link to="/login"> Login</Link> 
                    : <div>
                        <Link to="/logout">Logout</Link>
                        <Link to="/portfolio" uid={this.props.uid}>Portfolio</Link>
                      </div>}
                </nav>
              </Container >
            </div>
          )}
        </Transition>
      </Fragment>
    );
  }
}

export default Header;
