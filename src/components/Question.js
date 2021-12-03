import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { formatDate } from '../utils/helpers'
import { Button, Card, Container } from 'react-bootstrap'

class Question extends Component {
    
    render() {
        
        const { name, avatar, date, preview, id, } = this.props
  
      return (
        <Container>
            <Card className='card'>
              <Card.Img 
                  alt={`Avatar of ${name}`} 
                  variant="left" 
                  src={require('../assets/' + avatar ).default} 
                />
                <Card.Body className='card-body'>
                    <Card.Title>{name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{date}</Card.Subtitle>
                    <Card.Text>Would you rather</Card.Text>
                    <Card.Text>{preview}...</Card.Text>
                        <Button
                        className='button'
                        variant='danger'
                        size='small'
                        as={Link}
                        to={`/questions/${id}`}
                        >
                       Or...
                        </Button>
                </Card.Body>
            </Card>
        </Container>    
    )
  }
}

function mapStateToProps ({ users, questions }, { id }) {
  const question = questions[id]

  return {
    name: users[question['author']]['name'],
    avatar: users[question['author']]['avatarURL'],
    date: formatDate(question['timestamp']),
    preview: question['optionOne']['text']
  }
}

export default withRouter(connect(mapStateToProps)(Question))