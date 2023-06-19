import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { GetServerSideProps } from 'next';
import authOptions from '@/auth-config';
import { useSession } from 'next-auth/react';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      session: await getServerSession(req, res, authOptions),
    },
  };
};
export default function Protected() {
  const { data: session } = useSession();

  if (session) {
    return (
      <main className="flex min-h-screen flex-col items-center gap-y-10 p-8 sm:p-24">
        <div className="flex flex-col place-items-center">
          Protected Page.
          <p className="my-10">
            <Link href="/">Back home</Link>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center gap-y-10 p-8 sm:p-24">
      <div className="flex flex-col place-items-center">
        Unauthorized Page.
        <p className="my-10">
          <Link href="/">Back home</Link>
        </p>
      </div>
    </main>
  );
}
