import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    isLoggedIn: false,
    fetchState: {
      status: 'idle', // idle, loading, completed error
      message: '',
    },
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
  },
})
