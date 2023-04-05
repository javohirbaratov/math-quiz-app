import React,{useEffect,useState} from 'react';
import { Link} from 'react-router-dom';
import Nav from './elements/Nav';
import AuthUser from './elements/AuthUser';
import one from "../img/2.jpg";
import two from "../img/1.jpg";
import three from "../img/3.jpg";
import { FaLock } from 'react-icons/fa';
import { FaArrowAltCircleLeft } from 'react-icons/fa';

const Tests = () => {

    const {http,getToken,setToken,navigate} = AuthUser();
    const [data, setData] = useState([]);
    const [clickTwo, setClickTwo] = useState(null);
    const [clickThree, setClickThree] = useState(null);
    
    useEffect(() => {
        http.post('/getUser.php',{token:getToken()}).then((res)=>{
            setData(res.data.token);
            console.log(getToken());
        })
    }, []);
    
    useEffect(() => {
        if(data.gorge == 2){
            setClickTwo(2);
        }
        if(data.gorge == 3 || data.gorge == 4){
            setClickTwo(2);
            setClickThree(3)
        }
    
    }, [data]);

    const Url = (e) => {
        navigate(e);
    }
    
    return (
        <section className='test-section'>
            <div className='container flex a-center'>
                <header className='flex center'>
                    <Link className='left' to="/main">
                        <FaArrowAltCircleLeft className="icons youtube"/>
                    </Link>
                    Testlar
                </header>
                <div className='card-box flex center'>
                    <div className='test-card one'>
                        <div className='card-img-box border'>
                            <img src={one}/>
                        </div>
                        <div className='card-title'>
                            <p>A card</p>
                            <button onClick={() => Url("/tests/1")} className='btn-send box-shadow'>Start</button>
                        </div>
                    </div>
                    <div className='test-card two'>
                        <div className='card-img-box border'>
                            <img src={two}/>
                        </div>
                        <div className='card-title'>
                            <p>B card</p>
                            <button onClick={() => Url("/tests/2")} disabled={!clickTwo} className='btn-send box-shadow'>
                                {
                                    clickTwo===null?(
                                        <FaLock className='icon'/>
                                    ):(
                                        <></>
                                    )
                                }
                                Start
                            </button>
                        </div>
                    </div>
                    <div className='test-card three'>
                        <div className='card-img-box border'>
                            <img src={three}/>
                        </div>
                        <div className='card-title'>
                            <p>C card</p>
                            <button onClick={() => Url("/tests/3")} disabled={!clickThree} className='btn-send box-shadow'>
                                {
                                    clickThree===null?(
                                        <FaLock className='icon'/>
                                    ):(
                                        <></>
                                    )
                                }
                                Start
                            </button>
                        </div>
                    </div>
                </div>
                <Nav />
            </div>
        </section>
    );
};

Tests.propTypes = {};

export default Tests;