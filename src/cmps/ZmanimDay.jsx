import { useParams } from 'react-router-dom'
import { daysZmanim } from '../data/daysZmanim'
export const ZmanimDay = () => {
   const { zmanim_day } = useParams()
   const { zmanim } = daysZmanim.find(d => +d.day === +zmanim_day)
   return (
      <div className='zmanim-day'>
         <section>
            <h6>{zmanim.netz}</h6>
            <h2>נץ</h2>
         </section>
         <section>
            <h6>{zmanim.szkshmga}</h6>
            <h2>סוף זמן קריאת שמע מ"א</h2>
         </section>
         <section>
            <h6>{zmanim.szkshgra}</h6>
            <h2>סוף זמן קריאת שמע הגר"א</h2>
         </section>
         <section>
            <h6>{zmanim.sztmga}</h6>
            <h2>סוף זמן תפילה מ"א</h2>
         </section>
         <section>
            <h6>{zmanim.sztgra}</h6>
            <h2>סוף זמן תפילה הגר"א</h2>
         </section>
         <section>
            <h6>{zmanim.chatzot}</h6>
            <h2>חצות</h2>
         </section>
         <section>
            <h6>{zmanim.shkiah}</h6>
            <h2>שקיעה</h2>
         </section>
         <section>
            <h6>{zmanim.tzethacochavim}</h6>
            <h2>צאת הכוכבים</h2>
         </section>
      </div>
   )
}
