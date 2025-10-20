import { doc, getDoc } from 'firebase/firestore'
import { db } from '../'

export default async function getTeamsMeta(userId) {
  if (!userId) return { updatedAt: 0 }
  const metaRef = doc(db, 'users', userId, 'meta', 'teams')
  const snap = await getDoc(metaRef)
  if (!snap.exists()) return { updatedAt: 0 }
  const data = snap.data()
  const updatedAt =
    data?.updatedAt && data.updatedAt.toMillis ? data.updatedAt.toMillis() : data?.updatedAt || 0
  return { updatedAt }
}
