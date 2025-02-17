import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const AnimatedCard = ({ children }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        p={6}
        borderRadius="xl"
        boxShadow="xl"
        bg="white"
        _dark={{ bg: 'gray.800' }}
      >
        {children}
      </Box>
    </motion.div>
  )
}

export default AnimatedCard 