import React,{useEffect} from 'react';
import { Link } from "react-router-dom";
import begin from '../img/start.png';
const Start = () => {
    useEffect(() => {
        sessionStorage.clear();
    }, []);
    return (
        <div className='container flex center border'>
            <div className='start box'>
                <div className='img_box'>
                    <img alt='' src={begin}/>
                </div>
                <div className='content flex'>
                    <p>Biz bilan bilimingni <span>mustahkamla</span></p>
                    <div className='button_box flex'>
                    <Link to="/login">
                        <button className='btn sig_in'>Kirish</button>
                    </Link>
                    <Link to="/registr">
                        <button className='btn sig_up'>Ro'yhatdan o'tish</button>
                    </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Start;