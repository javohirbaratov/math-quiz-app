import React,{useState,useEffect,useRef} from 'react';
import { Link } from 'react-router-dom';
import AuthUser from './elements/AuthUser';
import Nav from './elements/Nav.js';
import { FaArrowAltCircleLeft } from 'react-icons/fa';

const Settings = () => {
    const {http,getToken,setToken,Swal} = AuthUser();
    const [userData, setUserData] = useState();
    const [text, setText] = useState("");
    const [loginText, setLoginText] = useState([]);
    const [passwordText, setPasswordText] = useState([]);
    const [style, setStyle] = useState();
    const password = useRef(null);
    const passwordOne = useRef(null);
    
    useEffect(() => {
        http.post('/getUser.php',{token:getToken()}).then((res)=>{
            setUserData(res.data.token);
        })
    }, []);

    const handleUpdate = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value});
        
        if(e.target.name=="login"){
            if(e.target.value.length<4){
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

        if(e.target.name=="parol"){
            if(e.target.value.length<8){
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

        if(e.target.name=="password"){
            if(password.current.value==passwordOne.current.value){
                setText("Parol to'gri");
                setStyle("green-text");
            }else{
                setText("Yuqoridagi parolni takroran kiriting");
                setStyle("red-text");
            }
            setUserData({...userData, ['parol']: e.target.value});
        }
    }

    const SubmitForm = (e) => {
        
        e.preventDefault();
        
        if(password.current.value!=passwordOne.current.value){
            Swal("Error","Parol mos emas","");
        }else{
            
            if(password.current.value.length<8 || passwordOne.current.value.length<8){
                setUserData({...userData, ['parol']: -1});
                http.post('/updateUserData.php',{userData}).then((res)=>{
                    if(res.data.result_code==1){
                        setToken(res.data.token);
                        Swal("Bajarildi","Eski parol saqlanib qoldi va ma'lumotlar tahrirlandi","success");
                    }
                    else
                    Swal("Bajaril","Ma'lumotlar formati mos emas","success");
                })
            }else{
                http.post('/updateUserData.php',{userData}).then((res)=>{
                    if(res.data.result_code==1){
                        setToken(res.data.token);
                        alert("Ma'lumotlar tahrirlandi");
                    }
                    else
                        alert("Ma'lumotlar formati mos emas");
                })
            }
        }
    }

    return (
        <section className='section'>
            <div className='container flex a-center'>
                <header className='flex center'>
                    <Link className='left' to="/main">
                        <FaArrowAltCircleLeft className="icons youtube"/>
                    </Link>
                    Sozlamalar
                </header>
                <div className='settings-content'>
                    {
                        userData?(
                            <>
                                <form className='form border'>
                                    <h1>Sozlamalar</h1>
                                    <div className='form-group'>
                                        <div>
                                            <label>Ism sharf</label>
                                        </div>
                                        <input type="text" name='fio' placeholder='Ism sharf' value={userData.fio} onChange={(e)=>handleUpdate(e)}/>
                                    </div>
                                    <div className='form-group'>
                                        <div>
                                            <label>Login</label>
                                        </div>
                                        <input name="login" placeholder='Enter login' value={userData.login} onChange={(e)=>handleUpdate(e)}></input>
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
                                        <input ref={passwordOne} name="parol" placeholder='Enter parol' onChange={(e)=>handleUpdate(e)}></input>
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
                                        <input ref={password} name="password" placeholder='Porolni qayta kiriting' onChange={(e)=>handleUpdate(e)}></input>
                                        <div>
                                            <p className={style}>{text}</p>
                                        </div>
                                    </div>
                                    <div className='form-group  flex'>
                                        <button className='btn sig_in' onClick={SubmitForm}>Tahrirlash</button>
                                    </div>
                                </form>
                            </>
                        ):(
                            <>
                                Loading...
                            </>
                        )
                    }
                    
                </div>
                <Nav active ="2"/>
            </div>
        </section>
    );
};

export default Settings;