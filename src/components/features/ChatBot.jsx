import {
  Box,
  VStack,
  HStack,
  Input,
  IconButton,
  Text,
  useColorModeValue,
  Collapse,
  Button,
  Avatar,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Tooltip,
  Badge,
  Spinner,
  SlideFade,
  useToast,
} from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { FaRobot, FaPaperPlane, FaTimes, FaComments, FaRegSmile, FaImage } from 'react-icons/fa'

const MotionBox = motion(Box)

const ChatMessage = ({ message, isBot, isNew }) => (
  <SlideFade in={true} offsetY={20}>
    <HStack
      align="start"
      justify={isBot ? 'flex-start' : 'flex-end'}
      w="100%"
      mb={4}
    >
      {isBot && (
        <Avatar
          size="sm"
          icon={<FaRobot />}
          bg="cyan.500"
          color="white"
          p={1}
          transition="all 0.2s"
          _hover={{ transform: 'scale(1.1)' }}
        />
      )}
      <Box
        maxW="80%"
        bg={isBot ? useColorModeValue('gray.100', 'gray.700') : 'cyan.500'}
        color={isBot ? useColorModeValue('gray.800', 'white') : 'white'}
        borderRadius={isBot ? 'lg' : 'lg'}
        p={4}
        fontSize="sm"
        boxShadow="md"
        position="relative"
        _hover={{
          transform: 'translateY(-2px)',
          boxShadow: 'lg',
        }}
        transition="all 0.2s"
      >
        <Text>{message}</Text>
        <Text
          fontSize="xs"
          opacity={0.7}
          position="absolute"
          bottom="-20px"
          right={isBot ? 'auto' : 0}
          left={isBot ? 0 : 'auto'}
        >
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </Box>
      {!isBot && (
        <Avatar
          size="sm"
          bg="purple.500"
          name="User"
          transition="all 0.2s"
          _hover={{ transform: 'scale(1.1)' }}
        />
      )}
    </HStack>
  </SlideFade>
)

const TypingIndicator = () => (
  <HStack spacing={2} p={2}>
    <Spinner size="xs" color="cyan.500" />
    <Text fontSize="sm" color="gray.500">AI is typing...</Text>
  </HStack>
)

const predefinedQuestions = [
  {
    question: "How can AI help with my code?",
    answer: "Our AI can help you write better code by providing real-time suggestions, identifying bugs, explaining complex code segments, and even helping with code optimization. It's like having a senior developer by your side 24/7!"
  },
  {
    question: "What's special about the resume analyzer?",
    answer: "Our resume analyzer uses AI to evaluate your resume against industry standards, provides keyword optimization, suggests improvements, and helps you match job requirements. It's trained on millions of successful resumes!"
  },
  {
    question: "How does the community feature work?",
    answer: "Our community platform connects you with developers worldwide. You can share code, ask questions, participate in discussions, and collaborate on projects. Plus, our AI helps moderate and enhance discussions!"
  },
  {
    question: "Is my code secure in the cloud workspace?",
    answer: "Absolutely! We use enterprise-grade encryption, secure authentication, and regular security audits. Your code is protected with the same security standards used by major tech companies."
  }
]

