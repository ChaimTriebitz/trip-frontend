import { Routes, Route } from 'react-router-dom'
import { ScheduleDay, NavBar, ZmanimDay } from './cmps';
import { Games, Home, Images, Schedule, Zmanim } from './pages';


function App(){
   document.title = "50 Anniversary";



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
