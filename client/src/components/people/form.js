import React from 'react'
import { Formik, Form, Field } from 'formik'
import { useDispatch } from 'react-redux'
import { addPerson } from '../../redux/ducks/people'

function PersonForm() {
  const dispatch = useDispatch()
  const handleSubmit = (values) => dispatch(addPerson(values))

  return (
    <Formik
      initialValues={{ firstName: '', lastName: '', email: '' }}
      onSubmit={handleSubmit}
    >
      <Form>
        First name: <Field name="firstName" />
        Last name: <Field name="lastName" type="text" />
        Email: <Field name="email" type="email" />
        <button type="submit">Add person</button>
      </Form>
    </Formik>
  )
}

export default PersonForm
