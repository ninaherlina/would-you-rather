import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Navbar, Nav, Container } from 'react-bootstrap'

function Navigation(props) {

 const handleLogout = () => {
    props.dispatch(setAuthedUser(null))
  }

    const { username, avatar } = props

    return (
      <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand>Would You Rather?</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            <Nav.Link as={Link} to="/add">New Question</Nav.Link>
            <Nav.Link as={Link} to="/leaderboard">Leaderboard</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link to="/" onClick={handleLogout}>Logout</Nav.Link>
            <Nav.Link>Hey, {username}! </Nav.Link>
            <Nav.Link className='small-avatar' eventKey={2}><img alt='avatar' src={require('../assets/' + avatar).default}/></Nav.Link>
          </Nav>
      </Container>
    </Navbar>
    )
}

const mapStateToProps = ({ users, authedUser }) => {
  const user = users[authedUser];
  return {
    username: user ? user['name'] : '',
    avatar: user ? user['avatarURL'] : ''
  }
}

export default connect(mapStateToProps)(Navigation)
