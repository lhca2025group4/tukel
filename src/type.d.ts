interface DetailTeam {
  id: string
  teamName: string
  teamMembers: {
    id: number
    name: string
  }[]
  teamQuestions: {
    id: number
    question: string
    score: number
    isFinished: boolean
  }[]
  isDeleted: boolean
  createdAt: number //unix
  updatedAt: number //unix
  isShuffled: boolean
  shuffledQuestion:
    | {
        id: number
        name: string
        question: string
        score: number
        isFinished: boolean
      }[]
    | null
}
