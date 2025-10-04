import { defineStore } from 'pinia'

export const useTotalStore = defineStore('total', {
  state: () => ({
    allTeams: [],
  }),
  getters: {},
  actions: {
    setTeamsAutomated() {
      const tempData = [
        {
          id: 1,
          name: 'LHCA',
          score: {
            current: 15,
            total: 60,
          },
          question: 4,
          members: ['Aflaha', 'Della'],
          updatedAt: 1714435200,
          createdAt: 1714435200,
        },
        {
          id: 2,
          name: 'TGCA',
          score: {
            current: 0,
            total: 100,
          },
          question: 10,
          members: ['Ridho', 'Iswara'],
          updatedAt: 1714435200,
          createdAt: 1714435200,
        },
      ]
      this.allTeams = [...tempData]
    },
    deleteTeam(id) {
      const idx = this.allTeams.findIndex((team) => team.id === id)
      if (idx === -1) return
      this.allTeams.splice(idx, 1)
    },
  },
})
