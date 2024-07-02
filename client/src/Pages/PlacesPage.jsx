import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AccountNav from '../componenets/AccountNav';
import axios from 'axios';

function PlacesPage() {

    const [place, setPlace] = useState([]);

    useEffect(() => {
        axios.get('/places').then(({ data }) => {
            setPlace(data);
        })
    }, [])
    console.log(place);

    return (
        <>
            <AccountNav />
            <div className='text-center'>
                <p>List of added places</p>
                <br />
                <Link to={'/account/places/new'} className='inline-flex gap-1 items-center bg-rose-500 px-4 py-2 rounded-full  text-white'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>

                    Add Places
                </Link>
            </div>
            <div className='mt-7 w-[60%] mx-auto'>
                {place.length > 0 && place.map(place => (
                    <Link to={'/account/places/'+place._id}>
                        <div className='flex gap-4 bg-gray-200 p-4 rounded-2xl mb-10 shadow-lg transition-transform transform hover:scale-[1.05] duration-500 ease-in-out'>
                            <div className='h-32 w-44 text-center cursor-pointer shrink-0 grow'>
                                {place.photos.length > 0 && (
                                    <img src={'http://localhost:4000/uploads/' + place.photos[0]} className='rounded-2xl h-[100%] w-[100%] object-cover' />
                                )}
                            </div>
                            <div className='cursor-pointer grow-0 shrink'>
                                <h2 className='text-2xl'>{place.title}</h2>
                                <p className='text-sm text-justify'>{place.description}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default PlacesPage
