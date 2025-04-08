import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-green-100 mt-auto relative overflow-hidden">
      {/* Background Wave Patterns */}
      <div className="absolute inset-0 z-0 opacity-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute top-0 left-0 w-full">
          <path fill="#4CAF50" fillOpacity="0.5" d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,165.3C672,160,768,96,864,74.7C960,53,1056,75,1152,101.3C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0 left-0 w-full rotate-180">
          <path fill="#4CAF50" fillOpacity="0.3" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Tagline */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center group">
              <div className="bg-primary bg-opacity-20 p-2 rounded-full transform group-hover:scale-110 transition-all duration-300">
                <span className="text-2xl">🌿</span>
              </div>
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                EcoCropShare
              </span>
            </Link>
            <div className="mt-4 text-sm text-gray-700 bg-white bg-opacity-80 backdrop-blur-sm border-l-4 border-primary-light pl-3 p-3 rounded-r-lg shadow-sm">
              <p>Platform inovatif untuk berbagi bibit dan hasil panen antar komunitas petani urban.</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-lg p-4 shadow-sm">
              <h3 className="text-sm font-semibold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent tracking-wider uppercase mb-4 pb-1 border-b-2 border-green-100">
                Pintasan
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/dashboard" className="text-gray-700 hover:text-primary transition-colors text-sm flex items-center group">
                    <span className="w-0 h-0.5 bg-primary transition-all group-hover:w-2 mr-0 group-hover:mr-2"></span>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/posts" className="text-gray-700 hover:text-primary transition-colors text-sm flex items-center group">
                    <span className="w-0 h-0.5 bg-primary transition-all group-hover:w-2 mr-0 group-hover:mr-2"></span>
                    Bibit & Hasil Panen
                  </Link>
                </li>
                <li>
                  <Link to="/requests" className="text-gray-700 hover:text-primary transition-colors text-sm flex items-center group">
                    <span className="w-0 h-0.5 bg-primary transition-all group-hover:w-2 mr-0 group-hover:mr-2"></span>
                    Permintaan
                  </Link>
                </li>
                <li>
                  <Link to="/articles" className="text-gray-700 hover:text-primary transition-colors text-sm flex items-center group">
                    <span className="w-0 h-0.5 bg-primary transition-all group-hover:w-2 mr-0 group-hover:mr-2"></span>
                    Artikel Edukasi
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-lg p-4 shadow-sm">
              <h3 className="text-sm font-semibold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent tracking-wider uppercase mb-4 pb-1 border-b-2 border-green-100">
                Sumber Daya
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/posts/create" className="text-gray-700 hover:text-primary transition-colors text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-primary-light" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Tambah Post Baru
                  </Link>
                </li>
                <li>
                  <Link to="/requests/create" className="text-gray-700 hover:text-primary transition-colors text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-primary-light" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Buat Permintaan
                  </Link>
                </li>
                <li>
                  <Link to="/articles/create" className="text-gray-700 hover:text-primary transition-colors text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-primary-light" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                    </svg>
                    Tulis Artikel
                  </Link>
                </li>
                <li>
                  <Link to="/history" className="text-gray-700 hover:text-primary transition-colors text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-primary-light" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    Riwayat Tukar
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Community */}
          <div className="col-span-1">
            <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-lg p-4 shadow-sm">
              <h3 className="text-sm font-semibold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent tracking-wider uppercase mb-4 pb-1 border-b-2 border-green-100">
                Komunitas
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/profile" className="text-gray-700 hover:text-primary transition-colors text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-primary-light" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    Profil Saya
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-primary transition-colors text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-primary-light" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Kebijakan Privasi
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-primary transition-colors text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-primary-light" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                    Syarat & Ketentuan
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-primary transition-colors text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-primary-light" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    Hubungi Kami
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="mt-8 pt-6 border-t border-green-100 flex justify-center">
          <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-lg p-5 shadow-sm inline-flex flex-col items-center">
            <h3 className="text-sm font-semibold text-gray-700 tracking-wider uppercase mb-4">
              Ikuti Kami
            </h3>
            <div className="flex space-x-6">
              <a 
                href="#" 
                className="text-gray-400 hover:text-primary bg-white p-3 rounded-full shadow-sm hover:shadow-md transition-all duration-300" 
                aria-label="Facebook"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-primary bg-white p-3 rounded-full shadow-sm hover:shadow-md transition-all duration-300" 
                aria-label="Instagram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-primary bg-white p-3 rounded-full shadow-sm hover:shadow-md transition-all duration-300" 
                aria-label="Twitter"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-primary bg-white p-3 rounded-full shadow-sm hover:shadow-md transition-all duration-300" 
                aria-label="GitHub"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright and Decoration */}
        <div className="mt-8 pt-6 border-t border-green-100">
          {/* Leaf decoration */}
          <div className="flex justify-center mb-4">
            <div className="w-24 h-1 bg-gradient-to-r from-green-200 via-primary to-green-200 rounded-full"></div>
          </div>
          
          {/* Copyright */}
          <div className="text-center">
            <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-lg p-4 inline-block">
              <p className="text-sm text-gray-700">
                &copy; {new Date().getFullYear()} EcoCropShare. Platform berbagi bibit dan hasil panen.
              </p>
              <p className="mt-2 text-xs text-gray-500">
                Dibuat untuk memudahkan berbagi tanaman antar komunitas petani urban.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;