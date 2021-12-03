import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'
import logo from '../assets/logo.jpeg'
import { Button, Card, Form, FloatingLabel, Container } from 'react-bootstrap'

class Login extends Component {
  
  state = {
    user_id: 'none',
    open: false,
    loggedIn: false
  }

  handleUserChange = event => {
    this.setState({ user_id: event.target.value })
  }

  handleLogin = () => {
    
    if (this.state.user_id === 'none') {
      this.setState({ open: true })
    } else {
      this.props.dispatch(setAuthedUser(this.state.user_id));
      this.setState({ loggedIn: true })
    }
  }

  render() {

    const { users } = this.props

    if (this.state.loggedIn) {
      return <Redirect to='/home' />
    }

    return (
    <Container className='login'>  
      <Card className='card-login'>
      <Card.Img variant="top" src={logo}/>
      <Card.Body>
        <Card.Title>WOULD YOU RATHER</Card.Title>
          <FloatingLabel controlId="floatingSelectGrid" label="You must select PLAYER to Login!">
            <Form.Select 
            aria-label="Floating label select example"
            value={this.state.user_id}
            onChange={this.handleUserChange}
            >
              <option>PLAYER</option>
              {
                  Object.keys(users).map((user_id) => (
                  <option key={user_id} value={user_id}>{users[user_id]['name']}</option>
                ))
              }
            </Form.Select>
          </FloatingLabel>
          <Button className='button' variant="danger" onClick={this.handleLogin}>Login</Button>
        </Card.Body>
      </Card>
    </Container>
    )
  }
}

const mapStateToProps = ({ users }) => ({ users })

export default connect(mapStateToProps)(Login)
