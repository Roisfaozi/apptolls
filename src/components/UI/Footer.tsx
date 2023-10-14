const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-semibold">Your App Name</div>
          <ul className="flex space-x-6">
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
