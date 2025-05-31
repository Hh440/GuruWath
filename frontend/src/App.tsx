

import { getAuth,onAuthStateChanged } from 'firebase/auth';
import './App.css'


import { SignIn } from './components/SignIn';



import { initializeApp } from "firebase/app";
import { useEffect } from 'react';
import { RecoilRoot, useRecoilState } from 'recoil';
import { userAtom } from './store/atoms/user';
import { TopBar } from './components/TopBar';


const firebaseConfig = {
  apiKey: "AIzaSyArR8sod6cikDOF2IkDQNlG1oEneHvJBqM",
  authDomain: "flcode-2f60e.firebaseapp.com",
  projectId: "flcode-2f60e",
  storageBucket: "flcode-2f60e.firebasestorage.app",
  messagingSenderId: "1068072517972",
  appId: "1:1068072517972:web:43b3ec5d3d7e8f5aaf08c1",
  measurementId: "G-3G0EQ3VMXX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()

function App() {
   return(
    <RecoilRoot>
      <StoreApp/>
    </RecoilRoot>
   )
  
}


function StoreApp(){

  const [user,setUser]= useRecoilState(userAtom)

  useEffect(()=>{
    onAuthStateChanged(auth,function(user) {
      if (user && user.email) {
        setUser({
          loading:false,
          user:{
            email:user.email
          }
        })
       
      } else {


        setUser({
          loading:false,
          
        })
        // No user is signed in.
        console.log('There is no logged in user');
      }
    });
  },[])

  if(user.loading){
    return <div>
      Loading....
    </div>
  }

  if(!user.user){
    return <div>
      <SignIn/>
    </div>
  }
  




  return (
    <>
    <TopBar/>
      
     
    </>
  )

}

export default App
