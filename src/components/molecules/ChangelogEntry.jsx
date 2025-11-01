import { motion } from "framer-motion"
import { format } from "date-fns"
import ApperIcon from "@/components/ApperIcon"
import Badge from "@/components/atoms/Badge"

const ChangelogEntry = ({ entry, isLast = false }) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case "feature": return "Plus"
      case "improvement": return "Zap"
      case "bugfix": return "Bug"
      default: return "Info"
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case "feature": return "bg-green-600"
      case "improvement": return "bg-blue-600"
      case "bugfix": return "bg-red-600"
      default: return "bg-gray-600"
    }
  }

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMMM d, yyyy")
    } catch {
      return "Unknown date"
    }
  }

  const formatMonth = (dateString) => {
    try {
      return format(new Date(dateString), "MMM")
    } catch {
      return "---"
    }
  }

  const formatDay = (dateString) => {
    try {
      return format(new Date(dateString), "d")
    } catch {
      return "--"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="relative flex items-start pb-12"
    >
      {/* Timeline Date - Left Side */}
      <div className="flex-shrink-0 w-32 text-right pr-8">
        <div className="text-3xl font-bold text-gray-900">
          {formatDay(entry.releaseDate)}
        </div>
        <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          {formatMonth(entry.releaseDate)}
        </div>
      </div>

      {/* Timeline Marker */}
      <div className="flex-shrink-0 relative">
        <div className={`w-3 h-3 rounded-full ${getTypeColor(entry.type)} ring-4 ring-white shadow-md z-10 relative`}></div>
        {!isLast && (
          <div className="absolute left-1/2 top-3 bottom-0 w-px bg-gradient-to-b from-gray-300 to-gray-200 -translate-x-1/2 h-full"></div>
        )}
      </div>

      {/* Content Card - Right Side */}
      <div className="flex-1 ml-8">
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <Badge variant={entry.type}>
                  <ApperIcon name={getTypeIcon(entry.type)} className="h-3 w-3 mr-1" />
                  {entry.type}
                </Badge>
                <span className="text-sm font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                  {entry.version}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {entry.title}
              </h3>
            </div>
          </div>
          
          <p className="text-gray-600 leading-relaxed">
            {entry.description}
          </p>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center text-xs text-gray-500">
              <ApperIcon name="Calendar" className="h-3.5 w-3.5 mr-1.5" />
              <span>{formatDate(entry.releaseDate)}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ChangelogEntry