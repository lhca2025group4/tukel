import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    isLoggedIn: false,
    teamDatas: [
      {
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
    ],
  }),
  getters: {},
  actions: {},
})
