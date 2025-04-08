import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '../components/common/Layout';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { mockArticles, mockUsers } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const ArticleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Find the article with the matching ID
  const article = mockArticles.find((a) => a.id === id);
  
  // If article not found, show error
  if (!article) {
    return (
      <Layout title="Artikel Tidak Ditemukan">
        <div className="text-center py-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-900">Artikel Tidak Ditemukan</h3>
          <p className="mt-2 text-gray-500">
            Artikel yang Anda cari tidak ditemukan atau telah dihapus.
          </p>
          <div className="mt-6">
            <Link to="/articles">
              <Button className="bg-gradient-to-r from-primary to-green-600 hover:from-green-600 hover:to-primary transition-all duration-300">
                Kembali ke Daftar Artikel
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
  
  // Get article author
  const author = mockUsers.find((u) => u.id === article.userId);
  
  // Check if current user is the author
  const isAuthor = user?.id === article.userId;
  
  // Format date
  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };
  
  // Handle delete article
  const handleDeleteArticle = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
      // In a real app, this would be an API call
      // For now, just redirect to articles page
      navigate('/articles');
    }
  };
  
  // Format the article content with proper paragraphs
  const formatContent = (content: string): React.ReactNode => {
    return content.split('\n\n').map((paragraph, index) => (
      <p key={index} className="mb-4">
        {paragraph}
      </p>
    ));
  };
  
  // Get related articles (excluding current article)
  const relatedArticles = mockArticles
    .filter(a => 
      a.id !== article.id && 
      (a.category === article.category || 
        (article.tags && a.tags && a.tags.some(tag => article.tags?.includes(tag))))
    )
    .slice(0, 3);

  // If there aren't enough category/tag matches, add other articles
  if (relatedArticles.length < 3) {
    const moreArticles = mockArticles
      .filter(a => a.id !== article.id && !relatedArticles.find(r => r.id === a.id))
      .slice(0, 3 - relatedArticles.length);
    
    relatedArticles.push(...moreArticles);
  }
  
  return (
    <Layout title={article.title}>
      {/* Back link */}
      <div className="mb-6">
        <Link to="/articles" className="text-primary hover:text-primary-dark transition-colors hover:underline inline-flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Kembali ke Daftar Artikel
        </Link>
      </div>
      
      {/* Article Hero */}
      <div className="relative rounded-xl overflow-hidden h-64 md:h-96 mb-8">
        <img 
          src={article.image || '/src/assets/images/placeholder.jpg'} 
          alt={article.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        
        {/* Category Badge */}
        {article.category && (
          <div className="absolute top-4 right-4 z-10">
            <span className="inline-block px-3 py-1 bg-white/80 backdrop-blur-sm text-primary text-sm font-medium rounded-full">
              {article.category}
            </span>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="overflow-visible">
            {/* Article Header */}
            <div className="-mt-16 relative z-10 bg-white rounded-lg shadow-xl p-6 mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{article.title}</h1>
              
              <div className="flex flex-wrap items-center text-gray-500 gap-3 mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary-light text-white flex items-center justify-center mr-2 shadow-sm">
                    {author?.profileImage ? (
                      <img
                        src={author.profileImage}
                        alt={author.name}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <span className="text-lg font-medium">{author?.name.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <span className="font-medium text-gray-800">{author?.name}</span>
                </div>
                
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                
                <div className="flex items-center text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{formatDate(article.createdAt)}</span>
                </div>
                
                {article.updatedAt > article.createdAt && (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                    <div className="text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Diperbarui: {formatDate(article.updatedAt)}
                    </div>
                  </>
                )}
              </div>
              
              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {article.tags.map((tag, index) => (
                    <span key={index} className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full transition-colors">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            {/* Article Content */}
            <article className="prose prose-green max-w-none">
              <div className="text-gray-700 text-lg leading-relaxed">
                {formatContent(article.content)}
              </div>
            </article>
            
            {/* Share Section */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Bagikan artikel ini:</h4>
                  <div className="flex space-x-2">
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
                      </svg>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-400 hover:bg-blue-400 hover:text-white transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100 text-green-600 hover:bg-green-600 hover:text-white transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8.339 18.337H5.667v-8.59h2.672v8.59zM7.003 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096zm11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.71z"/>
                      </svg>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100 text-green-600 hover:bg-green-600 hover:text-white transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.031 6.172a5.773 5.773 0 0 0-5.768 5.769 5.774 5.774 0 0 0 5.768 5.769 5.774 5.774 0 0 0 5.768-5.769 5.773 5.773 0 0 0-5.768-5.769zm3.635 7.18a.42.42 0 0 1-.42.42h-6.43a.42.42 0 0 1-.42-.42v-1.42h7.27v1.42zm-8.4-3.56a.42.42 0 0 1 .42-.42h4.43v1.22h-4.85v-.8zm6.88 0a.42.42 0 0 0-.42-.42H9.9v1.22h4.85v-.8z"/>
                      </svg>
                    </button>
                  </div>
                </div>
                
                {isAuthor && (
                  <div className="flex space-x-3">
                    <Link to={`/articles/edit/${article.id}`}>
                      <Button variant="outline" size="sm" leftIcon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      }>
                        Edit
                      </Button>
                    </Link>
                    
                    <Button
                      variant="danger"
                      size="sm"
                      leftIcon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      }
                      onClick={handleDeleteArticle}
                    >
                      Hapus
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          {/* Author Card */}
          <Card className="bg-gradient-to-br from-green-50 to-blue-50">
            <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">Tentang Penulis</h3>
            <div className="flex flex-col items-center text-center mb-4">
              <div className="w-20 h-20 rounded-full bg-primary-light text-white flex items-center justify-center mb-3 shadow-md">
                {author?.profileImage ? (
                  <img
                    src={author.profileImage}
                    alt={author.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-medium">{author?.name.charAt(0).toUpperCase()}</span>
                )}
              </div>
              <h4 className="font-medium text-gray-900 text-lg">{author?.name}</h4>
              <p className="text-sm text-gray-600 mt-1">{author?.location}</p>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-start">
                <span className="text-gray-600 mr-2 min-w-24">Tanaman Favorit:</span>
                <div className="flex flex-wrap gap-1">
                  {author?.favoritePlants.map((plant, index) => (
                    <span key={index} className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                      {plant}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
          
          {/* Related Articles */}
          <Card>
            <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">Artikel Terkait</h3>
            
            {relatedArticles.length > 0 ? (
              <div className="space-y-4">
                {relatedArticles.map(relatedArticle => (
                  <Link 
                    key={relatedArticle.id} 
                    to={`/articles/${relatedArticle.id}`} 
                    className="flex items-start space-x-3 group"
                  >
                    <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={relatedArticle.image || '/src/assets/images/placeholder.jpg'} 
                        alt={relatedArticle.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 group-hover:text-primary transition-colors text-sm line-clamp-2">
                        {relatedArticle.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(relatedArticle.createdAt)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">Tidak ada artikel terkait</p>
            )}
          </Card>
          
          {/* Tags Cloud */}
          {article.tags && article.tags.length > 0 && (
            <Card>
              <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full cursor-pointer transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ArticleDetailPage;