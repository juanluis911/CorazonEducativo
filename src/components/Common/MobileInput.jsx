// src/components/Common/MobileInput.jsx
export const MobileInput = ({ 
  label, 
  error, 
  type = 'text', 
  className = "", 
  required = false,
  ...props 
}) => {
  return (
    <div className="form-group">
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        className={`
          form-input 
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''} 
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 mt-1">
          {error}
        </p>
      )}
    </div>
  );
};