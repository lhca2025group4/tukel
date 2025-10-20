import { defineStore } from 'pinia'
import { insertNewTeam, deleteTeam } from '../firebase/teams'

const messageObj = {
  idle: {
    status: 'idle',
    message: '',
  },
  loading: {
    status: 'loading',
    message: 'Loading data from database.',
  },
  completed: {
    status: 'completed',
    message: 'Finished get data.',
  },
  error: {
    status: 'error',
    message: 'Failed get data.',
  },
}

export const useMainStore = defineStore('main', {
  state: () => ({
    user: null,
    fetchState: {
      status: 'idle', // idle, loading, completed, error
      message: '',
    },
    tempTeam: {},
    allTeams: [],
  }),
  getters: {},
  actions: {
    setFetchState(status) {
      this.fetchState.status = messageObj[status].status
      this.fetchState.message = messageObj[status].message
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
    async addNewTeam(team) {
      this.allTeams.push(team)
      setTeamInLocalStorage(this.allTeams)
      if (this.user && this.user.uid) {
        await insertNewTeam(this.user.uid, team.id, team)
      }
    },
    deleteTempTeam() {
      this.tempTeam = {}
    },
    async deleteAllTeams(id) {
      const team = this.allTeams.find((team) => team.id === id)
      if (team) team.isDeleted = true
      setTeamInLocalStorage(this.allTeams)
      if (this.user && this.user.uid) {
        await deleteTeam(this.user.uid, team.id, team)
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

function setTeamInLocalStorage(data) {
  localStorage.setItem('teams', JSON.stringify(data))
  localStorage.setItem('teams_updatedAt', Date.now())
  return 'Success storing data'
}
