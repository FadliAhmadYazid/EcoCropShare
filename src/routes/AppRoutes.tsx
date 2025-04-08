import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Pages
import AuthPage from '../pages/AuthPage';
import DashboardPage from '../pages/DashboardPage';
import ProfilePage from '../pages/ProfilePage';
import PostsPage from '../pages/PostsPage';
import PostDetailPage from '../pages/PostDetailPage';
import CreateEditPostPage from '../pages/CreateEditPostPage';
import RequestsPage from '../pages/RequestsPage';
import RequestDetailPage from '../pages/RequestDetailPage';
import CreateEditRequestPage from '../pages/CreateEditRequestPage';
import ArticlesPage from '../pages/ArticlesPage';
import ArticleDetailPage from '../pages/ArticleDetailPage';
import CreateEditArticlePage from '../pages/CreateEditArticlePage';
import HistoryPage from '../pages/HistoryPage';

// Protected route wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" replace />;
};

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Auth Route */}
      <Route 
        path="/auth" 
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <AuthPage />} 
      />
      
      {/* Protected Routes */}
      <Route 
        path="/dashboard" 
        element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} 
      />
      <Route 
        path="/profile" 
        element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} 
      />
      
      {/* Posts (Bibit & Hasil Panen) Routes */}
      <Route 
        path="/posts" 
        element={<ProtectedRoute><PostsPage /></ProtectedRoute>} 
      />
      <Route 
        path="/posts/create" 
        element={<ProtectedRoute><CreateEditPostPage /></ProtectedRoute>} 
      />
      <Route 
        path="/posts/edit/:id" 
        element={<ProtectedRoute><CreateEditPostPage /></ProtectedRoute>} 
      />
      <Route 
        path="/posts/:id" 
        element={<ProtectedRoute><PostDetailPage /></ProtectedRoute>} 
      />
      
      {/* Requests (Permintaan) Routes */}
      <Route 
        path="/requests" 
        element={<ProtectedRoute><RequestsPage /></ProtectedRoute>} 
      />
      <Route 
        path="/requests/create" 
        element={<ProtectedRoute><CreateEditRequestPage /></ProtectedRoute>} 
      />
      <Route 
        path="/requests/edit/:id" 
        element={<ProtectedRoute><CreateEditRequestPage /></ProtectedRoute>} 
      />
      <Route 
        path="/requests/:id" 
        element={<ProtectedRoute><RequestDetailPage /></ProtectedRoute>} 
      />
      
      {/* Articles Routes */}
      <Route 
        path="/articles" 
        element={<ProtectedRoute><ArticlesPage /></ProtectedRoute>} 
      />
      <Route 
        path="/articles/create" 
        element={<ProtectedRoute><CreateEditArticlePage /></ProtectedRoute>} 
      />
      <Route 
        path="/articles/edit/:id" 
        element={<ProtectedRoute><CreateEditArticlePage /></ProtectedRoute>} 
      />
      <Route 
        path="/articles/:id" 
        element={<ProtectedRoute><ArticleDetailPage /></ProtectedRoute>} 
      />
      
      {/* History Route */}
      <Route 
        path="/history" 
        element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} 
      />
      
      {/* Default Route */}
      <Route 
        path="/" 
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/auth"} replace />} 
      />
      
      {/* 404 Route - catch all */}
      <Route 
        path="*" 
        element={<Navigate to="/" replace />} 
      />
    </Routes>
  );
};

export default AppRoutes;