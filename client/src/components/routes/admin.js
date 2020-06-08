import React, { Component } from 'react'
import PersonForm from '../people/form'
import PeopleList from '../people/people-list'

class AdminPage extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h1>Admin</h1>
        <PersonForm />
        <PeopleList />
      </div>
    )
  }
}

export default AdminPage
