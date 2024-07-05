import React, { useEffect, useState } from 'react';
import AccountNav from '../componenets/AccountNav';
import axios from 'axios';
import { differenceInCalendarDays, format } from "date-fns";
import { useNavigate } from 'react-router-dom';

function BookingPage() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/bookings').then((response) => {
      setBookings(response.data);
    });
  }, []);

  if (bookings.length === 0) {
    return (
      <div className='mx-auto mt-10 text-black font-bold text-2xl'>
        Please book some places to populate this place
      </div>
    );
  }

  function handleRedirect(ev, id) {
    ev.preventDefault();
    navigate(`/account/bookings/${id}`);
  }

  return (
    <>
      <AccountNav />
      <div className='mb-10'>
        {bookings.map((booking) => (
          <div
            key={booking._id}
            onClick={(ev) => handleRedirect(ev, booking._id)}
            className='w-[60%] mx-auto bg-gray-200 rounded-2xl mb-10 shadow-lg transition-transform transform hover:scale-[1.03] duration:300 cursor-pointer p-4'
          >
            <div className='flex gap-4'>
              <div className='h-[100%] w-48'>
                {booking.place?.photos.length > 0 && (
                  <img src={"http://localhost:4000/uploads/" + booking.place.photos[0]} alt="" className='rounded-2xl' />
                )}
              </div>
              <div>
                <div className='text-xl font-semibold'>
                  {booking.place.title}
                </div>
                <div className='text-gray-600 text-md pt-2'>
                  {booking.place.address}
                </div>
                <div className='flex gap-3 py-2 text-gray-600'>
                  <div className='flex gap-1 items-center text-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                    </svg>
                    {format(new Date(booking.checkin), "yyyy,MM,dd")}
                  </div>
                  <div>
                    &rarr;
                  </div>
                  <div className='flex gap-1 items-center text-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                    </svg>
                    {format(new Date(booking.checkout), "yyyy-MM-dd")}
                  </div>
                </div>
                <div className='text-gray-600 flex gap-1 pl-1'>
                  <div>
                    {differenceInCalendarDays(new Date(booking.checkout), new Date(booking.checkin))}
                  </div>
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                      <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>(nights)</div>
                </div>
                <div className='text-gray-600 pt-2 pl-1'>
                  ₹{booking.price}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default BookingPage;
