import React from 'react'
import { useState } from 'react';
import axios from 'axios';

function UploadPhotos({ addedPhotos, setAddedPhotos }) {

    const [photoLink, setPhotoLink] = useState('');

    async function uploadByLink(e) {
        e.preventDefault();
        console.log(photoLink);
        const res = await axios.post('/upload-by-link', {
            link: photoLink
        })
        console.log(res);
        setAddedPhotos(prev => {
            return [...prev, res.data]
        })
        setPhotoLink('');
    };
    // console.log(addedPhotos);

    async function uploadPhotoDevice(ev) {
        const files = ev.target.files;
        console.log({ files });
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i])
        }
        const response = await axios.post('/upload', data, {
            headers: { 'Content-type': 'multipart/form-data' }
        })
        setAddedPhotos(prev => {
            return [...prev, ...response.data]
        })
    }

    function deletePhoto(link) {
        setAddedPhotos([...addedPhotos.filter((photo) => photo !== link)])
    }

    function favPhotoFirst(item) {
        setAddedPhotos([item, ...addedPhotos.filter((photo) => photo !== item)])
    }

    return (
        <>
            <div className='flex w-auto gap-2 items-center'>
                <input type="text" value={photoLink} onChange={(e) => setPhotoLink(e.target.value)} placeholder='title of the place -- e.g:maldives...' />
                <button onClick={uploadByLink} className='bg-rose-500 w-48 rounded-xl text-white h-11'>Add Photo</button>
            </div>
            <div className='grid grid-cols-3 mt-2 md:grid-cols-4 lg:grid-cols-6'>
                {addedPhotos.length > 0 ? addedPhotos.map((item, index) => {
                    return <div key={index} className='h-40 w-40 mt-2 mb-2 relative'>
                        <button type='button' onClick={() => deletePhoto(item)} className='absolute bottom-1 right-1 text-white bg-black bg-opacity-60 px-2 py-2 rounded-2xl'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </button>
                        <button type='button' onClick={() => favPhotoFirst(item)} className='absolute bottom-1 left-1 text-white bg-black bg-opacity-60 px-2 py-2 rounded-2xl'>
                            {item == addedPhotos[0] ?
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                </svg>
                            }

                        </button>
                        <img className='rounded-2xl h-[100%] w-[100%] object-cover' src={'http://localhost:4000/uploads/' + item} key={index} alt="" />
                    </div>
                }) : ''}

                <label className='flex gap-1 h-40 w-40 mt-2 justify-center bg-transparent border border-gray-500 rounded-2xl px-7 items-center text-xl cursor-pointer'>
                    <input multiple type="file" className='hidden' onChange={uploadPhotoDevice} />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-20">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                    </svg>
                    Upload
                </label>
            </div>
        </>
    )
}

export default UploadPhotos
