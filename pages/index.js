import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

export default function ProtectedPage({ user, data }) {
  return (
    <>
      <h1>Hello World</h1>
    </>
  )
}

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

    if (session)
    return {
      redirect: {
        destination: '/account',
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
}