import { CSSTransition } from 'react-transition-group';
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

  const [isVisible, setIsVisible] = useState(false);

  const session = useSession()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false);
  }, [session, user])

  
  useEffect(() => {
    if (user) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [user]);

  useEffect(() => {
    const handleRouteChange = () => {
      setIsVisible(false);
    };
  
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);
  

  return (
    <>
    <Head>
      <title>{ user } | Outono</title>
    </Head>
        <div className='globalContainer'>
        <Navigation/>
        <main className="container" style={{ height: '100vh', backgroundColor: 'white', padding: '2rem', overflowY: 'auto' }}>
        
        <CSSTransition
        in={isVisible}
        timeout={300}
        classNames="page-transition"
        unmountOnExit
        >
          <Profile session={session} username={user} />
        </CSSTransition>
        </main>
        </div>
        </>
      )};

export const getServerSideProps = withAuth();

export default Home;