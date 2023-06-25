import { useEffect, useRef } from 'react';

export function useBlur(callback) {
   const ref = useRef(null);

   const handleBlur = (event) => {
      if (ref.current && !ref.current.contains(event.target) && !event.target.dataset.blur) {
         callback();
      }
   };

   useEffect(() => {
      document.addEventListener('mousedown', handleBlur);
      return () => {
         document.removeEventListener('mousedown', handleBlur);
      };
   }, []);

   return ref;
};