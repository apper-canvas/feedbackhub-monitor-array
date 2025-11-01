import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { feedbackService } from "@/services/api/feedbackService";
import ApperIcon from "@/components/ApperIcon";
import Feedback from "@/components/pages/Feedback";
import Loading from "@/components/ui/Loading";
import Empty from "@/components/ui/Empty";
import Error from "@/components/ui/Error";
import FeedbackCard from "@/components/molecules/FeedbackCard";
import StatusFilter from "@/components/molecules/StatusFilter";
import SortControl from "@/components/molecules/SortControl";
import SearchBar from "@/components/molecules/SearchBar";
const FeedbackList = () => {
  const navigate = useNavigate();
const [feedbackData, setFeedbackData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("votes")

  const loadFeedback = async () => {
    setLoading(true)
    setError("")
    try {
      const data = await feedbackService.getAll()
      setFeedbackData(data)
    } catch (err) {
      setError(err.message || "Failed to load feedback")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadFeedback()
  }, [])

  const filteredAndSortedFeedback = useMemo(() => {
    let filtered = feedbackData.filter(feedback => {
      const matchesSearch = !searchQuery || 
        feedback.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feedback.description.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesStatus = statusFilter === "all" || feedback.status === statusFilter

      return matchesSearch && matchesStatus
    })

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "votes":
          return b.votes - a.votes
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt)
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt)
        default:
          return b.votes - a.votes
      }
    })
  }, [feedbackData, searchQuery, statusFilter, sortBy])

const handleVote = async (feedbackId) => {
    setFeedbackData(prev => 
      prev.map(feedback => {
        if (feedback.Id === feedbackId) {
          const hasVoted = feedback.votedBy?.includes("currentUser")
          return {
            ...feedback,
            votes: hasVoted ? feedback.votes - 1 : feedback.votes + 1,
            votedBy: hasVoted 
              ? (feedback.votedBy || []).filter(id => id !== "currentUser")
              : [...(feedback.votedBy || []), "currentUser"]
          }
        }
        return feedback
      })
    )
  }

if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadFeedback} />

return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gradient mb-2">
            Feedback
          </h1>
          <p className="text-gray-600">
            Share your ideas and help us improve the product
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              placeholder="Search feedback..."
              onSearch={setSearchQuery}
            />
          </div>
          <div className="flex gap-3">
            <StatusFilter
              value={statusFilter}
              onChange={setStatusFilter}
              className="w-40"
            />
            <SortControl
              value={sortBy}
              onChange={setSortBy}
              className="w-36"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center">
            <ApperIcon name="MessageSquare" className="h-8 w-8 mr-3" />
            <div>
              <div className="text-2xl font-bold">{feedbackData.length}</div>
              <div className="text-blue-100">Total Feedback</div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center">
            <ApperIcon name="CheckCircle" className="h-8 w-8 mr-3" />
            <div>
              <div className="text-2xl font-bold">
                {feedbackData.filter(f => f.status === "completed").length}
              </div>
              <div className="text-green-100">Completed</div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center">
            <ApperIcon name="TrendingUp" className="h-8 w-8 mr-3" />
            <div>
              <div className="text-2xl font-bold">
                {feedbackData.reduce((sum, f) => sum + f.votes, 0)}
              </div>
              <div className="text-purple-100">Total Votes</div>
            </div>
          </div>
        </motion.div>
      </div>

{/* Feedback List */}
      {filteredAndSortedFeedback.length === 0 ? (
        <Empty
          title={searchQuery || statusFilter !== "all" ? "No feedback matches your filters" : "No feedback yet"}
          description={searchQuery || statusFilter !== "all" ? "Try adjusting your search or filters to find what you're looking for." : "Be the first to share your feedback and help improve the product."}
          icon="MessageSquare"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAndSortedFeedback.map((feedback, index) => (
            <motion.div
              key={feedback.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
<FeedbackCard
                feedback={feedback}
                onVote={handleVote}
                onClick={() => navigate(`/feedback/${feedback.Id}`)}
              />
            </motion.div>
          ))}
        </div>
      )}

</div>
  )
}

export default FeedbackList