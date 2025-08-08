// src/components/Common/LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = ({ 
  size = 'default', 
  message = 'Cargando...', 
  fullScreen = true,
  className = '' 
}) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    default: 'h-8 w-8',
    large: 'h-12 w-12',
    xlarge: 'h-16 w-16'
  };

  const spinnerClass = `animate-spin rounded-full border-2 border-gray-200 border-t-indigo-600 ${sizeClasses[size]}`;

  if (fullScreen) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className={`${spinnerClass} mx-auto`}></div>
          {message && (
            <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">
              {message}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="text-center">
        <div className={spinnerClass}></div>
        {message && (
          <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

// Componente de spinner inline para usar dentro de botones
export const InlineSpinner = ({ size = 'small', className = '' }) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    default: 'h-5 w-5',
    large: 'h-6 w-6'
  };

  return (
    <div className={`animate-spin rounded-full border-2 border-gray-200 border-t-current ${sizeClasses[size]} ${className}`} />
  );
};

// Componente de spinner para páginas
export const PageSpinner = ({ message = 'Cargando página...' }) => {
  return (
    <div className="flex-1 flex items-center justify-center py-12">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-gray-200 border-t-indigo-600 mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          {message}
        </p>
      </div>
    </div>
  );
};

// Componente de skeleton loader
export const SkeletonLoader = ({ className = '', lines = 3 }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`bg-gray-200 dark:bg-gray-700 rounded h-4 mb-2 ${
            index === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
        />
      ))}
    </div>
  );
};

export default LoadingSpinner;