import { getApperClient } from '@/services/apperClient'
import { toast } from 'react-toastify'

export const feedbackService = {
  async getAll() {
    try {
      const apperClient = getApperClient()
      if (!apperClient) {
        throw new Error('ApperClient not initialized')
      }

      const response = await apperClient.fetchRecords('feedback_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "upvotes_c"}},
          {"field": {"Name": "downvotes_c"}},
          {"field": {"Name": "upvoted_by_c"}},
          {"field": {"Name": "downvoted_by_c"}},
          {"field": {"Name": "comments_c"}},
          {"field": {"Name": "CreatedOn"}},
          {"field": {"Name": "ModifiedOn"}}
        ],
        orderBy: [{"fieldName": "Id", "sorttype": "DESC"}]
      })

      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }

      return (response.data || []).map(item => ({
        ...item,
        title: item.title_c || item.Name,
        description: item.description_c,
        category: item.category_c,
        status: item.status_c,
        upvotes: item.upvotes_c || 0,
        downvotes: item.downvotes_c || 0,
        upvotedBy: item.upvoted_by_c ? JSON.parse(item.upvoted_by_c) : [],
        downvotedBy: item.downvoted_by_c ? JSON.parse(item.downvoted_by_c) : [],
        comments: item.comments_c ? JSON.parse(item.comments_c) : [],
        createdAt: item.CreatedOn,
        updatedAt: item.ModifiedOn,
        votes: (item.upvotes_c || 0) - (item.downvotes_c || 0)
      }))
    } catch (error) {
      console.error("Error fetching feedback:", error?.response?.data?.message || error)
      return []
    }
  },

  async getById(id) {
    try {
      const apperClient = getApperClient()
      if (!apperClient) {
        throw new Error('ApperClient not initialized')
      }

      const response = await apperClient.getRecordById('feedback_c', parseInt(id), {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "upvotes_c"}},
          {"field": {"Name": "downvotes_c"}},
          {"field": {"Name": "upvoted_by_c"}},
          {"field": {"Name": "downvoted_by_c"}},
          {"field": {"Name": "comments_c"}},
          {"field": {"Name": "CreatedOn"}},
          {"field": {"Name": "ModifiedOn"}}
        ]
      })

      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }

      const item = response.data
      if (!item) return null

      return {
        ...item,
        title: item.title_c || item.Name,
        description: item.description_c,
        category: item.category_c,
        status: item.status_c,
        upvotes: item.upvotes_c || 0,
        downvotes: item.downvotes_c || 0,
        upvotedBy: item.upvoted_by_c ? JSON.parse(item.upvoted_by_c) : [],
        downvotedBy: item.downvoted_by_c ? JSON.parse(item.downvoted_by_c) : [],
        comments: item.comments_c ? JSON.parse(item.comments_c) : [],
        createdAt: item.CreatedOn,
        updatedAt: item.ModifiedOn
      }
    } catch (error) {
      console.error(`Error fetching feedback ${id}:`, error?.response?.data?.message || error)
      return null
    }
  },

  async create(feedbackData) {
    try {
      const apperClient = getApperClient()
      if (!apperClient) {
        throw new Error('ApperClient not initialized')
      }

      const createData = {
        Name: feedbackData.title_c || feedbackData.title || 'Untitled',
        title_c: feedbackData.title_c || feedbackData.title,
        description_c: feedbackData.description_c || feedbackData.description,
        category_c: feedbackData.category_c || feedbackData.category || 'feature',
        status_c: feedbackData.status_c || feedbackData.status || 'new',
        upvotes_c: 0,
        downvotes_c: 0,
        upvoted_by_c: JSON.stringify([]),
        downvoted_by_c: JSON.stringify([]),
        comments_c: JSON.stringify([])
      }

      const response = await apperClient.createRecord('feedback_c', {
        records: [createData]
      })

      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success)
        const failed = response.results.filter(r => !r.success)
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} feedback items:`, failed)
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`))
            if (record.message) toast.error(record.message)
          })
        }

        return successful.length > 0 ? successful[0].data : null
      }

      return null
    } catch (error) {
      console.error("Error creating feedback:", error?.response?.data?.message || error)
      return null
    }
  },

  async update(id, updateData) {
    try {
      const apperClient = getApperClient()
      if (!apperClient) {
        throw new Error('ApperClient not initialized')
      }

      const updateFields = {
        Id: parseInt(id)
      }

      if (updateData.title_c || updateData.title) {
        updateFields.Name = updateData.title_c || updateData.title
        updateFields.title_c = updateData.title_c || updateData.title
      }
      if (updateData.description_c || updateData.description) {
        updateFields.description_c = updateData.description_c || updateData.description
      }
      if (updateData.category_c || updateData.category) {
        updateFields.category_c = updateData.category_c || updateData.category
      }
      if (updateData.status_c || updateData.status) {
        updateFields.status_c = updateData.status_c || updateData.status
      }
      if (updateData.upvotes_c !== undefined || updateData.upvotes !== undefined) {
        updateFields.upvotes_c = updateData.upvotes_c || updateData.upvotes
      }
      if (updateData.downvotes_c !== undefined || updateData.downvotes !== undefined) {
        updateFields.downvotes_c = updateData.downvotes_c || updateData.downvotes
      }
      if (updateData.upvoted_by_c || updateData.upvotedBy) {
        updateFields.upvoted_by_c = JSON.stringify(updateData.upvoted_by_c || updateData.upvotedBy || [])
      }
      if (updateData.downvoted_by_c || updateData.downvotedBy) {
        updateFields.downvoted_by_c = JSON.stringify(updateData.downvoted_by_c || updateData.downvotedBy || [])
      }
      if (updateData.comments_c || updateData.comments) {
        updateFields.comments_c = JSON.stringify(updateData.comments_c || updateData.comments || [])
      }

      const response = await apperClient.updateRecord('feedback_c', {
        records: [updateFields]
      })

      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success)
        const failed = response.results.filter(r => !r.success)
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} feedback items:`, failed)
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`))
            if (record.message) toast.error(record.message)
          })
        }

        return successful.length > 0 ? successful[0].data : null
      }

      return null
    } catch (error) {
      console.error("Error updating feedback:", error?.response?.data?.message || error)
      return null
    }
  },

  async delete(id) {
    try {
      const apperClient = getApperClient()
      if (!apperClient) {
        throw new Error('ApperClient not initialized')
      }

      const response = await apperClient.deleteRecord('feedback_c', {
        RecordIds: [parseInt(id)]
      })

      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return false
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success)
        const failed = response.results.filter(r => !r.success)
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} feedback items:`, failed)
          failed.forEach(record => {
            if (record.message) toast.error(record.message)
          })
        }

        return successful.length > 0
      }

      return false
    } catch (error) {
      console.error("Error deleting feedback:", error?.response?.data?.message || error)
      return false
    }
  },

  async upvote(id, userId) {
    try {
      // Get current feedback
      const feedback = await this.getById(id)
      if (!feedback) {
        throw new Error('Feedback not found')
      }

      const upvotedBy = feedback.upvotedBy || []
      const downvotedBy = feedback.downvotedBy || []
      const hasUpvoted = upvotedBy.includes(userId)
      const hasDownvoted = downvotedBy.includes(userId)

      let newUpvotes = feedback.upvotes || 0
      let newDownvotes = feedback.downvotes || 0
      let newUpvotedBy = [...upvotedBy]
      let newDownvotedBy = [...downvotedBy]

      if (hasUpvoted) {
        // Remove upvote
        newUpvotes -= 1
        newUpvotedBy = newUpvotedBy.filter(uid => uid !== userId)
      } else {
        // Add upvote
        newUpvotes += 1
        newUpvotedBy.push(userId)
        
        // Remove downvote if exists
        if (hasDownvoted) {
          newDownvotes -= 1
          newDownvotedBy = newDownvotedBy.filter(uid => uid !== userId)
        }
      }

      await this.update(id, {
        upvotes_c: newUpvotes,
        downvotes_c: newDownvotes,
        upvoted_by_c: newUpvotedBy,
        downvoted_by_c: newDownvotedBy
      })

      return await this.getById(id)
    } catch (error) {
      console.error("Error updating upvote:", error?.response?.data?.message || error)
      throw error
    }
  },

  async downvote(id, userId) {
    try {
      // Get current feedback
      const feedback = await this.getById(id)
      if (!feedback) {
        throw new Error('Feedback not found')
      }

      const upvotedBy = feedback.upvotedBy || []
      const downvotedBy = feedback.downvotedBy || []
      const hasUpvoted = upvotedBy.includes(userId)
      const hasDownvoted = downvotedBy.includes(userId)

      let newUpvotes = feedback.upvotes || 0
      let newDownvotes = feedback.downvotes || 0
      let newUpvotedBy = [...upvotedBy]
      let newDownvotedBy = [...downvotedBy]

      if (hasDownvoted) {
        // Remove downvote
        newDownvotes -= 1
        newDownvotedBy = newDownvotedBy.filter(uid => uid !== userId)
      } else {
        // Add downvote
        newDownvotes += 1
        newDownvotedBy.push(userId)
        
        // Remove upvote if exists
        if (hasUpvoted) {
          newUpvotes -= 1
          newUpvotedBy = newUpvotedBy.filter(uid => uid !== userId)
        }
      }

      await this.update(id, {
        upvotes_c: newUpvotes,
        downvotes_c: newDownvotes,
        upvoted_by_c: newUpvotedBy,
        downvoted_by_c: newDownvotedBy
      })

      return await this.getById(id)
    } catch (error) {
      console.error("Error updating downvote:", error?.response?.data?.message || error)
      throw error
    }
  },

  async updateStatus(id, status) {
    try {
      return await this.update(id, { status_c: status })
    } catch (error) {
      console.error("Error updating status:", error?.response?.data?.message || error)
      throw error
    }
  },

  async getComments(feedbackId) {
    try {
      const feedback = await this.getById(feedbackId)
      if (!feedback) {
        throw new Error('Feedback not found')
      }
      return feedback.comments || []
    } catch (error) {
      console.error("Error getting comments:", error?.response?.data?.message || error)
      return []
    }
  },

  async addComment(feedbackId, commentData) {
    try {
      const feedback = await this.getById(feedbackId)
      if (!feedback) {
        throw new Error('Feedback not found')
      }

      const comments = feedback.comments || []
      const newComment = {
        Id: Date.now(),
        author: commentData.author || 'Anonymous User',
        content: commentData.content,
        createdAt: new Date().toISOString()
      }

      const updatedComments = [...comments, newComment]
      
      await this.update(feedbackId, {
        comments_c: updatedComments
      })

      return newComment
    } catch (error) {
      console.error("Error adding comment:", error?.response?.data?.message || error)
      throw error
    }
  }
}