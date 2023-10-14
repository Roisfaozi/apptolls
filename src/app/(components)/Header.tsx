import Link from 'next/link';

const Header = () => {
  return (
    <header className="header">
      <nav>
        <div className="container">
          <Link href="/">Your App Name</Link>
          <ul>
            <li><Link href="/login">Login</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
