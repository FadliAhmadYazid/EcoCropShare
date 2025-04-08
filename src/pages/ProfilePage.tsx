import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/common/Layout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { useAuth } from '../context/AuthContext';
import { mockPosts, mockRequests, mockHistory, mockArticles, mockUsers } from '../data/mockData';

type TabType = 'posts' | 'requests' | 'history' | 'articles';

const ProfilePage: React.FC = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<TabType>('posts');
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  
  // Form states
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    location: user?.location || '',
    favoritePlants: user?.favoritePlants?.join(', ') || '',
    profileImage: user?.profileImage || '',
  });
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});
  
  // Filter data for current user
  const userPosts = mockPosts.filter((post) => post.userId === user?.id);
  const userRequests = mockRequests.filter((request) => request.userId === user?.id);
  const userHistory = mockHistory.filter(
    (history) => history.userId === user?.id || history.partnerId === user?.id
  );
  const userArticles = mockArticles.filter((article) => article.userId === user?.id);
  
  // Function to get user name by ID
  const getUserName = (userId: number | string): string => {
    const foundUser = mockUsers.find(u => u.id === userId);
    return foundUser ? foundUser.name : 'Pengguna';
  };
  
  // Function to format date
  const formatDate = (date: Date | string): string => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };
  
  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value,
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };
  
  // Handle password form change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setPasswordForm({
      ...passwordForm,
      [name]: value,
    });
    
    if (passwordErrors[name]) {
      setPasswordErrors({
        ...passwordErrors,
        [name]: '',
      });
    }
  };
  
  // Handle profile update
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nama harus diisi';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email harus diisi';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Lokasi harus diisi';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Parse favorite plants from comma-separated string to array
    const favoritePlantsArray = formData.favoritePlants
      .split(',')
      .map(plant => plant.trim())
      .filter(plant => plant.length > 0);
    
    // In a real app, this would be an API call
    if (updateUser && user) {
      updateUser({
        ...user,
        name: formData.name,
        email: formData.email,
        location: formData.location,
        favoritePlants: favoritePlantsArray,
        profileImage: formData.profileImage
      });
    }
    
    setIsEditing(false);
    
    // Show success notification (in a real app)
    alert('Profil berhasil diperbarui');
  };
  
  // Handle password change
  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!passwordForm.currentPassword) {
      newErrors.currentPassword = 'Password saat ini harus diisi';
    }
    
    if (!passwordForm.newPassword) {
      newErrors.newPassword = 'Password baru harus diisi';
    } else if (passwordForm.newPassword.length < 6) {
      newErrors.newPassword = 'Password minimal 6 karakter';
    }
    
    if (!passwordForm.confirmPassword) {
      newErrors.confirmPassword = 'Konfirmasi password harus diisi';
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      newErrors.confirmPassword = 'Password tidak cocok';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setPasswordErrors(newErrors);
      return;
    }
    
    // In a real app, this would be an API call
    // For now, just toggle password form
    setShowPasswordForm(false);
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    
    // Show success notification (in a real app)
    alert('Password berhasil diubah');
  };
  
  // Handle logout
  const handleLogout = () => {
    if (window.confirm('Apakah Anda yakin ingin keluar?')) {
      logout();
      navigate('/auth');
    }
  };
  
  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    
    if (files && files.length > 0) {
      // In a real app, we would upload the file to a server
      // For now, just set a placeholder
      setFormData({
        ...formData,
        profileImage: '/src/assets/images/placeholder.jpg',
      });
    }
  };
  
  if (!user) {
    return null;
  }
  
  // Get background color based on tab
  const getTabBgColor = (tab: TabType) => {
    switch (tab) {
      case 'posts': return 'bg-green-50';
      case 'requests': return 'bg-blue-50';
      case 'history': return 'bg-purple-50';
      case 'articles': return 'bg-amber-50';
      default: return 'bg-white';
    }
  };

  // Get gradient color based on tab
  const getGradientColor = (tab: TabType) => {
    switch (tab) {
      case 'posts': return 'from-green-600 to-emerald-600';
      case 'requests': return 'from-blue-600 to-sky-600';
      case 'history': return 'from-purple-600 to-indigo-600';
      case 'articles': return 'from-amber-600 to-yellow-600';
      default: return 'from-gray-600 to-gray-800';
    }
  };
  
  return (
    <Layout title="Profil Saya">
      <div className="bg-gray-50 min-h-screen -mt-6 -mx-6 px-4 py-6 md:px-6 lg:px-8">
        {/* Header Section with Banner and Profile */}
        <div className={`relative rounded-xl overflow-hidden mb-6 shadow-lg bg-gradient-to-r ${getGradientColor(activeTab)}`}>
          <div className="absolute inset-0 bg-black opacity-20"></div>
          
          <div className="relative flex flex-col md:flex-row items-center p-6 md:p-8">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white flex items-center justify-center mb-4 md:mb-0 md:mr-6 shadow-md overflow-hidden border-4 border-white">
              {formData.profileImage ? (
                <img
                  src={formData.profileImage}
                  alt={formData.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-4xl text-gray-500">{formData.name.charAt(0)}</span>
              )}
            </div>
            
            <div className="text-center md:text-left text-white flex-1">
              <h1 className="text-2xl md:text-3xl font-bold">{user.name}</h1>
              <p className="text-white/80 mt-1">{user.email}</p>
              <p className="text-white/80 flex items-center justify-center md:justify-start mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {user.location}
              </p>
              
              {user.favoritePlants && user.favoritePlants.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2 justify-center md:justify-start">
                  {user.favoritePlants.slice(0, 3).map((plant, index) => (
                    <span key={index} className="px-2 py-1 bg-white/30 backdrop-blur-sm text-white text-xs rounded-full">
                      {plant}
                    </span>
                  ))}
                  {user.favoritePlants.length > 3 && (
                    <span className="px-2 py-1 bg-white/30 backdrop-blur-sm text-white text-xs rounded-full">
                      +{user.favoritePlants.length - 3} lainnya
                    </span>
                  )}
                </div>
              )}
            </div>
            
            <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
              {!isEditing && !showPasswordForm && (
                <>
                  <Button
                    variant="light"
                    leftIcon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    }
                    onClick={() => {
                      setIsEditing(true);
                      setShowPasswordForm(false);
                    }}
                  >
                    Edit Profil
                  </Button>
                  
                  <Button
                    variant="danger"
                    leftIcon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                      </svg>
                    }
                    onClick={handleLogout}
                  >
                    Keluar
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Profile Card */}
            <Card className="overflow-hidden mb-6">
              {isEditing && (
                <div className="p-6">
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Profil</h3>
                    
                    <div className="mb-4 flex flex-col items-center">
                      <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-2 overflow-hidden border-4 border-gray-100">
                        {formData.profileImage ? (
                          <img
                            src={formData.profileImage}
                            alt={formData.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-4xl text-gray-500">{formData.name.charAt(0)}</span>
                        )}
                      </div>
                      
                      <label htmlFor="profile-upload" className="cursor-pointer text-sm text-primary font-medium">
                        Ubah Foto
                        <input
                          id="profile-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileUpload}
                        />
                      </label>
                    </div>
                    
                    <Input
                      label="Nama Lengkap"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      error={errors.name}
                    />
                    
                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      error={errors.email}
                    />
                    
                    <Input
                      label="Lokasi"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      error={errors.location}
                    />
                    
                    <Input
                      label="Tanaman Favorit"
                      name="favoritePlants"
                      value={formData.favoritePlants}
                      onChange={handleInputChange}
                      error={errors.favoritePlants}
                      helperText="Pisahkan dengan koma"
                    />
                    
                    <div className="flex justify-between pt-2">
                      <Button
                        variant="text"
                        type="button"
                        onClick={() => setIsEditing(false)}
                      >
                        Batal
                      </Button>
                      
                      <Button type="submit">
                        Simpan
                      </Button>
                    </div>
                  </form>
                </div>
              )}
              
              {showPasswordForm && (
                <div className="p-6">
                  <form onSubmit={handleUpdatePassword} className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Ubah Password</h3>
                    
                    <Input
                      label="Password Saat Ini"
                      name="currentPassword"
                      type="password"
                      value={passwordForm.currentPassword}
                      onChange={handlePasswordChange}
                      error={passwordErrors.currentPassword}
                    />
                    
                    <Input
                      label="Password Baru"
                      name="newPassword"
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={handlePasswordChange}
                      error={passwordErrors.newPassword}
                    />
                    
                    <Input
                      label="Konfirmasi Password"
                      name="confirmPassword"
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={handlePasswordChange}
                      error={passwordErrors.confirmPassword}
                    />
                    
                    <div className="flex justify-between pt-2">
                      <Button
                        variant="text"
                        type="button"
                        onClick={() => setShowPasswordForm(false)}
                      >
                        Batal
                      </Button>
                      
                      <Button type="submit">
                        Simpan
                      </Button>
                    </div>
                  </form>
                </div>
              )}
              
              {!isEditing && !showPasswordForm && (
                <>
                  <div className="p-6 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Menu Pengaturan</h3>
                    
                    <div className="space-y-2">
                      <button 
                        onClick={() => {
                          setIsEditing(true);
                          setShowPasswordForm(false);
                        }}
                        className="flex items-center w-full p-3 rounded-lg text-left hover:bg-gray-50 transition"
                      >
                        <span className="w-10 h-10 flex items-center justify-center bg-green-100 text-green-600 rounded-lg mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </span>
                        <div>
                          <h4 className="font-medium text-gray-900">Edit Profil</h4>
                          <p className="text-xs text-gray-500">Ubah informasi profil dan foto</p>
                        </div>
                      </button>
                      
                      <button 
                        onClick={() => {
                          setShowPasswordForm(true);
                          setIsEditing(false);
                        }}
                        className="flex items-center w-full p-3 rounded-lg text-left hover:bg-gray-50 transition"
                      >
                        <span className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <div>
                          <h4 className="font-medium text-gray-900">Ubah Password</h4>
                          <p className="text-xs text-gray-500">Perbarui password akun</p>
                        </div>
                      </button>
                      
                      <button 
                        onClick={handleLogout}
                        className="flex items-center w-full p-3 rounded-lg text-left hover:bg-gray-50 transition"
                      >
                        <span className="w-10 h-10 flex items-center justify-center bg-red-100 text-red-600 rounded-lg mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <div>
                          <h4 className="font-medium text-gray-900">Keluar</h4>
                          <p className="text-xs text-gray-500">Keluar dari akun</p>
                        </div>
                      </button>
                    </div>
                  </div>
                
                  <div className="border-t border-gray-100">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Tanaman Favorit</h3>
                      {user.favoritePlants && user.favoritePlants.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {user.favoritePlants.map((plant, index) => (
                            <span
                              key={index}
                              className="px-3 py-1.5 bg-green-50 text-green-800 text-sm rounded-full border border-green-100 inline-flex items-center"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.05 3.636a1 1 0 010 1.414 7 7 0 000 9.9 1 1 0 11-1.414 1.414 9 9 0 010-12.728 1 1 0 011.414 0zm9.9 0a1 1 0 011.414 0 9 9 0 010 12.728 1 1 0 11-1.414-1.414 7 7 0 000-9.9 1 1 0 010-1.414zM7.879 6.464a1 1 0 010 1.414 3 3 0 000 4.243 1 1 0 11-1.415 1.414 5 5 0 010-7.07 1 1 0 011.415 0zm4.242 0a1 1 0 011.415 0 5 5 0 010 7.072 1 1 0 01-1.415-1.415 3 3 0 000-4.242 1 1 0 010-1.415z" clipRule="evenodd" />
                              </svg>
                              {plant}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <div className="py-4 px-6 bg-gray-50 rounded-lg text-center">
                          <p className="text-gray-500 text-sm">Belum ada tanaman favorit</p>
                          <button 
                            onClick={() => {
                              setIsEditing(true);
                              setShowPasswordForm(false);
                            }}
                            className="mt-2 text-primary text-sm font-medium"
                          >
                            + Tambahkan Tanaman Favorit
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </Card>
            
            {/* Statistics Card */}
            {!isEditing && !showPasswordForm && (
              <Card className="overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistik Aktivitas</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="w-10 h-10 flex items-center justify-center bg-green-100 text-green-600 rounded-lg mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                          </svg>
                        </span>
                        <div>
                          <h4 className="font-medium text-gray-900">Total Postingan</h4>
                        </div>
                      </div>
                      <span className="text-xl font-bold text-green-600">{userPosts.length}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <div>
                          <h4 className="font-medium text-gray-900">Total Permintaan</h4>
                        </div>
                      </div>
                      <span className="text-xl font-bold text-blue-600">{userRequests.length}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="w-10 h-10 flex items-center justify-center bg-purple-100 text-purple-600 rounded-lg mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <div>
                          <h4 className="font-medium text-gray-900">Riwayat Tukar</h4>
                        </div>
                      </div>
                      <span className="text-xl font-bold text-purple-600">{userHistory.length}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="w-10 h-10 flex items-center justify-center bg-amber-100 text-amber-600 rounded-lg mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <div>
                          <h4 className="font-medium text-gray-900">Artikel</h4>
                        </div>
                      </div>
                      <span className="text-xl font-bold text-amber-600">{userArticles.length}</span>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
          
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <Card className={`overflow-hidden mb-6 ${getTabBgColor(activeTab)}`}>
              {/* Tabs Navigation */}
              <div className="flex overflow-x-auto scrollbar-hide">
                <button
                  className={`flex-1 py-4 px-4 font-medium text-sm text-center relative ${
                    activeTab === 'posts'
                      ? 'text-green-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => setActiveTab('posts')}
                >
                  <div className="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                    <span>Postingan Saya</span>
                    <span className="ml-2 bg-white text-green-600 py-0.5 px-2 rounded-full text-xs absolute top-3 right-2">
                      {userPosts.length}
                    </span>
                  </div>
                  {activeTab === 'posts' && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-600"></div>
                  )}
                </button>
                
                <button
                  className={`flex-1 py-4 px-4 font-medium text-sm text-center relative ${
                    activeTab === 'requests'
                      ? 'text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => setActiveTab('requests')}
                >
                  <div className="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    <span>Permintaan Saya</span>
                    <span className="ml-2 bg-white text-blue-600 py-0.5 px-2 rounded-full text-xs absolute top-3 right-2">
                      {userRequests.length}
                    </span>
                  </div>
                  {activeTab === 'requests' && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600"></div>
                  )}
                </button>
                
                <button
                  className={`flex-1 py-4 px-4 font-medium text-sm text-center relative ${
                    activeTab === 'history'
                      ? 'text-purple-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => setActiveTab('history')}
                >
                  <div className="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span>Riwayat Tukar</span>
                    <span className="ml-2 bg-white text-purple-600 py-0.5 px-2 rounded-full text-xs absolute top-3 right-2">
                      {userHistory.length}
                    </span>
                  </div>
                  {activeTab === 'history' && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-purple-600"></div>
                  )}
                </button>
                
                <button
                  className={`flex-1 py-4 px-4 font-medium text-sm text-center relative ${
                    activeTab === 'articles'
                      ? 'text-amber-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => setActiveTab('articles')}
                >
                  <div className="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>Artikel Saya</span>
                    <span className="ml-2 bg-white text-amber-600 py-0.5 px-2 rounded-full text-xs absolute top-3 right-2">
                      {userArticles.length}
                    </span>
                  </div>
                  {activeTab === 'articles' && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber-600"></div>
                  )}
                </button>
              </div>
              
              <div className="p-6">
                {/* Content for Posts Tab */}
                {activeTab === 'posts' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-gray-900">Postingan Saya</h2>
                      <Button
                        as="a"
                        href="/posts/create"
                        leftIcon={
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                          </svg>
                        }
                      >
                        Tambah Post
                      </Button>
                    </div>
                    
                    {userPosts.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {userPosts.map((post) => (
                          <a
                            key={post.id}
                            href={`/posts/${post.id}`}
                            className="block border bg-white rounded-xl p-4 hover:shadow-md transition"
                          >
                            <div className="flex items-start">
                              <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden mr-4">
                                {post.images && post.images.length > 0 && (
                                  <img
                                    src={post.images[0]}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                  />
                                )}
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center mb-1">
                                  <h4 className="text-base font-semibold text-gray-900 truncate mr-2">
                                    {post.title}
                                  </h4>
                                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                    post.status === 'available'
                                      ? 'bg-green-100 text-green-800'
                                      : 'bg-gray-100 text-gray-800'
                                  }`}>
                                    {post.status === 'available' ? 'Tersedia' : 'Selesai'}
                                  </span>
                                </div>
                                
                                <div className="flex items-center text-xs text-gray-500 mb-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                  </svg>
                                  <span className="truncate">{post.location}</span>
                                  <span className="mx-1">•</span>
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                  </svg>
                                  <span>{formatDate(post.createdAt)}</span>
                                </div>
                                
                                <p className="text-sm text-gray-600 line-clamp-2">
                                  {post.description}
                                </p>
                                
                                <div className="mt-2 flex items-center justify-between">
                                  <span className="inline-flex items-center text-xs text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                                    </svg>
                                    {post.comments?.length || 0} komentar
                                  </span>
                                  
                                  <span className="text-xs font-medium text-primary hover:underline">
                                    Lihat Detail
                                  </span>
                                </div>
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-white rounded-lg border border-gray-100">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-full mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Belum Ada Postingan</h3>
                        <p className="text-gray-500 mb-6 max-w-md mx-auto">
                          Bagikan bibit atau hasil panen Anda. Mulai dengan membuat postingan pertama Anda.
                        </p>
                        <Button
                          as="a"
                          href="/posts/create"
                          variant="primary"
                          size="lg"
                        >
                          Buat Post Baru
                        </Button>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Content for Requests Tab */}
                {activeTab === 'requests' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-gray-900">Permintaan Saya</h2>
                      <Button
                        as="a"
                        href="/requests/create"
                        leftIcon={
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                          </svg>
                        }
                      >
                        Buat Permintaan
                      </Button>
                    </div>
                    
                    {userRequests.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {userRequests.map((request) => (
                          <a
                            key={request.id}
                            href={`/requests/${request.id}`}
                            className="block border bg-white rounded-xl p-4 hover:shadow-md transition"
                          >
                            <div className="border-l-4 border-blue-500 pl-3 mb-3">
                              <h4 className="text-base font-semibold text-gray-900">
                                {request.plantName}
                              </h4>
                              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                request.status === 'open'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {request.status === 'open' ? 'Aktif' : 'Terpenuhi'}
                              </span>
                            </div>
                            
                            <div className="flex items-center text-xs text-gray-500 mb-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                              </svg>
                              <span>{request.location}</span>
                              <span className="mx-1">•</span>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                              </svg>
                              <span>{formatDate(request.createdAt)}</span>
                            </div>
                            
                            <p className="text-sm text-gray-600 line-clamp-3">
                              {request.reason}
                            </p>
                            
                            <div className="mt-2 flex items-center justify-between">
                              <span className="inline-flex items-center text-xs text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                                </svg>
                                {request.comments?.length || 0} komentar
                              </span>
                              
                              <span className="text-xs font-medium text-primary hover:underline">
                                Lihat Detail
                              </span>
                            </div>
                          </a>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-white rounded-lg border border-gray-100">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Belum Ada Permintaan</h3>
                        <p className="text-gray-500 mb-6 max-w-md mx-auto">
                          Cari tanaman yang Anda butuhkan dengan membuat permintaan baru.
                        </p>
                        <Button
                          as="a"
                          href="/requests/create"
                          variant="primary"
                          size="lg"
                        >
                          Buat Permintaan Baru
                        </Button>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Content for History Tab */}
                {activeTab === 'history' && (
                  <div>
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-gray-900">Riwayat Tukar Tanaman</h2>
                    </div>
                    
                    {userHistory.length > 0 ? (
                      <div className="space-y-4">
                        {userHistory.map((history) => (
                          <div
                            key={history.id}
                            className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-sm transition"
                          >
                            <div className="relative pl-8 pb-8 border-l-2 border-dashed border-gray-200">
                              <div className="absolute -left-3 top-0">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                  history.type === 'post' ? 'bg-green-500' : 'bg-blue-500'
                                }`}>
                                  {history.type === 'post' ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                      <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                                    </svg>
                                  ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                    </svg>
                                  )}
                                </div>
                              </div>
                              
                              <div className="mb-1">
                                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                  history.type === 'post'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-blue-100 text-blue-800'
                                }`}>
                                  {history.type === 'post' ? 'Dari Posting' : 'Dari Permintaan'}
                                </span>
                                <span className="ml-2 text-sm text-gray-500">{formatDate(history.date)}</span>
                              </div>
                              
                              <h4 className="text-base font-semibold text-gray-900 mb-1">
                                {history.plantName}
                              </h4>
                              
                              <div className="mt-2 bg-gray-50 rounded-lg p-3">
                                {history.userId === user.id ? (
                                  <p className="text-sm text-gray-600 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                                    </svg>
                                    <span>
                                      <span className="font-medium">Anda</span> membagikan kepada{' '}
                                      <span className="font-medium">{getUserName(history.partnerId)}</span>
                                    </span>
                                  </p>
                                ) : (
                                  <p className="text-sm text-gray-600 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                                    </svg>
                                    <span>
                                      <span className="font-medium">Anda</span> menerima dari{' '}
                                      <span className="font-medium">{getUserName(history.userId)}</span>
                                    </span>
                                  </p>
                                )}
                                
                                {history.notes && (
                                  <p className="text-sm text-gray-600 mt-2 pl-5">
                                    <span className="font-medium">Catatan:</span> {history.notes}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-white rounded-lg border border-gray-100">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-50 rounded-full mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Belum Ada Riwayat Tukar</h3>
                        <p className="text-gray-500 mb-6 max-w-md mx-auto">
                          Riwayat akan muncul setelah Anda melakukan pertukaran dengan pengguna lain.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <Button
                            as="a"
                            href="/posts"
                            variant="outline"
                          >
                            Jelajahi Postingan
                          </Button>
                          <Button
                            as="a"
                            href="/requests"
                            variant="outline"
                          >
                            Lihat Permintaan
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Content for Articles Tab */}
                {activeTab === 'articles' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-gray-900">Artikel Saya</h2>
                      <Button
                        as="a"
                        href="/articles/create"
                        leftIcon={
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                          </svg>
                        }
                      >
                        Tulis Artikel
                      </Button>
                    </div>
                    
                    {userArticles.length > 0 ? (
                      <div className="space-y-4">
                        {userArticles.map((article) => (
                          <a
                            key={article.id}
                            href={`/articles/${article.id}`}
                            className="block bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md transition"
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h4 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                                  {article.title}
                                </h4>
                                
                                <div className="flex items-center text-xs text-gray-500 mb-3">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                  </svg>
                                  <span>{formatDate(article.createdAt)}</span>
                                  {article.updatedAt > article.createdAt && (
                                    <>
                                      <span className="mx-1">•</span>
                                      <span>Diperbarui: {formatDate(article.updatedAt)}</span>
                                    </>
                                  )}
                                </div>
                                
                                <p className="text-sm text-gray-600 line-clamp-3">
                                  {article.content.slice(0, 180)}
                                  {article.content.length > 180 ? '...' : ''}
                                </p>
                              </div>
                              
                              {article.image && (
                                <div className="ml-4 flex-shrink-0 w-16 h-16 sm:w-24 sm:h-24 bg-gray-100 rounded-lg overflow-hidden">
                                  <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                            </div>
                            
                            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                              {article.tags && article.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                  {article.tags.slice(0, 3).map((tag, index) => (
                                    <span key={index} className="inline-block px-2 py-0.5 bg-amber-50 text-amber-800 text-xs rounded-full">
                                      {tag}
                                    </span>
                                  ))}
                                  {article.tags.length > 3 && (
                                    <span className="inline-block px-2 py-0.5 bg-gray-50 text-gray-600 text-xs rounded-full">
                                      +{article.tags.length - 3}
                                    </span>
                                  )}
                                </div>
                              )}
                              
                              <span className="text-xs font-medium text-primary hover:underline flex items-center">
                                Baca Selengkapnya
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              </span>
                            </div>
                          </a>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-white rounded-lg border border-gray-100">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-50 rounded-full mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Belum Ada Artikel</h3>
                        <p className="text-gray-500 mb-6 max-w-md mx-auto">
                          Bagikan pengalaman dan pengetahuan Anda seputar tanaman dengan menulis artikel.
                        </p>
                        <Button
                          as="a"
                          href="/articles/create"
                          variant="primary"
                          size="lg"
                        >
                          Tulis Artikel Baru
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;