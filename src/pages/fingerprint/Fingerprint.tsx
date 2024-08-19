// src/App.js
import  { useEffect } from 'react';
// import { useAuth0 } from '@auth0/auth0-react';
import {client , server } from '@passwordless-id/webauthn'
import { Button } from 'antd';

function Fingerprint() {
    

    const register = async ()=>{
        // https://github.com/passwordless-id/webauthn/blob/main/docs/registration.md
        const challenage :any  = server.randomChallenge() ; // (send request to server it will return this)
        const cred : any  = await client.register({
            challenge: challenage,
            user: 'John Doe', // username 
            
          })
        //   cred.rp.id = 'localhost';
        console.log('in')
          
        console.log(cred);
        // send the cred to the server to verify then store the ouput object in database
    }
    const login = async ()=>{
        // https://github.com/passwordless-id/webauthn/blob/main/docs/authentication.md
        const challenge : any = server.randomChallenge() ; 
        const authentication : any = await client.authenticate({
            challenge: challenge,
            allowCredentials:[{id:'crediental-id' , transports:['internal']}],
            timeout:60000 
        });
        console.log(authentication);
        // send the authentication to the server to verify 
    }
    
    useEffect(()=>{
      
    },[]);
    return <>
        <hr/>
        <Button onClick={register}>  
            register your fingerprint
        </Button>
        <Button onClick={login}>
            authenticate using your fingerprint 
        </Button>
    </>
}

export default Fingerprint;