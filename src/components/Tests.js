import { format } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { exportComponentAsPNG } from "react-component-export-image";
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import Latex from 'react-latex';
import { Link, useParams } from 'react-router-dom';
import sertifikat3 from '../img/sertefic.jpg';
import AuthUser from './elements/AuthUser';
import Nav from './elements/Nav';
import { padTime } from './elements/padTime';
import shuffle from './elements/shuffle';

const Tests = () => {
    const componentRef = useRef();

    const {http,getToken,navigate,setToken,Swal} = AuthUser();
    const [userData, setUserData] = useState();
    const [quest, setQuest] = useState([]);
    const [data, setData] = useState([]);
    const [number, setNumber] = useState(0);
    const [varinat, setVariant] = useState(0);
    const [correct, setCorrect] = useState(0);
    const [ball, setBall] = useState(0);
    const [click, setClick] = useState(null);
    const [sertificate, setSertificate] = useState(true);
    const {degree} = useParams();
    // time 
    const [currentTime] = useState(format(new Date(), 'yyyy-MM-dd'));
    const[time, setTime] = useState(2*60);
    // const[counting, setCounting] = useState(true);
    const minutes = padTime(Math.floor(time/60));
    const seconds = padTime( time - minutes*60 );
    const [daraja] = useState(degree);
    
    useEffect(() => {
        http.post(
            '/getQuest.php',
            JSON.stringify(
                {token:getToken(), degree: daraja}
            )
        ).then((res)=>{
           setData(res.data.data);
        });
        
    // eslint-disable-next-line react-hooks/exhaustive-deps    
    }, []);

    useEffect(() => {
        http.post('/getUser.php',{token:getToken()}).then((res)=>{
            setUserData(res.data.token);
        })

        const interval = setInterval( () => {
                setTime((time) => (time >=1 ? time -1 : 0));
        }, 1000);
        return() => {
            clearInterval(interval);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        if(time===0){
            // sendBall();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [time]);

    useEffect(() => {
        setQuest(shuffle(data));
    }, [data]);

    useEffect(() => {
        if(quest.length>0)
            setVariant(shuffle(quest[number].variants));
    },[number, quest]);

    const is = (e) =>{
        setClick(e);
        setCorrect(quest[number].variants[e-1].correct);
    }

    

    const isCorrect = (e) => {
        if(number < quest.length-1){
            
            setNumber((pre)=> pre+1);
            setVariant(shuffle(quest[number+1].variants));
            setClick(false);
            
            if(correct===1){
                setBall((pre)=> pre+1);
            }

        }else{
            sendBall();
        }
        
    }

    const sendBall = () =>{
        http.post(
            '/setBall.php',
            JSON.stringify(
                {ball:ball+correct,token:getToken(), dargee: daraja}
            )
        ).then((res)=>{
            if(res.data.result_code===1){
                setToken(res.data.data.token);
                if(res.data.data.text === "next level"){
                    let str = "Siz keyingi bosqishga utingiz " + res.data.data.ball + " ball to'pladingiz";
                    Swal("Winner",str,"success");
                    navigate("/card");
                }
                if(res.data.data.text === "winner"){
                    let str = "Siz barcha bosqichdan o'tingiz " + res.data.data.ball + " ball to'pladingiz";
                    console.log(str);
                    Swal("Winner",str,"success");
                    setSertificate(false);
                    // navigate("/main");
                }
                if(res.data.data.text === "not next level"){
                    let str = "Siz yetarlicha ball to'plamadingiz "  + res.data.data.ball + " ball";
                    
                    Swal("Afusus",str,"");
                    navigate("/card");
                }
                if(res.data.data.text === 201){
                    let str = "Siz yetarlicha ball to'plamadingiz "  + res.data.data.ball + " ball ";
                    console.log(str);
                    
                    Swal("Afusus",str,"");
                    navigate("/card");
                }
            }
            else{
                alert("error");
                navigate("/");
            }
        })
    }

    return (
        <section className='test-section'>
            <div className='container flex a-center'>
                <header className='flex center'>
                    <Link className='left' to="/card">
                        <FaArrowAltCircleLeft className="icons youtube"/>
                    </Link>
                    {minutes} : {seconds}
                </header>
                <div className='test flex center'>
                    {
                        sertificate?(
                            <>
                                <div className='test-box border'>
                                    {
                                        quest[number]?(
                                            <div className='quest-box'>
                                                <div>
                                                    <p className='right'>
                                                        {
                                                            number + 1
                                                        } / 10
                                                    </p>
                                                    
                                                    <h2 className='quest-title'>
                                                        {quest[number].quest}
                                                    </h2>
                                                        <Latex className="formula">
                                                        {quest[number].formulaQuest}
                                                        </Latex>
                                                </div>
                                                <div className='check-variants'>
                                                    {
                                                        varinat?(
                                                            varinat.map((varinat)=>
                                                            <button 
                                                                key={varinat.key} 
                                                                className={`varinat-button ${click===varinat.key? "active": ""}`}
                                                                onClick={() => is(varinat.key)}
                                                            >
                                                                <Latex>
                                                                    {varinat.varinat}
                                                                </Latex>
                                                            </button>
                                                        )
                                                        ):(
                                                            <>Loading...</>
                                                        )
                                                        
                                                    }
                                                </div>
                                                <button disabled={!click} onClick={isCorrect} className='btn-send box-shadow'>Yuborish</button>
                                            </div>
                                        ):(
                                            <>Testlar yuklanmoqda...</>
                                        )
                                    }
                                </div>
                            </>
                        ):(
                            <>
                                <div className='test-box flex center border'>
                                    <div id='sertificate2' ref={componentRef}>
                                        {
                                            userData?(
                                                <>
                                                    <p className='serteficate_name'>{userData.fio}</p>
                                                    <p className='serteficate_time'>{currentTime}</p>
                                                </>
                                            ):(
                                                <></>
                                            )
                                        }
                                        <img alt='' className='sertifikat' src={sertifikat3}></img>
                                    </div>
                                    <button 
                                        className='btn-send serteficate_button box-shadow'
                                        onClick={() => {
                                            exportComponentAsPNG(componentRef)
                                        }}
                                        type='submit'>
                                            Yuklab olish 
                                    </button>
                                </div>
                            </>
                        )
                    }
                </div>
                <Nav />
            </div>
        </section>
    );
};

Tests.propTypes = {};

export default Tests;