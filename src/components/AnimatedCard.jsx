import { motion } from "framer-motion";
import { cardHoverVariants, conditionalAnimation } from "@/utils/animations";

const AnimatedCard = ({ 
  children, 
  className = "", 
  as: Component = "div",
  href,
  to,
  onClick,
  ...props 
}) => {
  const MotionComponent = motion[Component] || motion.div;
  
  return (
    <MotionComponent
      className={`card-modern ${className}`}
      variants={conditionalAnimation(cardHoverVariants)}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      href={href}
      to={to}
      onClick={onClick}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};

export default AnimatedCard;