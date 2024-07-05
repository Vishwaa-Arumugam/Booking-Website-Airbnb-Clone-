import React, { useEffect, useState } from 'react'
import Header from '../componenets/Header'
import axios from 'axios';
import { Link } from 'react-router-dom';

function Indexpage() {


  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/index-places').then(response => {
      setPlaces([...response.data]);
    })
  }, [])

  return (
    <>
      <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-8 mt-16 w-[93%] mx-auto'>
        {places.length > 0 && places.map(place => (
          <Link to={'/place/' + place._id} key={place._id} className='cursor-pointer'>
            {place.photos?.[0] && (
              <img src={"http://localhost:4000/uploads/" + place.photos?.[0]} alt="" className='object-cover aspect-square rounded-2xl shadow-2xl transition-transform transform hover:scale-[1.05] duration-400' />
            )}
            <div className='pl-2 pt-3'>
              <h2 className='font-bold'>{place.title}</h2>
              <h3 className='text-gray-500 text-sm'>{place.address}</h3>
              <p className='cursor-default'>
                <span className='pr-1 font-bold'>
                  ${place.price}</span>/ per night
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

export default Indexpage
