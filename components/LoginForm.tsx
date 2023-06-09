import { FormEvent, useEffect, useState } from 'react'
import { useSession, signIn, signOut, getCsrfToken } from "next-auth/react"

type InputProps = {
  onChange: (value: string) => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [rest:string]: any
}

type FormProps = {
  onLogin: ({ username }: { username: string }) => void
}

function Input ({ onChange, ...rest }:InputProps) {
  return <input className='w-full rounded-md border text-lg py-4 px-6 placeholder:text-gray-400 border-gray-200 focus:outline-teal-400'
    onChange={({ target: { value }}:React.ChangeEvent<HTMLInputElement>) => onChange(value)}
    {...rest} />
}

export default function LoginForm ({ onLogin }:FormProps) {
  const { data: session } = useSession()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [csrfToken, setCsrfToken] = useState('');

  const sumbitEnabled = username.length && password.length;

  // useEffect(() => {
  //   async function fetchCsrf() {
  //     try {
  //       const response = await fetch('/api/auth/csrf');
  //       const { csrfToken } = await response.json() as { csrfToken: string };
  //       setCsrfToken(csrfToken);
  //     }
  //     catch (error) {
  //       console.error(error)
  //     }
  //   }
  //   fetchCsrf();
  // }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    try {
      const loginResponse = await signIn('cognito', {
        email: username,
        redirect: false
      })
      console.log(loginResponse)
    }
    catch (error) {
      console.error(error)
    }

    console.log('do auth', csrfToken, { username, password: new Array(password.length).fill('*').join('') })
    if (sumbitEnabled){
      onLogin({ username });
    }
  }

  if (session) {
    return <div>
      Already logged in: { session.user?.email }. <button className='underline' onClick={() => signOut()}>Log out</button>
    </div>
  }

  return <form className='space-y-4' onSubmit={handleSubmit}>
    <Input type="text" value={username} onChange={setUsername} placeholder="Email Address" />
    <Input type="password" value={password} onChange={setPassword} placeholder="Password" />
    <button type='submit' className='w-full py-4 px-6 border rounded-md border-gray-200 text-gray-400 font-bold enabled:bg-teal-400 enabled:text-white focus:outline-teal-400 focus:outline-offset-4' disabled={!sumbitEnabled}>Log in</button>
  </form>
}