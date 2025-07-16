import React,{useRef,useState,useEffect} from 'react';
import { useNavigate,Link } from "react-router-dom";
import AuthUser from './elements/AuthUser';

const Registr = () => {
    const navigate = useNavigate();
    const {http} = AuthUser();
    const [text, setText] = useState("");
    const [loginText, setLoginText] = useState([]);
    const [passwordText, setPasswordText] = useState([]);
    const [style, setStyle] = useState();
    const login = useRef(null);
    const password = useRef(null);
    const passwordOne = useRef(null);
    const name = useRef(null);
    useEffect(() => {
        sessionStorage.clear();
    }, []);
    const handleLoginChange = () => {
        if(login.current.value.length<4){
            setLoginText([
                {
                    text:"Loginda kamida 4 ta belgi bo'lishi kerak",
                    className:"red-text"
                }
            ]);
        }else{
            setLoginText([
                {
                    text:"",
                    className:""
                }
            ]);
        }
    }
    const handlePasswordChange = () => {
        if(passwordOne.current.value.length<8){
            setPasswordText([
                {
                    text:"Parolda kamida 8 bo'lishi kerak",
                    className:"red-text"
                }
            ])
        }else{
            setPasswordText([
                {
                    text:"",
                    className:""
                }
            ])
        }
    }
    const handleChange = () => {
        if(password.current.value===passwordOne.current.value){
            setText("Parol to'gri");
            setStyle("green-text");
        }else{
            setText("Yuqoridagi parolni takroran kiriting");
            setStyle("red-text");
        }
    }
    const SubmitForm = (e) => {
        e.preventDefault();
        http.post('/registrUser.php',{login:login.current.value,password:password.current.value,name:name.current.value}).then((res)=>{
            console.log(res);
            if(res.data.result_code===1)
                navigate("/login");
            else
                alert("Login yoki parol xato");
        })
    }

    return (
        <section className='login-section registr'>
            <div className='container flex center'>
                <form className='form'>
                    <h1>Kirish oynasi</h1>
                    <div className='form-group'>
                        <div>
                            <label>Ism sharf</label>
                        </div>
                        <input ref={name} placeholder='Ism sharf'></input>
                    </div>
                    <div className='form-group'>
                        <div>
                            <label>Login</label>
                        </div>
                        <input ref={login} placeholder='Enter login' onChange={handleLoginChange}></input>
                        <div>
                            {
                                loginText[0]?.className?(
                                    <p className={loginText[0].className}>{loginText[0].text}</p>
                                ):(<></>)
                            }
                        </div>
                    </div>
                    <div className='form-group'>
                        <div>
                            <label>Parol</label>
                        </div>
                        <input ref={passwordOne} placeholder='Enter parol' onChange={handlePasswordChange}></input>
                        <div>
                            {
                                
                                passwordText[0]?.className?(
                                    <p className={passwordText[0].className}>{passwordText[0].text}</p>
                                ):(<></>)
                            }
                        </div>
                    </div>
                    <div className='form-group'>
                        <div>
                            <label>Porolni qayta kiriting</label>
                        </div>
                        <input ref={password} placeholder='Porolni qayta kiriting' onChange={handleChange}></input>
                        <div>
                            <p className={style}>{text}</p>
                        </div>
                    </div>
                    <div className='form-group  flex'>
                        <button onClick={SubmitForm} className='btn sig_up'>Kirish</button>
                        <Link className='link' to="/login">
                            Login orqali kirish
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    );
};


export default Registr;