import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/common/Layout';
import { mockRequests } from '../data/mockData';
import { Request } from '../models/types';

const CreateEditRequestPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const isEditMode = Boolean(id);
  const pageTitle = isEditMode ? 'Edit Permintaan' : 'Buat Permintaan Baru';
  
  // Find request if in edit mode
  const existingRequest = isEditMode 
    ? mockRequests.find((req) => req.id === id) 
    : null;
  
  // Check if user is authorized to edit this request
  useEffect(() => {
    if (isEditMode && existingRequest && existingRequest.userId !== user?.id) {
      // Redirect if user is not the author
      navigate('/requests');
    }
  }, [isEditMode, existingRequest, user, navigate]);
  
  // Form state
  const [formData, setFormData] = useState<{
    plantName: string;
    location: string;
    reason: string;
    category: string;
    quantity: string;
  }>({
    plantName: existingRequest?.plantName || '',
    location: existingRequest?.location || (user?.location || ''),
    reason: existingRequest?.reason || '',
    category: existingRequest?.category || 'buah',
    quantity: existingRequest?.quantity || '1',
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
  
  // Validate form
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.plantName.trim()) {
      newErrors.plantName = 'Nama tanaman harus diisi';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Lokasi harus diisi';
    }
    
    if (!formData.reason.trim()) {
      newErrors.reason = 'Alasan permintaan harus diisi';
    } else if (formData.reason.length < 10) {
      newErrors.reason = 'Alasan terlalu singkat (min. 10 karakter)';
    }
    
    if (!formData.quantity.trim() || parseInt(formData.quantity) < 1) {
      newErrors.quantity = 'Jumlah harus diisi dengan nilai minimal 1';
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
      if (isEditMode && existingRequest) {
        // Update existing request
        Object.assign(existingRequest, {
          ...formData,
          updatedAt: new Date(),
        });
      } else {
        // Create new request
        const newRequest: Request = {
          id: `request-${Date.now()}`,
          userId: user.id,
          ...formData,
          status: 'open',
          createdAt: new Date(),
          updatedAt: new Date(),
          comments: [],
        };
        
        // In a real app, we would make an API call
        mockRequests.push(newRequest);
      }
      
      // Redirect to requests page
      navigate('/requests');
    } catch (error) {
      setSubmitError('Terjadi kesalahan. Silakan coba lagi.');
      console.error('Submit error:', error);
      setIsSubmitting(false);
    }
  };
  
  const plantCategories = [
    { value: 'buah', label: 'Tanaman Buah' },
    { value: 'sayur', label: 'Tanaman Sayur' },
    { value: 'hias', label: 'Tanaman Hias' },
    { value: 'obat', label: 'Tanaman Obat' },
    { value: 'lainnya', label: 'Lainnya' },
  ];
  
  return (
    <Layout title={pageTitle}>
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-500 to-green-500 -mt-6 -mx-4 px-4 py-8 mb-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-white mb-2">{pageTitle}</h1>
          <p className="text-emerald-100">Buat permintaan baru untuk mendapatkan tanaman yang Anda butuhkan</p>
        </div>
      </div>
      
      <div className="max-w-5xl mx-auto">
        {/* Back Button with improved styling */}
        <div className="mb-8">
          <Link 
            to="/requests" 
            className="inline-flex items-center px-5 py-2.5 text-white bg-emerald-600 rounded-lg shadow-md 
                   transition-all duration-300 hover:bg-emerald-700 hover:shadow-lg group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" 
                 viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Kembali ke Daftar Permintaan
          </Link>
        </div>
        
        {submitError && (
          <div className="p-4 mb-6 border-l-4 border-red-500 bg-red-50 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{submitError}</p>
              </div>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-emerald-100 rounded-xl mr-4">
                <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Detail Permintaan Tanaman</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Nama Tanaman
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
                    </svg>
                  </div>
                  <input
                    name="plantName"
                    type="text"
                    className={`bg-emerald-50 border-2 ${errors.plantName ? 'border-red-400' : 'border-emerald-200 focus:border-emerald-500'} 
                            text-gray-900 text-md rounded-lg block w-full pl-12 p-4 focus:ring-4 focus:ring-emerald-100 focus:outline-none`}
                    placeholder="Contoh: Bibit Tomat, Cabai Rawit, dll."
                    value={formData.plantName}
                    onChange={handleChange}
                    required
                  />
                  {errors.plantName && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      {errors.plantName}
                    </p>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Kategori Tanaman
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <select
                    name="category"
                    className="bg-emerald-50 border-2 border-emerald-200 focus:border-emerald-500 
                            text-gray-900 text-md rounded-lg block w-full pl-12 p-4 focus:ring-4 focus:ring-emerald-100 focus:outline-none appearance-none"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    {plantCategories.map(category => (
                      <option key={category.value} value={category.value}>{category.label}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Lokasi
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <input
                    name="location"
                    type="text"
                    className={`bg-emerald-50 border-2 ${errors.location ? 'border-red-400' : 'border-emerald-200 focus:border-emerald-500'} 
                            text-gray-900 text-md rounded-lg block w-full pl-12 p-4 focus:ring-4 focus:ring-emerald-100 focus:outline-none`}
                    placeholder="Kota/Kecamatan Anda"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                  {errors.location && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      {errors.location}
                    </p>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Jumlah yang Dibutuhkan
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                    </svg>
                  </div>
                  <input
                    name="quantity"
                    type="number"
                    min="1"
                    className={`bg-emerald-50 border-2 ${errors.quantity ? 'border-red-400' : 'border-emerald-200 focus:border-emerald-500'} 
                            text-gray-900 text-md rounded-lg block w-full pl-12 p-4 focus:ring-4 focus:ring-emerald-100 focus:outline-none`}
                    placeholder="Masukkan jumlah"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                  />
                  {errors.quantity && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      {errors.quantity}
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Alasan Permintaan
              </label>
              <div className="relative">
                <textarea
                  name="reason"
                  rows={6}
                  className={`bg-emerald-50 border-2 ${errors.reason ? 'border-red-400' : 'border-emerald-200 focus:border-emerald-500'} 
                          text-gray-900 text-md rounded-lg block w-full p-4 focus:ring-4 focus:ring-emerald-100 focus:outline-none`}
                  placeholder="Jelaskan mengapa Anda membutuhkan tanaman ini dan bagaimana Anda akan merawatnya..."
                  value={formData.reason}
                  onChange={handleChange}
                  required
                ></textarea>
                {errors.reason && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    {errors.reason}
                  </p>
                )}
              </div>
              <p className="mt-2 text-sm text-gray-500 flex items-start">
                <svg className="h-5 w-5 mr-1 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Berikan penjelasan lengkap untuk meningkatkan peluang permintaan Anda disetujui. Minimal 10 karakter.</span>
              </p>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
              <Link to="/requests">
                <button
                  type="button"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 
                         font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all duration-300"
                >
                  Batal
                </button>
              </Link>
              
              <button
                type="submit"
                className={`w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 ${isSubmitting ? 'bg-emerald-500' : 'bg-emerald-600 hover:bg-emerald-700'} 
                         text-white font-medium rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-emerald-300 transition-all duration-300`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Memproses...
                  </>
                ) : (
                  <>
                    {isEditMode ? 'Simpan Perubahan' : 'Kirim Permintaan'}
                    <svg className="ml-2 -mr-1 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateEditRequestPage;