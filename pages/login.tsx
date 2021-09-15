import { LockClosedIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import { useState, ChangeEvent, FormEvent } from 'react';
import withSession from '../lib/session';
import SubmitButton from '../components/SubmitButton';
import toast, { Toaster } from 'react-hot-toast';

type loginFieldName = 'email' | 'password'

const Login = () => {
  const [state, setState] = useState({
    email: '',
    password: ''
  });
  const setField = (fieldName: loginFieldName, value: string) => {
    setState({
      ...state,
      [fieldName]: value
    })
  }
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(false);
  const router: NextRouter = useRouter();
  const submit = async () => {
    setLoading(true);
    setError(false);
    try{
      const { success } = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(state)
      }).then(res => res.json());
      if(success) return router.push('/');
      else {
        setError(true);
        setLoading(false);
      }
    } catch (err) {
      toast.error("Something went wrong");
      setLoading(false); 
    } 
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster />
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link
              href="/register"
            >
            <a className="font-medium text-indigo-600 hover:text-indigo-500">
              sign up now
            </a>
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e: FormEvent) => e.preventDefault()}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={state.email}
                onInput={(e: ChangeEvent<HTMLInputElement>) => setField('email', e.target.value)}
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                value={state.password}
                onInput={(e: ChangeEvent<HTMLInputElement>) => setField('password', e.target.value)}
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          {error && <div className="text-red-600 text-center mt-5">Invalid credentials, please try again.</div>}
          <div>
            <SubmitButton label="Sign in" onClick={submit} loading={loading} >
              <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
            </SubmitButton>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;

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
