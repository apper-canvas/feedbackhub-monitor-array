import { useState } from "react"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import { cn } from "@/utils/cn"

const VoteButton = ({ 
  upvotes, 
  downvotes, 
  hasUpvoted = false, 
  hasDownvoted = false, 
  onUpvote, 
  onDownvote, 
  className = "" 
}) => {
  const [isVoting, setIsVoting] = useState(false)
  const [currentUpvotes, setCurrentUpvotes] = useState(upvotes)
  const [currentDownvotes, setCurrentDownvotes] = useState(downvotes)
  const [upvoted, setUpvoted] = useState(hasUpvoted)
  const [downvoted, setDownvoted] = useState(hasDownvoted)

  const netScore = currentUpvotes - currentDownvotes

  const handleUpvote = async () => {
    if (isVoting) return

    setIsVoting(true)
    const wasUpvoted = upvoted
    const wasDownvoted = downvoted
    
    // Optimistic update
    setUpvoted(!wasUpvoted)
    setCurrentUpvotes(prev => wasUpvoted ? prev - 1 : prev + 1)
    
    // Remove downvote if it exists
    if (wasDownvoted) {
      setDownvoted(false)
      setCurrentDownvotes(prev => prev - 1)
    }
    
    try {
      await onUpvote?.()
      toast.success(wasUpvoted ? "Upvote removed!" : "Upvoted successfully!")
    } catch (error) {
      // Revert on error
      setUpvoted(wasUpvoted)
      setCurrentUpvotes(prev => wasUpvoted ? prev + 1 : prev - 1)
      if (wasDownvoted) {
        setDownvoted(true)
        setCurrentDownvotes(prev => prev + 1)
      }
      toast.error("Failed to update vote")
    } finally {
      setIsVoting(false)
    }
  }

  const handleDownvote = async () => {
    if (isVoting) return

    setIsVoting(true)
    const wasDownvoted = downvoted
    const wasUpvoted = upvoted
    
    // Optimistic update
    setDownvoted(!wasDownvoted)
    setCurrentDownvotes(prev => wasDownvoted ? prev - 1 : prev + 1)
    
    // Remove upvote if it exists
    if (wasUpvoted) {
      setUpvoted(false)
      setCurrentUpvotes(prev => prev - 1)
    }
    
    try {
      await onDownvote?.()
      toast.success(wasDownvoted ? "Downvote removed!" : "Downvoted successfully!")
    } catch (error) {
      // Revert on error
      setDownvoted(wasDownvoted)
      setCurrentDownvotes(prev => wasDownvoted ? prev + 1 : prev - 1)
      if (wasUpvoted) {
        setUpvoted(true)
        setCurrentUpvotes(prev => prev + 1)
      }
      toast.error("Failed to update vote")
    } finally {
      setIsVoting(false)
    }
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          variant="secondary"
          size="sm"
          onClick={handleUpvote}
          disabled={isVoting}
          className={cn(
            "flex items-center justify-center px-2 py-1.5 min-w-[36px] transition-all duration-300",
            upvoted 
              ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white" 
              : "hover:bg-green-50 hover:text-green-600"
          )}
        >
          <ApperIcon 
            name="ChevronUp" 
            className="h-4 w-4" 
          />
        </Button>
      </motion.div>

      <div className="flex items-center justify-center min-w-[40px]">
        <span className={cn(
          "text-sm font-semibold transition-colors duration-300",
          netScore > 0 ? "text-green-600" : netScore < 0 ? "text-red-600" : "text-gray-600"
        )}>
          {netScore}
        </span>
      </div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          variant="secondary"
          size="sm"
          onClick={handleDownvote}
          disabled={isVoting}
          className={cn(
            "flex items-center justify-center px-2 py-1.5 min-w-[36px] transition-all duration-300",
            downvoted 
              ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white" 
              : "hover:bg-red-50 hover:text-red-600"
          )}
        >
          <ApperIcon 
            name="ChevronDown" 
            className="h-4 w-4" 
          />
        </Button>
      </motion.div>
    </div>
  )
}

export default VoteButton