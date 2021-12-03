import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import Nav from './Nav'
import NavigateLogin from './NavigateLogin'
import Option from './Option'
import { handleAnswer } from '../actions/shared'
import { formatPercent, formatQuestion } from '../utils/helpers'
import { Card, Button } from 'react-bootstrap'

class QuestionPage extends Component {

  handleClick = (answer) => {
    const { dispatch, qid } = this.props
    dispatch(handleAnswer(qid, answer))
  }

  render() {

    if (this.props.loggedOut) {
      return <NavigateLogin afterLogin={`/questions/${this.props.qid}`}/>
    }

    const { question } = this.props;
    
    if (question === null) {
      return (
        <div>
          <Nav />
          <Card>
            <Card.Text>
              There are no questions!
            </Card.Text>
          </Card>
        </div>
      )
    }

    const { hasAnswered, name, avatar, optionOne, optionTwo,
      answer, optionOneVotes, optionTwoVotes } = question;
    const totalVotes = optionOneVotes + optionTwoVotes;
    const optionOnePerc = formatPercent(optionOneVotes, totalVotes);
    const optionTwoPerc = formatPercent(optionTwoVotes, totalVotes);

    return (
      <div>
        <Nav />
        <Card>
          <Card.Img alt='avatar' src={require('../assets/' + avatar).default}/>
          <Card.Body>
          <Card.Title>{name}</Card.Title>
          <br />
          <Card.Text>Would you rather...</Card.Text>
          
        {
          hasAnswered && <div>
            <Option
              chosen={answer === 'optionOne'}
              optionText={optionOne} 
              optionPerc={optionOnePerc}
              optionVotes={optionOneVotes}
              totalVotes={totalVotes}
            />
            <br />
            <Option
              chosen={answer === 'optionTwo'}
              optionText={optionTwo}
              optionPerc={optionTwoPerc}
              optionVotes={optionTwoVotes}
              totalVotes={totalVotes}
            />
          </div>
        }

        {
          !(hasAnswered) && <div>
           
              <Button
              size='small'
              variant='warning'
              >
                <div onClick={() => this.handleClick('optionOne')}>
                  {optionOne}?
                </div>
              </Button>
              
            <Card.Text className='button'>OR..</Card.Text>
           
              <Button
              size='small'
              variant='warning'
              >
                <div onClick={() => this.handleClick('optionTwo')}>
                  {optionTwo}?
                </div>
              </Button>
          
          </div>
        }
            <Button
              className='button'
              variant='danger'
              size='small'
              as={Link}
              to={'/home'}
            >
              Return to Homepage
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({authedUser, questions, users}, props) => {
  const { id } = props.match.params
  const question = questions[id]
  return {
    loggedOut: authedUser === null,
    qid: id,
    question: question ? formatQuestion(question, users, authedUser) : null
}
}

export default withRouter(connect(mapStateToProps)(QuestionPage))
