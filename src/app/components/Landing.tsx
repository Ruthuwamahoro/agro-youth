'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FEATURES, STATS } from '@/constants/landing';
import { ArrowRight, BookOpen, Users, ShoppingBag, TrendingUp } from 'lucide-react';

const LandingPage: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem('access_token'));
  }, []);

  const features = FEATURES.map((feature, index) => 
    index === 2 
      ? { ...feature, link: token ? '/courses' : '/register' }
      : feature
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 to-emerald py-14">

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-32 lg:pb-32">
          <div className="text-center max-w-4xl mx-auto">

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Agro
              </span>
              <span className="bg-yellow-600 bg-clip-text text-transparent ml-1">
                 Youth
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-600 mb-6 font-light">
              The Future of Liberian Agriculture
            </p>

            <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
              Learn modern farming techniques, connect with fellow young farmers, and access markets—all through one comprehensive digital platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              {token ? (
                <>
                  <Link href="/courses">
                    <Button size="lg" className="w-full sm:w-auto h-12 px-8 bg-gray-900 hover:bg-gray-800 text-white rounded-lg shadow-lg hover:shadow-xl transition-all">
                      Explore Courses
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="/market">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8 border-2 border-gray-900 text-gray-900 hover:bg-gray-50 rounded-lg">
                      Browse Market
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/register">
                    <Button size="lg" className="w-full sm:w-auto h-12 px-8 bg-gray-900 hover:bg-gray-800 text-white rounded-lg shadow-lg hover:shadow-xl transition-all">
                      Get Started Free
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8 border-2 border-gray-900 text-gray-900 hover:bg-gray-50 rounded-lg">
                      Connect with us
                    </Button>
                  </Link>
                </>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600 font-bold">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>Interactive Learning</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Youth Community</span>
              </div>
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                <span>Market Access</span>
              </div>
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                <span>Apply for Donation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-gray-100 bg-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {STATS.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl lg:text-5xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm lg:text-base font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Everything You Need to {" "}
              <span className='text-yellow-600'>Succeed</span>
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Digital tools and resources designed specifically for young Liberian farmers to learn, grow, and thrive in modern agriculture.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 group bg-gray-200">
                <CardContent className="p-8">

                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed text-base">
                    {feature.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-green-700 mb-6 px-4 py-2 rounded-lg w-fit">
                    <TrendingUp className="w-4 h-4" />
                    {feature.stats}
                  </div>
                  <Link href={feature.link}>
                    <Button 
                      variant="outline"
                      className="w-full border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-colors flex items-center justify-center bg-gray-800 text-gray-300 cursor-pointer"
                    >
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4 flex-shrink-0" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      <footer className="border-t border-gray-200 py-12  bg-gray-800 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 text-2xl font-bold mb-4">
              <span className="text-gray-300">Agro</span>
              <span className="text-yellow-600">Youth</span>
            </div>
            <p className=" mb-8 max-w-2xl mx-auto">
              Empowering young Liberian farmers through digital learning, market access, and community collaboration.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sm font-medium">
              <Link href="/courses" className=" transition-colors">
                Learning Hub
              </Link>
              <Link href="/market" className="transition-colors">
                Market Access
              </Link>
              {!token && (
                <>
                  <Link href="/login" className="transition-colors">
                    Sign In
                  </Link>
                  <Link href="/register" className="transition-colors">
                    Join Now
                  </Link>
                </>
              )}
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm">
                © {new Date().getFullYear()} AgroYouth. Building the future of Liberian agriculture.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;