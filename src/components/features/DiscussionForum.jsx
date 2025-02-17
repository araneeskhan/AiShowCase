import {
  Box,
  VStack,
  HStack,
  Input,
  Button,
  Avatar,
  Text,
  Divider,
  useColorModeValue,
  IconButton,
  Textarea,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tag,
  TagLabel,
  TagLeftIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Select,
  FormControl,
  FormLabel,
} from '@chakra-ui/react'
import { useState } from 'react'
import { FaHeart, FaReply, FaShare, FaFilter, FaTags, FaSort, FaEdit } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useToast } from '@chakra-ui/react'

const MotionBox = motion(Box)

const ForumPost = ({ post, onReply }) => {
  const [liked, setLiked] = useState(false)
  const [showReply, setShowReply] = useState(false)
  const [replyText, setReplyText] = useState('')

  const handleReply = () => {
    if (!replyText.trim()) return
    onReply(replyText)
    setReplyText('')
    setShowReply(false)
  }

  return (
    <MotionBox
      p={6}
      bg={useColorModeValue('white', 'gray.800')}
      borderRadius="xl"
      boxShadow="md"
      _hover={{ boxShadow: 'lg' }}
      transition="all 0.2s"
      whileHover={{ y: -2 }}
    >
      <VStack align="stretch" spacing={4}>
        <HStack justify="space-between">
          <HStack spacing={4}>
            <Avatar src={post.authorAvatar} name={post.author} />
            <Box>
              <Text fontWeight="bold">{post.author}</Text>
              <Text fontSize="sm" color="gray.500">
                {post.date}
              </Text>
            </Box>
          </HStack>
          <Badge colorScheme="purple">{post.category}</Badge>
        </HStack>

        <Text>{post.content}</Text>

        <HStack spacing={4}>
          <IconButton
            icon={<FaHeart />}
            variant="ghost"
            colorScheme={liked ? 'red' : 'gray'}
            onClick={() => setLiked(!liked)}
            aria-label="Like"
          />
          <IconButton
            icon={<FaReply />}
            variant="ghost"
            onClick={() => setShowReply(!showReply)}
            aria-label="Reply"
          />
          <IconButton
            icon={<FaShare />}
            variant="ghost"
            aria-label="Share"
          />
        </HStack>

        {showReply && (
          <VStack align="stretch">
            <Textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write your reply..."
              size="sm"
            />
            <Button alignSelf="flex-end" colorScheme="cyan" size="sm" onClick={handleReply}>
              Post Reply
            </Button>
          </VStack>
        )}
      </VStack>
    </MotionBox>
  )
}

const DiscussionForum = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'John Doe',
      authorAvatar: 'https://bit.ly/dan-abramov',
      date: '2 hours ago',
      content: 'What are your thoughts on the latest developments in AI?',
      category: 'AI Discussion',
      likes: 15,
      replies: [],
    },
    // Add more mock posts
  ])
  const [newPost, setNewPost] = useState('')
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('latest')
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('General')
  const toast = useToast()

  const categories = [
    { name: 'AI & ML', color: 'purple' },
    { name: 'Web Development', color: 'blue' },
    { name: 'Data Science', color: 'green' },
    { name: 'Career Advice', color: 'orange' },
    { name: 'General', color: 'gray' },
  ]

  const handleNewPost = () => {
    if (!newPost.trim()) return

    const post = {
      id: Date.now(),
      author: 'Current User',
      authorAvatar: 'https://bit.ly/user-avatar',
      date: new Date().toISOString(),
      content: newPost,
      category: selectedCategory,
      likes: 0,
      replies: [],
      tags: ['discussion', selectedCategory.toLowerCase()],
    }

    setPosts([post, ...posts])
    setNewPost('')
    setIsNewPostModalOpen(false)
    toast({
      title: 'Post created',
      status: 'success',
      duration: 2000,
    })
  }

  const handleReply = (postId, replyText) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          replies: [...(post.replies || []), {
            id: Date.now(),
            author: 'Current User',
            content: replyText,
            date: 'Just now'
          }]
        }
      }
      return post
    }))
  }

  const filteredPosts = posts
    .filter(post => filter === 'all' || post.category === filter)
    .sort((a, b) => {
      switch (sort) {
        case 'latest':
          return new Date(b.date) - new Date(a.date)
        case 'popular':
          return b.likes - a.likes
        case 'mostDiscussed':
          return b.replies.length - a.replies.length
        default:
          return 0
      }
    })

  return (
    <VStack spacing={6} align="stretch" w="100%">
      <HStack justify="space-between" wrap="wrap" gap={4}>
        <HStack>
          <Menu>
            <MenuButton as={Button} leftIcon={<FaFilter />} variant="outline">
              Filter
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setFilter('all')}>All Posts</MenuItem>
              {categories.map(cat => (
                <MenuItem key={cat.name} onClick={() => setFilter(cat.name)}>
                  {cat.name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton as={Button} leftIcon={<FaSort />} variant="outline">
              Sort
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setSort('latest')}>Latest</MenuItem>
              <MenuItem onClick={() => setSort('popular')}>Most Popular</MenuItem>
              <MenuItem onClick={() => setSort('mostDiscussed')}>Most Discussed</MenuItem>
            </MenuList>
          </Menu>
        </HStack>

        <Button
          colorScheme="cyan"
          leftIcon={<FaEdit />}
          onClick={() => setIsNewPostModalOpen(true)}
        >
          New Discussion
        </Button>
      </HStack>

      <Modal isOpen={isNewPostModalOpen} onClose={() => setIsNewPostModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Start a New Discussion</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Category</FormLabel>
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(cat => (
                    <option key={cat.name} value={cat.name}>{cat.name}</option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Your Message</FormLabel>
                <Textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="What would you like to discuss?"
                  rows={6}
                />
              </FormControl>

              <Button colorScheme="cyan" onClick={handleNewPost} w="100%">
                Post Discussion
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      <VStack spacing={4} align="stretch">
        {filteredPosts.map((post) => (
          <ForumPost 
            key={post.id} 
            post={post}
            onReply={(replyText) => handleReply(post.id, replyText)}
          />
        ))}
      </VStack>
    </VStack>
  )
}

export default DiscussionForum 