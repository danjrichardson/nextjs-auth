'use client'
import { useState } from 'react'

type InputProps = {
  onChange: (value: string) => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [rest:string]: any
}

function Input ({ onChange, ...rest }:InputProps) {
  return <input className='w-full rounded-md border text-lg py-4 px-6 placeholder:text-gray-400 border-gray-200 focus:outline-teal-400'
    onChange={({ target: { value }}:React.ChangeEvent<HTMLInputElement>) => onChange(value)}
    {...rest} />
}

export default function LoginForm () {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const sumbitEnabled = username.length && password.length;

  return <form className='space-y-4'>
    <Input type="text" value={username} onChange={setUsername} placeholder="Email Address" />
    <Input type="password" value={password} onChange={setPassword} placeholder="Password" />
    <button type='submit' className='w-full py-4 px-6 border rounded-md border-gray-200 text-gray-400 font-bold enabled:bg-teal-400 enabled:text-white focus:outline-teal-400 focus:outline-offset-4' disabled={!sumbitEnabled}>Log in</button>
  </form>
}