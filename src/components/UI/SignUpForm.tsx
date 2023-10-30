'use client'
import { useRouter } from 'next/router';
import { ChangeEventHandler, useState } from 'react';
import Input from '../parts/Input';


function SignUpForm() {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isBusy, setIsBusy] = useState(false)
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const { name, email, password } = userInfo;

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

    // Validasi password saat pengguna mengetik
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

    const res = await fetch('/api/auth/users', {
      method: "POST",
      body: JSON.stringify(userInfo)
    }).then((res) => res.json())

    router.push('/profile')
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={name}
        label="Name"
        name="name"
        id="name"
        type="text"
        placeholder="Enter your name"
        required
        onChange={handleChange}
      />
      <Input
        value={email}
        label="Email"
        name="email"
        id="email"
        type="email"
        placeholder="Enter your email address"
        required
        onChange={handleChange}
      />
      <p className={`text-red-500 text-sm mb-4 h-1`}>{error.email}</p>
      <Input
        value={password}
        label="Password"
        id="password"
        type="password"
        placeholder="Enter your password"
        required
        onChange={handleChange}
        name="password"
      />
      <p className={`text-red-500 text-sm mb-4 h-2`}>{error.password}</p>
      <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full" disabled={isBusy} style={{ opacity: isBusy ? 0.5 : 1 }} type="submit">Sign up</button>
      <div className="text-sm text-gray-500 text-center mt-3">
        By creating an account, you agree to the <a className="underline" href="#0">terms & conditions</a>, and our <a className="underline" href="#0">privacy policy</a>.
      </div>
    </form>
  );
}

export default SignUpForm;
