import React, { useEffect } from 'react'
import { useState } from 'react';
import UploadPhotos from '../componenets/UploadPhotos';
import Perks from '../componenets/Perks';
import axios from 'axios';
import AccountNav from '../componenets/AccountNav';
import { Navigate, useParams } from 'react-router-dom';

function PlacesFormPage() {

    const {id} = useParams();
    console.log(id);

    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState(100);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if(!id){
            return;
        } else {
            axios.get('/places/'+id).then((res) => {
                const {data} = res;
                setTitle(data.title);
                setAddress(data.address);
                setDescription(data.description);
                setAddedPhotos(data.photos);
                setPerks(data.perks);
                setExtraInfo(data.extrainfo);
                setCheckIn(data.checkIn);
                setCheckOut(data.checkOut);
                setMaxGuests(data.maxGuests);
                setPrice(data.price);
            })
        }
    } ,[id])

    async function sendFormDataToServer(ev){
        ev.preventDefault();
        try {
            if(id){
                await axios.put('/places/'+id, {
                    id,
                    title, 
                    address, 
                    addedPhotos, 
                    description, 
                    perks, 
                    extraInfo, 
                    checkIn, 
                    checkOut, 
                    maxGuests,
                    price
                })
            } else {
                const response = await axios.post('/placesData', {
                    title, 
                    address, 
                    addedPhotos, 
                    description, 
                    perks, 
                    extraInfo, 
                    checkIn, 
                    checkOut, 
                    maxGuests,
                    price
                });
                console.log('Data sent successfully:', response.data);
            }
            setRedirect(true);
        } catch (error) {
            console.error('Error sending data:', error)
        }
    }

    if(redirect) {
        return <Navigate to={'/account/places'}/>
    }

    return (
        <>
            <AccountNav/>
            <form className='max-w-7xl mt-2 mx-auto'>

            {/* title */}

            <h2 className='text-2xl font-bold mt-2'>
                Title
            </h2>
            <p className='text-gray-500 text-sm'>
                Enter the title (or) name of the place that you are gonna visit.
            </p>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='title of the place -- e.g:maldives...' />

            {/* Address */}

            <h2 className='text-2xl mt-2 font-bold'>
                Address
            </h2>
            <p className='text-gray-500 text-sm'>
                Enter the address of the place that you are gonna visit.
            </p>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Address of the place' />

            {/* Photos */}

            <h2 className='text-2xl mt-2 font-bold'>
                Photos
            </h2 >
            <p className='text-gray-500 text-sm'>
                Add the photos of the mentioaned place via link or via upload...
            </p>

            <UploadPhotos addedPhotos={addedPhotos} setAddedPhotos={setAddedPhotos} />

            {/* Description */}

            <h2 className='text-2xl mt-2 font-bold'>
                Description
            </h2>
            <p className='text-gray-500 text-sm'>
                Enter the description of the place.
            </p>
            <textarea type="text" value={description} onChange={(e) => setDescription(e.target.value)} className='h-32' />

            {/* Perks */}

            <Perks perks={perks} setPerks={setPerks} />


            {/* Extra-information */}

            <h2 className='text-2xl font-bold mt-2'>
                Extra-Info
            </h2>
            <p className='text-gray-500 text-sm'>
                Add extra information...
            </p>
            <input type="text" value={extraInfo} onChange={(e) => setExtraInfo(e.target.value)} placeholder='House rules...etc...' />

            {/* Checkin - Checkout - Max-guests */}

            <h2 className='text-2xl font-bold mt-2'>Check In and Out times</h2>
            <p className='text-gray-500 text-sm'>
                Add check in and out times, please remember to have a time window for cleaning the room
            </p>

            <div className='grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-2 mt-2'>
                <div className='px-2'>
                    <label htmlFor="">
                        Check In Time
                    </label>
                    <input
                        type="text"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        placeholder='e.g : 14.00PM'
                    />
                </div>
                <div className='px-2'>
                    <label htmlFor="">
                        Check Out Time
                    </label>
                    <input
                        type="text"
                        value={checkOut}
                        onChange={(e) =>
                            setCheckOut(e.target.value)}
                        placeholder='e.g : 14.00PM'
                    />
                </div>
                <div className='px-2'>
                    <label htmlFor="">
                        Max No.of.guests
                    </label>
                    <input
                        type="text"
                        value={maxGuests}
                        onChange={(e) =>
                            setMaxGuests(e.target.value)}
                    />
                </div>
                <div className='px-2'>
                    <label htmlFor="">
                        Price
                    </label>
                    <input
                        type="text"
                        value={price}
                        onChange={(e) =>
                            setPrice(e.target.value)}
                    />
                </div>
            </div>
            <button onClick={sendFormDataToServer} className='w-full mt-3 mb-5 bg-rose-500 rounded-full text-white py-2'>
                Save
            </button>
        </form>
        </>
        
    )
}

export default PlacesFormPage
