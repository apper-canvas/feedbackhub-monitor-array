import { getApperClient } from '@/services/apperClient'
import { toast } from 'react-toastify'

export const roadmapService = {
  async getAll() {
    try {
      const apperClient = getApperClient()
      if (!apperClient) {
        throw new Error('ApperClient not initialized')
      }

      const response = await apperClient.fetchRecords('roadmap_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "timeline_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "estimated_date_c"}},
          {"field": {"Name": "votes_c"}},
          {"field": {"Name": "linked_feedback_ids_c"}}
        ],
        orderBy: [{"fieldName": "Id", "sorttype": "DESC"}]
      })

      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }

      return response.data || []
    } catch (error) {
      console.error("Error fetching roadmap items:", error?.response?.data?.message || error)
      return []
    }
  },

  async getById(id) {
    try {
      const apperClient = getApperClient()
      if (!apperClient) {
        throw new Error('ApperClient not initialized')
      }

      const response = await apperClient.getRecordById('roadmap_c', parseInt(id), {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "timeline_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "estimated_date_c"}},
          {"field": {"Name": "votes_c"}},
          {"field": {"Name": "linked_feedback_ids_c"}}
        ]
      })

      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }

      return response.data
    } catch (error) {
      console.error(`Error fetching roadmap item ${id}:`, error?.response?.data?.message || error)
      return null
    }
  },

  async create(itemData) {
    try {
      const apperClient = getApperClient()
      if (!apperClient) {
        throw new Error('ApperClient not initialized')
      }

      const createData = {
        Name: itemData.title_c || itemData.title || 'Untitled',
        title_c: itemData.title_c || itemData.title,
        description_c: itemData.description_c || itemData.description,
        timeline_c: itemData.timeline_c || itemData.timeline || 'immediate',
        status_c: itemData.status_c || itemData.status || 'Planned',
        estimated_date_c: itemData.estimated_date_c || itemData.estimatedDate,
        votes_c: itemData.votes_c || itemData.votes || 0,
        linked_feedback_ids_c: JSON.stringify(itemData.linked_feedback_ids_c || itemData.linkedFeedbackIds || [])
      }

      const response = await apperClient.createRecord('roadmap_c', {
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
          console.error(`Failed to create ${failed.length} roadmap items:`, failed)
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`))
            if (record.message) toast.error(record.message)
          })
        }

        return successful.length > 0 ? successful[0].data : null
      }

      return null
    } catch (error) {
      console.error("Error creating roadmap item:", error?.response?.data?.message || error)
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
      if (updateData.timeline_c || updateData.timeline) {
        updateFields.timeline_c = updateData.timeline_c || updateData.timeline
      }
      if (updateData.status_c || updateData.status) {
        updateFields.status_c = updateData.status_c || updateData.status
      }
      if (updateData.estimated_date_c || updateData.estimatedDate) {
        updateFields.estimated_date_c = updateData.estimated_date_c || updateData.estimatedDate
      }
      if (updateData.votes_c !== undefined || updateData.votes !== undefined) {
        updateFields.votes_c = updateData.votes_c || updateData.votes
      }
      if (updateData.linked_feedback_ids_c || updateData.linkedFeedbackIds) {
        updateFields.linked_feedback_ids_c = JSON.stringify(updateData.linked_feedback_ids_c || updateData.linkedFeedbackIds || [])
      }

      const response = await apperClient.updateRecord('roadmap_c', {
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
          console.error(`Failed to update ${failed.length} roadmap items:`, failed)
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`))
            if (record.message) toast.error(record.message)
          })
        }

        return successful.length > 0 ? successful[0].data : null
      }

      return null
    } catch (error) {
      console.error("Error updating roadmap item:", error?.response?.data?.message || error)
      return null
    }
  },

  async delete(id) {
    try {
      const apperClient = getApperClient()
      if (!apperClient) {
        throw new Error('ApperClient not initialized')
      }

      const response = await apperClient.deleteRecord('roadmap_c', {
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
          console.error(`Failed to delete ${failed.length} roadmap items:`, failed)
          failed.forEach(record => {
            if (record.message) toast.error(record.message)
          })
        }

        return successful.length > 0
      }

      return false
    } catch (error) {
      console.error("Error deleting roadmap item:", error?.response?.data?.message || error)
      return false
    }
  },

  async getByTimeline(timeline) {
    try {
      const apperClient = getApperClient()
      if (!apperClient) {
        throw new Error('ApperClient not initialized')
      }

      const response = await apperClient.fetchRecords('roadmap_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "timeline_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "estimated_date_c"}},
          {"field": {"Name": "votes_c"}},
          {"field": {"Name": "linked_feedback_ids_c"}}
        ],
        where: [{
          "FieldName": "timeline_c",
          "Operator": "EqualTo",
          "Values": [timeline]
        }],
        orderBy: [{"fieldName": "Id", "sorttype": "DESC"}]
      })

      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }

      return response.data || []
    } catch (error) {
      console.error("Error fetching roadmap items by timeline:", error?.response?.data?.message || error)
      return []
    }
  }
}