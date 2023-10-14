import Head from 'next/head';
import FeaturesSection from './FeaturesSection';
import Footer from './Footer';
import Header from './Header';
import HeroSection from './HeroSection';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Your App Name</title>
        <meta name="description" content="Promote your app with Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <HeroSection />
        <FeaturesSection />
      </main>

      {/* Add a Call-to-Action (CTA) for app purchase */}
      <section className="cta-section">
        <div className="container">
          <h2>Get Started with Our App Today!</h2>
          <p>Experience the power of our app and supercharge your productivity.</p>
          <a href="/purchase" className="cta-button">Buy Now</a>
        </div>
      </section>
      <Footer />
    </div>
  );
}
