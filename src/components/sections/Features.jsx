import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  Icon,
  VStack,
  useColorModeValue,
  Circle,
  HStack,
  Flex,
  Badge,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { 
  FaCode, 
  FaFileAlt, 
  FaUsers, 
  FaChartLine,
  FaBrain,
  FaRobot,
  FaLock,
  FaCloud,
  FaMobile,
  FaGithub,
  FaDatabase,
  FaCog,
} from 'react-icons/fa'

const MotionBox = motion(Box)

const Feature = ({ title, description, icon, color, index }) => (
  <MotionBox
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -8, boxShadow: '2xl' }}
    p={8}
    bg={useColorModeValue('white', 'gray.800')}
    borderRadius="2xl"
    boxShadow="xl"
    position="relative"
    overflow="hidden"
    role="group"
  >
    {/* Background Gradient */}
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg={`${color}.400`}
      opacity={0}
      transition="all 0.3s"
      _groupHover={{ opacity: 0.05 }}
    />

    {/* Icon Circle with Gradient Border */}
    <Flex
      mb={6}
      position="relative"
      alignItems="center"
      justifyContent="space-between"
    >
      <Circle
        size="60px"
        bg={useColorModeValue('white', 'gray.800')}
        borderWidth="2px"
        borderColor={`${color}.400`}
        p={3}
        position="relative"
        _groupHover={{
          transform: 'scale(1.1)',
          borderColor: `${color}.200`,
        }}
        transition="all 0.3s"
      >
        <Icon 
          as={icon} 
          w={6} 
          h={6} 
          color={`${color}.400`}
          _groupHover={{
            transform: 'rotate(360deg)',
          }}
          transition="all 0.5s"
        />
      </Circle>
      <Badge
        colorScheme={color}
        variant="subtle"
        px={3}
        py={1}
        borderRadius="full"
        fontSize="xs"
        textTransform="uppercase"
        letterSpacing="wider"
      >
        Featured
      </Badge>
    </Flex>

    {/* Content */}
    <VStack align="start" spacing={4} position="relative">
      <Heading
        size="md"
        fontWeight="bold"
        _groupHover={{ color: `${color}.400` }}
        transition="all 0.3s"
      >
        {title}
      </Heading>
      <Text
        color={useColorModeValue('gray.600', 'gray.400')}
        fontSize="md"
        lineHeight="tall"
      >
        {description}
      </Text>
    </VStack>

    {/* Decorative Elements */}
    <Box
      position="absolute"
      bottom={0}
      right={0}
      width="100px"
      height="100px"
      opacity={0.1}
      bgGradient={`radial(${color}.400, transparent)`}
      transform="translate(30%, 30%)"
      _groupHover={{
        opacity: 0.2,
        transform: 'translate(20%, 20%)',
      }}
      transition="all 0.3s"
    />
  </MotionBox>
)

const Features = () => {
  const features = [
    {
      title: 'AI Code Assistant',
      description: 'Get instant code suggestions, bug fixes, and real-time pair programming with AI.',
      icon: FaCode,
      color: 'cyan'
    },
    {
      title: 'Resume Analyzer',
      description: 'AI-powered resume optimization with industry-specific recommendations.',
      icon: FaFileAlt,
      color: 'purple'
    },
    {
      title: 'Dev Community',
      description: 'Join a vibrant community of developers to share knowledge and collaborate.',
      icon: FaUsers,
      color: 'pink'
    },
    {
      title: 'Smart Analytics',
      description: 'Track your coding progress and get personalized improvement insights.',
      icon: FaChartLine,
      color: 'teal'
    },
    {
      title: 'Cloud Workspace',
      description: 'Secure, collaborative development environment with Git integration.',
      icon: FaCloud,
      color: 'blue'
    },
    {
      title: 'API Integration',
      description: 'Connect with your favorite development tools and services.',
      icon: FaCog,
      color: 'orange'
    }
  ]

  return (
    <Box
      id="features"
      as="section"
      py={20}
      bg={useColorModeValue('gray.50', 'gray.900')}
      position="relative"
      overflow="hidden"
    >
      {/* Background Decoration */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        height="400px"
        bgGradient={useColorModeValue(
          'linear(to-b, cyan.50, transparent)',
          'linear(to-b, cyan.900, transparent)'
        )}
        opacity={0.1}
      />

      <Container maxW="container.xl">
        <VStack spacing={16}>
          {/* Section Header */}
          <VStack spacing={4} textAlign="center" maxW="800px">
            <Badge
              colorScheme="cyan"
              px={4}
              py={2}
              borderRadius="full"
              textTransform="uppercase"
              letterSpacing="wider"
              fontSize="sm"
            >
              Features
            </Badge>
            <Heading
              as="h2"
              size="2xl"
              bgGradient="linear(to-r, cyan.400, purple.500)"
              bgClip="text"
              fontWeight="extrabold"
            >
              Everything You Need
            </Heading>
            <Text
              fontSize="xl"
              color={useColorModeValue('gray.600', 'gray.400')}
              maxW="600px"
            >
              Discover our comprehensive suite of development tools and features
              designed to enhance your productivity.
            </Text>
          </VStack>

          {/* Features Grid */}
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={8}
            w="100%"
          >
            {features.map((feature, index) => (
              <Feature key={index} {...feature} index={index} />
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  )
}

export default Features