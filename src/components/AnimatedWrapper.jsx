import { motion } from "framer-motion";
import { pageVariants, pageTransition } from "@/utils/animations";

const AnimatedWrapper = ({ children, className = "" }) => {
  return (
    <motion.div
      className={className}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedWrapper;