// Base container. Pass `hover` for a smooth lift + shadow on hover.

import { motion } from 'motion/react';

export function Card({ children, hover = false, className = '', ...rest }) {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className={`bg-white border border-slate-200 rounded-xl shadow-sm ${
        hover ? 'hover:shadow-xl hover:shadow-violet-100/40 hover:border-slate-300 cursor-pointer' : ''
      } ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
