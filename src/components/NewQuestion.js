import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleSaveQuestion } from '../actions/shared'
import Nav from './Nav'
import NavigateLogin from './NavigateLogin'
import { Button } from 'react-bootstrap'
import { Container, Card, Form } from 'react-bootstrap'

class NewQuestion extends Component {

  state = {
    optionOneText: '',
    optionTwoText: '',
    toHome: false
  }

  handleChange = name => e => {
    this.setState({
      [name]: e.target.value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { optionOneText, optionTwoText } = this.state
    this.props.dispatch(handleSaveQuestion(optionOneText, optionTwoText))
    this.setState(() => ({
      optionOneText: '',
      optionTwoText: '',
      toHome: true
    }))
  }

  render() {

    if (this.props.loggedOut) {
      return <NavigateLogin afterLogin='/add'/>
    }

    const { optionOneText, optionTwoText, toHome } = this.state

    if (toHome) {
      return <Redirect to={{ pathname: '/home' }} />
    }

    return (
      <div>
        <Nav />
          <Container>
            <Card className='new-question'>
              <Card.Header>Add Your Question</Card.Header>
                <Card.Body>
                  <Card.Title>Would You Rather...</Card.Title>
                  <Form>
                  <textarea
                    placeholder='Enter Option One Here'
                    value={optionOneText}
                    onChange={this.handleChange('optionOneText')}
                    rows="2" cols="53"
                  />
                  <textarea
                    placeholder='Enter Option Two Here'
                    value={optionTwoText}
                    onChange={this.handleChange('optionTwoText')}
                    rows="2" cols="53"
                  />
                  <Button
                    variant='danger'
                    size='small'
                    onClick={this.handleSubmit}
                    disabled={optionOneText === '' || optionTwoText === ''}
                  >
                    Submit
                  </Button>
                  </Form>
                </Card.Body>
          </Card>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = ({ authedUser }) => ({
  loggedOut: authedUser === null
})

export default connect(mapStateToProps)(NewQuestion)
