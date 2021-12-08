import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect, Fragment } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
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
    <h3>404 page not found! We are sorry but the page you are looking for do not exist.</h3>
  </Container>
)

function App (props) {

  useEffect(() => {
    
    props.dispatch(handleInitialData())
    
  })

  return (
      <Router>
        <Fragment>
        <LoadingBar style={{ backgroundColor: 'red'}} />
        <div>
          { props.loading === true
            ? null
            : <Switch>
                <Route exact path='/' component={Login} />
                <Route path='/home' component={Home} />
                <Route path='/questions/:id' component={QuestionPage} />
                <Route path='/leaderboard' component={Leaderboard} />
                <Route path='/add' component={NewQuestion} />
                <Route component={NotFoundPage} />
              </Switch>  
          }
        </div>  
        </Fragment>
      </Router>
    )
}

const mapStateToProps = ({ users }) => ({
    loading: users === null
})

export default connect(mapStateToProps)(App)
