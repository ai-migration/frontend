import { useState, forwardRef } from "react";
import { motion } from "framer-motion";

const ModernInput = forwardRef(({
  id,
  name,
  type = "text",
  label,
  placeholder,
  value,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  error,
  helperText,
  required = false,
  disabled = false,
  className = "",
  variant = "outline",
  size = "base",
  icon,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(value || defaultValue || false);

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    setHasValue(!!e.target.value);
    onBlur?.(e);
  };

  const handleChange = (e) => {
    setHasValue(!!e.target.value);
    onChange?.(e);
  };

  const baseClasses = "modern-input";
  const variantClasses = {
    outline: "modern-input--outline",
    filled: "modern-input--filled",
    underline: "modern-input--underline"
  };
  const sizeClasses = {
    sm: "modern-input--sm",
    base: "modern-input--base",
    lg: "modern-input--lg"
  };

  const containerClasses = [
    "modern-input-container",
    variantClasses[variant] || variantClasses.outline,
    sizeClasses[size] || sizeClasses.base,
    isFocused && "modern-input-container--focused",
    hasValue && "modern-input-container--has-value",
    error && "modern-input-container--error",
    disabled && "modern-input-container--disabled",
    icon && "modern-input-container--with-icon",
    className
  ].filter(Boolean).join(" ");

  return (
    <div className={containerClasses}>
      {label && (
        <motion.label
          htmlFor={id || name}
          className="modern-input-label"
          animate={{
            scale: isFocused || hasValue ? 0.85 : 1,
            y: isFocused || hasValue ? -20 : 0,
            color: error 
              ? "var(--color-error-600)" 
              : isFocused 
                ? "var(--color-primary-600)" 
                : "var(--color-neutral-600)"
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {label} {required && <span className="required">*</span>}
        </motion.label>
      )}
      
      <div className="modern-input-wrapper">
        {icon && <div className="modern-input-icon">{icon}</div>}
        
        <input
          ref={ref}
          id={id}
          name={name}
          type={type}
          className={baseClasses}
          placeholder={isFocused ? placeholder : ""}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required}
          disabled={disabled}
          {...props}
        />
      </div>

      {(error || helperText) && (
        <motion.div
          className={`modern-input-helper ${error ? "modern-input-helper--error" : ""}`}
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

ModernInput.displayName = "ModernInput";

export default ModernInput;