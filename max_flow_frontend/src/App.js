import React, { Component } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Home from './pages/index';
import MaxFlow from './pages/maxflow';
import Results from './pages/results';
import Error from './pages/404';
import Footer from './components/footer'
import ScrollToTop from './components/scroll-to-top'
import NavBar from './components/navbar';
export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <ScrollToTop />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/maxflow" component={MaxFlow} />
            <Route path="/results" component={Results} />
            <Route component={Error} />
          </Switch>
          <Footer />
        </div>
      </Router>);
  }


};