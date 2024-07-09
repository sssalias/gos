import { initializeApp } from 'firebase/app'
import { getMessaging, getToken } from 'firebase/messaging'
import { makeRequest, Methods } from 'src/api/config'


const firebaseConfig = {
    apiKey: "AIzaSyB_NtJARJLqFVKJoEVFPK7loX_nVrawzZA",
    authDomain: "kozodoy.firebaseapp.com",
    projectId: "kozodoy",
    storageBucket: "kozodoy.appspot.com",
    messagingSenderId: "196851838898",
    appId: "1:196851838898:web:3fb191c232e76d2fe2feab"
}

const app = initializeApp(firebaseConfig)

export const messaging = getMessaging(app)



export async function requestPermission(accesToken: string) {
  const permission = await Notification.requestPermission()
  //@ts-ignore
  const swRegistration = await navigator.serviceWorker.register('/firebase-messaging-sw.js')
  if (permission === 'granted') {
    const token = await getToken(messaging, {vapidKey: 'BKwVMxZ5bB9H7o5hjGK2iK5T6aGwnEgb2O1dcHz3GxiB7tTRfOfVmD1vJqg4m_b3OFkmadzwPXqCrtyfArqa7jQ'})
    await makeRequest(accesToken, Methods.POST, '/user/tokens/push-token/web', {token: token})
  }
}