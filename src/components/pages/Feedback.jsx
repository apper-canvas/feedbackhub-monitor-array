import { useState } from "react"
import { motion } from "framer-motion"
import FeedbackList from "@/components/organisms/FeedbackList"
import FeedbackSubmissionModal from "@/components/organisms/FeedbackSubmissionModal"
import Button from "@/components/atoms/Button"

const Feedback = () => {
  const [isAddIdeaModalOpen, setIsAddIdeaModalOpen] = useState(false)

  return (
    <div className="relative">
      <FeedbackList onFeedbackAdded={() => setIsAddIdeaModalOpen(false)} />
      
      {/* Fixed Add Idea Button - Top Right Corner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed top-24 right-6 z-40"
      >
        <Button
          onClick={() => setIsAddIdeaModalOpen(true)}
          icon="Plus"
          className="shadow-premium-hover bg-gradient-to-r from-primary to-accent text-white hover:shadow-xl transition-all duration-300"
        >
          Add Idea
        </Button>
      </motion.div>

      <FeedbackSubmissionModal
        isOpen={isAddIdeaModalOpen}
        onClose={() => setIsAddIdeaModalOpen(false)}
        onSubmit={() => setIsAddIdeaModalOpen(false)}
      />
    </div>
  )
}

export default Feedback