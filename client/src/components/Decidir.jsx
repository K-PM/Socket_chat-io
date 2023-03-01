import '../assets/styles/decidir.css'
import {useState,useEffect} from 'react';

function Decidir() {

    const [user, setUser] = useState([]);
  


    return (  
        <div className='vistaGeneral' >
 
            <ul className='navegar'>
                <li><a href="/Grupo"><p>Grupal</p></a></li>
                <li><a href="/IndividualUser"><p>Individual</p></a></li>
            </ul>
     </div>
         
    );
}

export default Decidir;