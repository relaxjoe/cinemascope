import React, { useState, useContext } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { gql, useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { AuthContext } from '../utils/AuthContext';

import { CREATE_REVIEW } from '../utils/mutations';

const ReviewForm = () => {
    const [reviewText, setReviewText] = useState('');

    const [createReview, { error }] = useMutation(CREATE_REVIEW);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setReviewText({ ...reviewText, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await createReview({
                variables: { reviewText },
            });

            setReviewText('');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='review-form-container'>
            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                <Form.Group className='mb-3'>
                    <Form.Label htmlFor='title'>Title</Form.Label>
                    <div className='review-title-input-form'>
                        <Form.Control
                        type='text'
                        placeholder='Required'
                        name='title'
                        onChange={handleInputChange}
                        value={reviewText.title}
                        required
                        />
                    </div>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label htmlFor='director'>Director</Form.Label>
                    <div className='review-director-input-form'>
                        <Form.Control
                        type='text'
                        name='director'
                        onChange={handleInputChange}
                        value={reviewText.director}
                        />
                    </div>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label htmlFor='actors'>Actors</Form.Label>
                    <div className='review-actors-input-form'>
                        <Form.Control
                        type='text'
                        name='actors'
                        onChange={handleInputChange}
                        value={reviewText.actors}
                        />
                    </div>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label htmlFor='rating'>Rating</Form.Label>
                    <div className='review-rating-input-form'>
                        <Form.Control
                        type='number'
                        placeholder='0-5'
                        name='rating'
                        onChange={handleInputChange}
                        value={reviewText.rating}
                        required
                        />
                    </div>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label htmlFor='comment'>Review</Form.Label>
                    <div className='review-comment-input-form'>
                        <Form.Control
                        type='text'
                        placeholder='Say something about the movie'
                        name='comment'
                        onChange={handleInputChange}
                        value={reviewText.comment}
                        />
                    </div>
                </Form.Group>
                <div className='review-button-container'>
                    <Button
                    disabled={!(reviewText.title && reviewText.rating)}
                    type='submit'
                    variant='success'>
                    Submit
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default LoginForm;