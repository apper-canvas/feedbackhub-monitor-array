import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { toast } from "react-toastify";
import ChangelogEntryModal from "@/components/organisms/ChangelogEntryModal";
import { changelogService } from "@/services/api/changelogService";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Changelog from "@/components/pages/Changelog";
import Loading from "@/components/ui/Loading";
import Empty from "@/components/ui/Empty";
import Error from "@/components/ui/Error";
import ChangelogEntry from "@/components/molecules/ChangelogEntry";
const ChangelogTimeline = () => {
  const [changelogData, setChangelogData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const loadChangelog = async () => {
    setLoading(true)
    setError("")
    try {
const data = await changelogService.getAll()
      setChangelogData(data)
    } catch (err) {
      setError(err.message || "Failed to load changelog")
    } finally {
      setLoading(false)
    }
  }

const handleCreateEntry = async (entryData) => {
    try {
      await changelogService.create(entryData)
      toast.success("Changelog entry created successfully!")
      setIsModalOpen(false)
      await loadChangelog()
    } catch (err) {
      toast.error(err.message || "Failed to create changelog entry")
      throw err
    }
  }

  useEffect(() => {
    loadChangelog()
  }, [])

  const groupByVersion = (entries) => {
    const grouped = {}
    entries.forEach(entry => {
      if (!grouped[entry.version]) {
        grouped[entry.version] = []
      }
      grouped[entry.version].push(entry)
    })
    return grouped
  }

  const getTypeStats = () => {
    const stats = { feature: 0, improvement: 0, bugfix: 0 }
    changelogData.forEach(entry => {
      stats[entry.type] = (stats[entry.type] || 0) + 1
    })
    return stats
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadChangelog} />

  const groupedEntries = groupByVersion(changelogData)
  const typeStats = getTypeStats()

return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient mb-2">
            Changelog
          </h1>
          <p className="text-gray-600">
            Stay updated with the latest product improvements and releases
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
        >
          <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
          Add Entry
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center">
            <ApperIcon name="Package" className="h-8 w-8 mr-3" />
            <div>
              <div className="text-2xl font-bold">{Object.keys(groupedEntries).length}</div>
              <div className="text-blue-100">Releases</div>
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
            <ApperIcon name="Plus" className="h-8 w-8 mr-3" />
            <div>
              <div className="text-2xl font-bold">{typeStats.feature}</div>
              <div className="text-green-100">Features</div>
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
            <ApperIcon name="Zap" className="h-8 w-8 mr-3" />
            <div>
              <div className="text-2xl font-bold">{typeStats.improvement}</div>
              <div className="text-purple-100">Improvements</div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center">
            <ApperIcon name="Bug" className="h-8 w-8 mr-3" />
            <div>
              <div className="text-2xl font-bold">{typeStats.bugfix}</div>
              <div className="text-red-100">Bug Fixes</div>
            </div>
          </div>
        </motion.div>
      </div>

{/* Timeline */}
      {changelogData.length === 0 ? (
        <Empty
          title="No changelog entries yet"
          description="Check back soon for product updates and release notes."
          icon="FileText"
        />
      ) : (
        <div className="relative">
          <div className="space-y-0">
            {changelogData.map((entry, index) => (
              <ChangelogEntry
                key={entry.Id}
                entry={entry}
                isLast={index === changelogData.length - 1}
              />
            ))}
          </div>
        </div>
      )}

      {/* Create Entry Modal */}
      <ChangelogEntryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateEntry}
      />
    </div>
  )
}

export default ChangelogTimeline