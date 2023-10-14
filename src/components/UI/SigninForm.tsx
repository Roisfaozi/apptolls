'use client'
import Link from 'next/link';
import { ChangeEvent } from 'react';
import Input from '../utils/Input';


function SignInForm() {
  return (
    <form >
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
