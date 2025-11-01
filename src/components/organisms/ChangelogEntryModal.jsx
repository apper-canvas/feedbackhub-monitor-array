import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Input from "@/components/atoms/Input"
import Textarea from "@/components/atoms/Textarea"
import Badge from "@/components/atoms/Badge"

const ChangelogEntryModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    releaseDate: new Date().toISOString().split('T')[0],
    type: "feature",
    version: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateTypes = [
    { value: "feature", label: "Feature", icon: "Plus" },
    { value: "improvement", label: "Improvement", icon: "Zap" },
    { value: "bugfix", label: "Bug Fix", icon: "Bug" }
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.title.trim() || !formData.description.trim() || !formData.version.trim()) {
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit({
        ...formData,
        releaseDate: new Date(formData.releaseDate).toISOString()
      })
      
      setFormData({
        title: "",
        description: "",
        releaseDate: new Date().toISOString().split('T')[0],
        type: "feature",
        version: ""
      })
    } catch (error) {
      // Error handling done in parent component
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      onClose()
      setFormData({
        title: "",
        description: "",
        releaseDate: new Date().toISOString().split('T')[0],
        type: "feature",
        version: ""
      })
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Create Changelog Entry
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Add a new product update or release note
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
                >
                  <ApperIcon name="X" className="h-5 w-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                <div className="space-y-5">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g., Enhanced Search Functionality"
                      required
                      disabled={isSubmitting}
                      className="w-full"
                    />
                  </div>

                  {/* Version */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Version <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="version"
                      value={formData.version}
                      onChange={handleChange}
                      placeholder="e.g., 2.1.0"
                      required
                      disabled={isSubmitting}
                      className="w-full"
                    />
                  </div>

                  {/* Update Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Update Type <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {updateTypes.map((type) => (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, type: type.value }))}
                          disabled={isSubmitting}
                          className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                            formData.type === type.value
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300 bg-white"
                          } disabled:opacity-50`}
                        >
                          <Badge variant={type.value} className="mb-2">
                            <ApperIcon name={type.icon} className="h-3 w-3 mr-1" />
                            {type.label}
                          </Badge>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Release Date */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Release Date <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="date"
                      name="releaseDate"
                      value={formData.releaseDate}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe the changes, improvements, or fixes in detail..."
                      rows={4}
                      required
                      disabled={isSubmitting}
                      className="w-full resize-none"
                    />
                  </div>
                </div>
              </form>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end space-x-3 bg-gray-50">
                <Button
                  type="button"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !formData.title.trim() || !formData.description.trim() || !formData.version.trim()}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <ApperIcon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
                      Create Entry
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ChangelogEntryModal