import { withAuth } from '../utils/withAuth';
import React, { useState, useEffect } from 'react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Profile from '../components/Profile'
import { useRouter } from 'next/router'
import UserCards from '../components/UserCards'
import Image from 'next/image'

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
          <nav className='peopleNav' style={{backgroundColor: 'white', width: '30%', borderRight: '1px solid #eaeaea', overflowY: 'scroll', overflowX: 'hidden' }}>
            <div className='navHeader'>
              <Image className='logo' src="/logo.jpg" width="48" height="48" quality="100" alt='Logo of Outono'/>
           
              <h2 style={{ position: 'relative', left: '20px', top: '20px'}}>Directório</h2>
              <p style={{position: 'relative', left: '20px', lineHeight:' 1.4', color: 'gray', marginRight: '20px'}}>Somos empreendedores, programadores e designers cometidos a partilhar conhecimento com uma nova geração.</p>
            </div>
            <UserCards/>
          </nav>
        <main className="container" style={{ height: '100vh', backgroundColor: 'white', padding: '2rem', margin: '0px auto', float: 'right', overflowY: 'auto' }}>
          
          <Profile session={session} username={user} />
        </main>
        </div>
      )}
    </>
  )
};

export const getServerSideProps = withAuth();

export default Home;