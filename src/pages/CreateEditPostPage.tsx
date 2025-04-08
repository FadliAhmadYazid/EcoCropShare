import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/common/Layout';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Card from '../components/common/Card';
import { mockPosts } from '../data/mockData';
import { Post } from '../models/types';

const CreateEditPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const isEditMode = Boolean(id);
  const pageTitle = isEditMode ? 'Edit Post' : 'Tambah Post Baru';
  
  // Find post if in edit mode
  const existingPost = isEditMode 
    ? mockPosts.find((p) => p.id === id) 
    : null;
  
  // Check if user is authorized to edit this post
  useEffect(() => {
    if (isEditMode && existingPost && existingPost.userId !== user?.id) {
      // Redirect if user is not the author
      navigate('/posts');
    }
  }, [isEditMode, existingPost, user, navigate]);
  
  // Form state
  const [formData, setFormData] = useState<{
    title: string;
    type: 'seed' | 'harvest';
    quantity: number;
    location: string;
    description: string;
    images: string[];
  }>({
    title: existingPost?.title || '',
    type: existingPost?.type || 'seed',
    quantity: existingPost?.quantity || 1,
    location: existingPost?.location || (user?.location || ''),
    description: existingPost?.description || '',
    images: existingPost?.images || [],
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' ? Number(value) : value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
    
    // Clear submit error
    if (submitError) {
      setSubmitError('');
    }
  };
  
  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    
    if (files && files.length > 0) {
      // In a real app, we would upload the file to a server
      // For now, let's use a placeholder
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, '/src/assets/images/placeholder.jpg'],
      }));
    }
  };
  
  // Validate form
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Judul harus diisi';
    }
    
    if (formData.quantity <= 0) {
      newErrors.quantity = 'Jumlah harus lebih dari 0';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Lokasi harus diisi';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Deskripsi harus diisi';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate() || !user) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      if (isEditMode && existingPost) {
        // Update existing post
        Object.assign(existingPost, {
          ...formData,
          updatedAt: new Date(),
        });
      } else {
        // Create new post
        const newPost: Post = {
          id: `post-${Date.now()}`,
          userId: user.id,
          ...formData,
          status: 'available',
          createdAt: new Date(),
          updatedAt: new Date(),
          comments: [],
        };
        
        // In a real app, we would make an API call
        mockPosts.push(newPost);
      }
      
      // Redirect to posts page
      navigate('/posts');
    } catch (error) {
      setSubmitError('Terjadi kesalahan. Silakan coba lagi.');
      console.error('Submit error:', error);
      setIsSubmitting(false);
    }
  };
  
  return (
    <Layout title={pageTitle}>
      <div className="max-w-5xl mx-auto">
        {/* Page Header with Back Button */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/posts" className="text-green-600 hover:text-green-700 transition-colors mr-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              <span>Kembali</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">
              {isEditMode ? 'Edit Tanaman' : 'Bagikan Tanaman Baru'}
            </h1>
          </div>
          
          <div className="bg-green-50 px-4 py-2 rounded-full text-sm font-medium text-green-700 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Semua informasi akan ditampilkan di komunitas</span>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all">
          {/* Form Stepper Header */}
          <div className="relative bg-gradient-to-r from-green-600 to-emerald-500 py-6 px-8 text-white">
            <h2 className="text-xl font-semibold mb-2">
              {isEditMode ? 'Perbarui informasi tanaman Anda' : 'Bagikan tanaman dengan komunitas'}
            </h2>
            <p className="text-green-100">Lengkapi detail berikut untuk {isEditMode ? 'memperbarui' : 'menambahkan'} bibit atau hasil panen yang ingin Anda bagikan</p>
            
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 text-green-400 opacity-20 transform rotate-45">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8">
            {submitError && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-red-700">{submitError}</span>
              </div>
            )}
            
            {/* Type Selection with Icons */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Apa yang ingin Anda bagikan?
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`relative flex flex-col items-center p-6 border-2 rounded-xl cursor-pointer transition-all ${
                  formData.type === 'seed' 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-green-300'
                }`}>
                  <input
                    type="radio"
                    name="type"
                    value="seed"
                    checked={formData.type === 'seed'}
                    onChange={() => setFormData(prev => ({ ...prev, type: 'seed' }))}
                    className="sr-only"
                  />
                  <div className={`rounded-full p-3 mb-3 ${
                    formData.type === 'seed' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-500'
                  }`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <span className="block text-base font-medium text-gray-900">Bibit Tanaman</span>
                    <span className="block text-sm text-gray-500 mt-1">Berbagi bibit untuk ditanam</span>
                  </div>
                  {formData.type === 'seed' && (
                    <div className="absolute top-3 right-3 text-green-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </label>
                
                <label className={`relative flex flex-col items-center p-6 border-2 rounded-xl cursor-pointer transition-all ${
                  formData.type === 'harvest' 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-green-300'
                }`}>
                  <input
                    type="radio"
                    name="type"
                    value="harvest"
                    checked={formData.type === 'harvest'}
                    onChange={() => setFormData(prev => ({ ...prev, type: 'harvest' }))}
                    className="sr-only"
                  />
                  <div className={`rounded-full p-3 mb-3 ${
                    formData.type === 'harvest' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-500'
                  }`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <span className="block text-base font-medium text-gray-900">Hasil Panen</span>
                    <span className="block text-sm text-gray-500 mt-1">Berbagi hasil panen berlebih</span>
                  </div>
                  {formData.type === 'harvest' && (
                    <div className="absolute top-3 right-3 text-green-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </label>
              </div>
            </div>
            
            {/* Basic Information */}
            <div className="bg-gray-50 p-6 rounded-xl mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Informasi Dasar
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Judul <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    placeholder={formData.type === 'seed' ? "Contoh: Bibit Tomat Cherry" : "Contoh: Bayam Organik Segar"}
                    value={formData.title}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.title ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-green-500'
                    } focus:outline-none focus:ring-2 focus:ring-green-200 transition-colors`}
                    required
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      {errors.title}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Lokasi <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      placeholder="Kota/Kecamatan Anda"
                      value={formData.location}
                      onChange={handleChange}
                      className={`w-full pl-10 px-4 py-3 rounded-lg border ${
                        errors.location ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-green-500'
                      } focus:outline-none focus:ring-2 focus:ring-green-200 transition-colors`}
                      required
                    />
                  </div>
                  {errors.location && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      {errors.location}
                    </p>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                  Jumlah <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.quantity ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-green-500'
                    } focus:outline-none focus:ring-2 focus:ring-green-200 transition-colors`}
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-sm text-gray-500">
                    {formData.type === 'seed' ? 'bibit/pot' : 'kg/ikat'}
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  {formData.type === 'seed' 
                    ? 'Contoh: 5 pot, 10 bibit, dll.' 
                    : 'Contoh: 2 kg, 5 ikat, dll.'}
                </p>
                {errors.quantity && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    {errors.quantity}
                  </p>
                )}
              </div>
            </div>
            
            {/* Description */}
            <div className="bg-gray-50 p-6 rounded-xl mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                Deskripsi
              </h3>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Deskripsi <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  placeholder={formData.type === 'seed'
                    ? "Jelaskan tentang bibit yang Anda bagikan, contoh: jenis, cara menanam, perawatan, dll."
                    : "Jelaskan tentang hasil panen yang Anda bagikan, contoh: kapan dipanen, cara pengolahan, dll."
                  }
                  value={formData.description}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.description ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-green-500'
                  } focus:outline-none focus:ring-2 focus:ring-green-200 transition-colors`}
                  required
                ></textarea>
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    {errors.description}
                  </p>
                )}
                <p className="mt-2 text-sm text-gray-500">
                  Berikan informasi yang jelas agar pengguna lain tertarik dengan tanaman Anda.
                </p>
              </div>
            </div>
            
            {/* Photos */}
            <div className="bg-gray-50 p-6 rounded-xl mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Foto (opsional)
              </h3>
              
              {formData.images.length > 0 && (
                <div className="mb-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden bg-gray-200">
                          <img
                            src={image}
                            alt={`Gambar ${index + 1}`}
                            className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
                          />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              type="button"
                              onClick={() => {
                                setFormData((prev) => ({
                                  ...prev,
                                  images: prev.images.filter((_, i) => i !== index),
                                }));
                              }}
                              className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col justify-center items-center bg-white hover:bg-gray-50 transition-colors cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  
                  <label className="flex flex-col items-center cursor-pointer">
                    <span className="text-sm font-medium text-green-600 hover:text-green-700">Tambahkan foto</span>
                    <span className="mt-1 text-xs text-gray-500">atau seret dan lepas</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                  
                  <p className="mt-4 text-xs text-gray-500 text-center">
                    Format yang didukung: JPG, PNG, atau GIF (maks. 10MB)
                    <br />
                    <span className="text-green-600">Foto yang menarik dapat meningkatkan minat pengguna lain!</span>
                  </p>
                </div>
              </div>
            </div>
            
            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200">
              <Link 
                to="/posts"
                className="inline-flex justify-center items-center px-6 py-3 border border-gray-300 rounded-lg text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              >
                Batal
              </Link>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-sm transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Memproses...</span>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {isEditMode ? 'Simpan Perubahan' : 'Publikasikan'}
                  </>
                )}
              </button>
            </div>
            
            {/* Tips Card */}
            <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-800 mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Tips untuk mendapatkan respon lebih banyak:
              </h4>
              <ul className="text-sm text-green-700 space-y-2 ml-7 list-disc">
                <li>Tambahkan foto berkualitas bagus dari tanaman Anda</li>
                <li>Berikan detail spesifik tentang kondisi dan kebutuhan tanaman</li>
                <li>Sebutkan kapan tanaman tersedia untuk diambil</li>
                <li>Jelaskan apakah Anda menawarkan bantuan untuk pengambilan/pengiriman</li>
              </ul>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateEditPostPage;