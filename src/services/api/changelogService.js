import changelogData from '@/services/mockData/changelog.json'

let mockChangelog = [...changelogData]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const changelogService = {
  async getAll() {
    await delay(300)
    return [...mockChangelog].sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
  },

  async getById(id) {
    await delay(200)
    const entry = mockChangelog.find(item => item.Id === parseInt(id))
    if (!entry) {
      throw new Error('Changelog entry not found')
    }
    return { ...entry }
  },

  async create(entryData) {
    await delay(400)
    const newEntry = {
      Id: Math.max(...mockChangelog.map(c => c.Id), 0) + 1,
      ...entryData,
      releaseDate: entryData.releaseDate || new Date().toISOString()
    }
    mockChangelog.push(newEntry)
    return { ...newEntry }
  },

  async update(id, updateData) {
    await delay(300)
    const index = mockChangelog.findIndex(item => item.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Changelog entry not found')
    }
    mockChangelog[index] = {
      ...mockChangelog[index],
      ...updateData
    }
    return { ...mockChangelog[index] }
  },

  async delete(id) {
    await delay(250)
    const index = mockChangelog.findIndex(item => item.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Changelog entry not found')
    }
    mockChangelog.splice(index, 1)
    return true
  },

  async getByVersion(version) {
    await delay(200)
    return mockChangelog.filter(entry => entry.version === version)
  }
}