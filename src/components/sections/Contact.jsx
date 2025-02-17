import {
  Box,
  Container,
  Heading,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
  SimpleGrid,
  Text,
  Icon,
  useColorModeValue,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FaUser, FaEnvelope, FaComment, FaPaperPlane, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa'

const MotionBox = motion(Box)

const ContactInfo = ({ icon, title, content }) => (
  <HStack spacing={4} align="flex-start">
    <Icon as={icon} w={6} h={6} color="cyan.400" />
    <Box>
      <Text fontWeight="bold" fontSize="lg">
        {title}
      </Text>
      <Text color={useColorModeValue('gray.600', 'gray.400')}>
        {content}
      </Text>
    </Box>
  </HStack>
)

const Contact = () => {
  const toast = useToast()
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  const handleSubmit = (e) => {
    e.preventDefault()
    toast({
      title: "Message sent!",
      description: "We'll get back to you soon.",
      status: "success",
      duration: 5000,
      isClosable: true,
    })
  }

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
      transition: { duration: 0.5 },
    },
  }

  return (
    <Box 
      id="contact"
      as="section" 
      py={20} 
      bg={useColorModeValue('gray.50', 'gray.900')}
      position="relative"
      overflow="hidden"
    >
      {/* Decorative Elements */}
      <Box
        position="absolute"
        left="-10%"
        top="20%"
        width="40%"
        height="40%"
        bgGradient="radial(circle at 30% 50%, cyan.400, transparent 70%)"
        opacity="0.1"
        filter="blur(50px)"
        transform="rotate(-5deg)"
      />
      <Box
        position="absolute"
        right="-10%"
        bottom="20%"
        width="40%"
        height="40%"
        bgGradient="radial(circle at 70% 50%, purple.400, transparent 70%)"
        opacity="0.1"
        filter="blur(50px)"
        transform="rotate(5deg)"
      />

      <Container maxW="container.xl" position="relative">
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <VStack spacing={12}>
            <MotionBox variants={itemVariants} textAlign="center" maxW="600px">
              <Heading
                bgGradient="linear(to-r, cyan.400, purple.500)"
                bgClip="text"
                fontSize={{ base: '3xl', md: '4xl' }}
                fontWeight="bold"
                mb={4}
              >
                Get in Touch
              </Heading>
              <Text
                fontSize="lg"
                color={useColorModeValue('gray.600', 'gray.400')}
              >
                Have questions about our AI solutions? We'd love to hear from you.
                Send us a message and we'll respond as soon as possible.
              </Text>
            </MotionBox>

            <SimpleGrid
              columns={{ base: 1, lg: 2 }}
              spacing={8}
              w="100%"
              alignItems="flex-start"
            >
              <MotionBox
                variants={itemVariants}
                as="form"
                onSubmit={handleSubmit}
                p={8}
                borderRadius="2xl"
                bg={bgColor}
                boxShadow="xl"
                border="1px solid"
                borderColor={borderColor}
              >
                <VStack spacing={6}>
                  <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <InputGroup>
                      <InputLeftElement>
                        <Icon as={FaUser} color="gray.500" />
                      </InputLeftElement>
                      <Input
                        type="text"
                        placeholder="Your name"
                        _focus={{
                          borderColor: "cyan.400",
                          boxShadow: "0 0 0 1px cyan.400",
                        }}
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <InputGroup>
                      <InputLeftElement>
                        <Icon as={FaEnvelope} color="gray.500" />
                      </InputLeftElement>
                      <Input
                        type="email"
                        placeholder="your.email@example.com"
                        _focus={{
                          borderColor: "cyan.400",
                          boxShadow: "0 0 0 1px cyan.400",
                        }}
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Message</FormLabel>
                    <InputGroup>
                      <InputLeftElement>
                        <Icon as={FaComment} color="gray.500" />
                      </InputLeftElement>
                      <Textarea
                        placeholder="Your message..."
                        rows={6}
                        pl={10}
                        _focus={{
                          borderColor: "cyan.400",
                          boxShadow: "0 0 0 1px cyan.400",
                        }}
                      />
                    </InputGroup>
                  </FormControl>

                  <Button
                    type="submit"
                    colorScheme="cyan"
                    size="lg"
                    w="100%"
                    h="56px"
                    rightIcon={<FaPaperPlane />}
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg',
                    }}
                    transition="all 0.2s"
                  >
                    Send Message
                  </Button>
                </VStack>
              </MotionBox>

              <MotionBox
                variants={itemVariants}
                p={8}
                borderRadius="2xl"
                bg={bgColor}
                boxShadow="xl"
                border="1px solid"
                borderColor={borderColor}
              >
                <VStack spacing={8} align="stretch">
                  <Heading
                    size="md"
                    bgGradient="linear(to-r, cyan.400, purple.500)"
                    bgClip="text"
                  >
                    Contact Information
                  </Heading>

                  <VStack spacing={6} align="stretch">
                    <ContactInfo
                      icon={FaPhone}
                      title="Phone"
                      content="+1 (555) 123-4567"
                    />
                    <ContactInfo
                      icon={FaEnvelope}
                      title="Email"
                      content="info@aicompany.com"
                    />
                    <ContactInfo
                      icon={FaMapMarkerAlt}
                      title="Location"
                      content="123 AI Street, Tech Valley, CA 94025"
                    />
                    <ContactInfo
                      icon={FaClock}
                      title="Business Hours"
                      content="Mon - Fri: 9:00 AM - 6:00 PM"
                    />
                  </VStack>

                  <Box
                    p={6}
                    bg={useColorModeValue('gray.50', 'gray.700')}
                    borderRadius="xl"
                  >
                    <Text
                      fontSize="sm"
                      color={useColorModeValue('gray.600', 'gray.400')}
                    >
                      Need immediate assistance? Our AI chatbot is available 24/7 to help
                      answer your questions. Look for the chat icon in the bottom right
                      corner.
                    </Text>
                  </Box>
                </VStack>
              </MotionBox>
            </SimpleGrid>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  )
}

export default Contact