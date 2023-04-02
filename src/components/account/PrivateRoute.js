import React from 'react'
import {useUser} from '../../context/UserContext';
import {Navigate, Outlet} from 'react-router-dom';

function PrivateRoute() {
    const {currentUser} = useUser();
  return (
      currentUser ? <Outlet /> : <Navigate to='/account/login'/>
  )
}

export default PrivateRoute
