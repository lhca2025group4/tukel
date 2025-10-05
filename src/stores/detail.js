import { defineStore } from 'pinia'

export const useDetailStore = defineStore('detail', {
  state: () => ({
    id: null,
    name: null,
    teams: [],
    questions: [],
    updatedAt: null,
    createdAt: null,
    resultShuffle: [],
  }),
  getters: {
    getId: (state) => state.id,
    getName: (state) => state.name,
    getTeams: (state) => state.teams,
    getQuestions: (state) => state.questions,
    getUpdatedAt: (state) => state.updatedAt,
    getCreatedAt: (state) => state.createdAt,
    getTotalQuestions: (state) => state.questions.length,
    getTotalScore: (state) =>
      state.resultShuffle.reduce((total, question) => total + question.score, 0),
    getAccumulatedScore: (state) =>
      state.resultShuffle
        .filter((question) => question.isFinished)
        .reduce((total, question) => total + question.score, 0),
  },
  actions: {
    setAutomateData() {
      this.id = 1
      this.name = 'Team Alpha'
      this.teams = ['Aflaha', 'Della', 'Ridho', 'Iswara']
      this.questions = [
        { question: 'What is Capital City of Indonesia', score: 20, isFinished: false },
        { question: 'What is Capital City of Malaysia', score: 15, isFinished: false },
        { question: 'What is Capital City of Singapore', score: 10, isFinished: false },
        { question: 'What is Capital City of Thailand', score: 5, isFinished: false },
      ]
    },
    setId(id) {
      this.id = id
    },
    setName(name) {
      this.name = name
    },
    setTeams(teams) {
      this.teams = teams
    },
    setTeams(questions) {
      this.questions = questions
    },
    setResultShuffle(result) {
      this.resultShuffle = result
    },
  },
})
