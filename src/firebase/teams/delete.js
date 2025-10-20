import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../'

export default async function deleteTeam(userId, teamId, teamData) {
  try {
    const teamDocRef = doc(db, 'users', userId, 'teams', teamId)
    await setDoc(
      teamDocRef,
      {
        isDeleted: true,
        updatedAt: serverTimestamp(),
      },
      {
        merge: true,
      },
    )

    const userDocRef = doc(db, 'users', userId)
    await setDoc(
      userDocRef,
      {
        lastUpdated: serverTimestamp(),
      },
      {
        merge: true,
      },
    )
  } catch (e) {
    console.error('Error saat menambahkan dokumen tim: ', e)
  }
}
