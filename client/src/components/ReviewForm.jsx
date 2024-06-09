import {useState} from 'react';
import {useMutation, useQuery} from '@apollo/client';
import {CREATE_REVIEW} from '../utils/mutations';
import ReviewCard from './ReviewCard';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

function ReviewForm() {
    const [formState, setFormState] = useState({
rating: "",
comment: "",
title: "",
director: "",
actors: "",

    }); 
    console.log(Auth.getProfile());
    const {data} = useQuery(QUERY_ME);
    const reviews = data?.me.reviews || [];
    const[createReview] = useMutation(CREATE_REVIEW);
    async function handleSubmit(event) {
        event.preventDefault();
        console.log(formState);
        await createReview({variables: {...formState}});
        window.location.reload();
    }
    return (
        <div>
            <h1>Review Form</h1>
<form onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="exampleFormControlInput1">Title:</label>
    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Name of Film" onChange={event=>setFormState({...formState,title:event.target.value})} value={formState.title}/>
  </div>
  <div className="form-group">
    <label htmlFor="exampleFormControlSelect1">Rating</label>
    <select className="form-control" id="exampleFormControlSelect1" onChange={event=>setFormState({...formState,rating:event.target.value})} value={formState.rating}>
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
  </div>
  <div className="form-group">
  <label htmlFor="exampleFormControlInput1">Director</label>
  <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Name" onChange={event=>setFormState({...formState,director:event.target.value})} value={formState.director}/>
  </div>
  <div className="form-group">
  <label htmlFor="exampleFormControlInput1">Actors</label>
  <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Name" onChange={event=>setFormState({...formState,actors:event.target.value})} value={formState.actors}/>
  </div>
  <div className="form-group">
    <label htmlFor="exampleFormControlTextarea1">Your Review</label>
    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={event=>setFormState({...formState,comment:event.target.value})} value={formState.comment}></textarea>
  </div>
    <button type="submit" className="btn btn-primary">Post</button>
</form>
{reviews.map(review=><ReviewCard review={review}username = {Auth.getProfile().data.username}/>)}
        </div>
    )
}

export default ReviewForm;