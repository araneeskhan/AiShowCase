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
} from '@chakra-ui/react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaExclamationCircle, FaLightbulb, FaFileUpload } from 'react-icons/fa';
import { pdfjs } from "react-pdf";
// import * as pdfjs from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'; // Import the worker entry

// Set the worker source
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionBadge = motion(Badge);

const analyzeResumeText = (resumeText) => {
  const technicalKeywords = [
    'React', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'Java', 'C#', 'HTML', 'CSS',
    'AWS', 'Azure', 'Docker', 'Kubernetes', 'CI/CD', 'Git', 'REST API', 'GraphQL',
    'SQL', 'NoSQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'Redux', 'Vue.js',
    'Angular', 'Next.js', 'Express', 'Django', 'Flask', 'Spring Boot', 'TensorFlow',
    'Machine Learning', 'Deep Learning', 'AI', 'Data Science', 'Data Analysis',
  ];

  const softSkillKeywords = [
    'Leadership', 'Communication', 'Teamwork', 'Problem Solving', 'Critical Thinking',
    'Time Management', 'Project Management', 'Creativity', 'Adaptability', 'Collaboration',
    'Analytical', 'Detail-oriented', 'Innovative', 'Strategic', 'Customer-focused',
  ];

  const detectedKeywords = [...technicalKeywords, ...softSkillKeywords].filter(
    (keyword) => resumeText.toLowerCase().includes(keyword.toLowerCase()),
  ).slice(0, 10);

  let score = 70;
  score += Math.min(detectedKeywords.length * 2, 15);

  const hasQuantifiableResults = /\d+%|increased by \d+|reduced \d+|improved \d+/i.test(resumeText);
  if (hasQuantifiableResults) score += 5;

  const hasEducation = /education|university|college|degree|bachelor|master/i.test(resumeText);
  if (hasEducation) score += 3;

  const hasContactInfo = /email|phone|linkedin|github/i.test(resumeText);
  if (hasContactInfo) score += 2;

  const wordCount = resumeText.split(/\s+/).length;
  if (wordCount > 300 && wordCount < 1000) score += 5;

  let strengths = [];
  let improvements = [];
  let suggestions = [];

  if (detectedKeywords.length >= 5) strengths.push('Good use of relevant keywords');
  if (hasQuantifiableResults) strengths.push('Includes quantifiable achievements');
  if (wordCount > 400 && wordCount < 800) strengths.push('Appropriate resume length');
  if (resumeText.toLowerCase().includes('project') || resumeText.toLowerCase().includes('experience')) {
    strengths.push('Highlights relevant experience');
  }

  if (detectedKeywords.length < 5) improvements.push('Add more industry-relevant keywords');
  if (!hasQuantifiableResults) improvements.push('Include more quantifiable achievements');
  if (wordCount < 300) improvements.push('Resume is too brief, add more detail');
  if (wordCount > 1000) improvements.push('Resume is too long, consider condensing');

  suggestions.push('Use action verbs to start bullet points');
  suggestions.push('Tailor resume to specific job descriptions');
  if (!resumeText.toLowerCase().includes('certification')) {
    suggestions.push('Consider adding relevant certifications');
  }
  suggestions.push('Ensure consistent formatting throughout');

  while (strengths.length < 3) {
    const potential = [
      'Clear structure',
      'Professional formatting',
      'Includes necessary sections',
      'Good organization of information',
    ];
    const newStrength = potential.find((item) => !strengths.includes(item));
    if (newStrength) strengths.push(newStrength);
    else break;
  }

  while (improvements.length < 3) {
    const potential = [
      'Add more specific skills',
      'Provide more context to achievements',
      'Make accomplishments more prominent',
      'Enhance professional summary',
    ];
    const newImprovement = potential.find((item) => !improvements.includes(item));
    if (newImprovement) improvements.push(newImprovement);
    else break;
  }

  while (suggestions.length < 3) {
    const potential = [
      'Consider a skills section with proficiency levels',
      'Add relevant industry memberships',
      'Include a brief professional summary',
      'Add links to portfolio or GitHub',
    ];
    const newSuggestion = potential.find((item) => !suggestions.includes(item));
    if (newSuggestion) suggestions.push(newSuggestion);
    else break;
  }

  return {
    score: Math.min(Math.max(Math.round(score), 60), 98),
    strengths: strengths.slice(0, 4),
    improvements: improvements.slice(0, 4),
    suggestions: suggestions.slice(0, 4),
    keywords: detectedKeywords,
  };
};

const extractTextFromTxtFile = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsText(file);
  });
};

const extractTextFromPdfFile = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const pdfData = new Uint8Array(event.target.result);
        const pdf = await pdfjs.getDocument({ data: pdfData }).promise;
        let fullText = '';

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item) => item.str).join(' ');
          fullText += pageText + ' ';
        }

        resolve(fullText);
      } catch (error) {
        reject(new Error(`PDF parsing failed: ${error.message}`));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsArrayBuffer(file);
  });
};

const analyzeResume = async (resumeFile, setAnalyzing, setAnalysis, toast) => {
  setAnalyzing(true);

  try {
    let resumeText = '';

    if (resumeFile.type.includes('text') || resumeFile.name.endsWith('.txt')) {
      resumeText = await extractTextFromTxtFile(resumeFile);
    } else if (resumeFile.type === 'application/pdf' || resumeFile.name.endsWith('.pdf')) {
      resumeText = await extractTextFromPdfFile(resumeFile);
    } else {
      throw new Error('Unsupported file format');
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));
    const analysisResults = analyzeResumeText(resumeText);
    setAnalysis(analysisResults);
  } catch (error) {
    toast({
      title: 'Analysis Error',
      description: `Failed to analyze resume: ${error.message}`,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  } finally {
    setAnalyzing(false);
  }
};

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const toast = useToast();

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const hoverBorderColor = useColorModeValue('cyan.400', 'cyan.300');
  const sectionBgColor = useColorModeValue('gray.50', 'gray.700');
  const hoverBgColor = useColorModeValue('gray.100', 'gray.600');

  const handleFileUpload = async (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile && (uploadedFile.type.includes('text') || uploadedFile.name.endsWith('.txt') ||
        uploadedFile.type === 'application/pdf' || uploadedFile.name.endsWith('.pdf'))) {
      setFile(uploadedFile);
      await analyzeResume(uploadedFile, setAnalyzing, setAnalysis, toast);
    } else {
      toast({
        title: 'Invalid file type',
        description: 'Please upload a PDF or text file (.pdf, .txt)',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

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
                accept=".pdf,.txt"
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
                    Supported formats: PDF, TXT
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
                  bg={sectionBgColor}
                  p={4}
                  borderRadius="lg"
                >
                  <Heading size="md">Resume Score</Heading>
                  <MotionBadge
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    colorScheme={analysis.score >= 80 ? 'green' : analysis.score >= 70 ? 'yellow' : 'orange'}
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
                    bg={sectionBgColor}
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
                          _hover={{ bg: hoverBgColor }}
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
                    setFile(null);
                    setAnalysis(null);
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
  );
};

export default ResumeAnalyzer;