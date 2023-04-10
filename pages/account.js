import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import React from 'react'
import { useSession } from '@supabase/auth-helpers-react'
import Account from '../components/Account'

const Settings = () => {
  const session = useSession();

  return (
    <>
        <div className="container" style={{ borderRadius: '5px', backgroundColor: 'white', padding: '2rem', margin: '60px auto' }}>
          <h2>Settings</h2>
          <p style={{ lineHeight: '1.4', color: 'gray' }}>Obrigado por estares aqui. Ainda estou a avaliar os próximos passos e em breve voltarei a dar um toque.</p>
          {session ? <Account session={session} /> : <p>Loading...</p>}
        </div>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx)
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session)
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }

  // Run queries with RLS on the server
  const { data } = await supabase.from('users').select('*')

  return {
    props: {
      initialSession: session,
      user: session.user,
      data: data ?? [],
    },
  }
};

export default Settings;