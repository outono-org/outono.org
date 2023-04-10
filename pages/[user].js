import { withAuth } from '../utils/withAuth';
import React, { useState, useEffect } from 'react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import Profile from '../components/Profile';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navigation from '../components/Navigation';

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
    <Head>
      <title>{ user } | Outono</title>
    </Head>
        <div className='flex' style={{height: '100%'}}>
        <Navigation/>
        <main className="container" style={{ height: '100vh', backgroundColor: 'white', padding: '2rem', margin: '0px auto', float: 'right', overflowY: 'auto' }}>
          
        <Profile session={session} username={user} />
        </main>
        </div>
        </>
      )};

export const getServerSideProps = withAuth();

export default Home;