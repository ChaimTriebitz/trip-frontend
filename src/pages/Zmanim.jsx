import { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { daysZmanim } from '../data/daysZmanim'
import { useGlobalState } from '../hooks/useGlobalState'
import { ACTIONS } from '../state'

export const Zmanim = () => {
   const {dispatch}=useGlobalState()
   const navigate = useNavigate()
   const { pathname } = useLocation()
   useEffect(() => {
      if (pathname === '/zmanim') navigate('1')
   }, [pathname])
   return (
      <div className='page zmanim'>
         <header>
            <Link onClick={() => dispatch({ type: ACTIONS.UPDATE_PAGE_NAME, payload: 'gallery' })} className='btn b2 neon-button' to='/images'>gallery</Link>
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
