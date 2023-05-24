import Image from 'next/image'
import { Inter } from 'next/font/google'
import SanitySVG from '@/public/sanity.svg'
import LoginForm from '@/components/LoginForm'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-y-10 p-8 sm:p-24">
      
      <div className='flex flex-col place-items-center'>
        <h1 className='text-2xl mb-4'>Next.js app with auth and later, Sanity</h1>
        <div className='inline-flex gap-x-4'>
          <div className='flex items-center gap-x-4 font-bold'>
            <Image
              src="/nextauth.png"
              alt="NextAuth.js"
              width={65}
              height={72}
            />
            NextAuth.js
          </div>
          <div className='self-center text-6xl opacity-10'>/</div>
          <div className='flex items-center gap-x-4 opacity-40'>
            <Image
              src={SanitySVG}
              alt="Sanity"
            />
          </div>
        </div>
      </div>

      <div className='flex flex-col items-center'>
        <span className='text-2xl'>Powered by</span>
        <Image
          src='/aws-cognito.png'
          className='my-4'
          width={200*.4}
          height={234*.4}
          alt='AWS Cognito'
        />
        AWS Cognito
      </div>

      <div className='w-full max-w-md mt-10 p-6 sm:p-10 rounded-xl bg-white border border-gray-300 box-sh shadow-2xl focus-within:shadow-teal-400 transition-shadow duration-200 [--tw-shadow-colored:_0_0px_50px_-12px_var(--tw-shadow-color)]'>
        <h2 className='text-2xl mb-8'>Login</h2>
        <LoginForm />
      </div>

      
    </main>
  )
}