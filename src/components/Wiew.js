import { FaArrowAltCircleLeft } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import Nav from "./elements/Nav";

const WiewPdf = () => {
    // useEffect(() => {
        const parm = useParams();
        const url = parm.file;
        console.log(url);
        var arr = [];
            if(url === "maruza"){
                for(var i=0; i<3;i++){
                    arr.push(i+1);
                }
            }
            if(url==="namuna"){
                for(var j=0; j<12;j++){
                    arr.push(j+1);
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
                        <img alt='' key={p} className="pdf-view" src={require("./"+url+"/" + p +".jpg")}/>
                    )}
                </>
            }
            <h1>
                
            </h1>
            <Nav/>
        </div>
    );
}

export default WiewPdf;

