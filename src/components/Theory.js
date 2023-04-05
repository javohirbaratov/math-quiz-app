import React from 'react';
import Nav from './elements/Nav.js';
import { Link } from 'react-router-dom';
import { FaArrowAltCircleLeft } from 'react-icons/fa';

const Theory = () => {
    return (
        <section className='theory-section section'>
            <div className='container flex center'>
                <header className='flex header-back'>
                    <Link className='left' to="/card">
                        <FaArrowAltCircleLeft className="icons youtube"/>
                    </Link>
                    Nazariy ma'lumotlar 
                </header>
                <div className='theory-content flex center'>
                    <h1>Nazariy ma'lumotlar</h1>
                    <div className='flex table'>
                         <Link className='box-shadow border'>
                            <div>
                                1 - nazariya
                            </div>
                         </Link>
                         <Link className='box-shadow'>
                            <div>
                                2 - nazariya
                            </div>
                         </Link>
                         <Link className='box-shadow'>
                            <div>
                                3 - nazariya
                            </div>
                         </Link>
                         <Link className='box-shadow'>
                            <div>
                                4 - nazariya
                            </div>
                         </Link>
                         <Link className='box-shadow'>
                            <div>
                                5 - nazariya
                            </div>
                         </Link>

                    </div>
                </div>
                <Nav />
            </div>
        </section>
    );
};


export default Theory;