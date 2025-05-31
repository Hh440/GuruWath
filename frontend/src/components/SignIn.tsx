import { auth } from "../App";

import { GoogleAuthProvider,signInWithPopup } from "firebase/auth";

const provider = new GoogleAuthProvider();

export const SignIn= ()=>{

async function onSignin(){

    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if(!credential){
      return
    }
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;

    console.log(user)
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });


}

    return(
        <div>

           

            <button
            onClick={()=>{
                onSignin()
            }}
            className="border w-30 h-14"
            >
                Login with google
            </button>
        </div>
    )
}