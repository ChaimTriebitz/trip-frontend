import { useState, useEffect } from 'react';

export const useFetch = (url) => {
   const [isLoading, setIsLoading] = useState(false);
   const [isError, setIsError] = useState(false);
   const [data, setData] = useState(null);

   useEffect(() => {
      // const abortController = new AbortController();
      const fetchData = async () => {
         setIsLoading(true);
         try {
            const response = await fetch(
               url,
               {
                  headers: {
                     tok: localStorage.tok,
                     'Content-Type': "application/json",
                     Accept: "application/json",
                  },
                  method: 'GET',
                  redirect: 'follow',
                  // signal: abortController.signal
               }
            );
            if (!response.ok) {
               throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setData(result);
         } catch (error) {
            setIsError(true);
         } finally {
            setIsLoading(false);
         }
      };
      fetchData();
      // return () => {
      //    abortController.abort();
      // };
   }, [url]);
   return { isLoading, isError, data };
};

export default useFetch;
