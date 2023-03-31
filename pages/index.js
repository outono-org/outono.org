import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

const Home = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <div className="container" style={{ borderRadius: '5px', padding: '2rem', backgroundColor: 'white', maxWidth: '420px', margin: '96px auto' }}>
      <img src="https://user-images.githubusercontent.com/6923650/229231388-8116e682-a217-40d1-a953-4afb544d32f4.jpg" width="45"/>
      <h2>Entra em Outono.org</h2>
      <p>Somos empreendedores, programadores e designers que querem partilhar conhecimento com uma nova geração.</p>
      {!session ? (
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
                spaceSmall: '24px',
                spaceLarge: '216px',
                inputPadding: '15px 15px',
                socialAuthSpacing: '40px',
              }
            },
          },
        }}
        providers={['google', 'github']}
        socialLayout
        />
      ) : (
        <p>Account page will go here.</p>
      )}
    </div>
  )
}

export default Home