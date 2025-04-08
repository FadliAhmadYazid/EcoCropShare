import React, { useState } from 'react';
import Layout from '../components/common/Layout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { mockHistory, mockUsers } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const HistoryPage: React.FC = () => {
  const { user } = useAuth();
  const [filterType, setFilterType] = useState<'all' | 'post' | 'request'>('all');
  const [filterRole, setFilterRole] = useState<'all' | 'giver' | 'receiver'>('all');
  
  // Filter history for current user
  const userHistory = mockHistory.filter(
    (history) => history.userId === user?.id || history.partnerId === user?.id
  );
  
  // Apply additional filters
  const filteredHistory = userHistory.filter((history) => {
    // Filter by type
    const typeMatches = 
      filterType === 'all' || 
      (filterType === 'post' && history.type === 'post') ||
      (filterType === 'request' && history.type === 'request');
    
    // Filter by role
    const roleMatches = 
      filterRole === 'all' || 
      (filterRole === 'giver' && history.userId === user?.id) ||
      (filterRole === 'receiver' && history.partnerId === user?.id);
    
    return typeMatches && roleMatches;
  });
  
  // Sort history by date (newest first)
  const sortedHistory = [...filteredHistory].sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );
  
  // Group history by month and year
  const groupedHistory: Record<string, typeof sortedHistory> = {};
  
  sortedHistory.forEach((item) => {
    const date = new Date(item.date);
    const monthYear = date.toLocaleDateString('id-ID', {
      month: 'long',
      year: 'numeric',
    });
    
    if (!groupedHistory[monthYear]) {
      groupedHistory[monthYear] = [];
    }
    
    groupedHistory[monthYear].push(item);
  });
  
  // Function to get user name by ID
  const getUserName = (userId: string): string => {
    const user = mockUsers.find((u) => u.id === userId);
    return user ? user.name : 'Pengguna';
  };
  
  // Function to get user profile image by ID
  const getUserProfileImage = (userId: string): string | undefined => {
    const user = mockUsers.find((u) => u.id === userId);
    return user?.profileImage;
  };
  
  // Function to format date
  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  // Function to format relative time
  const getRelativeTime = (date: Date): string => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return 'Hari ini';
    } else if (diffInDays === 1) {
      return 'Kemarin';
    } else if (diffInDays < 7) {
      return `${diffInDays} hari yang lalu`;
    } else if (diffInDays < 30) {
      return `${Math.floor(diffInDays / 7)} minggu yang lalu`;
    } else {
      return formatDate(date);
    }
  };
  
  return (
    <Layout title="Riwayat Tukar">
      {/* Header with description and visual element */}
      <div className="bg-gradient-to-r from-cyan-600 to-teal-600 rounded-2xl p-6 mb-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mt-20 -mr-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -mb-16 -ml-16"></div>
        
        <div className="relative">
          <div className="flex items-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className="text-2xl font-bold">Riwayat Tukar</h1>
          </div>
          
          <p className="text-cyan-100 max-w-2xl">
            Catatan kronologis semua pertukaran bibit dan panen yang telah Anda selesaikan. 
            Lihat pertukaran masa lalu untuk meninjau pengalaman berbagi dan menerima dari komunitas.
          </p>
          
          <div className="flex flex-wrap gap-2 mt-5">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              <span>{sortedHistory.filter(h => h.userId === user?.id).length} Dibagikan</span>
            </div>
            
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{sortedHistory.filter(h => h.partnerId === user?.id).length} Diterima</span>
            </div>
            
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>{sortedHistory.length} Total Transaksi</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Filter Controls */}
      <div className="mb-6 bg-white rounded-xl shadow-md p-4 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Type Filter */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Transaksi</label>
            <div className="flex space-x-2">
              <button
                className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap transition-colors ${
                  filterType === 'all'
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setFilterType('all')}
              >
                Semua
              </button>
              <button
                className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap transition-colors flex items-center ${
                  filterType === 'post'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setFilterType('post')}
              >
                <div className="w-2 h-2 rounded-full mr-1.5 bg-green-500"></div>
                Dari Posting
              </button>
              <button
                className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap transition-colors flex items-center ${
                  filterType === 'request'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setFilterType('request')}
              >
                <div className="w-2 h-2 rounded-full mr-1.5 bg-blue-500"></div>
                Dari Permintaan
              </button>
            </div>
          </div>
          
          {/* Role Filter */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Peran Anda</label>
            <div className="flex space-x-2">
              <button
                className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap transition-colors ${
                  filterRole === 'all'
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setFilterRole('all')}
              >
                Semua
              </button>
              <button
                className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap transition-colors ${
                  filterRole === 'giver'
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setFilterRole('giver')}
              >
                Pemberi
              </button>
              <button
                className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap transition-colors ${
                  filterRole === 'receiver'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setFilterRole('receiver')}
              >
                Penerima
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* History Content */}
      {sortedHistory.length > 0 ? (
        <div className="space-y-8">
          {Object.entries(groupedHistory).map(([monthYear, historyItems]) => (
            <div key={monthYear} className="space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-start">
                  <span className="bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 rounded-full">
                    {monthYear}
                  </span>
                </div>
              </div>
              
              {historyItems.map((history, index) => (
                <Card 
                  key={history.id} 
                  className={`border-l-4 transition-all hover:shadow-md ${
                    history.type === 'post' 
                      ? 'border-l-green-500 hover:border-l-green-600' 
                      : 'border-l-blue-500 hover:border-l-blue-600'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Left: Exchange Direction Visualization */}
                    <div className="flex-shrink-0 hidden md:block">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                          {history.userId === user?.id ? (
                            getUserProfileImage(user.id) ? (
                              <img src={getUserProfileImage(user.id)} alt="You" className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-gray-600 font-semibold">{user.name.charAt(0)}</span>
                            )
                          ) : (
                            getUserProfileImage(history.userId) ? (
                              <img src={getUserProfileImage(history.userId)} alt={getUserName(history.userId)} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-gray-600 font-semibold">{getUserName(history.userId).charAt(0)}</span>
                            )
                          )}
                        </div>
                        
                        <div className="w-12 h-0.5 bg-gray-300 mx-2 relative">
                          <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${
                              history.type === 'post' ? 'text-green-500' : 'text-blue-500'
                            }`} viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                        
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                          {history.partnerId === user?.id ? (
                            getUserProfileImage(user.id) ? (
                              <img src={getUserProfileImage(user.id)} alt="You" className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-gray-600 font-semibold">{user.name.charAt(0)}</span>
                            )
                          ) : (
                            getUserProfileImage(history.partnerId) ? (
                              <img src={getUserProfileImage(history.partnerId)} alt={getUserName(history.partnerId)} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-gray-600 font-semibold">{getUserName(history.partnerId).charAt(0)}</span>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Middle: Transaction Details */}
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          history.type === 'post'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {history.type === 'post' ? 'Dari Posting' : 'Dari Permintaan'}
                        </span>
                        <span className="text-gray-400 text-xs ml-3">{getRelativeTime(history.date)}</span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{history.plantName}</h3>
                      
                      <div className="text-sm">
                        {history.userId === user?.id ? (
                          <p className="text-gray-600 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                            Anda berbagi dengan <span className="font-medium text-amber-700">{getUserName(history.partnerId)}</span>
                          </p>
                        ) : (
                          <p className="text-gray-600 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
                            </svg>
                            Anda menerima dari <span className="font-medium text-indigo-700">{getUserName(history.userId)}</span>
                          </p>
                        )}
                        
                        {history.notes && (
                          <div className="mt-2 bg-gray-50 p-2 rounded-md">
                            <p className="text-gray-700 flex items-start">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 mt-0.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                              </svg>
                              <span className="italic">{history.notes}</span>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Right: Action & Date */}
                    <div className="flex-shrink-0 flex flex-col items-end space-y-2">
                      <div className="text-sm text-gray-500">
                        {formatDate(history.date)}
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-teal-700 border-teal-300 hover:bg-teal-50"
                      >
                        Lihat Detail
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gradient-to-b from-gray-50 to-white rounded-xl shadow-sm border border-gray-100">
          <div className="bg-cyan-100 w-20 h-20 mx-auto rounded-full flex items-center justify-center shadow-sm mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-cyan-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Belum Ada Riwayat</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            {filterType !== 'all' || filterRole !== 'all'
              ? 'Tidak ada hasil yang cocok dengan filter yang dipilih. Coba ubah kriteria filter Anda.'
              : 'Anda belum memiliki catatan pertukaran bibit atau hasil panen. Riwayat akan muncul setelah Anda melakukan pertukaran.'}
          </p>
          
          {filterType !== 'all' || filterRole !== 'all' ? (
            <div className="mt-4">
              <Button 
                onClick={() => { setFilterType('all'); setFilterRole('all'); }}
                className="bg-cyan-600 hover:bg-cyan-700 text-white"
              >
                Reset Filter
              </Button>
            </div>
          ) : (
            <div className="flex justify-center mt-6 space-x-4">
              <Button
                className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white shadow-md"
              >
                Jelajahi Posting
              </Button>
              
              <Button
                variant="outline"
                className="border-cyan-600 text-cyan-700 hover:bg-cyan-50"
              >
                Buat Posting
              </Button>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default HistoryPage;