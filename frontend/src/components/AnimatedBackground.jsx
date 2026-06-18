// Slowly-drifting gradient blobs that sit behind hero/auth content.
// Pure decoration — pointer-events-none, aria-hidden, no interaction.

import { motion } from 'motion/react';

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <motion.div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-violet-300/40 rounded-full blur-3xl"
        animate={{ x: [0, 100, 0], y: [0, 60, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-32 -right-32 w-[450px] h-[450px] bg-fuchsia-300/40 rounded-full blur-3xl"
        animate={{ x: [0, -80, 0], y: [0, 100, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-blue-300/30 rounded-full blur-3xl"
        animate={{ x: [0, 80, 0], y: [0, -50, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
