import { collection, doc, writeBatch, serverTimestamp } from 'firebase/firestore'
import { db } from '../'

export default async function setAllTeams(userId, teams = []) {
  if (!userId) throw new Error('userId required')
  const batch = writeBatch(db)
  const collRef = collection(db, 'users', userId, 'teams')

  teams.forEach((team) => {
    const id = team.id || team.teamId || doc(collRef).id
    const docRef = doc(collRef, id)
    const payload = { ...team, updatedAt: serverTimestamp() }
    batch.set(docRef, payload, { merge: true })
  })

  // update meta doc
  const metaRef = doc(db, 'users', userId, 'meta', 'teams')
  batch.set(metaRef, { updatedAt: serverTimestamp() }, { merge: true })

  await batch.commit()
}
