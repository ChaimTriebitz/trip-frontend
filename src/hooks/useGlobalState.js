import { useContext } from 'react'
import { Context } from '../state'

/**
 * @returns {object} { 
 *       dispatch ,
 *       actions,
 *       headers ,
 *       data ,
 *       dialog ,
 *       dropdown ,
 *       fields ,
 *       search ,
 *       sortBy ,
 *       stats ,
 *       pageNumber ,
 *       numOfRows ,
 * }
 */

export const useGlobalState = () => {
   const context = useContext(Context)
   return context
}

