// src/components/Common/MobileCard.jsx
export const MobileCard = ({ 
  children, 
  className = "", 
  onClick, 
  hoverable = false,
  pressable = false 
}) => {
  return (
    <div 
      className={`
        mobile-card 
        ${hoverable ? 'hover:shadow-lg transition-shadow duration-200' : ''} 
        ${pressable ? 'active:scale-98 transition-transform duration-100' : ''} 
        ${onClick ? 'cursor-pointer' : ''} 
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
