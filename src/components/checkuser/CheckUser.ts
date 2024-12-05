"use server"
import { auth, User } from '@clerk/nextjs/server';
import React from 'react'
function CheckUser(user:any) {
    if(!user?.username){
         auth().redirectToSignIn();
         return true;
      }
      else{
        return false;
      }
}

export default CheckUser
