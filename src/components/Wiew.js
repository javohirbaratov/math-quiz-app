import React,{useEffect} from "react";
import { useParams,Link} from 'react-router-dom';
import Nav from "./elements/Nav";
import { FaArrowAltCircleLeft } from 'react-icons/fa';

const WiewPdf = () => {
    // useEffect(() => {
        const parm = useParams();
        const url = parm.file;
        console.log(url);
        var arr = [];
            if(url == "maruza"){
                for(var i=0; i<3;i++){
                    arr.push(i+1);
                }
            }
            if(url=="namuna"){
                for(var i=0; i<12;i++){
                    arr.push(i+1);
                }
            }
        
    // }, []);
    return (
        <div className="container border flex a-center wiew">
            <header className='flex center'>
                <Link className='left' to="/main">
                    <FaArrowAltCircleLeft className="icons youtube"/>
                </Link>
                Ma'lumotlar 
            </header>
            
            {
                <>
                    {arr.map((p)=>
                        <img key={p} className="pdf-view" src={require("./"+url+"/" + p +".jpg")}/>
                    )}
                </>
            }
            <h1></h1>
            <Nav/>
        </div>
    );
}

export default WiewPdf;

