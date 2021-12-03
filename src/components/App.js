import 'bootstrap/dist/css/bootstrap.min.css'
import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import { handleInitialData } from '../actions/shared'
import Login from './Login'
import Home from './Home'
import QuestionPage from './QuestionPage'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'
import { Container } from 'react-bootstrap'

const NotFoundPage = () => (
  <Container className='not-found'>
    <h3>404 page not found! We are sorry but the page you are looking for does not exist.</h3>
  </Container>
)

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
    <Router>
      <Fragment>
        <LoadingBar style={{ backgroundColor: 'red'}} />
          { 
            this.props.loading
              ? null
              : <div className='app'>
              <Switch>
                <Route exact path='/' component={Login} />
                <Route exact path='/home' component={Home} />
                <Route exact path='/questions/:id' component={QuestionPage} />
                <Route exact path='/leaderboard' component={Leaderboard} />
                <Route exact path='/add' component={NewQuestion} />
                <Route component={NotFoundPage} />
              </Switch>  
              </div>
          }
        </Fragment>
      </Router>
    )
  }
}

const mapStateToProps = ({ users }) => ({
    loading: users === {}
})

export default connect(mapStateToProps)(App)
