import { FormEvent, useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

type InputProps = {
  onChange: (value: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [rest: string]: any;
};

type FormProps = {
  onLogin: ({ username }: { username: string }) => void;
};

function Input({ onChange, ...rest }: InputProps) {
  return (
    <input
      className="w-full rounded-md border text-lg py-4 px-6 placeholder:text-gray-400 border-gray-200 focus:outline-teal-400"
      onChange={({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => onChange(value)}
      {...rest}
    />
  );
}

export default function LoginForm({ onLogin }: FormProps) {
  const { data: session } = useSession();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const sumbitEnabled = username.length && password.length;

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (!sumbitEnabled) {
      return;
    }
    setLoginError('');
    console.log('do auth', { username, password: new Array(password.length).fill('*').join('') });

    try {
      // const loginResponse = await signIn('cognito');
      const loginResponse = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });
      if (loginResponse?.ok) {
        onLogin({ username });
      }

      // set any error
      setLoginError(loginResponse?.error ?? '');
    } catch (error) {
      console.error('Error', error);
    }
  }

  if (session) {
    return (
      <div>
        Already logged in: {session.user?.email}.{' '}
        <button className="underline" onClick={() => signOut()}>
          Log out
        </button>
        <p className="my-10">
          <Link href="/protected" className="underline">
            Go to protected page
          </Link>
        </p>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Input type="text" value={username} onChange={setUsername} placeholder="Email Address" />
      <Input type="password" value={password} onChange={setPassword} placeholder="Password" />
      {loginError === 'CredentialsSignin' && (
        <div className="border border-red-200 bg-red-100 rounded-md text-sm py-4 px-6">
          Email and password could not be found.
        </div>
      )}
      <button
        type="submit"
        className="w-full py-4 px-6 border rounded-md border-gray-200 text-gray-400 font-bold enabled:bg-teal-400 enabled:text-white focus:outline-teal-400 focus:outline-offset-4"
        disabled={!sumbitEnabled}
      >
        Log in
      </button>
    </form>
  );
}
