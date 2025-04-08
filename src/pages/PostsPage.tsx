import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/common/Layout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { Post } from '../models/types';
import { mockPosts, mockUsers } from '../data/mockData';

const PostsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'seed' | 'harvest'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'available' | 'completed'>('available');
  const [isAnimated, setIsAnimated] = useState(false);
  
  // Trigger animation after component mounts
  useEffect(() => {
    setIsAnimated(true);
  }, []);
  
  // Filter posts based on search term, type, and status
  const filteredPosts = mockPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'all' || post.type === selectedType;
    
    const matchesStatus = selectedStatus === 'all' || post.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });
  
  // Sort posts by date (newest first)
  const sortedPosts = [...filteredPosts].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );
  
  // Function to get user name by ID
  const getUserName = (userId: string): string => {
    const user = mockUsers.find((u) => u.id === userId);
    return user ? user.name : 'Pengguna';
  };
  
  // Function to format date
  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };
  
  return (
    <Layout title="Daftar Bibit & Hasil Panen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-50 to-primary-light/10 -mt-6 -mx-4 sm:-mx-6 lg:-mx-8 mb-8 p-6 sm:p-8 rounded-b-3xl shadow-sm">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Temukan Bibit & Hasil Panen</h1>
          <p className="text-gray-600 mb-6">Berbagi hasil panen berlebih dan bibit tanaman dengan komunitas</p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="search"
                placeholder="Cari berdasarkan nama tanaman, lokasi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                }
                className="shadow-sm"
              />
            </div>
            <div>
              <Link to="/posts/create">
                <Button
                  variant="primary"
                  leftIcon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  }
                  className="shadow-sm bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary transition-all duration-300"
                >
                  Tambah Post
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-8 transform transition-all duration-500 opacity-0 translate-y-4 ease-out"
        style={{ 
          opacity: isAnimated ? 1 : 0, 
          transform: isAnimated ? 'translateY(0)' : 'translateY(1rem)'
        }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">Jenis:</span>
            <div className="flex flex-wrap gap-2">
              <button
                className={`px-4 py-1.5 text-sm rounded-full transition-all duration-200 ${
                  selectedType === 'all'
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white border border-gray-300 text-gray-600 hover:border-primary hover:text-primary'
                }`}
                onClick={() => setSelectedType('all')}
              >
                Semua
              </button>
              <button
                className={`px-4 py-1.5 text-sm rounded-full transition-all duration-200 flex items-center gap-1 ${
                  selectedType === 'seed'
                    ? 'bg-green-500 text-white shadow-md'
                    : 'bg-white border border-green-300 text-green-700 hover:bg-green-50'
                }`}
                onClick={() => setSelectedType('seed')}
              >
                <span className="w-2 h-2 rounded-full bg-current"></span>
                Bibit
              </button>
              <button
                className={`px-4 py-1.5 text-sm rounded-full transition-all duration-200 flex items-center gap-1 ${
                  selectedType === 'harvest'
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'bg-white border border-orange-300 text-orange-700 hover:bg-orange-50'
                }`}
                onClick={() => setSelectedType('harvest')}
              >
                <span className="w-2 h-2 rounded-full bg-current"></span>
                Hasil Panen
              </button>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">Status:</span>
            <div className="flex flex-wrap gap-2">
              <button
                className={`px-4 py-1.5 text-sm rounded-full transition-all duration-200 ${
                  selectedStatus === 'all'
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white border border-gray-300 text-gray-600 hover:border-primary hover:text-primary'
                }`}
                onClick={() => setSelectedStatus('all')}
              >
                Semua
              </button>
              <button
                className={`px-4 py-1.5 text-sm rounded-full transition-all duration-200 ${
                  selectedStatus === 'available'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-white border border-blue-300 text-blue-700 hover:bg-blue-50'
                }`}
                onClick={() => setSelectedStatus('available')}
              >
                Tersedia
              </button>
              <button
                className={`px-4 py-1.5 text-sm rounded-full transition-all duration-200 ${
                  selectedStatus === 'completed'
                    ? 'bg-gray-600 text-white shadow-md'
                    : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedStatus('completed')}
              >
                Selesai
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Posts Counter */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-gray-600">
          Menampilkan <span className="font-medium text-primary">{sortedPosts.length}</span> hasil
        </div>
        <div className="text-sm">
          <select className="border border-gray-200 rounded-md px-2 py-1 text-gray-600 focus:outline-none focus:ring-1 focus:ring-primary">
            <option>Terbaru</option>
            <option>Terlama</option>
            <option>A-Z</option>
          </select>
        </div>
      </div>
      
      {/* Posts Grid */}
      {sortedPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPosts.map((post, index) => (
            <div 
              key={post.id}
              className="transform transition-all duration-500 opacity-0 translate-y-4 ease-out"
              style={{ 
                opacity: isAnimated ? 1 : 0, 
                transform: isAnimated ? 'translateY(0)' : 'translateY(1rem)',
                transitionDelay: `${150 + (index % 6) * 75}ms`
              }}
            >
              <PostCard 
                post={post} 
                userName={getUserName(post.userId)}
                formatDate={formatDate}
              />
            </div>
          ))}
        </div>
      ) : (
        <div 
          className="bg-white rounded-xl shadow-sm p-12 text-center transform transition-all duration-500 opacity-0 translate-y-4 ease-out"
          style={{ 
            opacity: isAnimated ? 1 : 0, 
            transform: isAnimated ? 'translateY(0)' : 'translateY(1rem)'
          }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">Tidak ada postingan</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            {searchTerm
              ? 'Tidak ada hasil yang cocok dengan pencarian Anda. Coba kata kunci lain atau reset filter.'
              : 'Belum ada bibit atau hasil panen yang dibagikan. Jadilah yang pertama berbagi!'}
          </p>
          <Link to="/posts/create">
            <Button 
              variant="primary"
              className="shadow-md bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary transition-all duration-300"
            >
              Tambah Post Baru
            </Button>
          </Link>
        </div>
      )}
    </Layout>
  );
};

// Post Card Component
interface PostCardProps {
  post: Post;
  userName: string;
  formatDate: (date: Date) => string;
}

const PostCard: React.FC<PostCardProps> = ({ post, userName, formatDate }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Card 
      className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-md border border-gray-100 hover:border-primary-light bg-white rounded-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden group">
        <img
          src={post.images[0] || '/src/assets/images/placeholder.jpg'}
          alt={post.title}
          className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
        
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
            post.type === 'seed' 
              ? 'bg-green-500 text-white' 
              : 'bg-orange-500 text-white'
          }`}>
            {post.type === 'seed' ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                Bibit
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd" />
                  <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
                </svg>
                Hasil Panen
              </>
            )}
          </span>
        </div>
        
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
            post.status === 'available' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-600 text-white'
          }`}>
            {post.status === 'available' ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                Tersedia
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Selesai
              </>
            )}
          </span>
        </div>
        
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center text-white text-sm">
            <div className="flex items-center bg-black/30 px-2 py-1 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="truncate">{post.location}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium text-gray-900 hover:text-primary truncate">{post.title}</h3>
          <div className="flex-shrink-0 ml-2">
            <div className="flex items-center text-gray-500 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              <span>{post.comments.length}</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{post.description}</p>
        
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-primary-light text-white flex items-center justify-center mr-1 text-xs font-medium">
              {userName.charAt(0)}
            </div>
            <span>{userName}</span>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span>{formatDate(post.createdAt)}</span>
          </div>
        </div>
        
        <Link to={`/posts/${post.id}`} className="block">
          <Button 
            variant="outline" 
            size="sm" 
            isFullWidth
            className={`transition-all duration-300 ${
              isHovered 
                ? 'bg-primary text-white border-primary' 
                : 'bg-white text-primary border-primary'
            }`}
          >
            Lihat Detail
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ml-1 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default PostsPage;