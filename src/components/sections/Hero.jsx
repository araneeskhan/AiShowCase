import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  Button, 
  Stack, 
  Icon, 
  useColorModeValue,
  SimpleGrid,
  VStack,
  Flex,
  Circle,
  HStack,
} from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { motion } from 'framer-motion'
import { FaArrowRight, FaRobot, FaFileAlt, FaCode, FaUsers, FaBrain, FaChartLine, FaPlay } from 'react-icons/fa'

const MotionBox = motion(Box)
const MotionFlex = motion(Flex)

// Create floating animation
const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 0.5; }
`

const Hero = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const glowColor = useColorModeValue('cyan.100', 'cyan.900')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const navigate = (sectionId, tabIndex) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: 'smooth' })
    
    if (sectionId === 'showcase') {
      window.dispatchEvent(new CustomEvent('setAIShowcaseTab', { 
        detail: tabIndex 
      }))
    }
  }

  return (
    <Box
      as="section"
      minHeight="100vh"
      bg={bgColor}
      position="relative"
      overflow="hidden"
      pt={{ base: "20", md: "32" }}
    >
      {/* Animated Background Elements */}
      {[...Array(5)].map((_, i) => (
        <Circle
          key={i}
          position="absolute"
          bg={glowColor}
          opacity="0.3"
          w={['100px', '200px', '300px']}
          h={['100px', '200px', '300px']}
          left={`${Math.random() * 100}%`}
          top={`${Math.random() * 100}%`}
          filter="blur(40px)"
          animation={`${pulse} ${4 + i}s infinite`}
        />
      ))}

      <Container maxW="container.xl" position="relative">
        <MotionFlex
          direction="column"
          align="center"
          textAlign="center"
          gap={8}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box maxW="800px">
            <HStack spacing={4} mb={4} justify="center">
              <Icon as={FaBrain} w={8} h={8} color="cyan.400" />
              <Text
                color="cyan.400"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="lg"
              >
                AI-POWERED DEVELOPMENT PLATFORM
              </Text>
            </HStack>
            <Heading
              as="h1"
              size="3xl"
              fontWeight="bold"
              lineHeight="shorter"
              mb={6}
            >
              Transform Your{' '}
              <Text
                as="span"
                bgGradient="linear(to-r, cyan.400, purple.500)"
                bgClip="text"
              >
                Development
              </Text>{' '}
              Journey
            </Heading>
            <Text
              fontSize="xl"
              color={useColorModeValue('gray.600', 'gray.400')}
              mb={8}
              maxW="600px"
              mx="auto"
            >
              Experience the future of development with our AI-powered tools.
              From code analysis to team collaboration, we're here to enhance your workflow.
            </Text>

            <Stack
              direction={{ base: 'column', sm: 'row' }}
              spacing={4}
              justify="center"
              mb={12}
            >
              <Button
                size="lg"
                colorScheme="cyan"
                rightIcon={<FaArrowRight />}
                px={8}
                height="60px"
                fontSize="lg"
                onClick={() => navigate('showcase', 0)}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: '2xl',
                }}
                transition="all 0.2s"
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="ghost"
                colorScheme="purple"
                px={8}
                height="60px"
                fontSize="lg"
                leftIcon={<FaPlay />}
                _hover={{
                  transform: 'translateY(-2px)',
                }}
                transition="all 0.2s"
              >
                Watch Demo
              </Button>
            </Stack>

            {/* Stats */}
            <SimpleGrid columns={{ base: 2, md: 4 }} gap={8} maxW="800px" mx="auto">
              {[
                { label: 'Active Users', value: '10K+' },
                { label: 'Code Analysis', value: '1M+' },
                { label: 'AI Models', value: '50+' },
                { label: 'Team Success', value: '95%' },
              ].map((stat, index) => (
                <Box key={index} textAlign="center">
                  <Text
                    fontSize="3xl"
                    fontWeight="bold"
                    bgGradient="linear(to-r, cyan.400, purple.500)"
                    bgClip="text"
                  >
                    {stat.value}
                  </Text>
                  <Text color={useColorModeValue('gray.600', 'gray.400')}>
                    {stat.label}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        </MotionFlex>
      </Container>
    </Box>
  )
}

export default Hero