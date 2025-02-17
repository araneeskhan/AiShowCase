import { Box, Container, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, VStack, Icon } from '@chakra-ui/react'
import ResumeAnalyzer from '../features/ResumeAnalyzer'
import ResumeAnalytics from '../features/ResumeAnalytics'
import CodeEditor from '../features/CodeEditor'
import DiscussionForum from '../features/DiscussionForum'
import { useState, useEffect } from 'react'
import { useColorModeValue } from '@chakra-ui/react'
import { FaFileAlt, FaChartBar, FaCode, FaUsers } from 'react-icons/fa'

const AIShowcase = () => {
  const [tabIndex, setTabIndex] = useState(0)
  const bgColor = useColorModeValue('white', 'gray.800')

  useEffect(() => {
    const handleTabChange = (e) => setTabIndex(e.detail)
    window.addEventListener('setAIShowcaseTab', handleTabChange)
    return () => window.removeEventListener('setAIShowcaseTab', handleTabChange)
  }, [])

  const tabs = [
    { name: 'Resume Analyzer', icon: FaFileAlt, color: 'cyan' },
    { name: 'Analytics', icon: FaChartBar, color: 'purple' },
    { name: 'Code Editor', icon: FaCode, color: 'pink' },
    { name: 'Discussion', icon: FaUsers, color: 'teal' },
  ]

  return (
    <Box 
      id="showcase"
      as="section" 
      py={20} 
      bg={useColorModeValue('gray.50', 'gray.900')}
      minH="100vh"
    >
      <Container maxW="container.xl">
        <VStack spacing={12}>
          <Heading
            textAlign="center"
            fontSize={{ base: "3xl", md: "4xl" }}
            bgGradient="linear(to-r, cyan.400, purple.500)"
            bgClip="text"
            fontWeight="bold"
          >
            AI Tools
          </Heading>

          <Box 
            w="100%" 
            bg={bgColor} 
            borderRadius="2xl" 
            boxShadow="xl"
            overflow="hidden"
          >
            <Tabs 
              variant="soft-rounded" 
              colorScheme="cyan" 
              index={tabIndex}
              onChange={setTabIndex}
              p={6}
            >
              <TabList 
                mb={8} 
                gap={4}
                flexWrap="wrap"
                justifyContent="center"
              >
                {tabs.map((tab, index) => (
                  <Tab
                    key={index}
                    py={4}
                    px={6}
                    gap={2}
                    _selected={{
                      bg: `${tab.color}.400`,
                      color: 'white',
                    }}
                    borderRadius="full"
                  >
                    <Icon as={tab.icon} />
                    {tab.name}
                  </Tab>
                ))}
              </TabList>

              <TabPanels>
                <TabPanel>
                  <ResumeAnalyzer />
                </TabPanel>
                <TabPanel>
                  <ResumeAnalytics />
                </TabPanel>
                <TabPanel>
                  <CodeEditor />
                </TabPanel>
                <TabPanel>
                  <DiscussionForum />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}

export default AIShowcase