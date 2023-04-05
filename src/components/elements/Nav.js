import React,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthUser from './AuthUser';

const Nav = (props) => {
    const {logOut} = AuthUser();
    const navigate = useNavigate();
    
    const [menu, setMenu] = useState([
        {name : "Chiqish", url : ""},
        {name : "Asosiy", url : "/main"},
        {name : "Sozlamalar", url : "/settings"}
    ]);
    const [active, setActive] = useState(1);

    const activ = (e) => {
        switch (e) {
            case 0:
                logOut();
                break;
            case 1:
                navigate("/main");
                break;
            case 2:
                navigate("/settings");
                break;
            default:
                break;
            }
        
    }

    return (
        <nav className='navbar border'>
            <ul>
                {
                    menu.map((menu, i)=> (
                        <li key={i} onClick={() => activ(i)}>
                            <Link className={` ${props.active==i? "active" : ""}`}>
                                {menu.name}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </nav>
    );
};

export default Nav;