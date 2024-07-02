import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import { Navigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PlacesPage from './PlacesPage';
import AccountNav from '../componenets/AccountNav';

function AccountPage() {

    const { ready, user, setUser } = useContext(UserContext);
    const [redirect, setRedirect] = useState('');

    let { subpage } = useParams();
    // console.log(subpage)

    if (!ready) {
        return 'loading... please wait'
    }

    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    }

    if (subpage === undefined) {
        subpage = 'profile';
    }

    async function logoutUser() {
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <>  
            <AccountNav/> 
            {subpage === 'profile' && (
                <div className='py-5 max-w-md mx-auto text-center'>
                    <p>Logged in as {user.name} {user.email}</p>
                    <button onClick={logoutUser} className='mt-2 bg-rose-500 text-white px-4 py-2 rounded-full w-full'>Log out</button>
                </div>
            )}
            {subpage === 'bookings' && (
                <>Bookings PAGES</>
            )}
            {subpage === 'places' && (
                <PlacesPage />
            )}
        </>
    )
}

export default AccountPage
