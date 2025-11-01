import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { feedbackService } from '@/services/api/feedbackService'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Textarea from '@/components/atoms/Textarea'
import Badge from '@/components/atoms/Badge'
import VoteButton from '@/components/molecules/VoteButton'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { formatDistanceToNow } from 'date-fns'

const FeedbackDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [feedback, setFeedback] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [commentsLoading, setCommentsLoading] = useState(true)
  const [error, setError] = useState('')
  const [newComment, setNewComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    loadFeedbackAndComments()
  }, [id])

  const loadFeedbackAndComments = async () => {
    try {
      setLoading(true)
      setCommentsLoading(true)
      setError('')
      
      const [feedbackData, commentsData] = await Promise.all([
        feedbackService.getById(id),
        feedbackService.getComments(id)
      ])
      
      setFeedback(feedbackData)
      setComments(commentsData)
    } catch (err) {
      setError(err.message || 'Failed to load feedback details')
      toast.error('Failed to load feedback details')
    } finally {
      setLoading(false)
      setCommentsLoading(false)
    }
  }

  const handleVote = async (feedbackId, voteType) => {
    try {
      await feedbackService.vote(feedbackId, voteType, 'currentUser')
      const updatedFeedback = await feedbackService.getById(id)
      setFeedback(updatedFeedback)
      toast.success(`Vote ${voteType === 'upvote' ? 'added' : 'removed'}!`)
    } catch (err) {
      toast.error(err.message || 'Failed to vote')
    }
  }

  const handleSubmitComment = async (e) => {
    e.preventDefault()
    
    if (!newComment.trim()) {
      toast.error('Please enter a comment')
      return
    }

    try {
      setSubmitting(true)
      const comment = await feedbackService.addComment(id, {
        content: newComment.trim(),
        author: 'Current User'
      })
      
      setComments(prev => [...prev, comment])
      setNewComment('')
      toast.success('Comment added successfully!')
    } catch (err) {
      toast.error(err.message || 'Failed to add comment')
    } finally {
      setSubmitting(false)
    }
  }

  const getCategoryColor = (category) => {
    const colors = {
      feature: 'bg-blue-100 text-blue-700',
      bug: 'bg-red-100 text-red-700',
      improvement: 'bg-purple-100 text-purple-700'
    }
    return colors[category] || 'bg-gray-100 text-gray-700'
  }

  const getStatusColor = (status) => {
    const colors = {
      new: 'bg-gray-100 text-gray-700',
      planned: 'bg-blue-100 text-blue-700',
      'in-progress': 'bg-yellow-100 text-yellow-700',
      'in-review': 'bg-purple-100 text-purple-700',
      completed: 'bg-green-100 text-green-700'
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadFeedbackAndComments} />
  if (!feedback) return <Error message="Feedback not found" />

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate('/feedback')}
        className="mb-6 hover:bg-gray-100"
      >
        <ApperIcon name="ArrowLeft" size={20} className="mr-2" />
        Back to Feedback
      </Button>

      {/* Feedback Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-8"
      >
        {/* Header */}
        <div className="flex items-start gap-6 mb-6">
          <VoteButton
            upvotes={feedback.upvotes}
            downvotes={feedback.downvotes}
            hasUpvoted={feedback.upvotedBy?.includes('currentUser')}
            hasDownvoted={feedback.downvotedBy?.includes('currentUser')}
            onVote={(voteType) => handleVote(feedback.Id, voteType)}
            orientation="vertical"
          />
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              {feedback.title}
            </h1>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className={getCategoryColor(feedback.category)}>
                {feedback.category}
              </Badge>
              <Badge className={getStatusColor(feedback.status)}>
                {feedback.status}
              </Badge>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed">
              {feedback.description}
            </p>

            <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <ApperIcon name="Clock" size={16} />
                <span>
                  {formatDistanceToNow(new Date(feedback.createdAt), { addSuffix: true })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Comments Section */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <ApperIcon name="MessageSquare" size={24} />
          Comments ({comments.length})
        </h2>

        {/* Comments List */}
        {commentsLoading ? (
          <Loading />
        ) : comments.length === 0 ? (
          <Empty
            icon="MessageSquare"
            message="No comments yet"
            description="Be the first to share your thoughts!"
          />
        ) : (
          <div className="space-y-4 mb-8">
            {comments.map((comment, index) => (
              <motion.div
                key={comment.Id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-50 rounded-lg p-4 border border-gray-100"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                    {comment.author.charAt(0).toUpperCase()}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900">
                        {comment.author}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed break-words">
                      {comment.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Add Comment Form */}
        <form onSubmit={handleSubmitComment} className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Add a Comment
          </h3>
          
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts..."
            rows={4}
            className="mb-4"
            disabled={submitting}
          />
          
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={submitting || !newComment.trim()}
              className="min-w-[140px]"
            >
              {submitting ? (
                <>
                  <ApperIcon name="Loader2" size={16} className="mr-2 animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <ApperIcon name="Send" size={16} className="mr-2" />
                  Post Comment
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FeedbackDetail