import { useParams } from 'react-router-dom'
import { dates } from '../functions/dates'
import { schedule } from '../data/schedule'

export const ScheduleDay = () => {
   const { schedule_day } = useParams()
   const currScheduleDay = schedule.find(d => +d.day === +schedule_day)
   return (
      <div className='schedule-day'>
         {
            currScheduleDay.schedule.map((activaty, i) =>
               <section key={i} className='activaty'>
                  <h2>{activaty.time || '⏳'}</h2>
                  <h6>{activaty.info}</h6>
                  <a key={activaty.link.link} href={activaty.link.link}>{activaty.link.name}</a>
               </section>
            )
         }
      </div>
   )
}
