import { useState, useRef, useEffect } from 'react'
import {
  Box,
  Input,
  Button,
  VStack,
  HStack,
  Text,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaRobot, FaPaperPlane, FaTimes } from 'react-icons/fa'

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)
  
  const bgColor = useColorModeValue('white', 'gray.800')
  const buttonBg = useColorModeValue('cyan.400', 'cyan.500')

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage = { text: input, sender: 'user' }
    setMessages(prev => [...prev, userMessage])
    setInput('')

    // TODO: Implement AI response logic here
    // For now, we'll simulate a response
    setTimeout(() => {
      const botMessage = {
        text: "Thanks for your message! I'm a demo chatbot.",
        sender: 'bot'
      }
      setMessages(prev => [...prev, botMessage])
    }, 1000)
  }

  return (
    <Box position="fixed" bottom="20px" right="20px">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
          >
            <Box
              position="fixed"
              bottom="100px"
              right="20px"
              w="300px"
              h="400px"
              bg={bgColor}
              borderRadius="xl"
              boxShadow="2xl"
              zIndex="1000"
            >
              <VStack h="100%" spacing={0}>
                <HStack
                  w="100%"
                  p={4}
                  bg={buttonBg}
                  borderTopRadius="xl"
                  justify="space-between"
                >
                  <Text color="white" fontWeight="bold">AI Assistant</Text>
                  <IconButton
                    size="sm"
                    icon={<FaTimes />}
                    onClick={() => setIsOpen(false)}
                    variant="ghost"
                    color="white"
                    _hover={{ bg: 'whiteAlpha.300' }}
                  />
                </HStack>
                
                <VStack
                  flex={1}
                  w="100%"
                  p={4}
                  overflowY="auto"
                  spacing={4}
                  align="stretch"
                >
                  {messages.map((message, index) => (
                    <Box
                      key={index}
                      alignSelf={message.sender === 'user' ? 'flex-end' : 'flex-start'}
                      bg={message.sender === 'user' ? buttonBg : 'gray.100'}
                      color={message.sender === 'user' ? 'white' : 'black'}
                      py={2}
                      px={4}
                      borderRadius="lg"
                      maxW="80%"
                    >
                      {message.text}
                    </Box>
                  ))}
                  <div ref={messagesEndRef} />
                </VStack>

                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                  <HStack p={4} w="100%">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type a message..."
                    />
                    <IconButton
                      type="submit"
                      icon={<FaPaperPlane />}
                      colorScheme="cyan"
                    />
                  </HStack>
                </form>
              </VStack>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <IconButton
          icon={<FaRobot />}
          position="fixed"
          bottom="20px"
          right="20px"
          size="lg"
          colorScheme="cyan"
          borderRadius="full"
          onClick={() => setIsOpen(!isOpen)}
          zIndex="1000"
        />
      </motion.div>
    </Box>
  )
}

export default ChatBot 