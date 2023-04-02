import React, { useState, useEffect } from 'react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Profile from '../components/Profile'
import { useRouter } from 'next/router'

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
        <div className="container" style={{ height: '100vh', backgroundColor: 'white', padding: '2rem', margin: '0px auto', float: 'right' }}>
          
          <Profile session={session} username={user} />
        </div>
      )}
    </>
  )
}

export default Home