import { motion } from "framer-motion";
import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";

const getTimelineColor = (timeline) => {
  const timelineColors = {
    'now': 'bg-green-500',
    'next': 'bg-blue-500',
    'later': 'bg-purple-500',
    'planned': 'bg-yellow-500',
    'completed': 'bg-gray-500'
  };
  return timelineColors[timeline?.toLowerCase()] || 'bg-gray-400';
};

const RoadmapCard = ({ item, className = "" }) => {

  return (
<motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4, shadow: "0 8px 30px rgba(0, 0, 0, 0.12)" }}
      className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-gray-200 transition-all duration-300 ${className}`}
    >
<div className="flex items-start justify-between mb-3">
        <h3 className="text-base font-semibold text-gray-900 line-clamp-2 flex-1 pr-2">
          {item.title}
        </h3>
        {item.votes && (
          <div className="flex items-center space-x-1 bg-blue-50 text-blue-600 px-2 py-1 rounded-lg text-xs font-medium">
            <ApperIcon name="ThumbsUp" className="h-3 w-3" />
            <span>{item.votes}</span>
          </div>
        )}
        <div className={`w-3 h-3 rounded-full ${getTimelineColor(item.timeline)} flex-shrink-0 ml-3 mt-1`}></div>
      </div>
<p className="text-gray-600 text-sm line-clamp-2 mb-3 leading-relaxed">
        {item.description}
      </p>

<div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center space-x-2">
          {item.linkedFeedbackIds?.length > 0 && (
            <div className="flex items-center text-xs text-gray-500">
              <ApperIcon name="Link" className="h-3 w-3 mr-1" />
              {item.linkedFeedbackIds.length}
            </div>
          )}
        </div>
        {item.estimatedDate && (
          <div className="text-xs text-gray-500 flex items-center">
            <ApperIcon name="Calendar" className="h-3 w-3 mr-1" />
            {item.estimatedDate}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default RoadmapCard