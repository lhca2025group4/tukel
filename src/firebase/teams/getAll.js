import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../'

export default async function getAllTeams(userId) {
  const teams = []
  try {
    const teamsCollectionRef = collection(db, 'users', userId, 'teams')
    const q = query(teamsCollectionRef, where('isDeleted', '==', false))
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {
      teams.push({ id: doc.id, ...doc.data() })
    })
    return teams
  } catch (e) {
    console.error('Error saat mengambil semua tim: ', e)
    return []
  }
}
