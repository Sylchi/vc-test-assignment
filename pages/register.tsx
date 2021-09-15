import { UserIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useState, ChangeEvent, FormEvent } from 'react';
import { userParameter, regex } from './api/validate';
import type { userType } from './api/user';
import { useRouter } from 'next/router';
import withSession from '../lib/session';
import SubmitButton from '../components/SubmitButton';
import type { NextRouter } from 'next/router';

const Register = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [state, setState] = useState<userType>({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const setField = (fieldName: userParameter, value: string) => {
    setState({
      ...state,
      [fieldName]: value
    })
  }
  const router: NextRouter = useRouter();
  const submit = async () => {
    setLoading(true);
    setError(null);
    const { isLoggedIn, message } = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(state)
    }).then(res => res.json());
    if(isLoggedIn) router.push('/');
    else if(message) setError(message);
    setLoading(false);
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up for our amazing service</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or if you have an account alread you can{' '}
            <Link
              href="/login"
            >
            <a className="font-medium text-indigo-600 hover:text-indigo-500">
              sign in
            </a>
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e: FormEvent) => e.preventDefault()}>
          <div className="rounded-md shadow-sm -space-y-px">
          <div>
              <label htmlFor="email-address" className="sr-only">
                First name
              </label>
              <input
                id="first-name"
                name="name"
                type="text"
                pattern={regex['firstName']}
                value={state.firstName}
                onInput={(e: ChangeEvent<HTMLInputElement>) => setField('firstName', e.target.value)}
                autoComplete="first-name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="First name"
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Last name
              </label>
              <input
                id="last-name"
                name="lastName"
                type="text"
                pattern={regex['lastName']}
                value={state.lastName}
                onInput={(e: ChangeEvent<HTMLInputElement>) => setField('lastName', e.target.value)}
                autoComplete="last-name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Last name"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                pattern={regex['email']}
                value={state.email}
                onInput={(e: ChangeEvent<HTMLInputElement>) => setField('email', e.target.value)}
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                pattern={regex['password']}
                autoComplete="new-password"
                value={state.password}
                onInput={(e: ChangeEvent<HTMLInputElement>) => setField('password', e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
              <div className="ml-1 mt-1 text-xs text-gray-600">8 characters minimum</div>
            </div>
          </div>
          {error && <div className="text-red-600 text-center mt-5">{error}</div>}
          <div>
            <SubmitButton label="Sign up" onClick={submit} loading={loading} >
              <UserIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
            </SubmitButton>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register;

//@ts-ignore
export const getServerSideProps = withSession(({ req, res }) => {
  const user = req.session.get("user");

  if (user !== undefined) {
    res.setHeader("location", "/");
    res.statusCode = 302;
    res.end();
  }

  return { props: {} }
});
