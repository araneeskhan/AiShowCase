import {
  Box,
  Container,
  HStack,
  Button,
  IconButton,
  useColorMode,
  useColorModeValue,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Spacer,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import { FaSun, FaMoon, FaRobot, FaTools, FaInfoCircle, FaEnvelope } from 'react-icons/fa'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.100', 'gray.700')

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  const NavButton = ({ children, onClick, icon, tooltip }) => (
    <Tooltip label={tooltip} hasArrow>
      <Button
        variant="ghost"
        onClick={onClick}
        display="flex"
        alignItems="center"
        px={4}
        height="50px"
        fontSize="md"
        fontWeight="medium"
        color={useColorModeValue('gray.600', 'gray.300')}
        _hover={{
          bg: useColorModeValue('gray.50', 'gray.700'),
          color: useColorModeValue('cyan.500', 'cyan.200'),
        }}
        leftIcon={icon && <Icon as={icon} w={5} h={5} />}
      >
        {children}
      </Button>
    </Tooltip>
  )

  return (
    <MotionBox
      as="nav"
      position="fixed"
      w="100%"
      zIndex={1000}
      bg={bgColor}
      borderBottom="1px"
      borderColor={borderColor}
      backdropFilter="blur(10px)"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxW="container.xl" py={3}>
        <Flex align="center">
          <MotionBox
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="ghost"
              onClick={scrollToTop}
              fontSize="xl"
              fontWeight="bold"
              leftIcon={<Icon as={FaRobot} w={6} h={6} color="cyan.400" />}
              bgGradient="linear(to-r, cyan.400, purple.500)"
              bgClip="text"
              _hover={{
                bg: useColorModeValue('gray.50', 'gray.700'),
              }}
            >
              AI Showcase
            </Button>
          </MotionBox>

          <Spacer />

          <HStack spacing={1}>
            <NavButton
              onClick={() => scrollToSection('showcase')}
              icon={FaTools}
              tooltip="AI Tools"
            >
              Tools
            </NavButton>
            <NavButton
              onClick={() => scrollToSection('features')}
              icon={FaInfoCircle}
              tooltip="Features"
            >
              Features
            </NavButton>
            <NavButton
              onClick={() => scrollToSection('contact')}
              icon={FaEnvelope}
              tooltip="Contact Us"
            >
              Contact
            </NavButton>

            <Tooltip label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`} hasArrow>
              <IconButton
                icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
                onClick={toggleColorMode}
                variant="ghost"
                aria-label="Toggle color mode"
                color={useColorModeValue('gray.600', 'gray.300')}
                _hover={{
                  bg: useColorModeValue('gray.50', 'gray.700'),
                  color: useColorModeValue('cyan.500', 'cyan.200'),
                }}
              />
            </Tooltip>
          </HStack>
        </Flex>
      </Container>
    </MotionBox>
  )
}

export default Navbar