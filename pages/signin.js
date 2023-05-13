import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useSession, useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

const Entrar = () => {
  const router = useRouter();
  const session = useSession()
  const supabase = useSupabaseClient()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500) // Adjust the delay as needed
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session]);

  return (
    <>  
        <div className="container" style={{ borderRadius: '5px', padding: '2rem', backgroundColor: 'white', maxWidth: '480px', margin: '60px auto' }}>
        <img src="https://user-images.githubusercontent.com/6923650/229231388-8116e682-a217-40d1-a953-4afb544d32f4.jpg" width="45"/>
        <h2>Entra em Outono.org</h2>
        <p style={{ color: 'gray' }}>Somos programadores e designers cometidos a aprender e a partilhar conhecimento.</p>
        <p style={{ color: 'gray' }}>Nesta plataforma podes encontrar pessoas que partilham os teus interesses e com quem podes colaborar.</p>

        {loading ? (
          'Loading...'
        ) : (
          <>
            <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          style: {
            button: {
              borderRadius: "24px",
            },
          },
          variables: {
            default: {
              colors: {
                brand: "#FFEB8A",
                brandAccent: '#FFEB8A',
                brandButtonText: 'black',
              },
              space: {
                inputPadding: '15px 15px',
                socialAuthSpacing: '40px',
              }
            },
          },
        }}
        providers={['google', 'github']}
        socialLayout
        />
          </>
        )}
        </div>
    </>
  )
}

export default Entrar;