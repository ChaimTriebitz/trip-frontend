// import { format } from 'date-fns'

export const formatData = {
   sortData,
   filterData,
   sliceData,
   formatAll,
}

const DATE_FORMAT = 'yyyy-MM-dd'
const DATE_KEY = 'date_of_birth'

function formatAll(arr, numOfObjects, pageNumber, sortBy, filter) {
   if (!arr || !arr.length) return
   return sliceData(filterData(sortData(arr, sortBy), filter), numOfObjects, pageNumber)
}

function sortData(arr, sortBy) {
   return [...arr].sort((a, b) => {
      if (typeof a[sortBy] === 'number' && typeof b[sortBy] === 'number') {
         return a[sortBy] - b[sortBy]
      } else if (typeof a[sortBy] === 'string' && typeof b[sortBy] === 'string') {
         return a[sortBy].localeCompare(b[sortBy])
      } else {
         return 0
      }
   })
}

function filterData(arr = [], filter) {

   if (arr.length === 0) return
   return [...arr].filter(obj =>
      Object.entries(obj).some(([key, val]) => {
         if (key === 'logo_url' || key === 'date_of_birth' || !val) return false
         else if (typeof val === 'string') {
            return val.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
         } else {
            return val.toString().includes(filter)
         }
      }
      )
   );
}

function sliceData(arr, numOfObjects, pageNumber) {
   if (!pageNumber) return arr
   return arr.slice((pageNumber - 1) * numOfObjects, pageNumber * numOfObjects)
}

// function dateFormat(arr, key, formatBy) {
//    return arr.map(person => {
//       return {
//          ...person,
//          [key]: format(new Date(person.date_of_birth), formatBy)
//       }
//    })
// }










