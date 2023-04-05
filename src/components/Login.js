import React,{useRef,useEffect} from 'react';
import { Link } from "react-router-dom";
import AuthUser from './elements/AuthUser';
import axios from "axios";

const Login = () => {

    const {http,setToken,Swal} = AuthUser();
    useEffect(() => {
        sessionStorage.clear();
    }, []);
    const login = useRef(null);
    const password = useRef(null);

    const SubmitForm = (e) => {
        e.preventDefault();
        
        http.post(
            '/loginCheck.php',
            JSON.stringify(
                {login:login.current.value,password:password.current.value}
            )
        ).then((res)=>{
            if(res.data.result_code==1)
                setToken(res.data.token);
            else
                Swal("error","Login yoki parol xato","error");
        })
    }          
    return (
        <section className='login-section'>
            <div className='container flex center'>
                <form className='form'>
                    <h1>Kirish oynasi</h1>
                    <div className='form-group'>
                        <div>
                            <label>Login</label>
                        </div>
                        <input ref={login} placeholder='Enter login'></input>
                    </div>
                    <div className='form-group'>
                        <div>
                            <label>Parol</label>
                        </div>
                        <input ref={password} type="password" placeholder='Enter parol'></input>
                    </div>
                    <div className='form-group flex'>
                        <Link to="/main">
                            <button className='btn sig_in' type='submit' onClick={SubmitForm}>Kirish</button>
                        </Link>
                        <Link className='link' to="/registr">
                            Ro'yhatdan o'tish
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    );
};
export default Login;