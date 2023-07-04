import { useState } from 'react';
import floppybirdImage from '../assets/imgs/background-1.jpg';
import doodlejumpImage from '../assets/imgs/doodlejump.jpg';
import { Doodlejump, Floppybird } from '../cmps';


export const Games = () => {
   const [currGame, setCurrGame] = useState('')
   return (
      <div className="games">
         <nav>
            <button onClick={() => setCurrGame('floppybird')}>
               <img src={floppybirdImage} alt="floppybird" />
            </button>
            <button onClick={() => setCurrGame('doodlejump')}>
               <img src={doodlejumpImage} alt="doodlejump" />
            </button>
         </nav>


         {currGame === 'floppybird' && <Floppybird />}
         {currGame === 'doodlejump' && <Doodlejump />}
      </div>
   )
};
