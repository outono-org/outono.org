import React, { useState, useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '../components/Account'

const Home = () => {
  const session = useSession()
  const supabase = useSupabaseClient()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500) // Adjust the delay as needed
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {!session ? (
        
        <div className="container" style={{ borderRadius: '5px', padding: '2rem', backgroundColor: 'white', maxWidth: '480px', margin: '60px auto' }}>
        <img src="https://user-images.githubusercontent.com/6923650/229231388-8116e682-a217-40d1-a953-4afb544d32f4.jpg" width="45"/>
        <h2>Entra em Outono.org</h2>
        <p style={{ lineHeight: '1.4', color: 'gray' }}>Somos empreendedores, programadores e designers cometidos a partilhar conhecimento com uma nova geração.</p>

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
      ) : (
        <div className="container" style={{ borderRadius: '5px', backgroundColor: 'white', padding: '2rem', margin: '60px auto' }}>
          <h2>Settings</h2>
          <p style={{ lineHeight: '1.4', color: 'gray' }}>Obrigado por estares aqui. Ainda estou a avaliar os próximos passos e em breve voltarei a dar um toque.</p>
          <Account session={session} />
        </div>
      )}
    </>
  )
}

export default Home