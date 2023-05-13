import { withAuth } from '../utils/withAuth';
import React from 'react'
import { useSession } from '@supabase/auth-helpers-react'
import Account from '../components/Account'

const Settings = () => {
  const session = useSession();

  return (
    <>
        <div className="container" style={{ borderRadius: '5px', backgroundColor: 'white', padding: '2rem', margin: '60px auto' }}>
          <h2>Settings</h2>
          <p style={{ lineHeight: '1.4', color: 'gray' }}>O acesso à plataforma ainda é limitado e por convite mas já podes prencher o teu perfil e criar um username. Até logo.</p>
          {session ? <Account session={session} /> : <p>Loading...</p>}
        </div>
    </>
  );
};

export const getServerSideProps = withAuth();
export default Settings;