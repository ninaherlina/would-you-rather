import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatLeaderBoard } from '../utils/helpers'
import Navigation from './Navigation'
import NavigateLogin from './NavigateLogin'
import { Table, Card } from 'react-bootstrap'

class Leaderboard extends Component {

  render() {

    if (this.props.loggedOut) {
      return <NavigateLogin afterLogin='/leaderboard'/>
    }

    const { leaderboard } = this.props

    return (
      <div>
        <Navigation />
          <Card className='card-leaderboard'>
            <Table>
              <thead>
                <tr>
                  <th>Leader</th>
                  <th>Questions</th>
                  <th>Answers</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map(leader => {
                  return (
                    <tr key={leader.id}>
                      <th className='small-avatar'>
                        <img
                          alt='avatar'
                          src={require('../assets/' + leader.avatarURL).default}
                        />
                        <span className='leader-name'>{leader.name}</span>
                      </th>
                      <th>{leader.questions.length}</th>
                      <th>{Object.keys(leader.answers).length}</th>
                      <th>{leader.score}</th>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </Card>      
      </div>
    )
  }
}

const mapStateToProps = ({ users, authedUser }) => ({
    loggedOut: authedUser === null ,
    leaderboard : formatLeaderBoard(users)
})

export default connect(mapStateToProps)(Leaderboard)
