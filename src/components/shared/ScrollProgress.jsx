import { Box } from '@chakra-ui/react'
import { motion, useScroll } from 'framer-motion'

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      height="4px"
      zIndex={2000}
    >
      <motion.div
        style={{
          height: '100%',
          background: 'linear-gradient(to right, cyan, purple)',
          transformOrigin: '0%',
          scaleX: scrollYProgress,
        }}
      />
    </Box>
  )
}

export default ScrollProgress 