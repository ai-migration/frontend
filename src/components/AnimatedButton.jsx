import { motion } from "framer-motion";
import { buttonVariants, conditionalAnimation } from "@/utils/animations";

const AnimatedButton = ({ 
  children, 
  className = "", 
  variant = "primary",
  size = "base",
  disabled = false,
  loading = false,
  onClick,
  ...props 
}) => {
  const baseClasses = "btn btn-modern";
  const variantClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary", 
    outline: "btn-outline",
    ghost: "btn-ghost",
    success: "btn-success",
    warning: "btn-warning",
    error: "btn-error"
  };
  const sizeClasses = {
    sm: "btn-sm",
    base: "",
    lg: "btn-lg",
    xl: "btn-xl"
  };

  const classes = [
    baseClasses,
    variantClasses[variant] || variantClasses.primary,
    sizeClasses[size] || "",
    className
  ].filter(Boolean).join(" ");

  return (
    <motion.button
      className={classes}
      variants={conditionalAnimation(buttonVariants)}
      initial="rest"
      whileHover={disabled ? "rest" : "hover"}
      whileTap={disabled ? "rest" : "tap"}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <motion.div
          className="spinner"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          style={{
            width: "16px",
            height: "16px",
            border: "2px solid currentColor",
            borderTop: "2px solid transparent",
            borderRadius: "50%",
          }}
        />
      )}
      {children}
    </motion.button>
  );
};

export default AnimatedButton;