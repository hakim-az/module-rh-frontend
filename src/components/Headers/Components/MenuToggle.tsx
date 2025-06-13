import { motion } from 'framer-motion'

interface PropsType {
  toggle: () => void
}

function MenuToggle({ toggle }: PropsType) {
  return (
    <button
      type="button"
      onClick={toggle}
      className="pointer-events-auto absolute right-4 top-[28px] z-30"
      aria-label="toggle button">
      <svg width="24" height="24" viewBox="0 0 23 23">
        <motion.path
          fill="transparent"
          strokeWidth="2"
          stroke="hsl(0, 0%, 18%)"
          strokeLinecap="round"
          variants={{
            closed: { d: 'M 2 2.5 L 20 2.5' },
            open: { d: 'M 3 16.5 L 17 2.5' },
          }}
        />
        <motion.path
          fill="transparent"
          strokeWidth="2"
          stroke="hsl(0, 0%, 18%)"
          strokeLinecap="round"
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
        />
        <motion.path
          fill="transparent"
          strokeWidth="2"
          stroke="hsl(0, 0%, 18%)"
          strokeLinecap="round"
          variants={{
            closed: { d: 'M 2 16.346 L 20 16.346' },
            open: { d: 'M 3 2.5 L 17 16.346' },
          }}
        />
      </svg>
    </button>
  )
}

export default MenuToggle
