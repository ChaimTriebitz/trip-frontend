import { useEffect, useRef, useState } from 'react';
import axios from 'axios'
import { Image } from 'cloudinary-react';
import { svgs } from '../assets/svgs';
export const Images = () => {
   const galleryRef = useRef(null)
   const mainImgRef = useRef(null)
   const fileInputRef = useRef(null)
   const [isLoading, setIsLoading] = useState(true)
   const [imageIds, setImageIds] = useState();


   useEffect(() => {
      loadImages()
      // fetchImages()
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
            loadImages()
         })
         .catch((error) => {
            console.error('Error uploading image:', error);
         });
   };

   const loadImages = async () => {
      try {
         const res = await fetch('http://localhost:4001/api/images');
         const data = await res.json();
         setImageIds(data);
         mainImgRef.current.src = data[0].url
      } catch (err) {
         console.error(err, 'kkkk');
      }
   };


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
            {imageIds && imageIds.map((image) => (
               <img key={image.asset_id} onClick={handleClick} src={image.url} alt={'trip'} />
            ))}
            {/* {images.map((image) => (
               <img key={image._id} onClick={handleClick} src={image.secure_url} alt={image.filename} />
            ))} */}
            {/* {imageIds &&
                    imageIds.map((imageId, index) => (
                        <Image
                            key={index}
                            cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                            publicId={imageId}
                            width="300"
                            crop="scale"
                        />
                    ))} */}
         </section>
      </div>
   )
}
