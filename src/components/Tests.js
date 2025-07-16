import React,{useEffect,useState} from 'react';
import { useParams, Link} from 'react-router-dom';
import Nav from './elements/Nav';
import AuthUser from './elements/AuthUser';
import Latex from 'react-latex';
import shuffle from './elements/shuffle';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
const Tests = () => {
    const {http,getToken,navigate,setToken,Swal} = AuthUser();
    const [quest, setQuest] = useState([]);
    const [data, setData] = useState([]);
    const [number, setNumber] = useState(0);
    const [varinat, setVariant] = useState(0);
    const [correct, setCorrect] = useState(0);
    const [ball, setBall] = useState(0);
    const [click, setClick] = useState(null);
    const {degree} = useParams();
    // const url = parm.degree;
    const [daraja] = useState(degree);
    useEffect(() => {
        http.post(
            '/getQuest.php',
            JSON.stringify(
                {token:getToken(), degree: daraja}
            )
        ).then((res)=>{
           setData(res.data.data);
        })
    }, []);

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
        if(number<quest.length-1){
            
            setNumber((pre)=> pre+1);
            setVariant(shuffle(quest[number+1].variants));
            setClick(false);
            
            if(correct===1){
                setBall((pre)=> pre+1);
            }

        }else{
            http.post(
                '/setBall.php',
                JSON.stringify(
                    {ball:ball+correct,token:getToken(), dargee: daraja}
                )
            ).then((res)=>{
                if(res.data.result_code===1){
                    setToken(res.data.data.token);
                    if(res.data.data.text === "next level"){
                        Swal("Winner","Siz keyingi bosqishga utingiz","success");
                        navigate("/card");
                    }
                    if(res.data.data.text === "winner"){
                        Swal("Winner","Siz barcha bosqichdan o'tingiz","success");
                        navigate("/main");
                    }
                    if(res.data.data.text === "not next level"){
                        Swal("Afusus","Siz yetarlicha ball to'plamadingiz","");
                        navigate("/card");
                    }
                    if(res.data.data.text === 201){
                        Swal("Afusus","Siz yetarlicha ball to'plamadingiz","");
                        navigate("/card");
                    }
                }
                else{
                    alert("error");
                    navigate("/");
                }
            })
        }
        
    }

    return (
        <section className='test-section'>
            <div className='container flex a-center'>
                <header className='flex center'>
                    <Link className='left' to="/card">
                        <FaArrowAltCircleLeft className="icons youtube"/>
                    </Link>
                    Testlar 
                </header>
                <div className='test flex center'>
                    <div className='test-box border'>
                        {
                            quest[number]?(
                                <div className='quest-box'>
                                    <div>
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
                                <>Loading</>
                            )
                        }
                        
                    </div>
                </div>
                <Nav />
            </div>
        </section>
    );
};

Tests.propTypes = {};

export default Tests;