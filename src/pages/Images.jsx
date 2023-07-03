import { useEffect, useRef, useState } from 'react';
import { useUpdateEffect } from '../hooks/useUpdateEffect'
import { schedule } from '../data/schedule';
import axios from 'axios'
import { svgs } from '../assets/svgs';
export const Images = () => {
   const galleryRef = useRef(null)
   const mainImgRef = useRef(null)
   const fileInputRef = useRef(null)
   const [image, setImage] = useState('')
   const [images, setImages] = useState([])
   const [uploadedImageUrl, setUploadedImageUrl] = useState('');

   useUpdateEffect(() => {
      console.log(image);
      uploadImage()
   }, [image])
   useUpdateEffect(() => {
      if (images.length === 0) return
      console.log(image);
      setImage(images[0])
   }, [images])

   useEffect(() => {
      fetchImages()
   }, [])

   const handleClick = (e) => {
      mainImgRef.current.src = e.target.src
      setImage(e.target.src)
      window.scrollTo({
         top: 0,
         behavior: "smooth"
      });
   }

   const uploadImage = () => {
      if (!image) {
         return;
      }

      const formData = new FormData();
      formData.append('image', image);

      axios.post('https://trip-back-end.onrender.com/api/images', formData, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      })
         .then((response) => {
            const imageUrl = response.data.imageUrl;
            setUploadedImageUrl(imageUrl);
            setImage(null);
         })
         .catch((error) => {
            console.error('Error uploading image:', error);
         });
   };

   const fetchImages = () => {
      const folderName = 'trip'
      const options = {
         params: {
            folder: folderName,
         },
      };
      axios.get('https://trip-back-end.onrender.com/api/images', options)
         .then((response) => {
            const fetchedImages = response.data.images;
            setImages(fetchedImages);
         })
         .catch((error) => {
            console.error('Error fetching images:', error);
         });
   };
   console.log(images);

   const handleDownload = (url) => {
      fetch(url)
         .then((response) => response.blob())
         .then((blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'image.jpg';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
         });
   };

   return (
      <div className='page images'>
         <main  >
            <img alt='gallery' src={uploadedImageUrl} ref={mainImgRef} onClick={() => handleDownload(image)} />
            <div className="btns">
               <button className='btn' onClick={() => fileInputRef.current.click()}>Upload Image {svgs.upload}</button>
               <button className='btn' onClick={() => handleDownload(uploadedImageUrl)}>download Image {svgs.download}</button>
            </div>
            <input
               ref={fileInputRef}

               type="file"
               name="file"
               id="image-uploader"
               accept='image/'
               onChange={(e) => setImage(e.target.files[0])}
               hidden
            />
         </main>
         <section className="gallery" ref={galleryRef}>
            {images.map((image) => (
               <img key={image._id} onClick={handleClick} src={image.secure_url} alt={image.filename} />
            ))}
         </section>
      </div>
   )
}
