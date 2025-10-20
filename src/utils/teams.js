export function toMillis(v) {
  if (!v) return 0
  if (v?.toMillis && typeof v.toMillis === 'function') return v.toMillis()
  if (typeof v === 'object') {
    const seconds = v.seconds ?? v._seconds
    const nanos = v.nanoseconds ?? v._nanoseconds
    if (typeof seconds === 'number') {
      const msFromSeconds = seconds * 1000
      const msFromNanos = typeof nanos === 'number' ? Math.floor(nanos / 1e6) : 0
      return msFromSeconds + msFromNanos
    }
  }
  if (typeof v === 'number') {
    return v < 1e12 ? v * 1000 : v
  }
  if (typeof v === 'string') {
    const p = Date.parse(v)
    return Number.isNaN(p) ? 0 : p
  }
  return 0
}

export function normalizeTeam(team = {}) {
  const t = { ...team }
  t.createdAt = toMillis(team.createdAt) || 0
  t.updatedAt = toMillis(team.updatedAt) || (team.updatedAt ? Date.now() : 0)
  // normalize arrays and nested timestamps if any
  t.teamMembers = Array.isArray(team.teamMembers) ? team.teamMembers.map((m) => ({ ...m })) : []
  t.teamQuestions = Array.isArray(team.teamQuestions)
    ? team.teamQuestions.map((q) => ({ ...q }))
    : []
  t.shuffledQuestion = Array.isArray(team.shuffledQuestion)
    ? team.shuffledQuestion.map((q) => ({ ...q }))
    : []
  return t
}
