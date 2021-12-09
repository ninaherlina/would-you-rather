import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import { handleInitialData } from '../actions/shared'
import Login from './Login'
import Home from './Home'
import QuestionPage from './QuestionPage'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'
import { Container, Button } from 'react-bootstrap'

const NotFoundPage = () => (
  <Container className='not-found'>
    <h3>404 page not found! We are sorry but the page you are looking for can not be found.</h3>
    <Button className='button' variant="danger" as={Link} to={'/'}>Back To Login Page</Button>
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
                <Route exact path='/home' component={Home} />
                <Route exact path='/questions/:id' component={QuestionPage} />
                <Route exact path='/leaderboard' component={Leaderboard} />
                <Route exact path='/add' component={NewQuestion} />
                <Route component={NotFoundPage} />
              </Switch>  
          }
        </div>  
        </Fragment>
      </Router>
    )
}

const mapStateToProps = ({ users }) => ({
    loading: users === {}
})

export default connect(mapStateToProps)(App)
