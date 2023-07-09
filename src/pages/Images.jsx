import { useEffect, useRef, useState } from 'react';
import axios from 'axios'
import { svgs } from '../assets/svgs';
export const Images = () => {
   const galleryRef = useRef(null)
   const mainImgRef = useRef(null)
   const fileInputRef = useRef(null)
   const [images, setImages] = useState([])
   const [isLoading, setIsLoading] = useState(true)


   useEffect(() => {
      fetchImages()
   }, [])

   const handleClick = (e) => {
      mainImgRef.current.src = e.target.src
      window.scrollTo({
         top: 0,
         behavior: "smooth"
      });
   }

   const handleUploadImage = (e) => {
      setIsLoading(true)
      const img = e.target.files[0]

      const formData = new FormData();
      formData.append('image', img);

      axios.post('https://trip-back-end.onrender.com/api/images', formData, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      })
         .then((response) => {
            const imageUrl = response.data.imageUrl;
            mainImgRef.current.src = imageUrl
            fetchImages()
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
            const newImages = fetchedImages.sort(compareCreatedAt);
            setImages(newImages)
            mainImgRef.current.src = newImages[0].url
         })
         .catch((error) => {
            console.error('Error fetching images:', error);
         })
         .finally(() => setIsLoading(false))
   };
   function compareCreatedAt(a, b) {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);

      return dateB - dateA;
   }
   const handleDownload = () => {
      fetch(mainImgRef.current.src)
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
         {isLoading && <div className="loader"></div>}
         <main  >
            <img alt='gallery' ref={mainImgRef} />
            <div className="btns">
               <button className='btn' onClick={() => fileInputRef.current.click()}>Upload Image {svgs.upload}</button>
               <button className='btn' onClick={handleDownload}>download Image {svgs.download}</button>
            </div>
            <input
               ref={fileInputRef}

               type="file"
               name="file"
               id="image-uploader"
               accept='image/'
               onChange={handleUploadImage}
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
