import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import axios from "axios";
export default function AuthUser(){
    
    const navigate = useNavigate();

    const [token, setToken] = useState();

    
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    }
    
    const Swal = (title,text,icon) => {
        if(icon===""){
            return swal(title, text);
        }
        return swal(title, text, icon);
    }

    const SaveToken = (token) => {

        sessionStorage.setItem('token',JSON.stringify(token));
        setToken(token);
        navigate("/main");

    }

    const logOut = () =>{
        sessionStorage.clear();
        navigate("/login");
    }

    const http = axios.create({
        baseURL:"https://samarcande-travel.uz/baratov/api/",
        maxBodyLength: Infinity,
        headers: {
            'Content-Type': 'application/json'
        },
    });
    
    const shuffle = (array) => {
        return [...array].sort(() => Math.random() - 0.5);
    }
    return {
        setToken:SaveToken,
        token,
        getToken,
        http,
        shuffle,
        logOut,
        navigate,
        Swal
    }
}