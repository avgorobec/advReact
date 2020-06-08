import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPeople, peopleListSelector } from '../../redux/ducks/people'

class PeopleList extends Component {
  componentDidMount() {
    this.props.fetchPeople()
  }

  render() {
    return (
      <ul>
        {this.props.people.map((person) => (
          <li key={person.id}>{person.email}</li>
        ))}
      </ul>
    )
  }
}

export default connect((state) => ({ people: peopleListSelector(state) }), {
  fetchPeople
})(PeopleList)
