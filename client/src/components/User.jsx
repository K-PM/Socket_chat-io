import '../assets/styles/chatGrupal.css'
import '../assets/styles/general.css'
import {useNavigate} from "react-router-dom"
import io from 'socket.io-client';
import {useState,useEffect,useContext} from 'react';
import {UserContext} from '../context/UserContext';

const socket =io('http://localhost:4000') //direccion del servidor puerto (la respuesta es un socket)


function User() {

  const navigate= useNavigate();
  const [conectados, setConectados]=useState([]);
  const [select, setSelect]=useState('');

  const handleClick=(e)=>{
    e.preventDefault();
   console.log('valor: ', select);
   socket.emit('pareja',select);
   setTimeout(()=>{navigate("/Individual")},200)

  }

  useEffect(()=>{
    const recibirUser=(disponibles)=>{
      setConectados([...conectados,disponibles]);
    }
    socket.on('lista',recibirUser); 
    return()=>{
      socket.off('lista',recibirUser); 
    }
  },[conectados]);



  return (  
    <div>  
      <h2>SELECCIONE CON QUIEN QUIERE HABLAR</h2>
     {conectados.map((disponibles,index)=>{
        return(<p key={index}>
          <select value={select} onChange={e=>setSelect(e.target.value) }>{disponibles.map((uno,indes)=>{
            return(
              <option value={uno.user} key={indes}>{uno.user} </option>
            );
          })}</select>
        </p>
     );
      })}
        <button className='botonGrupal'onClick={handleClick}>Quiero hablar con: {select}</button>
    </div>    
  );
}
export default User;