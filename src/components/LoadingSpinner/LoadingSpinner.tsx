import { motion } from 'motion/react'

const dotStyle = {
  width: '12px',
  height: '12px',
  backgroundColor: '#3498db',
  borderRadius: '50%',
  margin: '0 4px',
}

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
  height: '80px',
}

export default function LoadingSpinner() {
  return (
    <div style={containerStyle}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          style={dotStyle}
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  )
}
