import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'

function SignUpForm(props) {
  return (
    <div>
      <h2>Sign Up</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values) => console.log(values)}
      >
        <Form>
          email: <Field name="email" type="email" />
          password: <Field name="password" type="password" />
          <button>sign up</button>
        </Form>
      </Formik>
    </div>
  )
}

SignUpForm.propTypes = {}

export default SignUpForm
