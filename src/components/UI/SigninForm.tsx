'use client'
import Link from 'next/link';
import Input from '../utils/Input';

interface SignInFormProps {
  onSubmit: () => void; // Ganti dengan fungsi penanganan pengiriman formulir yang sesuai
}

function SignInForm({ onSubmit }: SignInFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <Input label="Email" id="email" type="email" placeholder="Enter your email address" required />
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full px-3">
          <div className="flex justify-between">
            <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="password">Password</label>
            <Link href="/reset-password" className="text-sm font-medium text-blue-600 hover:underline">Having trouble signing in?</Link>
          </div>
          <input id="password" type="password" className="form-input w-full text-gray-800" placeholder="Enter your password" required />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full px-3">
          <div className="flex justify-between">
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
