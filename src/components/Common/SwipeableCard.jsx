// src/components/Common/SwipeableCard.jsx
export const SwipeableCard = ({ 
  children, 
  onSwipeLeft, 
  onSwipeRight, 
  leftAction, 
  rightAction,
  className = "" 
}) => {
  const [startX, setStartX] = useState(null);
  const [currentX, setCurrentX] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!startX) return;
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!startX || !currentX) return;
    
    const diff = startX - currentX;
    const threshold = 100;

    if (diff > threshold && onSwipeLeft) {
      onSwipeLeft();
    } else if (diff < -threshold && onSwipeRight) {
      onSwipeRight();
    }

    setStartX(null);
    setCurrentX(null);
    setIsDragging(false);
  };

  const translateX = isDragging && startX && currentX ? currentX - startX : 0;

  return (
    <div className="relative overflow-hidden">
      {/* Acciones de fondo */}
      {(leftAction || rightAction) && (
        <div className="absolute inset-y-0 left-0 right-0 flex">
          {leftAction && (
            <div className="flex-1 bg-red-500 flex items-center justify-start pl-4">
              <span className="text-white font-medium">{leftAction}</span>
            </div>
          )}
          {rightAction && (
            <div className="flex-1 bg-green-500 flex items-center justify-end pr-4">
              <span className="text-white font-medium">{rightAction}</span>
            </div>
          )}
        </div>
      )}

      {/* Contenido principal */}
      <div
        className={`
          ${className} 
          transition-transform duration-200 ease-out
          ${isDragging ? '' : 'transform-gpu'}
        `}
        style={{ 
          transform: `translateX(${Math.max(-200, Math.min(200, translateX))}px)` 
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </div>
    </div>
  );
};