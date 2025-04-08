import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/common/Layout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { Request } from '../models/types';
import { mockRequests, mockUsers } from '../data/mockData';

const RequestsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'open' | 'fulfilled'>('open');
  
  // Filter requests based on search term and status
  const filteredRequests = mockRequests.filter((request) => {
    const matchesSearch = request.plantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || request.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });
  
  // Sort requests by date (newest first)
  const sortedRequests = [...filteredRequests].sort(
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
    <Layout title="Daftar Permintaan Bibit & Hasil Panen">
      {/* Page header with decorative element */}
      <div className="relative mb-8">
        <div className="absolute top-0 left-0 w-24 h-1 bg-gradient-to-r from-blue-300 via-primary to-blue-300 rounded-full"></div>
      </div>
      
      {/* Search and Filter Section - Improved with card and background */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 mb-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column: Create Request Button */}
          <div className="flex flex-col justify-center">
            <h2 className="text-xl font-medium text-gray-800 mb-2">Temukan Permintaan</h2>
            <p className="text-gray-600 mb-4 max-w-md">
              Lihat permintaan dari pengguna lain atau buat permintaan baru untuk tanaman yang Anda cari.
            </p>
            <Link to="/requests/create" className="self-start">
              <Button
                variant="primary"
                className="bg-gradient-to-r from-blue-500 to-primary hover:from-primary hover:to-blue-500 transition-all duration-300 shadow-md hover:shadow-lg"
                leftIcon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                }
              >
                Buat Permintaan
              </Button>
            </Link>
          </div>
          
          {/* Right column: Search and filters */}
          <div className="space-y-4">
            <div className="relative">
              <Input
                type="search"
                placeholder="Cari permintaan tanaman..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="focus:ring-blue-500 focus:border-blue-500 bg-white shadow-inner"
                leftIcon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                }
              />
            </div>
            
            <div className="flex items-center space-x-2 bg-white p-3 rounded-lg shadow-sm">
              <span className="text-sm font-medium text-gray-700">Status:</span>
              <div className="flex space-x-2">
                <button
                  className={`px-4 py-2 text-sm rounded-full transition-all duration-200 ${
                    selectedStatus === 'all'
                      ? 'bg-gray-700 text-white shadow-md transform scale-105'
                      : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedStatus('all')}
                >
                  Semua
                </button>
                <button
                  className={`px-4 py-2 text-sm rounded-full transition-all duration-200 ${
                    selectedStatus === 'open'
                      ? 'bg-blue-500 text-white shadow-md transform scale-105'
                      : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedStatus('open')}
                >
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-blue-300 rounded-full mr-2"></span>
                    Aktif
                  </div>
                </button>
                <button
                  className={`px-4 py-2 text-sm rounded-full transition-all duration-200 ${
                    selectedStatus === 'fulfilled'
                      ? 'bg-green-500 text-white shadow-md transform scale-105'
                      : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedStatus('fulfilled')}
                >
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-300 rounded-full mr-2"></span>
                    Terpenuhi
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Results count */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-gray-600">
          Menampilkan <span className="font-medium text-gray-800">{sortedRequests.length}</span> permintaan
        </div>
        
        <div className="flex items-center text-gray-500 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 000 2h10a1 1 0 100-2H3zm0 4a1 1 0 000 2h6a1 1 0 100-2H3zm0 4a1 1 0 100 2h4a1 1 0 100-2H3z" />
            <path d="M17 6a1 1 0 10-2 0v8a1 1 0 102 0V6z" />
          </svg>
          Diurutkan dari terbaru
        </div>
      </div>
      
      {sortedRequests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedRequests.map((request) => (
            <RequestCard 
              key={request.id} 
              request={request} 
              userName={getUserName(request.userId)}
              formatDate={formatDate}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl shadow-sm">
          <div className="bg-white w-24 h-24 mx-auto rounded-full flex items-center justify-center shadow-md mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
              />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-800 mb-2">Tidak ada permintaan</h3>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            {searchTerm
              ? 'Tidak ada hasil yang cocok dengan pencarian Anda. Coba ubah filter atau kata kunci pencarian.'
              : 'Belum ada permintaan bibit atau hasil panen. Jadilah yang pertama membuat permintaan!'}
          </p>
          <Link to="/requests/create">
            <Button
              className="bg-gradient-to-r from-blue-500 to-primary hover:from-primary hover:to-blue-500 transition-all duration-300 shadow-md hover:shadow-lg px-6"
            >
              Buat Permintaan Baru
            </Button>
          </Link>
        </div>
      )}
    </Layout>
  );
};

// Request Card Component
interface RequestCardProps {
  request: Request;
  userName: string;
  formatDate: (date: Date) => string;
}

const RequestCard: React.FC<RequestCardProps> = ({ request, userName, formatDate }) => {
  return (
    <Card 
      className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg border-t-4 border-blue-400 hover:border-blue-500"
      hoverable
    >
      {/* Card Header with Status */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-medium text-gray-900 group-hover:text-primary transition-colors duration-200">
            {request.plantName}
          </h3>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span>{request.location}</span>
          </div>
        </div>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
          request.status === 'open' 
            ? 'bg-blue-100 text-blue-700 border border-blue-200' 
            : 'bg-green-100 text-green-700 border border-green-200'
        }`}>
          <span className={`w-2 h-2 rounded-full mr-1 ${
            request.status === 'open' ? 'bg-blue-500' : 'bg-green-500'
          }`}></span>
          {request.status === 'open' ? 'Aktif' : 'Terpenuhi'}
        </span>
      </div>
      
      {/* Card Content */}
      <div className="bg-gray-50 rounded-lg p-3 mb-3 flex-grow">
        <p className="text-sm text-gray-600 line-clamp-3">{request.reason}</p>
      </div>
      
      {/* Card Footer */}
      <div className="mt-auto">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-2">
              {userName.charAt(0).toUpperCase()}
            </div>
            <span>{userName}</span>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatDate(request.createdAt)}
          </div>
        </div>
        
        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <div className="flex items-center text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
            </svg>
            {request.comments.length} komentar
          </div>
          
          <Link to={`/requests/${request.id}`}>
            <Button 
              variant="outline" 
              size="sm"
              className="text-blue-600 border-blue-300 hover:bg-blue-50 hover:border-blue-400 transition-colors duration-200"
            >
              Lihat Detail
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default RequestsPage;