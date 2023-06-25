import { Routes, Route } from 'react-router-dom'
import { ScheduleDay, NavBar, ZmanimDay } from './cmps';
import { Games, Home, Images, Schedule, Zmanim } from './pages';
import { useEffect, useState } from 'react'
import { useGlobalState } from './hooks/useGlobalState';
import { ACTIONS } from './state';

function App() {
   const { dispatch, data } = useGlobalState()
   const [image, setImage] = useState('')


   return (
      <div className="App">
         {/* <Msg /> */}
         <NavBar />
         <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/images' element={<Images />} />
            <Route path='/games' element={<Games />} />

            {/* <Route path='login' element={<Login />} /> */}
            <Route path='/schedule' element={<Schedule />} >
               <Route path='/schedule/:schedule_day' element={<ScheduleDay />} />
            </Route>
            <Route path='/zmanim' element={<Zmanim />} >
               <Route path='/zmanim/:zmanim_day' element={<ZmanimDay />} />
            </Route>

         </Routes>
      </div>
   );
}

export default App;
