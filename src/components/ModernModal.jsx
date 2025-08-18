import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { modalVariants, backdropVariants } from "@/utils/animations";

const ModernModal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "base",
  className = "",
  closeOnBackdrop = true,
  closeOnEsc = true,
  showCloseButton = true,
  ...props
}) => {
  // Handle ESC key
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;
    
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };
    
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, closeOnEsc, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const sizeClasses = {
    sm: "modern-modal--sm",
    base: "modern-modal--base",
    lg: "modern-modal--lg",
    xl: "modern-modal--xl",
    full: "modern-modal--full"
  };

  const modalClasses = [
    "modern-modal",
    sizeClasses[size] || sizeClasses.base,
    className
  ].filter(Boolean).join(" ");

  const handleBackdropClick = (e) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose?.();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="modern-modal-backdrop"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={handleBackdropClick}
        {...props}
      >
        <motion.div
          className={modalClasses}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? "modal-title" : undefined}
          onClick={(e) => e.stopPropagation()}
        >
          {(title || showCloseButton) && (
            <div className="modern-modal-header">
              {title && (
                <h2 id="modal-title" className="modern-modal-title">
                  {title}
                </h2>
              )}
              
              {showCloseButton && (
                <button
                  className="modern-modal-close"
                  onClick={onClose}
                  aria-label="모달 닫기"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          )}
          
          <div className="modern-modal-body">
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default ModernModal;