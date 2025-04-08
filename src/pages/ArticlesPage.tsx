import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/common/Layout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { Article } from '../models/types';
import { mockArticles, mockUsers } from '../data/mockData';

const ArticlesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Get unique categories
  const categories = Array.from(
    new Set(mockArticles.filter(a => a.category).map(a => a.category))
  );
  
  // Filter articles based on search term and category
  const filteredArticles = mockArticles.filter((article) => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (article.tags && article.tags.some(tag => 
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    
    const matchesCategory = !selectedCategory || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Sort articles by date (newest first)
  const sortedArticles = [...filteredArticles].sort(
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
  
  // Function to get excerpt (first 150 characters)
  const getExcerpt = (content: string, maxLength = 150): string => {
    if (content.length <= maxLength) {
      return content;
    }
    
    return content.substring(0, maxLength) + '...';
  };
  
  return (
    <Layout title="Artikel Edukasi">
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl p-8 mb-8 text-white shadow-lg overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mt-20 -mr-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -mb-16 -ml-16"></div>
        
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Artikel Edukasi</h1>
          <p className="text-teal-100 mb-6">Temukan artikel menarik tentang berbagai topik pendidikan</p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/articles/create" className="sm:w-auto">
            <Button
  className="bg-white text-black hover:bg-teal-50 w-full sm:w-auto"
  leftIcon={
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
  }
>
  Tulis Artikel
</Button>

            </Link>
            
            <div className="w-full sm:max-w-md">
              <Input
                type="search"
                placeholder="Cari artikel, topik, atau tag..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/20 backdrop-blur-sm border-transparent focus:bg-white focus:text-gray-800 placeholder-white/70 text-white"
                leftIcon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                }
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Category Filters */}
      {categories.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              selectedCategory === null
                ? 'bg-teal-600 text-white font-medium shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setSelectedCategory(null)}
          >
            Semua Artikel
          </button>
          
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                selectedCategory === category
                  ? 'bg-teal-600 text-white font-medium shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      )}
      
      {/* Featured Article */}
      {sortedArticles.length > 0 && (
        <div className="mb-10">
          <div className="relative rounded-xl overflow-hidden shadow-lg">
            <div className="relative aspect-video md:aspect-[2.1/1] overflow-hidden bg-gray-200">
              <img 
                src={sortedArticles[0].image || 'https://via.placeholder.com/1200x600?text=Artikel'} 
                alt={sortedArticles[0].title} 
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              {sortedArticles[0].category && (
                <span className="inline-block bg-teal-600 text-white text-xs px-3 py-1 rounded-full mb-3">
                  {sortedArticles[0].category}
                </span>
              )}
              
              <h2 className="text-2xl md:text-3xl font-bold mb-2">{sortedArticles[0].title}</h2>
              
              <div className="flex items-center text-white/80 text-sm mb-4">
                <span>{getUserName(sortedArticles[0].userId)}</span>
                <span className="mx-2">•</span>
                <span>{formatDate(sortedArticles[0].createdAt)}</span>
              </div>
              
              <p className="text-white/90 mb-4 line-clamp-2 md:w-3/4">
                {getExcerpt(sortedArticles[0].content, 180)}
              </p>
              
              <Link to={`/articles/${sortedArticles[0].id}`}>
              <Button className="bg-white !text-teal-700 hover:bg-teal-50">
  Baca Selengkapnya
</Button>


              </Link>
            </div>
          </div>
        </div>
      )}
      
      {/* Results count */}
      {sortedArticles.length > 0 && (
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Artikel Terbaru</h3>
          
          <div className="text-gray-500 text-sm flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-teal-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            Diurutkan dari terbaru
          </div>
        </div>
      )}
      
      {/* Articles Grid */}
      {sortedArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Skip the first article if more than one (it's featured) */}
          {(sortedArticles.length > 1 ? sortedArticles.slice(1) : sortedArticles).map((article) => (
            <ArticleCard 
              key={article.id} 
              article={article} 
              userName={getUserName(article.userId)}
              formatDate={formatDate}
              getExcerpt={getExcerpt}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-xl shadow-md">
          <div className="bg-white w-20 h-20 mx-auto rounded-full flex items-center justify-center shadow-sm mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-gray-400"
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
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Tidak ada artikel</h3>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            {searchTerm || selectedCategory
              ? 'Tidak ada hasil yang cocok dengan pencarian atau filter Anda'
              : 'Belum ada artikel edukasi yang ditulis'}
          </p>
          <Link to="/articles/create">
            <Button className="bg-teal-600 hover:bg-teal-700 text-white shadow-md">
              Tulis Artikel Baru
            </Button>
          </Link>
        </div>
      )}
    </Layout>
  );
};

// Article Card Component
interface ArticleCardProps {
  article: Article;
  userName: string;
  formatDate: (date: Date) => string;
  getExcerpt: (content: string, maxLength?: number) => string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ 
  article, 
  userName, 
  formatDate,
  getExcerpt
}) => {
  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 group">
      {/* Card Image */}
      {article.image && (
        <Link to={`/articles/${article.id}`} className="block relative h-44 -mx-4 -mt-4 mb-4 overflow-hidden">
          <img 
            src={article.image || 'https://via.placeholder.com/400x300?text=Artikel'} 
            alt={article.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {article.category && (
            <span className="absolute top-3 right-3 bg-white/90 text-teal-700 text-xs px-2 py-1 rounded-full shadow-sm">
              {article.category}
            </span>
          )}
        </Link>
      )}
      
      {/* Card Content */}
      <div className="flex-1">
        <Link to={`/articles/${article.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-teal-700 transition-colors mb-2 line-clamp-2">
            {article.title}
          </h3>
        </Link>
        
        <div className="flex items-center text-xs text-gray-500 mb-3">
          <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mr-2">
            {userName.charAt(0).toUpperCase()}
          </div>
          <span>{userName}</span>
          <span className="mx-2">•</span>
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatDate(article.createdAt)}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {getExcerpt(article.content, 120)}
        </p>
      </div>
      
      {/* Card Footer */}
      <div className="mt-auto pt-4 flex flex-col">
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {article.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                #{tag}
              </span>
            ))}
            {article.tags.length > 3 && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                +{article.tags.length - 3}
              </span>
            )}
          </div>
        )}
        
        <Link to={`/articles/${article.id}`} className="mt-auto">
          <Button 
            variant="outline" 
            size="sm"
            className="w-full border-teal-200 text-teal-700 hover:bg-teal-700 hover:text-white hover:border-teal-700 group"
          >
            <span className="flex items-center justify-center">
              Baca selengkapnya
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default ArticlesPage;