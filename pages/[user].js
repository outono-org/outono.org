import React, { useState, useEffect } from 'react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Profile from '../components/Profile'
import { useRouter } from 'next/router'
import UserCards from '../components/UserCards'

const Home = () => {
  const supabase = useSupabaseClient()
  const router = useRouter()
  const { user } = router.query

  const session = useSession()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false);
  }, [session, user])

  return (
    <>
      {!session || !user ? (
        <></>
      ) : (
        <div className='flex' style={{height: '100%'}}>
          <div style={{backgroundColor: 'white', width: '30%', borderRight: '1px solid #eaeaea', overflowY: 'scroll', overflowX: 'hidden' }}>
            <img style={{ position: 'relative', left: '20px', top: '20px'}} src="https://user-images.githubusercontent.com/6923650/229231388-8116e682-a217-40d1-a953-4afb544d32f4.jpg" width="45"/>
            <h2 style={{ position: 'relative', left: '20px', top: '20px'}}>Directório</h2>
            <p style={{position: 'relative', left: '20px', lineHeight:' 1.4', color: 'gray', marginRight: '20px'}}>Somos empreendedores, programadores e designers cometidos a partilhar conhecimento com uma nova geração.</p>
            <UserCards/>
          </div>
        <div className="container" style={{ height: '100vh', backgroundColor: 'white', padding: '2rem', margin: '0px auto', float: 'right', overflowY: 'auto' }}>
          
          <Profile session={session} username={user} />
        </div>
        </div>
      )}
    </>
  )
}

export default Home