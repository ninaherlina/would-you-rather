import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatTime, formatUnanswered } from '../utils/helpers'
import Nav from './Nav'
import NavigateLogin from './NavigateLogin'
import Question from './Question'
import { Navbar, Container, Tabs, Tab, CardGroup, Card } from 'react-bootstrap'

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      key: 1
    }
   this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect (key) {
      this.setState({key})
  }

  render() {

    if (this.props.loggedOut) {
      return <NavigateLogin afterLogin='/home'/>
    }

    const questionIds = this.state.key === 1
      ? this.props.unansweredIds
      : this.props.answeredIds

    return (
      <div>
        <Nav />
        <Navbar bg="light" variant="light" className='nav-center'>
            <Container>
                <Tabs
                onSelect={this.handleSelect}
                >
                    <Tab eventKey={1} title="Unanswered"></Tab>
                    <Tab eventKey={2} title="Answered"></Tab>
                </Tabs>
            </Container>
        </Navbar>
       
        <Container>
          {questionIds.length === 0 && <p>No more questions!</p>}
          <CardGroup>
            {questionIds.map((id) => (
              <Card key={id}>
                <Question id={id} />
              </Card>
            ))}
          </CardGroup>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = ({ questions, users, authedUser }) => {
  const user = users[authedUser]
  const answeredIds = user ? Object.keys(user['answers']) : []
  const unansweredIds = user ? formatUnanswered(Object.keys(questions), answeredIds) : []
  return {
    loggedOut: authedUser === null ,
    answeredIds: formatTime(questions, answeredIds),
    unansweredIds: formatTime(questions, unansweredIds)
  }
}

export default connect(mapStateToProps)(Home)
