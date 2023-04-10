import { withAuth } from '../utils/withAuth';

export default function ProtectedPage({ user, data }) {
  return (
    <>
      <h1>Hello World</h1>
    </>
  )
};

export const getServerSideProps = withAuth(async (ctx, session) => {
  if (session)
    return {
      redirect: {
        destination: '/account',
        permanent: false,
      },
    }
  });
