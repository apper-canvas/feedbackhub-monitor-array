import feedbackData from "@/services/mockData/feedback.json";
let mockFeedback = [...feedbackData]
let commentIdCounter = 100

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const feedbackService = {
  async getAll() {
    await delay(300)
    return [...mockFeedback]
  },

  async getById(id) {
    await delay(200)
    const feedback = mockFeedback.find(item => item.Id === parseInt(id))
    if (!feedback) {
      throw new Error('Feedback not found')
    }
    return { ...feedback }
  },

  async create(feedbackData) {
    await delay(400)
    const newFeedback = {
      Id: Math.max(...mockFeedback.map(f => f.Id), 0) + 1,
      ...feedbackData,
upvotes: 0,
      downvotes: 0,
      upvotedBy: [],
      downvotedBy: [],
      status: 'new',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    mockFeedback.unshift(newFeedback)
    return { ...newFeedback }
  },

  async update(id, updateData) {
    await delay(300)
    const index = mockFeedback.findIndex(item => item.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Feedback not found')
    }
    mockFeedback[index] = {
      ...mockFeedback[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    }
    return { ...mockFeedback[index] }
  },

  async delete(id) {
    await delay(250)
    const index = mockFeedback.findIndex(item => item.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Feedback not found')
    }
    mockFeedback.splice(index, 1)
    return true
  },

async upvote(id, userId) {
    await delay(200)
    const feedback = mockFeedback.find(item => item.Id === parseInt(id))
    if (!feedback) {
      throw new Error('Feedback not found')
    }
    
    const hasUpvoted = feedback.upvotedBy.includes(userId)
    const hasDownvoted = feedback.downvotedBy.includes(userId)
    
    if (hasUpvoted) {
      // Remove upvote (toggle off)
      feedback.upvotes -= 1
      feedback.upvotedBy = feedback.upvotedBy.filter(id => id !== userId)
    } else {
      // Add upvote (toggle on)
      feedback.upvotes += 1
      feedback.upvotedBy.push(userId)
      
      // Remove downvote if exists
      if (hasDownvoted) {
        feedback.downvotes -= 1
        feedback.downvotedBy = feedback.downvotedBy.filter(id => id !== userId)
      }
    }
    
    feedback.updatedAt = new Date().toISOString()
    
    return { ...feedback }
  },

  async downvote(id, userId) {
    await delay(200)
    const feedback = mockFeedback.find(item => item.Id === parseInt(id))
    if (!feedback) {
      throw new Error('Feedback not found')
    }
    
    const hasDownvoted = feedback.downvotedBy.includes(userId)
    const hasUpvoted = feedback.upvotedBy.includes(userId)
    
    if (hasDownvoted) {
      // Remove downvote (toggle off)
      feedback.downvotes -= 1
      feedback.downvotedBy = feedback.downvotedBy.filter(id => id !== userId)
    } else {
      // Add downvote (toggle on)
      feedback.downvotes += 1
      feedback.downvotedBy.push(userId)
      
      // Remove upvote if exists
      if (hasUpvoted) {
        feedback.upvotes -= 1
        feedback.upvotedBy = feedback.upvotedBy.filter(id => id !== userId)
      }
    }
    
    feedback.updatedAt = new Date().toISOString()
    
    return { ...feedback }
  },

async updateStatus(id, status) {
    await delay(300)
    const index = mockFeedback.findIndex(item => item.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Feedback not found')
    }
    mockFeedback[index] = {
      ...mockFeedback[index],
      status,
      updatedAt: new Date().toISOString()
    }
    return { ...mockFeedback[index] }
  },

  async getComments(feedbackId) {
    await delay(200)
    const feedback = mockFeedback.find(item => item.Id === parseInt(feedbackId))
    if (!feedback) {
      throw new Error('Feedback not found')
    }
    return feedback.comments || []
  },

  async addComment(feedbackId, commentData) {
    await delay(300)
    const feedback = mockFeedback.find(item => item.Id === parseInt(feedbackId))
    if (!feedback) {
      throw new Error('Feedback not found')
    }
    
    if (!feedback.comments) {
      feedback.comments = []
    }

    const newComment = {
      Id: ++commentIdCounter,
      author: commentData.author || 'Anonymous User',
      content: commentData.content,
      createdAt: new Date().toISOString()
    }
feedback.comments.push(newComment)
    return { ...newComment }
  }
}