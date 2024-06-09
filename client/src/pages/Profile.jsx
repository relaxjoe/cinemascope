// import ProfileForm from "../components/ProfileForm";
import ReviewForm from '../components/ReviewForm';
import ProfileForm from '../components/ProfileForm';

function Profile() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <ReviewForm />
       <ProfileForm />
    </div>
  );
}       

export default Profile;