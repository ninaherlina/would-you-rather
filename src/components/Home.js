import React, { useState, Fragment } from 'react'
import { connect } from 'react-redux'
import { formatTime, formatUnanswered } from '../utils/helpers'
import Navigation from './Navigation'
import NavigateLogin from './NavigateLogin'
import Question from './Question'
import { Navbar, Container, Row, Col } from 'react-bootstrap'
import { Tabs, TabList, Tab, TabPanel } from "react-tabs"
import "react-tabs/style/react-tabs.css"

function Home (props) {

  const [state , setState] = useState({
    selectedIndex: 0
  })

  const handleSelect = (selectedIndex) => {
      setState({ selectedIndex })
  }

  if (props.loggedOut) {
    return <NavigateLogin afterLogin='/home'/>
  }

  const questionIds = state.selectedIndex === 0
    ? props.unansweredIds
    : props.answeredIds

    return (
      <div>
        <Navigation />
        <Navbar bg="light" variant="light" className='nav-center'>
            <Container>
            <Fragment>
                <Tabs
                onSelect={handleSelect}
                selectedIndex={state.selectedIndex}
                >
                  <TabList>
                    <Tab>Unanswered</Tab>
                    <Tab>Answered</Tab>
                  </TabList> 
                  <TabPanel></TabPanel>
                  <TabPanel></TabPanel>  
                </Tabs>
            </Fragment>    
            </Container>
        </Navbar>
       
        <Container>
          {questionIds.length === 0 && <p>You have answered all of the questions!</p>}
         
          <Row>
            {questionIds.map((id) => (
              <Col sm={4} key={id}>
                <Question id={id} />
              </Col>
            ))}
          </Row>
         
        </Container>
      </div>
    )
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
