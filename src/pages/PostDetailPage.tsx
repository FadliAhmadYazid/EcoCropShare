import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '../components/common/Layout';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { mockPosts, mockUsers, mockComments } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { Comment } from '../models/types';

const PostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Find the post with the matching ID
  const post = mockPosts.find((p) => p.id === id);
  
  // State for the comment form
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State for mark as completed modal
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [partnerName, setPartnerName] = useState('');
  const [notes, setNotes] = useState('');
  
  // If post not found, show error
  if (!post) {
    return (
      <Layout title="Post Tidak Ditemukan">
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
          <h3 className="text-lg font-medium text-gray-900">Post Tidak Ditemukan</h3>
          <p className="mt-2 text-gray-500">
            Post yang Anda cari tidak ditemukan atau telah dihapus.
          </p>
          <div className="mt-6">
            <Link to="/posts">
              <Button>Kembali ke Daftar Post</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
  
  // Get post author
  const author = mockUsers.find((u) => u.id === post.userId);
  
  // Check if current user is the author
  const isAuthor = user?.id === post.userId;
  
  // Format date
  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };
  
  // Handle comment submission
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!commentText.trim() || !user) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // Create new comment
      const newComment: Comment = {
        id: `comment-${Date.now()}`,
        userId: user.id,
        parentId: post.id,
        parentType: 'post',
        content: commentText,
        createdAt: new Date(),
      };
      
      // Add comment to post (in a real app, this would be an API call)
      post.comments.push(newComment);
      
      // Clear form
      setCommentText('');
      setIsSubmitting(false);
    }, 500);
  };
  
  // Handle mark as completed
  const handleMarkAsCompleted = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!partnerName.trim()) {
      return;
    }
    
    // In a real app, this would be an API call
    post.status = 'completed';
    
    // Redirect to history page (in a real app, we would create a history record)
    navigate('/history');
  };
  
  // Handle delete post
  const handleDeletePost = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus post ini?')) {
      // In a real app, this would be an API call
      // For now, just redirect to posts page
      navigate('/posts');
    }
  };
  
  return (
    <Layout title={post.title}>
      <div className="mb-6">
        <Link to="/posts" className="text-primary hover:underline inline-flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Kembali ke Daftar
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <div className="space-y-6">
              <div>
                <div className="mb-4 rounded-lg overflow-hidden h-64 bg-gray-100">
                  <img
                    src={post.images[0] || '/src/assets/images/placeholder.jpg'}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    post.type === 'seed' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                  }`}>
                    {post.type === 'seed' ? 'Bibit' : 'Hasil Panen'}
                  </span>
                  
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    post.status === 'available' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {post.status === 'available' ? 'Tersedia' : 'Selesai'}
                  </span>
                  
                  <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    Jumlah: {post.quantity}
                  </span>
                </div>
                
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{post.title}</h1>
                
                <div className="flex items-center text-gray-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>{post.location}</span>
                </div>
                
                <div className="prose max-w-none">
                  <p className="text-gray-700">{post.description}</p>
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Komentar ({post.comments.length})</h2>
                
                {post.comments.length > 0 ? (
                  <div className="space-y-4">
                    {post.comments.map((comment) => {
                      const commentAuthor = mockUsers.find((u) => u.id === comment.userId);
                      return (
                        <div key={comment.id} className="border border-gray-100 rounded-md p-4">
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                              {commentAuthor?.profileImage ? (
                                <img
                                  src={commentAuthor.profileImage}
                                  alt={commentAuthor.name}
                                  className="w-8 h-8 rounded-full"
                                />
                              ) : (
                                <span>{commentAuthor?.name.charAt(0)}</span>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium text-gray-900">{commentAuthor?.name || 'Pengguna'}</h4>
                                <span className="text-xs text-gray-500">
                                  {formatDate(comment.createdAt)}
                                </span>
                              </div>
                              <p className="text-gray-700 mt-1">{comment.content}</p>
                              
                              {user?.id === comment.userId && (
                                <div className="mt-2 text-right">
                                  <button className="text-xs text-red-600 hover:text-red-800">
                                    Hapus
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-6 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Belum ada komentar</p>
                  </div>
                )}
                
                {user && post.status === 'available' && (
                  <div className="mt-6">
                    <h3 className="text-md font-medium text-gray-900 mb-2">Tambah Komentar</h3>
                    <form onSubmit={handleCommentSubmit}>
                      <div className="mb-3">
                        <textarea
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          rows={3}
                          placeholder="Tulis komentar atau permintaan Anda..."
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          required
                        ></textarea>
                      </div>
                      <div className="text-right">
                        <Button
                          type="submit"
                          isLoading={isSubmitting}
                          disabled={isSubmitting || !commentText.trim()}
                        >
                          Kirim Komentar
                        </Button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <div className="space-y-6">
            <Card>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Informasi Pembagi</h3>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  {author?.profileImage ? (
                    <img
                      src={author.profileImage}
                      alt={author.name}
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <span className="text-xl">{author?.name.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{author?.name}</h4>
                  <p className="text-sm text-gray-600">{author?.location}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tanaman Favorit:</span>
                  <span className="text-gray-900">{author?.favoritePlants.join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dibagikan pada:</span>
                  <span className="text-gray-900">{formatDate(post.createdAt)}</span>
                </div>
              </div>
            </Card>
            
            {isAuthor && post.status === 'available' && (
              <Card>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Kelola Post</h3>
                <div className="space-y-3">
                  <Link to={`/posts/edit/${post.id}`}>
                    <Button variant="outline" isFullWidth leftIcon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    }>
                      Edit Post
                    </Button>
                  </Link>
                  
                  <Button
                    variant="primary"
                    isFullWidth
                    leftIcon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    }
                    onClick={() => setShowCompleteModal(true)}
                  >
                    Tandai Selesai
                  </Button>
                  
                  <Button
                    variant="danger"
                    isFullWidth
                    leftIcon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    }
                    onClick={handleDeletePost}
                  >
                    Hapus Post
                  </Button>
                </div>
              </Card>
            )}
            
            {!isAuthor && post.status === 'available' && (
              <Card>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Tertarik?</h3>
                <p className="text-gray-600 mb-4">
                  Jika Anda tertarik dengan bibit atau hasil panen ini, silakan kirim komentar untuk menghubungi pembagi.
                </p>
                <Button
                  isFullWidth
                  onClick={() => {
                    // Focus on the comment textarea
                    const textarea = document.querySelector('textarea');
                    if (textarea) {
                      textarea.focus();
                    }
                  }}
                >
                  Kirim Permintaan
                </Button>
              </Card>
            )}
            
            {post.status === 'completed' && (
              <Card className="bg-gray-50">
                <div className="flex items-center space-x-2 text-gray-800 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <h3 className="text-lg font-medium">Post Sudah Selesai</h3>
                </div>
                <p className="text-gray-600">
                  Bibit atau hasil panen ini sudah diberikan dan tidak tersedia lagi.
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
      
      {/* Mark as Completed Modal */}
      {showCompleteModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black opacity-30"></div>
            
            <div className="relative bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Tandai Post Selesai</h3>
              
              <form onSubmit={handleMarkAsCompleted}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Penerima
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Masukkan nama penerima"
                    value={partnerName}
                    onChange={(e) => setPartnerName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Catatan (opsional)
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    rows={3}
                    placeholder="Tambahkan catatan tentang transaksi ini"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  ></textarea>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <Button
                    variant="text"
                    onClick={() => setShowCompleteModal(false)}
                  >
                    Batal
                  </Button>
                  
                  <Button
                    type="submit"
                    disabled={!partnerName.trim()}
                  >
                    Konfirmasi
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default PostDetailPage;