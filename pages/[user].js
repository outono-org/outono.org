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
          <>
          <Profile session={session} username={user} />
          <h2>Contéudo Recomendado</h2>
          <article className='testLinkCard'>
            <h3>How a designer makes background patterns to push her creativity</h3>
            <p>We came across Namika Hamasaki's work on her Dribbble portfolio while collecting inspiration from daily UI challenges. Designers are attracted to daily UI challenges because they provide a creative exercise without the constraints of client or management expectations. </p>
          </article>
          <br/>
          <article className='testLinkCard'>
            <h3>Using higher-order functions to build per-page layouts in Next.js</h3>
            <p> We can instead use a higher-order function to build our page layouts. A higher-order function is a function that either takes in functions as arguments or returns them as a result. We can create a higher-order function that takes a say, a layout name, and returns a function similar to getLayout that wraps our component. </p>
          </article>
          <br/>
          <article className='testLinkCard'>
            <h3>The True Value of Your Time</h3>
            <p>practicetrumpstheory.com</p>
          </article>
          </>
        </CSSTransition>
        </main>
        </div>
        </>
      )};

export const getServerSideProps = withAuth();

export default Home;