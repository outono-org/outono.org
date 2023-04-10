import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

export const withAuth = (getServerSidePropsFunc) => async (ctx) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }

  // If getServerSidePropsFunc is provided, call it with ctx and session
  const additionalProps = getServerSidePropsFunc
    ? await getServerSidePropsFunc(ctx, session)
    : {};

  return {
    props: {
      initialSession: session,
      user: session.user,
      ...additionalProps,
    },
  };
};
