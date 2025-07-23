import { Link } from 'react-router-dom';
import test from "../img/2.png";
import mult from "../img/3.png";
import mat from "../img/Matematika.png";
import back from "../img/back.png";
import naz from "../img/nazariya.png";
import Nav from './elements/Nav';

const Main = () => {

    return (
        <section className='main-section'>
            <div className='container flex a-center'>
                <header className='flex center'>O'ZLASHTIRISH DARAJASINI ANIQLOVCHI TEST</header>
                <div className='main-content'>
                    <h1>Asosiy</h1>
                    <div className='slider box-shadow flex center'>
                        <img alt='' src={mat}></img>
                    </div>
                    <div className='menus'>
                        <h1>Menular</h1>
                        <div className='menu flex'>
                            <div className='menu-item'>
                                <div>
                                    <Link to="/card">
                                        <div className='card one flex border'>
                                            <div className='img-box'>
                                                <img alt='' src={test}/>
                                            </div>
                                            <div className='tex-box'>
                                                <p>Testlar</p>
                                            </div>
                                        </div>
                                    </Link>
                                    <Link to={"/view/namuna"}>
                                        <div className='card two'>
                                            <div className='img-box'>
                                                <img alt='' src={back}/>
                                            </div>
                                            <div className='tex-box'>
                                                <p>Namunalar</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className='menu-item'>
                                <Link to={"/view/maruza"}>
                                    <div className='card two'>
                                        <div className='img-box'>
                                            <img alt='' src={naz}/>
                                        </div>
                                        <div className='tex-box'>
                                            <p>Nazariy ma'lumotlar</p>
                                        </div>
                                    </div>
                                </Link>
                                <div>
                                    <Link to={"/media"}>
                                        <div className='card one'>
                                            <div className='img-box'>
                                                <img alt='' src={mult}/>
                                            </div>
                                            <div className='tex-box'>
                                                <p>Multemedia</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Nav active ="1"/>
            </div>
        </section>
    );
};


export default Main;