import { Link } from 'react-router-dom'
import { useGlobalState } from '../hooks/useGlobalState'
import { ACTIONS } from '../state'
import { Helmet } from 'react-helmet'

export const Home = () => {
   const { dispatch } = useGlobalState()

   return (
      <div className='page home'>
         <header>
            <h2>Welcome to the 50<sup>th</sup> Anniversary Celebration</h2>
            <h2>Arosa Switzerland 2023</h2>
            <Link onClick={() => dispatch({ type: ACTIONS.UPDATE_PAGE_NAME, payload: 'schedule' })} className='btn b2 neon-button' to='/schedule'>Schedule</Link>
         </header>
         <main>
            <Helmet>
               {/* Google AdSense code */}
               <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1412016253753525" crossorigin="anonymous"></script>
               <ins className="adsbygoogle"
                  style={{ display: 'block' }}
                  data-ad-client="ca-pub-1412016253753525"
                  data-ad-slot="1333997469"
                  data-ad-format="auto"
                  data-full-width-responsive="true">
               </ins>
               <script>
                  {(adsbygoogle = window.adsbygoogle || []).push({})}
               </script>
            </Helmet>
            <section className="links">
               <div className="link">
                  <a href="http://www.irgz.ch/downloads/koscherliste_aktuell.pdf">Kosher Food List</a>
               </div>
               <div className="link">
                  <a href="https://www.sbb.ch/en">Train Map & Schedule</a>

               </div>
            </section>
            <section className='tefilat-haderech'>
               <h1>תפילת הדרך</h1>
               <p>
                  יְהִי רָצוֹן מִלְּפָנֶיךָ יְהֹוָה אֱלֹהֵנוּ וֵאֱלֹהֵי אֲבוֹתֵינוּ, שֶׁתּוֹלִיכֵנוּ לְשָׁלוֹם וְתַצְעִידֵנוּ לְשָׁלוֹם, וְתִסְמְכֵנוּ לְשָׁלוֹם, וְתַנְחֵנוּ אֶל מְחוֹז חֶפְצֵנוּ לְחַיִּים וְלְשִּׂמְחָה ולְשָּׁלוֹם. (ואם דעתו לחזור באותו יום - אומר: וְתַחְזִירֵנוּ לְשָׁלוֹם) וְתַצִּילֵנוּ מִכַּף כׇּל אוֹיֵב וְאוֹרֵב בַּדֶּרֶךְ וּמִכׇּל מִינֵי פֻּרְעָנֻיּוֹת הַמִּתְרַגְּשׁוֹת לָבוֹא לָעוֹלָם, וְתִשְׁלַח בְּרָכָה בְּמַעֲשֵׂה יָדֵינוּ. וְתִתְנְנוֹ לְחֵן וּלְחֶסֶד וּלְרַחֲמִים בְּעֵינֶיךָ וּבְעֵינֵי כׇּל רוֹאֵינוּ, וְתִשְׁמַע קוֹל תַּחֲנוּנֵינוּ. כִּי אֵל שׁוֹמֵעַ תְּפִלָּה וְתַחֲנוּן אַתָּה. בָּרוּךְ אַתָּה יְהֹוָה שׁוֹמֵעַ תְּפִלָּה.
               </p>
            </section>
            <section className='map'>
               <h2 >MAP</h2>
               <iframe title='aroza' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2732.202714644678!2d9.679777099999999!3d46.7806098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4784bcf221daaaab%3A0x833d9a6623e1625f!2sBelmont%20Arosa!5e0!3m2!1sen!2sil!4v1687206476696!5m2!1sen!2sil"
                  width="100%"
                  height="500px"
                  allowFullScreen=""
                  loading="lazy"
                  style={{ border: "0" }}
                  referrerPolicy="no-referrer-when-downgrade">
               </iframe>

            </section>
         </main>
      </div>
   )
}
