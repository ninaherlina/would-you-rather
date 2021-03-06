export function formatDate (timestamp) {
    const d = new Date(timestamp)
    return d.toLocaleTimeString('en-US') + ' | ' + d.toLocaleDateString();
}

  export function formatQuestion (question, users, authedUser) {
    const { id } = question
    const hasAnswered = Object.keys(users[authedUser]['answers']).includes(id)
    const answer = hasAnswered ? users[authedUser]['answers'][id] : ''
    
    return {
      hasAnswered,
      name: users[question['author']]['name'],
      avatar: users[question['author']]['avatarURL'],
      optionOne: question['optionOne']['text'],
      optionTwo: question['optionTwo']['text'],
      answer,
      optionOneVotes: question['optionOne']['votes'].length,
      optionTwoVotes: question['optionTwo']['votes'].length
    }
}  
  
export function formatTime(questions, questionIds) {
    return questionIds
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
}
  
  export function formatUnanswered(questionIds, answeredIds) {
    return questionIds
      .filter(questionId => !(answeredIds.includes(questionId)))
}
  
  export function formatPercent (optionVotes, totalVotes) {
    return Math.round((optionVotes / totalVotes ) * 100).toString()
}
  
  export function formatLeaderBoard (users) {
    const leaderboard = Object.keys(users).map((user_id) => {
      let leader = users[user_id];
      leader['score'] = Object.keys(leader['answers']).length + leader['questions'].length;
      return leader
    });
  
    return leaderboard.sort((a,b) => b.score - a.score)
}
  