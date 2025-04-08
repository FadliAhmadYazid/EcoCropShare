import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/common/Layout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { mockPosts, mockRequests, mockArticles, mockHistory } from '../data/mockData';

// Sample image URLs for the slider
// In a real app, these would be properly imported or hosted images
const sliderImages = [
  'https://media.istockphoto.com/id/2152987531/photo/urban-farming.webp?a=1&b=1&s=612x612&w=0&k=20&c=jYjoPEfYDxzMHU7nSmnANO-zlSObLZfu6aUoC8yQrf0=', // Replace with actual image paths
  'https://media.istockphoto.com/id/2184469012/id/foto/kaca-globe-di-hutan-hijau-dengan-sinar-matahari-konsep-lingkungan-konsep-netral-karbon-target.jpg?s=612x612&w=0&k=20&c=BCVKybxgShntPQZKvdS0AOL6qc7UI2jL6BksBcKICkM=',
  'https://images.unsplash.com/photo-1543418219-44e30b057fea?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1623302485960-d61687113a11?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fG5hdHVyZSUyMGxhbmRzY2FwZXxlbnwwfHwwfHx8MA%3D%3D'
];

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  
  // Filter posts and requests based on current user
  const userPosts = mockPosts.filter((post) => post.userId === user?.id);
  const activePosts = mockPosts.filter((post) => post.status === 'available');
  const userRequests = mockRequests.filter((request) => request.userId === user?.id);
  const activeRequests = mockRequests.filter((request) => request.status === 'open');
  const userArticles = mockArticles.filter((article) => article.userId === user?.id);
  const userHistory = mockHistory.filter((history) => history.userId === user?.id || history.partnerId === user?.id);
  
  // State for image slider
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Auto-advance the slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <Layout title="">
      {/* Hero Welcome Section with Image Slider Background */}
      <div className="relative -mt-6 mb-10 rounded-xl overflow-hidden">
        {/* Image Slider Background */}
        <div className="absolute inset-0 bg-black/20">
          {sliderImages.map((image, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="absolute inset-0 bg-black/40"></div> {/* Dark overlay for readability */}
              <img 
                src={image} 
                alt={`Slide ${index}`} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback for missing images in demo
                  e.currentTarget.src = "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=1000";
                }}
              />
            </div>
          ))}
          
          {/* Slider navigation dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {sliderImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Content overlay */}
        <div className="py-20 px-8 relative z-10">
          <div className="max-w-3xl text-white">
            <h2 className="text-3xl font-bold mb-2 drop-shadow-md">
              Selamat datang, {user?.name}!
            </h2>
            <p className="text-lg mb-8 drop-shadow-md">
              EcoCropShare membantu Anda berbagi dan mendapatkan bibit atau hasil panen dengan mudah.
            </p>
            <div className="flex space-x-4">
              <Link to="/posts/create">
                <Button 
                  variant="primary" 
                  className="bg-primary bg-opacity-90 hover:bg-opacity-100 shadow-lg hover:shadow-xl transition-all duration-300"
                  leftIcon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  }
                >
                  Tambah Post Baru
                </Button>
              </Link>
              <Link to="/requests/create">
                <Button 
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-black transition-colors duration-300"
                >
                  Buat Permintaan
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Cards with Animations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="transform hover:-translate-y-1 transition-transform duration-300">
          <Card className="overflow-hidden relative border-none shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-primary opacity-10 rounded-lg"></div>
            <div className="flex flex-col h-full relative z-10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-xl text-primary-dark">Posting Saya</h3>
                <div className="w-10 h-10 rounded-full bg-primary bg-opacity-20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </div>
              </div>
              <p className="text-4xl font-bold text-gray-800 mb-1">{userPosts.length}</p>
              <p className="text-sm text-gray-600 mb-4">Bibit & hasil panen yang Anda bagikan</p>
              <div className="mt-auto">
                <Link to="/posts" className="inline-flex items-center text-primary font-medium hover:text-primary-dark transition-colors">
                  <span>Lihat semua</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="transform hover:-translate-y-1 transition-transform duration-300">
          <Card className="overflow-hidden relative border-none shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-yellow-500 opacity-10 rounded-lg"></div>
            <div className="flex flex-col h-full relative z-10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-xl text-yellow-600">Permintaan Saya</h3>
                <div className="w-10 h-10 rounded-full bg-yellow-400 bg-opacity-20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <p className="text-4xl font-bold text-gray-800 mb-1">{userRequests.length}</p>
              <p className="text-sm text-gray-600 mb-4">Tanaman yang Anda cari</p>
              <div className="mt-auto">
                <Link to="/requests" className="inline-flex items-center text-yellow-600 font-medium hover:text-yellow-700 transition-colors">
                  <span>Lihat semua</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="transform hover:-translate-y-1 transition-transform duration-300">
          <Card className="overflow-hidden relative border-none shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-300 to-blue-500 opacity-10 rounded-lg"></div>
            <div className="flex flex-col h-full relative z-10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-xl text-blue-600">Artikel Saya</h3>
                <div className="w-10 h-10 rounded-full bg-blue-400 bg-opacity-20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                </div>
              </div>
              <p className="text-4xl font-bold text-gray-800 mb-1">{userArticles.length}</p>
              <p className="text-sm text-gray-600 mb-4">Artikel yang Anda bagikan</p>
              <div className="mt-auto">
                <Link to="/articles" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors">
                  <span>Lihat semua</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="transform hover:-translate-y-1 transition-transform duration-300">
          <Card className="overflow-hidden relative border-none shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-300 to-purple-500 opacity-10 rounded-lg"></div>
            <div className="flex flex-col h-full relative z-10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-xl text-purple-600">Riwayat Tukar</h3>
                <div className="w-10 h-10 rounded-full bg-purple-400 bg-opacity-20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <p className="text-4xl font-bold text-gray-800 mb-1">{userHistory.length}</p>
              <p className="text-sm text-gray-600 mb-4">Catatan pertukaran yang telah selesai</p>
              <div className="mt-auto">
                <Link to="/history" className="inline-flex items-center text-purple-600 font-medium hover:text-purple-700 transition-colors">
                  <span>Lihat semua</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      {/* Activity Feeds */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <span className="w-2 h-6 bg-primary rounded-full mr-2 block"></span>
              Posting Terbaru
            </h3>
            <Link to="/posts" className="text-sm text-primary flex items-center hover:text-primary-dark">
              <span>Lihat semua</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          
          {activePosts.length > 0 ? (
            <div className="space-y-4">
              {activePosts.slice(0, 3).map((post) => (
                <Card key={post.id} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-300" hoverable>
                  <Link to={`/posts/${post.id}`} className="block">
                    <div className="flex items-start space-x-4">
                      {post.images.length > 0 && (
                        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 shadow-inner">
                          <img
                            src={post.images[0] || '/src/assets/images/placeholder.jpg'}
                            alt={post.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=100";
                            }}
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 text-lg mb-1">{post.title}</h4>
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            post.type === 'seed' 
                              ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-800' 
                              : 'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800'
                          }`}>
                            {post.type === 'seed' ? 'Bibit' : 'Hasil Panen'}
                          </span>
                          <span className="ml-2 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            {post.location}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-1">
                          {post.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border border-gray-100 bg-gray-50 shadow-sm">
              <div className="text-center py-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-gray-500">Belum ada posting tersedia</p>
                <div className="mt-4">
                  <Link to="/posts/create">
                    <Button variant="primary" size="sm">Tambah Post Baru</Button>
                  </Link>
                </div>
              </div>
            </Card>
          )}
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <span className="w-2 h-6 bg-yellow-500 rounded-full mr-2 block"></span>
              Permintaan Terbaru
            </h3>
            <Link to="/requests" className="text-sm text-primary flex items-center hover:text-primary-dark">
              <span>Lihat semua</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          
          {activeRequests.length > 0 ? (
            <div className="space-y-4">
              {activeRequests.slice(0, 3).map((request) => (
                <Card key={request.id} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-300" hoverable>
                  <Link to={`/requests/${request.id}`} className="block">
                    <div className="flex justify-between">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                          </svg>
                          <h4 className="font-semibold text-gray-800 text-lg">{request.plantName}</h4>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          <span>{request.location}</span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2 mt-2">
                          {request.reason}
                        </p>
                      </div>
                      <div className="flex items-start ml-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {request.comments.length} komentar
                        </span>
                      </div>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border border-gray-100 bg-gray-50 shadow-sm">
              <div className="text-center py-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-500">Belum ada permintaan aktif</p>
                <div className="mt-4">
                  <Link to="/requests/create">
                    <Button variant="primary" size="sm">Buat Permintaan</Button>
                  </Link>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800 flex items-center">
            <span className="w-2 h-6 bg-blue-500 rounded-full mr-2 block"></span>
            Aksi Cepat
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="transform hover:scale-105 transition-transform duration-300">
            <Link to="/posts/create" className="block">
              <Card className="text-center p-6 border-none shadow-md hover:shadow-lg bg-gradient-to-br from-white to-green-50">
                <div className="rounded-full bg-primary bg-opacity-10 w-14 h-14 mx-auto flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="font-medium text-gray-800">Tambah Post</h4>
                <p className="text-sm text-gray-500 mt-1">Bagikan bibit atau hasil panen</p>
              </Card>
            </Link>
          </div>
          
          <div className="transform hover:scale-105 transition-transform duration-300">
            <Link to="/requests/create" className="block">
              <Card className="text-center p-6 border-none shadow-md hover:shadow-lg bg-gradient-to-br from-white to-yellow-50">
                <div className="rounded-full bg-yellow-400 bg-opacity-10 w-14 h-14 mx-auto flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="font-medium text-gray-800">Buat Permintaan</h4>
                <p className="text-sm text-gray-500 mt-1">Cari bibit atau hasil panen</p>
              </Card>
            </Link>
          </div>
          
          <div className="transform hover:scale-105 transition-transform duration-300">
            <Link to="/articles/create" className="block">
              <Card className="text-center p-6 border-none shadow-md hover:shadow-lg bg-gradient-to-br from-white to-blue-50">
                <div className="rounded-full bg-blue-400 bg-opacity-10 w-14 h-14 mx-auto flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="font-medium text-gray-800">Tulis Artikel</h4>
                <p className="text-sm text-gray-500 mt-1">Bagikan pengetahuan</p>
              </Card>
            </Link>
          </div>
          
          <div className="transform hover:scale-105 transition-transform duration-300">
            <Link to="/profile" className="block">
              <Card className="text-center p-6 border-none shadow-md hover:shadow-lg bg-gradient-to-br from-white to-purple-50">
                <div className="rounded-full bg-purple-400 bg-opacity-10 w-14 h-14 mx-auto flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="font-medium text-gray-800">Profil Saya</h4>
                <p className="text-sm text-gray-500 mt-1">Lihat aktivitas saya</p>
              </Card>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Community Tips Section */}
      <div className="mb-8 bg-gradient-to-r from-primary-light to-green-100 rounded-xl p-6 shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 md:mr-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Tips Komunitas EcoCropShare</h3>
            <p className="text-gray-700">
              Bagikan tanaman Anda, tingkatkan pengetahuan, dan kembangkan komunitas petani urban yang berkelanjutan.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link to="/articles">
            <Button className="bg-white text-black hover:bg-gray-100 shadow-sm">
             Jelajahi Artikel
            </Button>

            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;