import React, { useState, useEffect } from 'react';
import Layout from '../components/common/Layout';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Update time every minute for greeting
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Get greeting based on time of day
  const getGreeting = () => {
    const hours = currentTime.getHours();
    if (hours < 12) return "Selamat Pagi";
    if (hours < 15) return "Selamat Siang";
    if (hours < 19) return "Selamat Sore";
    return "Selamat Malam";
  };

  return (
    <Layout title={isLogin ? "Masuk" : "Daftar"} showHeader={false}>
      <div className="min-h-screen flex flex-col">
        {/* Background Image with Overlay */}
        <div className="fixed inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" 
            alt="Background" 
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 via-green-800/50 to-emerald-900/80 backdrop-blur-sm"></div>
          <div className="absolute inset-0 opacity-50" style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%23fff\" fill-opacity=\"0.03\"%3E%3Cpath d=\"M0 0h40v40H0V0zm20 20a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm0 0a10 10 0 1 1 0 20 10 10 0 0 1 0-20z\"/%3E%3C/g%3E%3C/svg%3E')"
          }}></div>
        </div>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center relative z-10 px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
            
            {/* Left Column - Welcome & Branding */}
            <div className="lg:col-span-2 text-center lg:text-left lg:pr-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-green-300 text-lg font-light">{getGreeting()}</p>
                  <h1 className="text-white text-4xl font-bold tracking-tight sm:text-5xl">
                    {isLogin ? 'Masuk ke Akun Anda' : 'Bergabung dengan EcoCropShare'}
                  </h1>
                  <p className="text-green-100 text-lg max-w-md mx-auto lg:mx-0">
                    Platform untuk berbagi bibit tanaman dan hasil panen berlebih dengan komunitas sekitar
                  </p>
                </div>
                
                <div className="flex items-center justify-center lg:justify-start space-x-3 py-2">
                  <span className="h-10 w-10 rounded-full flex items-center justify-center border-2 border-green-400 bg-green-400/10">
                    <span className="text-lg">🌿</span>
                  </span>
                  <span className="text-white font-bold text-xl">EcoCropShare</span>
                </div>
                
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 hidden lg:block">
                  <h3 className="text-white font-semibold text-lg mb-3">Siklus Berkesinambungan</h3>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="flex flex-col items-center p-2">
                      <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-green-200 text-sm">Tanam</span>
                    </div>
                    <div className="flex flex-col items-center p-2">
                      <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      <span className="text-green-200 text-sm">Panen</span>
                    </div>
                    <div className="flex flex-col items-center p-2">
                      <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                      </div>
                      <span className="text-green-200 text-sm">Bagikan</span>
                    </div>
                  </div>
                  <p className="text-green-200 text-sm mt-3 text-center">
                    Satu platform untuk seluruh kebutuhan berkebun Anda
                  </p>
                </div>
                
                <div className="hidden lg:flex flex-wrap justify-center lg:justify-start gap-2">
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-green-100">
                    Berbagi Hasil Panen
                  </span>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-green-100">
                    Tukar Bibit
                  </span>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-green-100">
                    Tips Berkebun
                  </span>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-green-100">
                    Komunitas Peduli
                  </span>
                </div>
              </div>
            </div>
            
            {/* Right Column - Authentication Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-gray-200">
                  <button
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 py-4 px-6 text-center font-medium text-sm focus:outline-none
                      ${isLogin 
                        ? 'text-green-700 border-b-2 border-green-500' 
                        : 'text-gray-500 hover:text-green-600 hover:border-green-300 border-b-2 border-transparent'
                      }`}
                  >
                    Masuk
                  </button>
                  <button
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 py-4 px-6 text-center font-medium text-sm focus:outline-none
                      ${!isLogin 
                        ? 'text-green-700 border-b-2 border-green-500' 
                        : 'text-gray-500 hover:text-green-600 hover:border-green-300 border-b-2 border-transparent'
                      }`}
                  >
                    Daftar
                  </button>
                </div>
                
                {/* Form Container */}
                <div className="p-8">
                  {isLogin ? <LoginForm /> : <RegisterForm />}
                </div>
              </div>
              
              {/* Mobile Features - Only visible on smaller screens */}
              <div className="mt-8 p-5 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 lg:hidden">
                <h3 className="text-white font-semibold mb-4 text-center">Fitur Utama</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2 text-green-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">Berbagi Panen</span>
                  </div>
                  <div className="flex items-center space-x-2 text-green-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">Tukar Bibit</span>
                  </div>
                  <div className="flex items-center space-x-2 text-green-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">Tips Berkebun</span>
                  </div>
                  <div className="flex items-center space-x-2 text-green-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">Komunitas</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="relative z-10 py-6 text-center">
          <div className="container mx-auto px-4">
            <p className="text-green-200 text-sm">© 2025 EcoCropShare. Semua hak dilindungi.</p>
            <div className="flex justify-center mt-3 space-x-4">
              <a href="#" className="text-green-300 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-green-300 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-green-300 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </Layout>
  );
};

export default AuthPage;