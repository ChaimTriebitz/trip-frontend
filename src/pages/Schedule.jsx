import { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { schedule } from '../data/schedule'
import { ACTIONS } from '../state'
import { useGlobalState } from '../hooks/useGlobalState'

export const Schedule = () => {
   const { dispatch } = useGlobalState()
   const navigate = useNavigate()
   const { pathname } = useLocation()
   useEffect(() => {
      if (pathname === '/schedule') navigate('1')
   }, [pathname])

   return (
      <div className='page schedule'>
         <header>
         </header>
         <nav className='nav'>
            {
               schedule.map((day, i) =>
                  <NavLink key={i} className='btn b1' to={`${day.day}`}>{`day ${day.day}`}</NavLink>
               )
            }
         </nav>
         <Outlet />
      </div>
   )
}
