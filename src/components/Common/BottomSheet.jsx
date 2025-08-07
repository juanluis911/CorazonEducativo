// src/components/Common/BottomSheet.jsx
export const BottomSheet = ({ 
  isOpen, 
  onClose, 
  children, 
  title, 
  snapPoints = ['25%', '50%', '90%'],
  initialSnap = 1 
}) => {
  const [currentSnap, setCurrentSnap] = useState(initialSnap);
  const [startY, setStartY] = useState(null);
  const [currentY, setCurrentY] = useState(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleTouchStart = (e) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    if (!startY) return;
    setCurrentY(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!startY || !currentY) return;
    
    const diff = currentY - startY;
    const threshold = 50;

    if (diff > threshold) {
      if (currentSnap > 0) {
        setCurrentSnap(currentSnap - 1);
      } else {
        onClose();
      }
    } else if (diff < -threshold) {
      if (currentSnap < snapPoints.length - 1) {
        setCurrentSnap(currentSnap + 1);
      }
    }

    setStartY(null);
    setCurrentY(null);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Bottom Sheet */}
      <div 
        className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 rounded-t-xl shadow-xl transition-all duration-300"
        style={{ height: snapPoints[currentSnap] }}
      >
        {/* Handle */}
        <div 
          className="flex justify-center pt-2 pb-4 cursor-pointer"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="w-10 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        </div>

        {/* Header */}
        {title && (
          <div className="px-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 momentum-scroll">
          {children}
        </div>
      </div>
    </>
  );
};