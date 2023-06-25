import { useEffect } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { daysZmanim } from '../data/daysZmanim'

export const Zmanim = () => {
   const navigate = useNavigate()
   const { pathname } = useLocation()
   useEffect(() => {
      if (pathname === '/zmanim') navigate('1')
   }, [pathname])
   return (
      <div className='page zmanim'>
         <header>

         </header>
         <nav className='nav'>
            {
               daysZmanim.map((day, i) =>
                     <NavLink key={i} className='btn b1' to={`${day.day}`}>{`day ${day.day}`}</NavLink>
               )
            }
         </nav>
         <Outlet />
      </div>
   )
}
