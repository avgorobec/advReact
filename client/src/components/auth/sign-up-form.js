import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch } from 'react-redux'
import { signUp } from '../../redux/ducks/auth'

function SignUpForm() {
  const dispatch = useDispatch()
  const handleSubmit = (values) => dispatch(signUp(values))

  return (
    <div>
      <h2>Sign Up</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={handleSubmit}
      >
        <Form>
          email: <Field name="email" type="email" />
          password:{' '}
          <Field
            name="password"
            type="password"
            validate={(value) =>
              !value ? 'Password is a required field' : undefined
            }
          />
          <button type="submit">sign up</button>
          <ErrorMessage name="password" />
        </Form>
      </Formik>
    </div>
  )
}

export default SignUpForm
