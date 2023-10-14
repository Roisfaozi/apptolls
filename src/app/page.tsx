import Head from 'next/head';
import FeaturesSection from './(components)/FeaturesSection';
import Footer from './(components)/Footer';
import Header from './(components)/Header';
import HeroSection from './(components)/HeroSection';

export default function Home() {
  return (
    <main >
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
        <section className="bg-blue-500 py-16 text-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-semibold">Get Started with Our App Today!</h2>
            <p className="text-lg">Experience the power of our app and supercharge your productivity.</p>
            <a href="/purchase" className="bg-yellow-500 px-6 py-2 rounded-full text-lg mt-4 inline-block hover:bg-yellow-600">Buy Now</a>
          </div>
        </section>
        <Footer />
      </div>
    </main>
  )
}
