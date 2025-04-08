import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface NavigationProps {
  isMobile?: boolean;
  closeMobileMenu?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ isMobile = false, closeMobileMenu }) => {
  const { isAuthenticated } = useAuth();

  const navigationItems = [
    { name: 'Dashboard', path: '/dashboard', requiresAuth: true },
    { name: 'Bibit & Hasil Panen', path: '/posts', requiresAuth: true },
    { name: 'Permintaan', path: '/requests', requiresAuth: true },
    { name: 'Artikel Edukasi', path: '/articles', requiresAuth: true },
    { name: 'Riwayat Tukar', path: '/history', requiresAuth: true },
  ];

  const handleClick = () => {
    if (isMobile && closeMobileMenu) {
      closeMobileMenu();
    }
  };

  // Desktop navigation styles
  const desktopLinkClasses = "px-3 py-2 rounded-md text-sm font-medium";
  const desktopActiveLinkClasses = "bg-primary bg-opacity-10 text-primary";
  const desktopInactiveLinkClasses = "text-gray-700 hover:bg-gray-100 hover:text-primary";

  // Mobile navigation styles
  const mobileLinkClasses = "block px-3 py-2 rounded-md text-base font-medium";
  const mobileActiveLinkClasses = "bg-primary bg-opacity-10 text-primary";
  const mobileInactiveLinkClasses = "text-gray-700 hover:bg-gray-100 hover:text-primary";

  // Choose which styles to use based on isMobile prop
  const linkClasses = isMobile ? mobileLinkClasses : desktopLinkClasses;
  const activeLinkClasses = isMobile ? mobileActiveLinkClasses : desktopActiveLinkClasses;
  const inactiveLinkClasses = isMobile ? mobileInactiveLinkClasses : desktopInactiveLinkClasses;

  return (
    <nav className={isMobile ? "space-y-1" : "flex space-x-4"}>
      {navigationItems.map((item) => (
        (item.requiresAuth && isAuthenticated) || !item.requiresAuth ? (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={handleClick}
            className={({ isActive }) => 
              `${linkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`
            }
          >
            {item.name}
          </NavLink>
        ) : null
      ))}
    </nav>
  );
};

export default Navigation;