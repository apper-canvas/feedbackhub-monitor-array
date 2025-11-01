import roadmapData from '@/services/mockData/roadmap.json'

let mockRoadmap = [...roadmapData]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const roadmapService = {
  async getAll() {
    await delay(250)
    return [...mockRoadmap]
  },

  async getById(id) {
    await delay(200)
    const item = mockRoadmap.find(roadmapItem => roadmapItem.Id === parseInt(id))
    if (!item) {
      throw new Error('Roadmap item not found')
    }
    return { ...item }
  },

  async create(itemData) {
    await delay(400)
    const newItem = {
      Id: Math.max(...mockRoadmap.map(r => r.Id), 0) + 1,
      ...itemData,
      linkedFeedbackIds: itemData.linkedFeedbackIds || [],
      status: itemData.status || 'Planned'
    }
    mockRoadmap.push(newItem)
    return { ...newItem }
  },

  async update(id, updateData) {
    await delay(300)
    const index = mockRoadmap.findIndex(item => item.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Roadmap item not found')
    }
    mockRoadmap[index] = {
      ...mockRoadmap[index],
      ...updateData
    }
    return { ...mockRoadmap[index] }
  },

  async delete(id) {
    await delay(250)
    const index = mockRoadmap.findIndex(item => item.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Roadmap item not found')
    }
    mockRoadmap.splice(index, 1)
    return true
  },

  async getByTimeline(timeline) {
    await delay(200)
    return mockRoadmap.filter(item => item.timeline === timeline)
  }
}