const ChatBot = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your AI assistant. How can I help you today?", isBot: true }
  ])
  const [input, setInput] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const toast = useToast()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = (text = input) => {
    if (!text.trim()) return

    setMessages(prev => [...prev, { text, isBot: false, isNew: true }])
    setInput('')
    setShowSuggestions(false)
    setIsTyping(true)

    const matchingQA = predefinedQuestions.find(
      qa => qa.question.toLowerCase().includes(text.toLowerCase())
    )

    setTimeout(() => {
      setIsTyping(false)
      if (matchingQA) {
        setMessages(prev => [...prev, { text: matchingQA.answer, isBot: true, isNew: true }])
      } else {
        setMessages(prev => [...prev, {
          text: "I understand you're asking about " + text + ". While I don't have a specific answer for that, I can help you with code assistance, resume analysis, community features, and workspace security. What would you like to know about these topics?",
          isBot: true,
          isNew: true
        }])
      }
    }, 1500)
  }

  const ChatButton = () => (
    <MotionBox
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      position="fixed"
      bottom="8"
      right="50%"
      transform="translateX(50%)"
      zIndex={1000}
    >
      <Tooltip label="Chat with AI Assistant" hasArrow>
        <IconButton
          icon={<FaComments />}
          colorScheme="cyan"
          borderRadius="full"
          size="lg"
          onClick={onOpen}
          boxShadow="xl"
          _hover={{
            transform: 'scale(1.1)',
          }}
          transition="all 0.2s"
        />
      </Tooltip>
    </MotionBox>
  )

  return (
    <>
      <ChatButton />
      
      <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
        size="full"
      >
        <DrawerOverlay backdropFilter="blur(10px)" />
        <DrawerContent
          maxW="600px"
          mx="auto"
          h="80vh"
          my="auto"
          borderTopRadius="xl"
          overflow="hidden"
        >
          <DrawerCloseButton />
          <DrawerHeader 
            borderBottomWidth="1px"
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow="sm"
          >
            <HStack>
              <Avatar
                size="sm"
                icon={<FaRobot />}
                bg="cyan.500"
                color="white"
              />
              <VStack align="start" spacing={0}>
                <Text fontWeight="bold">AI Assistant</Text>
                <Badge colorScheme="green" variant="subtle">
                  Online
                </Badge>
              </VStack>
            </HStack>
          </DrawerHeader>

          <DrawerBody 
            p={4} 
            bg={useColorModeValue('gray.50', 'gray.900')}
          >
            <VStack h="full" spacing={4}>
              <Box
                flex={1}
                w="100%"
                overflowY="auto"
                px={2}
                css={{
                  '&::-webkit-scrollbar': {
                    width: '2px',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: 'transparent',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: 'transparent',
                  },
                  '&:hover::-webkit-scrollbar-thumb': {
                    background: useColorModeValue('rgba(0,0,0,0.1)', 'rgba(255,255,255,0.1)'),
                  },
                  'scrollbarWidth': 'thin',
                  'scrollbarColor': `${useColorModeValue('rgba(0,0,0,0.1)', 'rgba(255,255,255,0.1)')} transparent`,
                  'msOverflowStyle': 'none',
                }}
              >
                <Box px={2}>
                  <AnimatePresence>
                    {messages.map((message, index) => (
                      <ChatMessage
                        key={index}
                        message={message.text}
                        isBot={message.isBot}
                        isNew={message.isNew}
                      />
                    ))}
                  </AnimatePresence>
                  {isTyping && <TypingIndicator />}
                  <div ref={messagesEndRef} />
                </Box>
              </Box>

              <Collapse in={showSuggestions} animateOpacity>
                <VStack spacing={2} w="100%" mb={4}>
                  {predefinedQuestions.map((qa, index) => (
                    <Button
                      key={index}
                      size="sm"
                      variant="outline"
                      colorScheme="cyan"
                      onClick={() => handleSend(qa.question)}
                      w="100%"
                      _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: 'md',
                      }}
                      transition="all 0.2s"
                    >
                      {qa.question}
                    </Button>
                  ))}
                </VStack>
              </Collapse>

              <HStack 
                w="100%" 
                p={2} 
                bg={useColorModeValue('white', 'gray.800')}
                borderRadius="lg"
                boxShadow="sm"
              >
                <IconButton
                  icon={<FaRegSmile />}
                  variant="ghost"
                  colorScheme="cyan"
                  aria-label="Add emoji"
                />
                <IconButton
                  icon={<FaImage />}
                  variant="ghost"
                  colorScheme="cyan"
                  aria-label="Add image"
                />
                <Input
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  bg={useColorModeValue('white', 'gray.700')}
                  borderRadius="full"
                  _focus={{
                    boxShadow: 'none',
                    borderColor: 'cyan.500',
                  }}
                />
                <IconButton
                  icon={<FaPaperPlane />}
                  colorScheme="cyan"
                  onClick={() => handleSend()}
                  isDisabled={!input.trim()}
                  borderRadius="full"
                  _hover={{
                    transform: 'translateY(-2px)',
                  }}
                  transition="all 0.2s"
                />
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default ChatBot 