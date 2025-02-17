import { Box, Container, Text } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Box as="footer" py={8} bg="gray.100" _dark={{ bg: 'gray.900' }}>
      <Container maxW="container.xl">
        <Text textAlign="center">© 2024 AI Showcase. All rights reserved.</Text>
      </Container>
    </Box>
  )
}

export default Footer 