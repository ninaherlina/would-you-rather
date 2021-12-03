import React, { Component } from 'react'
import { ProgressBar } from 'react-bootstrap'
import { FaCheck } from 'react-icons/fa/index'

class Option extends Component {

  render() {

    const { chosen, optionText, optionPerc, optionVotes, totalVotes } = this.props

    if (chosen) {
      return (
        <div>
          <div><strong>{optionText}?</strong><span className='checked'><FaCheck /></span></div>
          <ProgressBar now={optionPerc} variant="warning" />
          <span>{optionPerc}%</span>
          <div>{optionVotes} out of {totalVotes} votes</div>
        </div>
      )
    } else {
      return (
        <div className='option-close'>
          <div><strong>{optionText}?</strong></div>
          <ProgressBar now={optionPerc} variant="warning" />
          <span>{optionPerc}%</span>
          <div>{optionVotes} out of {totalVotes} votes</div>
        </div>
      )
    }
  }
}

export default Option
