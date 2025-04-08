import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/common/Layout';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Card from '../components/common/Card';
import { mockArticles } from '../data/mockData';
import { Article } from '../models/types';

// Enhanced article categories with more detailed styling
const articleCategories = [
  { id: 'planting', name: 'Cara Menanam', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: 'M6 13.5V6.75m0 0l-3-3m3 3h2.25A8.25 8.25 0 0118 12v0m-12.75 3.75h9.75m-9.75 0l-3 3m3-3v2.25a8.25 8.25 0 0118 0v-2.25' },
  { id: 'fertilizer', name: 'Pupuk & Nutrisi', color: 'bg-amber-50 text-amber-700 border-amber-200', icon: 'M3.75 7.5l16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 004.5 21h15a2.25 2.25 0 002.25-2.25V9.574c0-1.067-.75-1.994-1.8-2.169A48.329 48.329 0 0012 6.75zm-1.5 3.75a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm6.75.75a.75.75 0 00-1.5 0v8.25a.75.75 0 001.5 0V11.25z' },
  { id: 'pest', name: 'Hama & Penyakit', color: 'bg-rose-50 text-rose-700 border-rose-200', icon: 'M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z' },
  { id: 'harvest', name: 'Panen & Pascapanen', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: 'M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z' },
  { id: 'other', name: 'Edukasi Lainnya', color: 'bg-purple-50 text-purple-700 border-purple-200', icon: 'M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5' }
];

// Function to get the appropriate article image based on category
const getCategoryImage = (categoryId: string): string => {
  switch (categoryId) {
    case 'planting':
      return 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
    case 'fertilizer':
      return 'https://images.unsplash.com/photo-1584284867610-bf8330eeb4c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
    case 'pest':
      return 'https://images.unsplash.com/photo-1634138237256-84deb5d3d999?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
    case 'harvest':
      return 'https://images.unsplash.com/photo-1598512358669-ef567ef1d6cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
    default:
      return 'https://images.unsplash.com/photo-1585059895524-72359e06133a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
  }
};

const CreateEditArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const isEditMode = Boolean(id);
  const pageTitle = isEditMode ? 'Edit Artikel' : 'Tulis Artikel Baru';
  
  // Find article if in edit mode
  const existingArticle = isEditMode 
    ? mockArticles.find((a) => a.id === id) 
    : null;
  
  // Define a function to determine article category from title
  const getCategoryFromTitle = (title: string): string => {
    title = title.toLowerCase();
    if (title.includes('menanam') || title.includes('tanam') || title.includes('bibit')) {
      return 'planting';
    } else if (title.includes('pupuk') || title.includes('kompos') || title.includes('nutrisi')) {
      return 'fertilizer';
    } else if (title.includes('hama') || title.includes('penyakit') || title.includes('serangga')) {
      return 'pest';
    } else if (title.includes('panen') || title.includes('simpan') || title.includes('hasil')) {
      return 'harvest';
    }
    return 'other';
  };
  
  // Check if user is authorized to edit this article
  useEffect(() => {
    if (isEditMode && existingArticle && existingArticle.userId !== user?.id) {
      // Redirect if user is not the author
      navigate('/articles');
    }
  }, [isEditMode, existingArticle, user, navigate]);
  
  // Form state
  const [formData, setFormData] = useState<{
    title: string;
    content: string;
    categoryId: string;
    featuredImage: string;
    tags: string;
  }>({
    title: existingArticle?.title || '',
    content: existingArticle?.content || '',
    categoryId: existingArticle ? getCategoryFromTitle(existingArticle.title) : 'planting',
    featuredImage: '', // Will be set from file upload or category default
    tags: existingArticle?.tags?.join(', ') || '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [previewImage, setPreviewImage] = useState<string>(
    existingArticle?.image || 
    (existingArticle 
      ? getCategoryImage(getCategoryFromTitle(existingArticle.title))
      : getCategoryImage('planting'))
  );
  
  // Update preview image when category changes
  useEffect(() => {
    if (!formData.featuredImage) {
      setPreviewImage(getCategoryImage(formData.categoryId));
    }
  }, [formData.categoryId, formData.featuredImage]);
  
  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
    const file = e.target.files?.[0];
    
    if (file) {
      // In a real app, we would upload the file to a server
      // For now, just create a local URL to preview the image
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, featuredImage: imageUrl }));
      setPreviewImage(imageUrl);
    }
  };
  
  // Validate form
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Judul artikel harus diisi';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Konten artikel harus diisi';
    } else if (formData.content.length < 100) {
      newErrors.content = 'Konten terlalu singkat (min. 100 karakter)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Format tags from comma-separated string to array
  const formatTags = (tagsString: string): string[] => {
    return tagsString
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '');
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
      // Process tags
      const tags = formatTags(formData.tags);
      
      if (isEditMode && existingArticle) {
        // Update existing article
        Object.assign(existingArticle, {
          ...formData,
          tags,
          image: previewImage,
          category: formData.categoryId,
          updatedAt: new Date(),
        });
      } else {
        // Create new article
        const newArticle: Article = {
          id: `article-${Date.now()}`,
          userId: user.id,
          title: formData.title,
          content: formData.content,
          image: previewImage,
          category: formData.categoryId,
          tags,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        // In a real app, we would make an API call
        mockArticles.push(newArticle);
      }
      
      // Redirect to articles page
      navigate('/articles');
    } catch (error) {
      setSubmitError('Terjadi kesalahan. Silakan coba lagi.');
      console.error('Submit error:', error);
      setIsSubmitting(false);
    }
  };
  
  return (
    <Layout title={pageTitle}>
      {/* Page Header */}
      <div className="mb-8 bg-gradient-to-r from-emerald-600 to-teal-600 -mx-6 px-6 py-6 md:rounded-xl shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{pageTitle}</h1>
            <p className="text-emerald-100">
              {isEditMode 
                ? 'Perbaiki dan perbarui artikel Anda untuk memberikan informasi terbaik'
                : 'Bagikan pengetahuan dan pengalaman Anda dengan komunitas'}
            </p>
          </div>
          
          <Link to="/articles" className="text-white hover:text-emerald-100 transition-colors inline-flex items-center bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Kembali
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="shadow-lg border-t-4 border-emerald-500">
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitError && (
                <div className="p-4 bg-red-100 text-red-700 rounded-md text-sm border-l-4 border-red-500 flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>{submitError}</span>
                </div>
              )}
              
              <div className="mb-6">
                <Input
                  label="Judul Artikel"
                  name="title"
                  type="text"
                  placeholder="Masukkan judul artikel yang menarik..."
                  value={formData.title}
                  onChange={handleChange}
                  error={errors.title}
                  required
                  className="text-lg font-medium focus:ring-emerald-500"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kategori
                  </label>
                  <div className="relative">
                    <select
                      name="categoryId"
                      value={formData.categoryId}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none"
                    >
                      {articleCategories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={articleCategories.find(c => c.id === formData.categoryId)?.icon || articleCategories[0].icon} />
                      </svg>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tag Artikel
                  </label>
                  <Input
                    name="tags"
                    type="text"
                    placeholder="Pisahkan dengan koma, contoh: berkebun, hidroponik"
                    value={formData.tags}
                    onChange={handleChange}
                    leftIcon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                    }
                    className="focus:ring-emerald-500"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Tag membantu artikel Anda lebih mudah ditemukan
                  </p>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                  Konten Artikel
                </label>
                <div className="relative">
                  <textarea
                    name="content"
                    rows={15}
                    className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                      errors.content ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Tulis artikel Anda di sini..."
                    value={formData.content}
                    onChange={handleChange}
                    required
                  ></textarea>
                  {errors.content && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.content}
                    </p>
                  )}
                  <div className="absolute bottom-3 right-3 text-gray-400 text-xs">
                    {formData.content.length} karakter
                  </div>
                </div>
                <div className="mt-3 bg-amber-50 p-4 rounded-md border border-amber-100 shadow-sm">
                  <div className="flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium text-amber-800">Tips menulis artikel:</span>
                  </div>
                  <ul className="text-sm text-amber-700 ml-7 list-disc space-y-1">
                    <li>Gunakan baris kosong (tekan Enter dua kali) untuk membuat paragraf baru.</li>
                    <li>Buat daftar bernomor dengan format "1. Item satu" di awal baris.</li>
                    <li>Tuliskan langkah-langkah dengan jelas dan terstruktur agar mudah dipahami.</li>
                    <li>Sertakan informasi penting seperti jenis tanaman, waktu tanam, dan teknik khusus.</li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6 flex justify-end space-x-3">
                <Link to="/articles">
                  <Button variant="text" className="text-gray-700 hover:bg-gray-100">
                    Batal
                  </Button>
                </Link>
                
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                >
                  {isEditMode ? 'Simpan Perubahan' : 'Terbitkan Artikel'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
        
        <div className="lg:col-span-1 space-y-8">
          {/* Image upload card */}
          <Card className="shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 -mx-4 -mt-4 px-4 py-3 mb-4">
              <h3 className="text-lg font-medium text-white flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Gambar Artikel
              </h3>
            </div>
            
            <div className="mb-4">
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden shadow-inner border border-gray-200">
                <img 
                  src={previewImage} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1585059895524-72359e06133a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                  }}
                />
              </div>
              
              <div className={`mt-3 px-3 py-2 rounded-md ${articleCategories.find(c => c.id === formData.categoryId)?.color} flex items-center text-sm`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={articleCategories.find(c => c.id === formData.categoryId)?.icon || ''} />
                </svg>
                <span>
                  {formData.featuredImage 
                    ? 'Gambar diunggah oleh Anda' 
                    : `Gambar default untuk kategori ${articleCategories.find(c => c.id === formData.categoryId)?.name}`}
                </span>
              </div>
            </div>
            
            <div className="relative">
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                onChange={handleImageUpload}
              />
              <button 
                type="button" 
                className="w-full py-3 px-4 border border-emerald-300 rounded-md text-emerald-700 hover:bg-emerald-50 flex items-center justify-center transition-colors group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-emerald-600 group-hover:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Unggah Gambar Artikel
              </button>
            </div>
            
            <p className="mt-3 text-xs text-gray-500 flex flex-col space-y-1">
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                </svg>
                Format yang didukung: JPG, PNG, GIF
              </span>
            </p>
          </Card>
            
          {/* Preview card */}
          <Card className="shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-teal-600 to-emerald-600 -mx-4 -mt-4 px-4 py-3 mb-4">
              <h3 className="text-lg font-medium text-white flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Pratinjau Artikel
              </h3>
            </div>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                <img 
                  src={previewImage} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1585059895524-72359e06133a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                  }}
                />
                {formData.categoryId && (
                  <div className="absolute top-3 right-3">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium shadow-sm ${articleCategories.find(c => c.id === formData.categoryId)?.color}`}>
                      {articleCategories.find(c => c.id === formData.categoryId)?.name}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h4 className="font-medium text-gray-900 line-clamp-2 text-lg">
                  {formData.title || 'Judul Artikel'}
                </h4>
                
                <div className="flex items-center text-xs text-gray-500 mt-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mr-2">
                    {user?.name?.charAt(0).toUpperCase() || 'A'}
                  </div>
                  <span>{user?.name || 'Nama Penulis'}</span>
                  <span className="mx-1">•</span>
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-0.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Baru saja
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 line-clamp-3">
                  {formData.content || 'Isi artikel akan ditampilkan di sini. Mulailah menulis untuk melihat pratinjau.'}
                </p>
                
                {formData.tags && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {formatTags(formData.tags).slice(0, 3).map((tag, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        #{tag}
                      </span>
                    ))}
                    {formatTags(formData.tags).length > 3 && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        +{formatTags(formData.tags).length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            <p className="mt-4 text-xs text-gray-500 italic">
              Pratinjau ini menunjukkan bagaimana artikel Anda akan terlihat di halaman daftar artikel.
            </p>
          </Card>
            
          {/* Tips card */}
          <Card className="bg-gradient-to-b from-emerald-50 to-white border border-emerald-100 shadow-lg">
            <div className="flex items-start space-x-3 mb-4">
              <div className="bg-emerald-100 p-2 rounded-full text-emerald-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Tips Menulis Artikel Berkualitas</h3>
                <p className="text-sm text-emerald-700">Bantu pembaca mendapatkan informasi yang bermanfaat</p>
              </div>
            </div>
              
            <ul className="space-y-4 text-sm text-gray-700">
              <li className="flex items-start">
                <div className="bg-emerald-500 text-white rounded-full p-1 mr-3 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Judul yang menarik</span>
                  <p className="text-gray-600 text-xs mt-0.5">Berikan judul yang jelas dan menarik minat pembaca</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-emerald-500 text-white rounded-full p-1 mr-3 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Struktur yang baik</span>
                  <p className="text-gray-600 text-xs mt-0.5">Buatlah konten yang mudah dibaca dengan paragraf pendek</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-emerald-500 text-white rounded-full p-1 mr-3 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Langkah yang jelas</span>
                  <p className="text-gray-600 text-xs mt-0.5">Gunakan langkah-langkah berurutan yang mudah diikuti</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-emerald-500 text-white rounded-full p-1 mr-3 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Pengalaman pribadi</span>
                  <p className="text-gray-600 text-xs mt-0.5">Bagikan pengalaman pribadi dan tips unik Anda</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-emerald-500 text-white rounded-full p-1 mr-3 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Review sebelum terbit</span>
                  <p className="text-gray-600 text-xs mt-0.5">Lakukan review sebelum mempublikasikan artikel</p>
                </div>
              </li>
            </ul>
              
            <div className="mt-6 bg-white p-3 rounded-lg border border-emerald-100 shadow-sm">
              <p className="text-xs text-gray-700 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span>Artikel yang berkualitas memiliki peluang lebih besar untuk dilihat oleh banyak pengguna dan mendapatkan apresiasi komunitas.</span>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default CreateEditArticlePage;