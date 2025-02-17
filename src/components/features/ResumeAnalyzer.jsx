import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  useToast,
  Progress,
  List,
  ListItem,
  ListIcon,
  Badge,
  Flex,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCheckCircle, FaExclamationCircle, FaLightbulb, FaFileUpload } from 'react-icons/fa'
import { Document, Page, pdfjs } from 'react-pdf'

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

const MotionBox = motion(Box)
const MotionFlex = motion(Flex)
const MotionBadge = motion(Badge)

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState(null)
  const toast = useToast()

  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const hoverBorderColor = useColorModeValue('cyan.400', 'cyan.300')

  const handleFileUpload = async (event) => {
    const uploadedFile = event.target.files[0]
    if (uploadedFile && (uploadedFile.type === 'application/pdf' || uploadedFile.type.includes('document'))) {
      setFile(uploadedFile)
      await analyzeResume(uploadedFile)
    } else {
      toast({
        title: 'Invalid file type',
        description: 'Please upload a PDF or Word document',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const analyzeResume = async (resumeFile) => {
    setAnalyzing(true)
    
    // Simulated analysis - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const mockAnalysis = {
      score: 85,
      strengths: [
        'Clear work experience section',
        'Good use of action verbs',
        'Includes relevant skills',
      ],
      improvements: [
        'Add quantifiable achievements',
        'Include a professional summary',
        'Add more technical skills',
      ],
      keywords: ['React', 'JavaScript', 'Project Management', 'Team Leadership'],
      suggestions: [
        'Consider adding certifications',
        'Make achievements more specific with numbers',
        'Add links to portfolio projects',
      ],
    }

    setAnalysis(mockAnalysis)
    setAnalyzing(false)
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  }

  return (
    <MotionBox
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      p={8}
      borderRadius="2xl"
      bg={bgColor}
      boxShadow="2xl"
      maxW="800px"
      mx="auto"
      overflow="hidden"
    >
      <VStack spacing={8} align="stretch">
        <Heading
          textAlign="center"
          bgGradient="linear(to-r, cyan.400, purple.500)"
          bgClip="text"
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="bold"
        >
          AI Resume Analyzer
        </Heading>

        <AnimatePresence mode="wait">
          {!file && (
            <MotionBox
              key="upload"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              border="3px dashed"
              borderColor={borderColor}
              borderRadius="xl"
              p={10}
              textAlign="center"
              _hover={{ borderColor: hoverBorderColor }}
              position="relative"
              cursor="pointer"
            >
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
                id="resume-upload"
              />
              <label htmlFor="resume-upload" style={{ cursor: 'pointer' }}>
                <VStack spacing={4}>
                  <Icon as={FaFileUpload} w={12} h={12} color="cyan.400" />
                  <Button
                    as="span"
                    colorScheme="cyan"
                    size="lg"
                    fontWeight="bold"
                    px={8}
                    py={6}
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'xl',
                    }}
                    transition="all 0.2s"
                  >
                    Upload Resume
                  </Button>
                  <Text color="gray.500" fontSize="sm">
                    Supported formats: PDF, DOC, DOCX
                  </Text>
                </VStack>
              </label>
            </MotionBox>
          )}

          {analyzing && (
            <MotionBox
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              p={8}
            >
              <VStack spacing={6}>
                <Progress
                  size="xs"
                  isIndeterminate
                  colorScheme="cyan"
                  w="100%"
                  borderRadius="full"
                />
                <Text fontSize="lg" color="cyan.500" fontWeight="medium">
                  Analyzing your resume...
                </Text>
              </VStack>
            </MotionBox>
          )}

          {analysis && (
            <MotionBox
              key="results"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              p={6}
            >
              <VStack spacing={8} align="stretch">
                <MotionFlex
                  variants={itemVariants}
                  justify="space-between"
                  align="center"
                  bg={useColorModeValue('gray.50', 'gray.700')}
                  p={4}
                  borderRadius="lg"
                >
                  <Heading size="md">Resume Score</Heading>
                  <MotionBadge
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    colorScheme={analysis.score >= 80 ? 'green' : 'yellow'}
                    p={3}
                    borderRadius="lg"
                    fontSize="xl"
                  >
                    {analysis.score}/100
                  </MotionBadge>
                </MotionFlex>

                {['strengths', 'improvements', 'suggestions'].map((section, sectionIndex) => (
                  <MotionBox
                    key={section}
                    variants={itemVariants}
                    bg={useColorModeValue('gray.50', 'gray.700')}
                    p={6}
                    borderRadius="lg"
                  >
                    <Heading size="sm" mb={4} textTransform="capitalize">
                      {section}
                    </Heading>
                    <List spacing={3}>
                      {analysis[section].map((item, index) => (
                        <ListItem
                          key={index}
                          display="flex"
                          alignItems="center"
                          _hover={{ bg: useColorModeValue('gray.100', 'gray.600') }}
                          p={2}
                          borderRadius="md"
                          transition="all 0.2s"
                        >
                          <ListIcon
                            as={
                              section === 'strengths'
                                ? FaCheckCircle
                                : section === 'improvements'
                                ? FaExclamationCircle
                                : FaLightbulb
                            }
                            color={
                              section === 'strengths'
                                ? 'green.500'
                                : section === 'improvements'
                                ? 'orange.500'
                                : 'cyan.500'
                            }
                            w={5}
                            h={5}
                          />
                          <Text ml={2}>{item}</Text>
                        </ListItem>
                      ))}
                    </List>
                  </MotionBox>
                ))}

                <MotionBox variants={itemVariants}>
                  <Heading size="sm" mb={4}>Keywords Detected</Heading>
                  <Flex gap={3} flexWrap="wrap">
                    {analysis.keywords.map((keyword, index) => (
                      <MotionBadge
                        key={index}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        colorScheme="purple"
                        p={2}
                        borderRadius="md"
                        fontSize="sm"
                        _hover={{
                          transform: 'translateY(-2px)',
                          boxShadow: 'md',
                        }}
                      >
                        {keyword}
                      </MotionBadge>
                    ))}
                  </Flex>
                </MotionBox>

                <Button
                  onClick={() => {
                    setFile(null)
                    setAnalysis(null)
                  }}
                  colorScheme="cyan"
                  size="lg"
                  w="full"
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                  }}
                  transition="all 0.2s"
                >
                  Analyze Another Resume
                </Button>
              </VStack>
            </MotionBox>
          )}
        </AnimatePresence>
      </VStack>
    </MotionBox>
  )
}

export default ResumeAnalyzer 