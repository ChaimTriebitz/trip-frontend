import { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { schedule } from '../data/schedule'
import axios from 'axios'
import { ACTIONS } from '../state'
import { useGlobalState } from '../hooks/useGlobalState'

export const Schedule = () => {
   const { dispatch } = useGlobalState()
   const navigate = useNavigate()
   const { pathname } = useLocation()
   // UPDATE SCHEDULE
   // const handlePostSchedule = () => {
   //    axios.post('https://trip-back-end-2.onrender.com/api/schedules', schedule)
   //       .then((response) => response.json())
   //       .catch((error) => console.error(error));
   // }
   useEffect(() => {
      if (pathname === '/schedule') navigate('1')
   }, [pathname])

   return (
      <div className='page schedule'>
         <header>
            <Link onClick={() => dispatch({ type: ACTIONS.UPDATE_PAGE_NAME, payload: 'gallery' })} className='btn b2 neon-button' to='/images'>Gallery</Link>

         </header>
         <nav className='nav'>
            {
               schedule.map((day, i) =>
                  <NavLink key={i} className='btn b1' to={`${day.day}`}>{`day ${day.day}`}</NavLink>
               )
            }
         </nav>
         {/* <button onClick={handlePostSchedule}>post schedule</button> */}
         <Outlet />
      </div>
   )
}
