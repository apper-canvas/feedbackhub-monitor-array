import { motion } from "framer-motion";
import { format } from "date-fns";
import { feedbackService } from "@/services/api/feedbackService";
import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Error from "@/components/ui/Error";
import VoteButton from "@/components/molecules/VoteButton";

const FeedbackCard = ({ feedback, onVote, onClick }) => {
  const handleUpvote = async () => {
    try {
      await feedbackService.upvote(feedback.Id, "currentUser")
      onVote?.(feedback.Id)
    } catch (error) {
      throw new Error(error.message)
    }
  }

  const handleDownvote = async () => {
    try {
      await feedbackService.downvote(feedback.Id, "currentUser")
      onVote?.(feedback.Id)
    } catch (error) {
      throw new Error(error.message)
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case "feature": return "Lightbulb"
      case "bug": return "Bug"
      case "improvement": return "Zap"
      default: return "MessageSquare"
    }
  }

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy")
    } catch {
      return "Unknown date"
    }
  }

return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, shadow: "0 8px 30px rgba(0, 0, 0, 0.12)" }}
      onClick={onClick}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-gray-200 transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {feedback.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
            {feedback.description}
          </p>
        </div>
        <div className="ml-4 flex-shrink-0">
<VoteButton
            upvotes={feedback.upvotes}
            downvotes={feedback.downvotes}
            hasUpvoted={feedback.upvotedBy?.includes("currentUser")}
            hasDownvoted={feedback.downvotedBy?.includes("currentUser")}
            onUpvote={handleUpvote}
            onDownvote={handleDownvote}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            <ApperIcon 
              name={getCategoryIcon(feedback.category)} 
              className="h-4 w-4 mr-2 text-gray-500" 
            />
            <Badge variant={feedback.category}>
              {feedback.category}
            </Badge>
          </div>
          <Badge variant={feedback.status.replace("-", "")}>
            {feedback.status.replace("-", " ")}
          </Badge>
        </div>
        <div className="text-xs text-gray-500">
          {formatDate(feedback.createdAt)}
        </div>
      </div>
    </motion.div>
  )
}

export default FeedbackCard