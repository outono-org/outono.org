import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

export default function ProtectedPage({ user, data }) {
  return (
    <>
      <h1>Hello World</h1>
    </>
  )
};

export async function getServerSideProps(ctx) {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return {
      redirect: {
        destination: '/account',
        permanent: false,
      },
    };
  };

  if (session) {
    return {
      redirect: {
        destination: '/account',
        permanent: false,
      },
    };
  };

  return {
    props: {},
  };
}
