import { useState, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ModernSelect = forwardRef(({
  id,
  name,
  label,
  options = [],
  value,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  error,
  helperText,
  required = false,
  disabled = false,
  placeholder = "선택하세요",
  className = "",
  variant = "outline",
  size = "base",
  ...props
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    options.find(opt => opt.value === (value || defaultValue)) || null
  );

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setIsFocused(!isOpen);
    }
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    setIsFocused(false);
    
    // Create synthetic event for compatibility
    const syntheticEvent = {
      target: {
        name,
        value: option.value
      }
    };
    
    onChange?.(syntheticEvent);
    onBlur?.(syntheticEvent);
  };

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    if (!isOpen) {
      setIsFocused(false);
      onBlur?.(e);
    }
  };

  const variantClasses = {
    outline: "modern-select--outline",
    filled: "modern-select--filled"
  };
  const sizeClasses = {
    sm: "modern-select--sm",
    base: "modern-select--base",
    lg: "modern-select--lg"
  };

  const containerClasses = [
    "modern-select-container",
    variantClasses[variant] || variantClasses.outline,
    sizeClasses[size] || sizeClasses.base,
    (isFocused || isOpen) && "modern-select-container--focused",
    selectedOption && "modern-select-container--has-value",
    error && "modern-select-container--error",
    disabled && "modern-select-container--disabled",
    className
  ].filter(Boolean).join(" ");

  return (
    <div className={containerClasses}>
      {label && (
        <motion.label
          htmlFor={id || name}
          className="modern-select-label"
          animate={{
            scale: isFocused || selectedOption ? 0.85 : 1,
            y: isFocused || selectedOption ? -20 : 0,
            color: error 
              ? "var(--color-error-600)" 
              : (isFocused || isOpen)
                ? "var(--color-primary-600)" 
                : "var(--color-neutral-600)"
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {label} {required && <span className="required">*</span>}
        </motion.label>
      )}
      
      <div className="modern-select-wrapper">
        <button
          ref={ref}
          type="button"
          id={id}
          name={name}
          className="modern-select-trigger"
          onClick={handleToggle}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          {...props}
        >
          <span className="modern-select-value">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <motion.div
            className="modern-select-arrow"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            ▼
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="modern-select-dropdown"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <ul className="modern-select-options" role="listbox">
                {options.map((option, index) => (
                  <motion.li
                    key={option.value}
                    className={`modern-select-option ${
                      selectedOption?.value === option.value ? "selected" : ""
                    }`}
                    role="option"
                    aria-selected={selectedOption?.value === option.value}
                    onClick={() => handleSelect(option)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                    whileHover={{ backgroundColor: "var(--color-primary-50)" }}
                  >
                    {option.label}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {(error || helperText) && (
        <motion.div
          className={`modern-select-helper ${error ? "modern-select-helper--error" : ""}`}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error || helperText}
        </motion.div>
      )}
    </div>
  );
});

ModernSelect.displayName = "ModernSelect";

export default ModernSelect;