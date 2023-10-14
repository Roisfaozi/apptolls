'use client'
import Input from '../utils/Input';

interface SignUpFormProps {
  onSubmit: () => void; // Ganti dengan fungsi penanganan pengiriman formulir yang sesuai
}

function SignUpForm({ onSubmit }: SignUpFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <Input label="Name" id="name" type="text" placeholder="Enter your name" required />
      <Input label="Email" id="email" type="email" placeholder="Enter your email address" required />
      <Input label="Password" id="password" type="password" placeholder="Enter your password" required />
      <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full" type="submit">Sign up</button>
      <div className="text-sm text-gray-500 text-center mt-3">
        By creating an account, you agree to the <a className="underline" href="#0">terms & conditions</a>, and our <a className="underline" href="#0">privacy policy</a>.
      </div>
    </form>
  );
}

export default SignUpForm;