
import '../assets/styles/general.css'
import {useContext} from 'react';
import {UserContext} from '../context/UserContext';
import {useNavigate} from "react-router-dom"

import io from 'socket.io-client';
const socket =io('http://localhost:4000')

function VistaGeneral() {
    const navigate= useNavigate();
    const { user,setUser} = useContext(UserContext)

    const handleClick=(e)=>{
        e.preventDefault();
        socket.emit('user',user);
        console.log('hola desde General',user);
        setTimeout(()=>{navigate("/Decidir")},200)
      }

    return (  
        <div className='ingresarNombre' >
            <label>Name:</label>
            <input className='name' type="text" onChange={e=>setUser(e.target.value)}/>  
            <button className='botonGuardar' onClick={handleClick}>Guardar</button>

           
     </div>         
    );
}
export default VistaGeneral;
