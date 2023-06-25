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

   useUpdateEffect(() => {
      console.log(image);
      uploadImage()
   }, [image])
   useUpdateEffect(() => {
      if (images.length === 0) return
      console.log(image);
      setImage(`https://trip-back-end-2.onrender.com/${images[0].path.replace(/\\/g, '/')}`)
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
      const formData = new FormData();
      formData.append('image', image);

      axios.post('https://trip-back-end-2.onrender.com/api/images', formData)
         .then((res) => {
            fetchImages()
         })
         .catch((err) => {
            console.log(err);
         });
   };

   const fetchImages = () => {
      axios.get('https://trip-back-end-2.onrender.com/api/images')
         .then((res) => {
            res.data.sort((a, b) => {
               const timestampA = parseInt(a.filename.split("--")[0]);
               const timestampB = parseInt(b.filename.split("--")[0]);

               if (timestampA > timestampB) {
                  return -1;
               } else if (timestampA < timestampB) {
                  return 1;
               } else {
                  return 0;
               }
            });
            setImages(res.data);
         })
         .catch((err) => {
            console.log(err);
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
            <img alt='gallery' src={image} ref={mainImgRef} onClick={() => handleDownload(image)} />
            <div className="btns">
               <button className='btn' onClick={() => fileInputRef.current.click()}>Upload Image {svgs.upload}</button>
               <button className='btn' onClick={() => handleDownload(image)}>download Image {svgs.download}</button>
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
               <img key={image._id} onClick={handleClick} src={`https://trip-back-end-2.onrender.com/${image.path.replace(/\\/g, '/')}`} alt={image.filename} />
            ))}
         </section>
      </div>
   )
}
