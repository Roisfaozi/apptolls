'use client'
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEventHandler, useState } from 'react';
import Alert from '../parts/Alert';
import Input from '../parts/Input';

function SignInForm() {
  const router = useRouter()
  const session = useSession()

  const [isError, setIsError] = useState('')
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [isBusy, setIsBusy] = useState(false)
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userInfo;

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });

    if (name === "email") {
      if (!isValidEmail(value) && value !== '') {
        setError({ ...error, email: "Invalid email format. Missing @ in the email address" });
      } else {
        setError({ ...error, email: "" });
      }
    }

    if (name === "password") {
      if (value.length < 6 && value !== '') {
        setError({ ...error, password: "Password must be at least 6 characters" });
      } else {
        setError({ ...error, password: "" });
      }
    }
  };
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  if (session.status === "authenticated") router.replace('/dashboard')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsBusy(true)
    if (error.email || error.password) {
      return;
    }

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl
    })
    if (res?.error) return setIsError(res.error)
    setIsBusy(false)
    router.replace(callbackUrl)
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };


  return (
    <>
      <form onSubmit={handleSubmit}>
        {isError ? (
          <div className="mb-3">
            <Alert value={isError} />
          </div>
        ) : null}
        <Input label="Email" id="email" type="email" placeholder="Enter your email address" required name='email' value={email} onChange={handleChange} />

        <Input id="password" type="password" placeholder="Enter your password" required label="Password" name='password' value={password} onChange={handleChange} />

        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full px-3">

            <div className="flex justify-between">
              <Link href="/reset-password" className="text-sm font-medium text-blue-600 hover:underline">Having trouble signing in?</Link>
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="text-gray-600 ml-2">Keep me signed in</span>
              </label>
            </div>
          </div>
        </div>
        <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full" disabled={isBusy} style={{ opacity: isBusy ? 0.5 : 1 }} type="submit">Sign in</button>
      </form>
      <div className="flex items-center my-6">
        <div className="border-t border-gray-300 grow mr-3" aria-hidden="true"></div>
        <div className="text-gray-600 italic">Or</div>
        <div className="border-t border-gray-300 grow ml-3" aria-hidden="true"></div>
      </div>
      <form>
        <div className="flex flex-wrap -mx-3 mb-3">
          <div className="w-full px-3">
            <button className="btn px-0 text-white bg-gray-900 hover:bg-gray-800 w-full relative flex items-center">
              <svg className="w-4 h-4 fill-current text-white opacity-75 shrink-0 mx-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.95 0C3.578 0 0 3.578 0 7.95c0 3.479 2.286 6.46 5.466 7.553.397.1.497-.199.497-.397v-1.392c-2.187.497-2.683-.993-2.683-.993-.398-.895-.895-1.193-.895-1.193-.696-.497.1-.497.1-.497.795.1 1.192.795 1.192.795.696 1.292 1.888.895 2.286.696.1-.497.298-.895.497-1.093-1.79-.2-3.578-.895-3.578-3.975 0-.895.298-1.59.795-2.087-.1-.2-.397-.994.1-2.087 0 0 .695-.2 2.186.795a6.408 6.408 0 011.987-.299c.696 0 1.392.1 1.988.299 1.49-.994 2.186-.795 2.186-.795.398 1.093.199 1.888.1 2.087.496.596.795 1.291.795 2.087 0 3.08-1.889 3.677-3.677 3.875.298.398.596.895.596 1.59v2.187c0 .198.1.497.596.397C13.714 14.41 16 11.43 16 7.95 15.9 3.578 12.323 0 7.95 0z" />
              </svg>
              <span className="flex-auto pl-16 pr-8 -ml-16">Continue with GitHub</span>
            </button>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3">
          <div className="w-full px-3">
            <button className="btn px-0 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center">
              <svg className="w-4 h-4 fill-current text-white opacity-75 shrink-0 mx-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
              </svg>
              <span className="flex-auto pl-16 pr-8 -ml-16">Continue with Google</span>
            </button>
          </div>
        </div>
      </form>
      <div className="text-gray-600 text-center mt-6">
        Don&rsquo;t you have an account? <Link href="/signup" className="text-blue-600 hover:underline transition duration-150 ease-in-out">Sign up</Link>
      </div>
    </>
  );
}

export default SignInForm;
