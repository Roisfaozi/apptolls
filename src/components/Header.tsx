import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-blue-500 py-4">
      <nav className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-white text-xl font-semibold">Your App Name</Link>
        <ul className="flex space-x-4">
          <li><Link href="/login" className="text-white">Login</Link></li>
          <li><Link href="/signup" className="text-white">Sign Up</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
