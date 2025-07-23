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

    const {http,getToken,navigate} = AuthUser();
    const [data, setData] = useState([]);
    const [clickTwo, setClickTwo] = useState(null);
    const [clickThree, setClickThree] = useState(null);
    const [clickFo, setClickFo] = useState(null);
    const [clickFive, setClickFive] = useState(null);
    const [clickSix, setClickSix] = useState(null);
    const [clickSeven, setClickSeven] = useState(null);
    
    useEffect(() => {
        http.post('/getUser.php',{token:getToken()}).then((res)=>{
            setData(res.data.token);
            console.log(res.data.token);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    useEffect(() => {
        
        if(parseInt(data.gorge) === 2){
            setClickTwo(2);
        }
        
        if(parseInt(data.gorge) === 3){
            setClickTwo(2);
            setClickThree(3)
        }
        if(parseInt(data.gorge) === 4){
            setClickTwo(2);
            setClickThree(3);
            setClickFo(4);
        }
        if(parseInt(data.gorge) === 5){
            setClickTwo(2);
            setClickThree(3);
            setClickFo(4);
            setClickFive(5);
        }
        if(parseInt(data.gorge) === 6){
            setClickTwo(2);
            setClickThree(3);
            setClickFo(4);
            setClickFive(5);
            setClickSix(6);
        }
        if(parseInt(data.gorge) === 7 || parseInt(data.gorge) === 8){
            setClickTwo(2);
            setClickThree(3);
            setClickFo(4);
            setClickFive(5);
            setClickSix(6);
            setClickSeven(7);
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
                            <img alt='' src={one}/>
                        </div>
                        <div className='card-title'>
                            <p>L - 3 card</p>
                            <button onClick={() => Url("/tests/1")} className='btn-send box-shadow'>Start</button>
                        </div>
                    </div>
                    <div className='test-card two'>
                        <div className='card-img-box border'>
                            <img alt='' src={two}/>
                        </div>
                        <div className='card-title'>
                            <p>L - 2 card</p>
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
                            <img alt='' src={three}/>
                        </div>
                        <div className='card-title'>
                            <p>L - 1 card</p>
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
                    <div className='test-card one'>
                        <div className='card-img-box border'>
                            <img alt='' src={one}/>
                        </div>
                        <div className='card-title'>
                            <p>L card</p>
                            <button onClick={() => Url("/tests/4")} disabled={!clickFo} className='btn-send box-shadow'>
                                {
                                    clickFo===null?(
                                        <FaLock className='icon'/>
                                    ):(
                                        <></>
                                    )
                                }
                                Start
                            </button>
                        </div>
                    </div>
                    <div className='test-card two'>
                        <div className='card-img-box border'>
                            <img alt='' src={two}/>
                        </div>
                        <div className='card-title'>
                            <p>L + 1 card</p>
                            <button onClick={() => Url("/tests/5")} disabled={!clickFive} className='btn-send box-shadow'>
                                {
                                    clickFive===null?(
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
                            <img alt='' src={three}/>
                        </div>
                        <div className='card-title'>
                            <p>L + 2 card</p>
                            <button onClick={() => Url("/tests/6")} disabled={!clickSix} className='btn-send box-shadow'>
                                {
                                    clickSix===null?(
                                        <FaLock className='icon'/>
                                    ):(
                                        <></>
                                    )
                                }
                                Start
                            </button>
                        </div>
                    </div>
                    <div className='test-card one'>
                        <div className='card-img-box border'>
                            <img alt='' src={one}/>
                        </div>
                        <div className='card-title'>
                            <p>L + 3 card</p>
                            <button onClick={() => Url("/tests/7")} disabled={!clickSeven} className='btn-send box-shadow'>
                                {
                                    clickSeven===null?(
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