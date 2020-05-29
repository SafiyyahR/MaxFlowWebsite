import React, { Component } from 'react'
import NavBar from '../NavBar/NavBar'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import HomePage from '../HomePage/HomePage'
import FindMaxFlow from '../FindMaxFlow/FindMaxFlow'
import ErrorPage from '../ErrorPage/ErrorPage'
import LoadingPage from '../LoadingPage/LoadingPage'
import ResultPage from '../ResultPage/ResultPage'
import Footer from '../Footer/Footer'
export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/maxflow" component={FindMaxFlow} />
            <Route path="/results" component={ResultPage} />
            <Route path="/loading" component={LoadingPage} />
            <Route component={ErrorPage} />
          </Switch>
          <Footer />
        </div>
      </Router>);
  }


};