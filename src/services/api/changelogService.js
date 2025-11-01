import { getApperClient } from '@/services/apperClient'
import { toast } from 'react-toastify'

export const changelogService = {
  async getAll() {
    try {
      const apperClient = getApperClient()
      if (!apperClient) {
        throw new Error('ApperClient not initialized')
      }

      const response = await apperClient.fetchRecords('changelog_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "release_date_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "version_c"}}
        ],
        orderBy: [{"fieldName": "release_date_c", "sorttype": "DESC"}]
      })

      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }

      return (response.data || []).map(item => ({
        ...item,
        title: item.title_c || item.Name,
        description: item.description_c,
        releaseDate: item.release_date_c,
        type: item.type_c,
        version: item.version_c
      }))
    } catch (error) {
      console.error("Error fetching changelog:", error?.response?.data?.message || error)
      return []
    }
  },

  async getById(id) {
    try {
      const apperClient = getApperClient()
      if (!apperClient) {
        throw new Error('ApperClient not initialized')
      }

      const response = await apperClient.getRecordById('changelog_c', parseInt(id), {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "release_date_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "version_c"}}
        ]
      })

      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }

      const item = response.data
      if (!item) return null

      return {
        ...item,
        title: item.title_c || item.Name,
        description: item.description_c,
        releaseDate: item.release_date_c,
        type: item.type_c,
        version: item.version_c
      }
    } catch (error) {
      console.error(`Error fetching changelog entry ${id}:`, error?.response?.data?.message || error)
      return null
    }
  },

  async create(entryData) {
    try {
      const apperClient = getApperClient()
      if (!apperClient) {
        throw new Error('ApperClient not initialized')
      }

      const createData = {
        Name: entryData.title_c || entryData.title || 'Untitled',
        title_c: entryData.title_c || entryData.title,
        description_c: entryData.description_c || entryData.description,
        release_date_c: entryData.release_date_c || entryData.releaseDate || new Date().toISOString(),
        type_c: entryData.type_c || entryData.type || 'feature',
        version_c: entryData.version_c || entryData.version
      }

      const response = await apperClient.createRecord('changelog_c', {
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
          console.error(`Failed to create ${failed.length} changelog entries:`, failed)
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`))
            if (record.message) toast.error(record.message)
          })
        }

        return successful.length > 0 ? successful[0].data : null
      }

      return null
    } catch (error) {
      console.error("Error creating changelog entry:", error?.response?.data?.message || error)
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
      if (updateData.release_date_c || updateData.releaseDate) {
        updateFields.release_date_c = updateData.release_date_c || updateData.releaseDate
      }
      if (updateData.type_c || updateData.type) {
        updateFields.type_c = updateData.type_c || updateData.type
      }
      if (updateData.version_c || updateData.version) {
        updateFields.version_c = updateData.version_c || updateData.version
      }

      const response = await apperClient.updateRecord('changelog_c', {
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
          console.error(`Failed to update ${failed.length} changelog entries:`, failed)
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`))
            if (record.message) toast.error(record.message)
          })
        }

        return successful.length > 0 ? successful[0].data : null
      }

      return null
    } catch (error) {
      console.error("Error updating changelog entry:", error?.response?.data?.message || error)
      return null
    }
  },

  async delete(id) {
    try {
      const apperClient = getApperClient()
      if (!apperClient) {
        throw new Error('ApperClient not initialized')
      }

      const response = await apperClient.deleteRecord('changelog_c', {
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
          console.error(`Failed to delete ${failed.length} changelog entries:`, failed)
          failed.forEach(record => {
            if (record.message) toast.error(record.message)
          })
        }

        return successful.length > 0
      }

      return false
    } catch (error) {
      console.error("Error deleting changelog entry:", error?.response?.data?.message || error)
      return false
    }
  },

  async getByVersion(version) {
    try {
      const apperClient = getApperClient()
      if (!apperClient) {
        throw new Error('ApperClient not initialized')
      }

      const response = await apperClient.fetchRecords('changelog_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "release_date_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "version_c"}}
        ],
        where: [{
          "FieldName": "version_c",
          "Operator": "EqualTo",
          "Values": [version]
        }],
        orderBy: [{"fieldName": "release_date_c", "sorttype": "DESC"}]
      })

      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }

      return (response.data || []).map(item => ({
        ...item,
        title: item.title_c || item.Name,
        description: item.description_c,
        releaseDate: item.release_date_c,
        type: item.type_c,
        version: item.version_c
      }))
    } catch (error) {
      console.error("Error fetching changelog by version:", error?.response?.data?.message || error)
      return []
    }
  }
}