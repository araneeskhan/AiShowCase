import { Box, Heading, SimpleGrid, useColorModeValue, VStack, Text, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Grid, Progress } from '@chakra-ui/react'
import { Line, Radar, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const ResumeAnalytics = () => {
  const chartBg = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('gray.800', 'white')

  const skillsData = {
    labels: ['Technical Skills', 'Soft Skills', 'Experience', 'Education', 'Projects', 'Certifications'],
    datasets: [{
      label: 'Current Profile',
      data: [85, 90, 75, 80, 70, 65],
      fill: true,
      backgroundColor: 'rgba(0, 188, 212, 0.2)',
      borderColor: 'rgba(0, 188, 212, 1)',
      pointBackgroundColor: 'rgba(0, 188, 212, 1)',
    }, {
      label: 'Industry Average',
      data: [70, 75, 65, 70, 60, 55],
      fill: true,
      backgroundColor: 'rgba(147, 51, 234, 0.2)',
      borderColor: 'rgba(147, 51, 234, 1)',
      pointBackgroundColor: 'rgba(147, 51, 234, 1)',
    }]
  }

  const keyMetrics = [
    { label: 'Overall Score', value: 85, change: 12, timeframe: 'from last month' },
    { label: 'Industry Rank', value: '92nd', change: 5, timeframe: 'percentile' },
    { label: 'Keyword Match', value: '95%', change: 8, timeframe: 'vs industry standard' },
    { label: 'ATS Compatibility', value: '98%', change: 3, timeframe: 'improvement' },
  ]

  const skillGaps = [
    { skill: 'Cloud Computing', current: 75, required: 85 },
    { skill: 'Data Analysis', current: 80, required: 90 },
    { skill: 'Leadership', current: 85, required: 85 },
    { skill: 'Communication', current: 90, required: 85 },
  ]

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      r: {
        ticks: {
          color: textColor,
        },
        grid: {
          color: useColorModeValue('rgba(0,0,0,0.1)', 'rgba(255,255,255,0.1)'),
        },
        pointLabels: {
          color: textColor,
        },
      },
    },
  }

  return (
    <VStack spacing={8} w="100%">
      {/* Key Metrics */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} w="100%">
        {keyMetrics.map((metric, index) => (
          <Box
            key={index}
            bg={chartBg}
            p={6}
            borderRadius="xl"
            boxShadow="lg"
            transition="transform 0.2s"
            _hover={{ transform: 'translateY(-2px)', boxShadow: 'xl' }}
          >
            <Stat>
              <StatLabel fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
                {metric.label}
              </StatLabel>
              <StatNumber fontSize="3xl" fontWeight="bold" bgGradient="linear(to-r, cyan.400, purple.500)" bgClip="text">
                {metric.value}
              </StatNumber>
              <StatHelpText>
                <StatArrow type={metric.change > 0 ? 'increase' : 'decrease'} />
                {Math.abs(metric.change)}% {metric.timeframe}
              </StatHelpText>
            </Stat>
          </Box>
        ))}
      </SimpleGrid>

      {/* Charts */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8} w="100%">
        <Box p={6} bg={chartBg} borderRadius="xl" boxShadow="xl">
          <Heading size="md" mb={6}>Skills Analysis vs Industry Average</Heading>
          <Radar data={skillsData} options={options} />
        </Box>

        <Box p={6} bg={chartBg} borderRadius="xl" boxShadow="xl">
          <Heading size="md" mb={6}>Skill Gaps Analysis</Heading>
          <VStack spacing={4} align="stretch">
            {skillGaps.map((skill, index) => (
              <Box key={index}>
                <Grid templateColumns="1fr 2fr" gap={4} alignItems="center" mb={2}>
                  <Text fontWeight="medium">{skill.skill}</Text>
                  <Text fontSize="sm" color="gray.500" textAlign="right">
                    {skill.current}% / {skill.required}% required
                  </Text>
                </Grid>
                <Progress
                  value={skill.current}
                  max={Math.max(skill.required, skill.current)}
                  colorScheme={skill.current >= skill.required ? 'green' : 'orange'}
                  borderRadius="full"
                  size="sm"
                />
              </Box>
            ))}
          </VStack>
        </Box>
      </SimpleGrid>

      {/* Recommendations */}
      <Box p={6} bg={chartBg} borderRadius="xl" boxShadow="xl" w="100%">
        <Heading size="md" mb={6}>Personalized Recommendations</Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {[
            {
              title: 'Technical Skills',
              recommendations: [
                'Add cloud certification (AWS/Azure)',
                'Enhance data analysis portfolio',
                'Include more programming languages'
              ]
            },
            {
              title: 'Experience Highlights',
              recommendations: [
                'Quantify project impacts',
                'Add leadership examples',
                'Include more technical details'
              ]
            }
          ].map((section, index) => (
            <VStack key={index} align="stretch" spacing={3}>
              <Text fontWeight="bold" color={`cyan.${useColorModeValue('600', '400')}`}>
                {section.title}
              </Text>
              {section.recommendations.map((rec, idx) => (
                <Text key={idx} fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
                  • {rec}
                </Text>
              ))}
            </VStack>
          ))}
        </SimpleGrid>
      </Box>
    </VStack>
  )
}

export default ResumeAnalytics 