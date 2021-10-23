import React from 'react';
import { useHistory } from 'react-router';
import { authService } from 'fbase';
import { signOut } from 'firebase/auth';

const Profile = () => {
  const history = useHistory();
  const onLogOutClick = () => {
    signOut(authService);
    history.push('/');
  };

  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
