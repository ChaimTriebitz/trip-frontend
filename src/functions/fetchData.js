export const fetchData = async () => {
   const response = await fetch('/api/schedules')
   const json = await response.json()

   if (response.ok) {

   }
}
