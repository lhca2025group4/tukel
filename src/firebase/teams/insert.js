import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../'

export default async function insertNewTeam(userId, teamId, teamData) {
  try {
    const teamDocRef = doc(db, 'users', userId, 'teams', teamId)
    await setDoc(teamDocRef, {
      ...teamData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })

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
