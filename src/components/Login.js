import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'
import logo from '../assets/logo.jpeg'
import { Button, Card, Form, FloatingLabel, Container } from 'react-bootstrap'

function Login (props) {

  const [state , setState] = useState({
    userId : 'none',
    loggedIn: false
})

  const handleUserChange = e => {
    setState({ userId: e.target.value })
  }

  const handleLogin = () => {
    props.dispatch(setAuthedUser(state.userId))
    setState({ loggedIn: true })
  }

  let afterLogin = '/home'

  if (props.location.state) {
    afterLogin = props.location.state.afterLogin
  }

  if (state.loggedIn === true) {
    return <Redirect to={ afterLogin } />       
  }

  const { users } = props

  return (
    <Container className='login'>  
      <Card className='card-login'>
      <Card.Img variant="top" src={logo}/>
      <Card.Body>
        <Card.Title>WOULD YOU RATHER</Card.Title>
          <FloatingLabel controlId="floatingSelectGrid" label="You must select PLAYER to Login!">
            <Form.Select 
            value={state.userId}
            onChange={handleUserChange}
            >
              <option>PLAYER</option>
              {
                  Object.keys(users).map((userId) => (
                  <option key={userId} value={userId}>{users[userId]['name']}</option>
                ))
              }
            </Form.Select>
          </FloatingLabel>
          <Button className='button' variant="danger" onClick={handleLogin}>Login</Button>
        </Card.Body>
      </Card>
    </Container>
  )
}

const mapStateToProps = ({ users }) => ({ users })

export default connect(mapStateToProps)(Login)
