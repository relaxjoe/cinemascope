import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { gql, useMutation } from '@apollo/client';
import Auth from '../utils/auth';

import { CREATE_USER } from '../utils/mutations';

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  // Use the useMutation hook to call the GraphQL mutation
  const [createUser, { error }] = useMutation(CREATE_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await createUser({
        variables: { ...userFormData },
      });

      const { token, user } = data.createUser;
      console.log(user);
      Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <div className="signup-form-container">
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='username'>Username</Form.Label>
          <div className='signup-username-input-form'>
          <Form.Control
            type='text'
            placeholder='Your username'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          </div>
          <div className='signup-username-feedback'>
          <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>

          </div>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <div className='signup-email-input-form'>
          <Form.Control
            type='email'
            placeholder='Your email address'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />

          </div>
          <div className='signup-email-feedback'>
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>

          </div>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <div className='signup-password-input-form'>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />

          </div>
          <div className='signup-password-feedback'>

          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
          </div>
        </Form.Group>
        <div className='signup-button-container'>
        <Button
          disabled={!(userFormData.username && userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
        </div>
      </Form>
    </div>
  );
};

export default SignupForm;
