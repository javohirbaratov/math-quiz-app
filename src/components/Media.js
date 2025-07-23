import { Link } from 'react-router-dom';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import Nav from './elements/Nav';
const Media = () => {
    return (
        <>
            <section className='test-section'>
                <div className='container flex a-center'>
                    
                    <header className='flex center'>
                        <Link className='left' to="/main">
                            <FaArrowAltCircleLeft className="icons youtube" />
                        </Link>
                        Multemedia
                    </header>
                    <div className='card-box flex center'>
                        <div className='test-card one pad-0 o-hidden flex center'>
                            <iframe width="auto" src="https://www.youtube.com/embed/cAGiRey16dY" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
                        </div>
                        <div className='test-card one pad-0 o-hidden flex center'>
                            <iframe width="auto" src="https://www.youtube.com/embed/A1zQeyS1JQk" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
                        </div>
                    </div>
                    <Nav />
                </div>
            </section>
        </>
    );
};


export default Media;