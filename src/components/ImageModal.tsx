import { animated, useSpring } from '@react-spring/web';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export interface ImageModalProps {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}

const ImageModal = ({ src, alt, isOpen, onClose }: ImageModalProps) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        if (isZoomed) {
          setIsZoomed(false);
        } else {
          onClose();
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, isZoomed, onClose]);

  const modalAnimation = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'scale(1)' : 'scale(0.95)',
    config: { tension: 300, friction: 25 },
  });

  const backdropAnimation = useSpring({
    opacity: isOpen ? 1 : 0,
    config: { tension: 300, friction: 25 },
  });

  const imageAnimation = useSpring({
    transform: isZoomed ? 'scale(2)' : 'scale(1)',
    transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
    config: { tension: 200, friction: 20 },
  });

  if (!isOpen) return null;

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();

    if (!isZoomed) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setZoomOrigin({ x, y });
    }

    setIsZoomed(!isZoomed);
  };

  const handleModalClose = () => {
    setIsZoomed(false);
    setZoomOrigin({ x: 50, y: 50 });
    onClose();
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <animated.div
        style={backdropAnimation}
        className="absolute inset-0 bg-black bg-opacity-75"
        onClick={handleModalClose}
      />
      <animated.div
        style={modalAnimation}
        className="relative max-w-[90vw] max-h-[90vh] bg-transparent shadow-2xl"
      >
        <button
          onClick={handleModalClose}
          className="absolute top-4 right-4 z-10 text-white bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-75 transition-all"
          aria-label="Close"
        >
          ✕
        </button>
        <div
          className={`overflow-auto max-h-[90vh] ${
            isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
          }`}
        >
          <animated.img
            src={src}
            alt={alt}
            style={imageAnimation}
            className={`w-full h-auto ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
            onClick={handleImageClick}
          />
        </div>
      </animated.div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default ImageModal;
