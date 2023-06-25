export const dates = {
   getHourAndMinutes
}
function getHourAndMinutes(dateTimeString) {
   if (!dateTimeString) return null
   const dateTime = new Date(dateTimeString);
   const formattedTime = dateTime.toLocaleTimeString('en-CH', {
      hour: 'numeric',
      minute: 'numeric',
   });

   return formattedTime;
}
