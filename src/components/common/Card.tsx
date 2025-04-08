import React from 'react';

interface CardProps {
  title?: string;
  subtitle?: string;
  footer?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  footer,
  className = '',
  children,
  onClick,
  hoverable = false,
}) => {
  // Base classes
  let cardClasses = 'bg-white rounded-lg shadow-sm overflow-hidden';
  
  // Add hover effects if card is hoverable
  if (hoverable) {
    cardClasses += ' transition-all duration-200 hover:shadow-md';
  }
  
  // Add cursor pointer if onClick is provided
  if (onClick) {
    cardClasses += ' cursor-pointer';
  }
  
  // Add any additional classes
  cardClasses += ` ${className}`;

  return (
    <div className={cardClasses} onClick={onClick}>
      {/* Card Header (only rendered if title or subtitle exists) */}
      {(title || subtitle) && (
        <div className="px-4 py-3 border-b border-gray-100">
          {title && <h3 className="text-lg font-medium text-gray-800">{title}</h3>}
          {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
        </div>
      )}
      
      {/* Card Body */}
      <div className="p-4">{children}</div>
      
      {/* Card Footer (only rendered if footer exists) */}
      {footer && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">{footer}</div>
      )}
    </div>
  );
};

export default Card;