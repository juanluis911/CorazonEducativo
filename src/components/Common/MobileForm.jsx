// src/components/Forms/MobileForm.jsx
export const MobileForm = ({ onSubmit, children, className = "" }) => {
  return (
    <form 
      onSubmit={onSubmit}
      className={`mobile-form ${className}`}
      noValidate
    >
      {children}
    </form>
  );
};