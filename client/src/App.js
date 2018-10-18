import React, { Component } from 'react';
import RootRoutes from './components/RootRoutes';
import Header from './components/common/Header/Header';
import Footer from './components/common/Footer/Footer';
import Helmet from 'react-helmet';
import { APP_TITLE_PREFFIX } from './constans';
import ThemeProvider, { ThemeConsumer } from './components/theme/Theme';
import Layout from './components/common/Layout';
import { app, base } from './firebase/firebase';
import axios from 'axios';
import 'babel-polyfill';
import './assets/main.css';
import './assets/bootstrap.css';

class App extends Component {
constructor(props) {
    super(props)
    this.state = {
      authenticated: false,
      loading: true
    };
  }

componentWillMount = _ => {
  this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user.uid)

       // axios post request
       axios.post('/api/users', {
        uid: user.uid
      })
      .then(function (response) {
        console.log("We have found the user in the db")
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

      this.setState({
        authenticated: true,
        uid: user.uid,
        loading: false
      })
    } else {
      this.setState({
        authenticated: false,
        uid: null,
        loading: false
      })
    }
  })
}

componentWillUnmount = _ => {
  this.removeAuthListener()
}

  render() {
    return (
      <ThemeProvider>
        <ThemeConsumer>
          <Layout>
            <Helmet titleTemplate={`%s | ${APP_TITLE_PREFFIX}`} />
            <Header authenticated={this.state.authenticated} uid={this.state.uid} />
            <RootRoutes uid={this.state.uid} />
            <Footer />
          </Layout>
        </ThemeConsumer>
      </ThemeProvider>
    );
  }
}

export default App;
