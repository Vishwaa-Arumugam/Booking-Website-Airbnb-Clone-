import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { differenceInCalendarDays } from 'date-fns';
import { UserContext } from '../UserContext';

function SinglePlacePage() {

    const { id } = useParams();
    const [place, setPlace] = useState(null);
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    const [checkindate, setCheckindate] = useState("");
    const [checkoutdate, setCheckoutdate] = useState("");
    const [guests, setGuests] = useState(1);
    const [name, setname] = useState("");
    const [mobile, setMobile] = useState();
    const [price, setPrice] = useState("");
    const [redirect, setRedirect] = useState("");
    const {user} = useContext(UserContext);

    useEffect(() => {
        console.log('username',user.name);
        if(user) {
            setname(user.name)
        }
    }, [user])
    

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/places/${id}`).then((response) => {
            setPlace(response.data);
        });
        console.log(id)
        console.log(place);
    }
        , [id]);

    async function bookThisPlace(){
        const days = differenceInCalendarDays(new Date(checkoutdate), new Date(checkindate))
        const p = days * place.price;
        setPrice(p);
        const response = await axios.post('/booking', {
            id,place:place._id,checkindate,checkoutdate,guests,name,mobile,price
        })
        console.log(response.data._id)
        const bookingid = response.data._id;
        if(bookingid){
            setRedirect(`/account/bookings/${bookingid}`);
        } else {
            alert('please fill all the fields')
        }
    }

    if(redirect){
        return <Navigate to={redirect}/>   
    }

    if (!place) {
        return 'loading'
    }

    if (showAllPhotos) {
        return (
            <div className='bg-white min-h-screen absolute min-w-full'>
                <div className='flex items-center justify-between'>
                    <button onClick={() => setShowAllPhotos(false)} className=' fixed transition-transform duration-300 transform hover:scale-125 px-2 py-2 rounded-full hover:bg-gray-200'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    <div className='flex-1 text-center'>
                        <h1 className='text-3xl font-bold'>Photos of {place.title}</h1>
                    </div>
                    <div className='w-8'></div>
                </div>
                <br />
                <hr />
                <br />
                <div className=''>
                    {place?.photos?.length > 0 && place.photos.map((photo) => (
                        <div className=''>
                            <img src={"http://localhost:4000/uploads/" + photo} alt="" className='w-[50%] rounded-3xl h-[50%] object-cover aspect-square mx-auto my-4' />
                            {console.log(photo)}
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <>
            <div className='bg-gray-50   -mx-10'>
                <div className='w-[60%] mx-auto relative'>
                    <div className='pt-6 pb-6 flex items-center justify-between'>
                        <h2 className='text-3xl font-semibold'>
                            {place.title}
                        </h2>
                        <a className='text-sm font-semibold underline cursor-pointer' target='_blank' href={'https://maps.google.com/?q=' + place.address}>
                            <div className='flex'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                </svg>
                                <span>
                                    {place.address}
                                </span>
                            </div>
                        </a>
                    </div>
                    <div className='grid gap-3 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden'>
                        <button onClick={() => setShowAllPhotos(true)} className='absolute top-24 z-10 right-2 bg-gray-300 p-3 rounded-2xl flex gap-1 transition-transform transform hover:scale-[1.05] duration-300'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>

                            <span>Show Photos </span>
                        </button>
                        <div>
                            {place.photos?.[0] && (
                                <div>
                                    <img onClick={() => setShowAllPhotos(true)} className='object-cover aspect-square cursor-pointer transition-transform transform hover:scale-[1.02] duration-300' src={"http://localhost:4000/uploads/" + place.photos?.[0]} alt="" />
                                </div>
                            )}
                        </div>
                        <div className='grid'>
                            {place.photos?.[1] && (
                                <img onClick={() => setShowAllPhotos(true)} className='object-cover aspect-square cursor-pointer transition-transform transform hover:scale-[1.02] duration-300' src={"http://localhost:4000/uploads/" + place.photos?.[1]} alt="" />
                            )}
                            <div className='overflow-hidden'>
                                {place.photos?.[2] && (
                                    <img onClick={() => setShowAllPhotos(true)} className='object-cover aspect-square relative top-3 cursor-pointer transition-transform transform hover:scale-[1.02] duration-300' src={"http://localhost:4000/uploads/" + place.photos?.[2]} alt="" />
                                )}
                            </div>
                        </div>

                    </div>
                    <div className='my-6 relative grid grid-cols-[2fr_1fr]'>
                        <div className='pr-10'>
                            <div className='flex items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                </svg>
                                <span className='text-2xl font-semibold'>
                                    {place.address}
                                </span>
                            </div>
                            <div className='h-4'></div>
                            <span>Single-day experience</span>
                            <hr className='border border-gray-300 mt-10 mb-7' />
                            <div className='flex items-center gap-2'>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7">
                                        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className='text-xl'>Hosting Volunteer</h3>
                                </div>
                            </div>
                            <h2 className='pl-9 pt-2 text-gray-700'>Expericed | obviously</h2>
                            <hr className='border border-gray-300 mt-7 mb-10' />
                            <div>
                                <h2 className='text-2xl font-semibold pb-7'>Description of {place.title}</h2>
                                <p className='leading-7 text-justify'>{place.description}</p>
                                <h2 className='text-2xl font-semibold pt-7 pb-7'>What you'll do here</h2>
                                <p className='leading-7 text-justify'>{place.description}</p>
                                <h2 className='text-2xl font-semibold pt-7 pb-7'>Perks offered in {place.title}</h2>
                                <div className='flex gap-5'>
                                    {place?.perks?.length > 0 && place.perks.map(p => (
                                        <p className=' bg-rose-500 font-semibold text-white rounded-xl p-4'>{p}</p>
                                    ))}
                                </div>
                            </div>
                            <hr className='border border-gray-300 mt-10 mb-10' />
                            <div>
                                <div>
                                    <h2 className='text-2xl font-semibold pb-7'>Meet your host</h2>
                                    <div className='w-[400px] h-[250px] rounded-3xl bg-gray-50 shadow-md shadow-gray-500 cursor-pointer transition-transform transform hover:scale-[1.05] duration-500 ease-in-out grid grid-cols-[2fr_1fr]'>
                                        <div className='flex flex-col p-5 justify-center text-center items-center'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-[90px]">
                                                <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                                            </svg>
                                            <h2 className='text-xl font-semibold'>Jublee</h2>
                                            <p className='font-semibold'>Host</p>
                                        </div>
                                        <div className='flex flex-col py-5 justify-center pr-3'>
                                            <h1 className='font-bold text-xl'>9</h1>
                                            <h3 className='font-semibold pb-2'>Reviews</h3>
                                            <hr className='border-gray-400 w-[90%] pb-2' />
                                            <div className='flex'>
                                                <h1 className='font-bold'>5</h1>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <h3 className='font-semibold pb-2'>Rating</h3>
                                            <hr className='border-gray-400 w-[90%] pb-2' />
                                            <h1 className='font-bold'>3</h1>
                                            <h3 className='font-semibold'>Months hosting</h3>
                                        </div>
                                    </div>
                                </div>
                                <hr className='border border-gray-300 mt-10 mb-7' />
                                <div className='flex flex-col gap-3'>
                                    <h1 className='text-2xl font-semibold'>Things to Know</h1>
                                    <h1 className='font-semibold'>The basics</h1>
                                    <p>check in after : {place.checkIn} : 00</p>
                                    <p>check out after : {place.checkOut.toString().length === 1 ? "0" + place.checkOut : place.checkOut} : 00</p>
                                    <p>{place.maxGuests} guests maximum</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='w-250px bg-gray-50 rounded-3xl shadow-md shadow-gray-500 p-8 sticky top-10'>
                                <h1>
                                    <span className='text-xl font-semibold pr-2'>₹{place.price}</span>
                                    night
                                </h1>
                                <div className='grid grid-cols-2 pt-5'>
                                    <div className='col-span-1 border border-gray-400 p-3 pt-5 pb-7 font-semibold text-md rounded-tl-lg'>
                                        <span className='text-sm font-bold'>CHECK-IN</span>
                                        <br />
                                        <input className='bg-gray-50 outline-none' type="date" onChange={(e) => setCheckindate(e.target.value)} />
                                    </div>
                                    <div className='col-span-1 border border-gray-400 p-3 pt-5 pb-7 font-semibold text-md rounded-tr-lg'>
                                        <span className='text-sm font-bold'>CHECK-OUT</span>
                                        <br />
                                        <input className='bg-gray-50 outline-none' type="date" onChange={(e) => setCheckoutdate(e.target.value)} />
                                    </div>
                                    <div className='col-span-2 border text-center border-gray-400 p-5 font-semibold text-md rounded-b-lg shrink'>
                                        <span className='text-sm font-bold'>GUESTS</span> <br />
                                        <input type="number" className='rounded-lg p-4 bg-gray-50 border border-black' placeholder={guests} onChange={(e) => setGuests(e.target.value)} name="" id="" />
                                    </div>
                                    {checkindate && checkoutdate && (
                                        <>
                                        <div className='col-span-2 border border-gray-400 mt-2 rounded-lg p-4'>
                                            <span className='font-semibold'>Number of nights : {differenceInCalendarDays(new Date(checkoutdate), new Date(checkindate))}</span>
                                        </div>
                                        <div className='col-span-2 border border-gray-400 mt-2 rounded-lg p-4 font-semibold' >
                                            {differenceInCalendarDays(new Date(checkoutdate), new Date(checkindate)) > 0 && (
                                                <span>Total price : ₹{differenceInCalendarDays(new Date(checkoutdate), new Date(checkindate)) * place.price}
                                                </span>
                                            )}
                                        </div>
                                        <div className='col-span-2 border border-gray-400 mt-2 rounded-lg p-4'>
                                            {differenceInCalendarDays(new Date(checkoutdate), new Date(checkindate)) > 0 && (
                                                <input type='text' placeholder='Your Name' value={name} onChange={(e) => setname(e.target.value)}/>
                                            )}
                                        </div>
                                        <div className='col-span-2 border border-gray-400 mt-2 rounded-lg p-4'>
                                            {differenceInCalendarDays(new Date(checkoutdate), new Date(checkindate)) > 0 && (
                                                <input type='tel' placeholder='Phone Number' onChange={(e) => setMobile(e.target.value)}/>
                                            )}
                                        </div>
                                        </>
                                        
                                    )}
                                </div>
                                <div className='py-5'>
                                    <button onClick={bookThisPlace} className='px-2 py-3 rounded-xl w-full bg-rose-500 text-white font-semibold'>Reserve</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SinglePlacePage
