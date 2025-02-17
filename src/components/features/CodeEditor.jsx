import { Box, VStack, HStack, Button, Select, useColorMode, useColorModeValue, SimpleGrid, Text, useToast, Icon } from '@chakra-ui/react'
import Editor from '@monaco-editor/react'
import { useState } from 'react'
import { FaPlay } from 'react-icons/fa'

const CodeEditor = () => {
  const { colorMode } = useColorMode()
  const [language, setLanguage] = useState('javascript')
  const [code, setCode] = useState(`// Write your code here
function example() {
  console.log("Hello, World!");
}`)
  const [output, setOutput] = useState('')
  const toast = useToast()

  const executeJavaScript = (code) => {
    try {
      // Create a safe environment for code execution
      const safeEval = new Function(`
        let output = [];
        let console = {
          log: (...args) => output.push(args.join(' ')),
          error: (...args) => output.push('Error: ' + args.join(' ')),
          warn: (...args) => output.push('Warning: ' + args.join(' '))
        };
        try {
          ${code}
        } catch (e) {
          output.push('Error: ' + e.message);
        }
        return output;
      `)
      return safeEval()
    } catch (error) {
      return [`Error: ${error.message}`]
    }
  }

  const executePython = async (code) => {
    try {
      // Using Pyodide (WebAssembly Python)
      // You'll need to add the Pyodide script to your index.html
      if (!window.pyodide) {
        return ['Python runtime not loaded. Please wait...']
      }
      const result = await window.pyodide.runPythonAsync(code)
      return [result.toString()]
    } catch (error) {
      return [`Error: ${error.message}`]
    }
  }

  const handleRunCode = async () => {
    setOutput('Running...')
    let result = []

    try {
      switch (language) {
        case 'javascript':
          result = executeJavaScript(code)
          break
        case 'python':
          result = ['Python execution requires backend integration']
          break
        default:
          result = [`Language ${language} not supported yet`]
      }

      setOutput(result.join('\n'))
      if (result.length > 0 && !result[0].startsWith('Error')) {
        toast({
          title: 'Code executed successfully',
          status: 'success',
          duration: 2000,
        })
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`)
      toast({
        title: 'Execution failed',
        description: error.message,
        status: 'error',
        duration: 3000,
      })
    }
  }

  return (
    <VStack spacing={4} w="100%" align="stretch">
      <HStack>
        <Select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          w="200px"
          variant="filled"
          bg={useColorModeValue('gray.50', 'gray.700')}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="typescript">TypeScript</option>
        </Select>
        <Button 
          colorScheme="cyan"
          leftIcon={<Icon as={FaPlay} />}
          onClick={handleRunCode}
          px={6}
        >
          Run Code
        </Button>
      </HStack>
      
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={4}>
        <Box borderRadius="xl" overflow="hidden" boxShadow="xl">
          <Editor
            height="400px"
            defaultLanguage={language}
            language={language}
            value={code}
            onChange={setCode}
            theme={colorMode === 'dark' ? 'vs-dark' : 'light'}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              padding: { top: 16 },
              scrollBeyondLastLine: false,
              lineNumbers: 'on',
              roundedSelection: false,
              automaticLayout: true,
            }}
          />
        </Box>
        
        <Box
          p={4}
          bg={useColorModeValue('gray.50', 'gray.700')}
          borderRadius="xl"
          fontFamily="mono"
          whiteSpace="pre-wrap"
          overflowY="auto"
          maxHeight="400px"
          position="relative"
        >
          <Text fontWeight="bold" mb={2}>Output:</Text>
          <Box
            p={3}
            bg={useColorModeValue('white', 'gray.800')}
            borderRadius="md"
            fontSize="sm"
          >
            {output || 'Run code to see output'}
          </Box>
        </Box>
      </SimpleGrid>
    </VStack>
  )
}

export default CodeEditor 