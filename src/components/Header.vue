<script setup>
import { ref, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useMainStore } from '../stores/main'
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../firebase'

const mainStore = useMainStore()
const { user } = storeToRefs(mainStore)

async function updateUserProfile(userData) {
  const userDocRef = doc(db, 'users', userData.uid)

  try {
    const docSnap = await getDoc(userDocRef)
    if (!docSnap.exists()) {
      await setDoc(userDocRef, {
        name: userData.displayName,
        email: userData.email,
        lastLogin: serverTimestamp(),
        firstTimeLogin: serverTimestamp()
      })
    } else {
      await setDoc(userDocRef, {
        lastLogin: serverTimestamp()
      }, { merge: true })
    }
  } catch (error) {
    console.error('Error saat menyimpan profil pengguna:', error)
  }
}

async function signInUser() {
  const provider = new GoogleAuthProvider()
  try {
    await signInWithPopup(auth, provider)
  } catch (error) {
    console.error("Error saat login:", error)
  }
}

async function signOutUser() {
  await signOut(auth)
}

const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  user.value = currentUser
  if (currentUser) updateUserProfile(currentUser)
})

onUnmounted(() => {
  unsubscribe()
})
</script>

<template>
  <header class="flex justify-between bg-slate-50 border-b border-slate-200 text-xs font-sans">
    <div class="flex items-center px-6">
      <span class="text-xs text-slate-950">
        {{ user ? `Welcome back, ${user.displayName}` : `Your data will not stored anywhere.
        Please sign in to Google` }}
      </span>
    </div>
    <button v-if="user" @click="signOutUser"
      class="bg-emerald-600 text-white p-4 hover:bg-emerald-500 transition duration-200 text-xs md:text-base font-bold cursor-pointer whitespace-nowrap">
      Sign Out
    </button>
    <button v-else @click="signInUser"
      class="bg-emerald-600 text-white p-4 hover:bg-emerald-500 transition duration-200 text-xs md:text-base font-bold cursor-pointer whitespace-nowrap">
      Sign in with Google
    </button>
  </header>
</template>