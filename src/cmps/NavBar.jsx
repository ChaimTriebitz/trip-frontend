import { Link, NavLink, useLocation } from "react-router-dom";
import { svgs } from '../assets/svgs';
import { useState } from 'react';
import { useGlobalState } from '../hooks/useGlobalState'
import { ACTIONS } from '../state';

const pages = [
   { name: 'home', link: '/' },
   { name: 'schedule', link: '/schedule' },
   { name: 'zmanim', link: '/zmanim' },
   { name: 'gallery', link: '/images' },
   { name: 'games', link: '/games' },
];
export const NavBar = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false)
   const { page, dispatch } = useGlobalState()
   const { search, pathname } = useLocation()
   console.log(page);
   const handleNavigation = (pageName) => {
      dispatch({ type: ACTIONS.UPDATE_PAGE_NAME, payload: pageName })
      setIsMenuOpen(false)
   }
   return (
      <div className='nav-bar'>
         <section className='logo-section' >
            <Link to='/'>

            </Link>
         </section>
         <h1 className='wave'>{page}</h1>
         <h1 className='wave'>{page}</h1>
         <section className={isMenuOpen ? 'nav open' : 'nav'}>
            {
               pages.map(page =>
                  <NavLink onClick={() => handleNavigation(page.name)} key={page.name} to={pathname === page.link ? page.link + search : page.link}>{page.name}</NavLink>
               )
            }
         </section>
         <section className='hamburger-section'>
            <button onClick={() => setIsMenuOpen(prev => !prev)}>
               {svgs.hamburger}
            </button>
         </section>
      </div >
   )
}





