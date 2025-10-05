import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    isLoggedIn: false,
    fetchState: {
      status: 'idle', // idle, loading, completed, error
      message: '',
    },
    tempTeam: {},
    allTeams: [],
  }),
  getters: {},
  actions: {
    setFetchStateIdle() {
      this.fetchState.status = 'idle'
      this.fetchState.message = ''
    },
    setFetchStateLoading() {
      this.fetchState.status = 'loading'
      this.fetchState.message = 'Loading data from database.'
    },
    setFetchStateCompleted() {
      this.fetchState.status = 'completed'
      this.fetchState.message = 'Finished get data.'
    },
    setFetchStateError() {
      this.fetchState.status = 'error'
      this.fetchState.message = 'Failed get data.'
    },
    setAllTeams(teams) {
      this.allTeams = teams
    },
    setTempTeam(team) {
      this.tempTeam = team
    },
    setTempTeamShuffled(questions) {
      this.tempTeam.shuffledQuestion = questions
      this.tempTeam.isShuffled = true
    },
    addNewTeam(team) {
      this.allTeams.push(team)
    },
    deleteTempTeam() {
      this.tempTeam = {}
    },
    deleteAllTeams(id) {
      const idx = this.allTeams.findIndex((team) => team.id === id)
      if (idx !== -1) {
        this.allTeams.splice(idx, 1)
      }
    },
    getTeamMembers(teamMembers) {
      return teamMembers.map((member) => member.name).join(', ')
    },
    getTotalScore(shuffledQuestion) {
      if (!shuffledQuestion) return 0
      return shuffledQuestion.reduce((total, question) => total + question.score, 0)
    },
    getAccumulatedScore(shuffledQuestion) {
      if (!shuffledQuestion) return 0
      return shuffledQuestion
        .filter((question) => question.isFinished)
        .reduce((total, question) => total + question.score, 0)
    },
  },
})
