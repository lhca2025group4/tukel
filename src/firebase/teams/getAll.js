import { collection, getDocs } from 'firebase/firestore'
import { db } from '../'

export default async function getAllTeams(userId) {
  if (!userId) return []
  try {
    const teamsCollectionRef = collection(db, 'users', userId, 'teams')
    const querySnapshot = await getDocs(teamsCollectionRef)

    const teams = []
    querySnapshot.forEach((doc) => {
      teams.push({ id: doc.id, ...doc.data() })
    })
    return teams
  } catch (e) {
    console.error('Error saat mengambil semua tim: ', e)
    return []
  }
}
