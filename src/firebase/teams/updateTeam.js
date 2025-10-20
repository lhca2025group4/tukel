import { doc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '..'

export default async function updateTeam(userId, teamId, payload = {}) {
  if (!userId || !teamId) throw new Error('userId and teamId required')
  const teamRef = doc(db, 'users', userId, 'teams', teamId)
  const metaRef = doc(db, 'users', userId, 'meta', 'teams')

  await updateDoc(teamRef, {
    ...payload,
    updatedAt: serverTimestamp(),
  })
  await setDoc(metaRef, { updatedAt: serverTimestamp() }, { merge: true })
}
