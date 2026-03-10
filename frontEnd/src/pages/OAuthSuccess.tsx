import {useEffect} from "react";

export default function OAuthSuccess(){

    useEffect(()=>{

        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if(token){
            localStorage.setItem("token",token);
            window.location.href="/dashboard";
        }

    },[])

    return <p>Connexion...</p>

}
