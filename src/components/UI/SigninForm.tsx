'use client'
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, ChangeEventHandler, useState } from 'react';
import Alert from '../utils/Alert';
import Input from '../utils/Input';

function SignInForm() {
  const router = useRouter()

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsBusy(true)
    if (error.email || error.password) {
      return;
    }

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false
    })
    if (res?.error) return setIsError(res.error)
    setIsBusy(false)
    router.replace('/profile')
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };
  return (
    <form >
      {isError ? (
        <div className="mb-3">
          <Alert value={isError} />
        </div>
      ) : null}
      <Input label="Email" id="email" type="email" placeholder="Enter your email address" required name='email' value={'name'} onChange={function (event: ChangeEvent<HTMLInputElement>): void {
        throw new Error('Function not implemented.');
      }} />

      <Input id="password" type="password" placeholder="Enter your password" required label="Password" name='password' value={'password'} onChange={function (event: ChangeEvent<HTMLInputElement>): void {
        throw new Error('Function not implemented.');
      }} />

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
      <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full" type="submit">Sign in</button>
    </form>
  );
}

export default SignInForm;
