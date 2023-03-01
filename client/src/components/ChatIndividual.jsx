

import '../assets/styles/chatGrupal.css'
import io from 'socket.io-client';
import {useState,useEffect,useContext} from 'react';
import {UserContext} from '../context/UserContext';
import RenderImage from './RenderImage';


const socket =io('http://localhost:4000') //direccion del servidor puerto (la respuesta es un socket)

function ChatGrupal() {

  const { user} = useContext(UserContext)
  const [mensaje, setmensaje]=useState('');
  const [mensajes, setmensajes]=useState([]);
  const [file, setFile]=useState();
  const [pareja, setPareja]=useState();
  const [nameFile, setNameFile]=useState("");
 

  const handleSubmit=(e)=>{
    e.preventDefault();
    const messageObject={
      from: user,
      body: mensaje,
      file: null,
      type:"text",
      mimiType: null,
      nameFile: "",
      otro:pareja
    }

    if(file){
      messageObject.file=file;
      messageObject.type="file";
      messageObject.mimiType=file.type;
      messageObject.nameFile=nameFile;
      messageObject.otro=pareja
      socket.emit('mensaje',messageObject);//enviar el mensaje al servidor
      setmensajes([...mensajes,messageObject])//mensaje para mi, es importante el orden de newMensaje, ...mensajes
      setmensaje('');
      
      
    }else{
      if(mensaje!==''){
        socket.emit('mensaje',messageObject);//enviar el mensaje al servidor
        setmensajes([...mensajes,messageObject])//mensaje para mi, es importante el orden de newMensaje, ...mensajes
        setmensaje('');
      }
    }

    setmensaje("");
    setFile(undefined);
    setNameFile("");

  }

  const handleFile=(e)=>{
    setNameFile(e.target.files[0].name)
    setFile(e.target.files[0])
  }

  useEffect(()=>{
    const recibirPareja=(op)=>{
      setPareja(op);
      console.log('mi pareja es: ',op.toString())
    }
    socket.on('parejaUnica',recibirPareja);
    return()=>{ //para suscribir, es importante para volver a crear el componente
      socket.off('parejaUnica',recibirPareja);
    } 
  },[pareja])

  
  useEffect(()=>{

    const recibirMensaje=(mensaje)=>{
      setmensajes([...mensajes,mensaje]); 
      //facilmente se podria poner solo: " setmensajes([...mensajes,mensaje])
    };
    socket.on('menIn',recibirMensaje);
    return()=>{ //para suscribir, es importante para volver a crear el componente
      socket.off('menIn',recibirMensaje);
    } 
  },[mensajes])


  return (


    <div className="todo">
       <div>BIENVENIDO {user}</div>
     <div className='mensajesRecibir'>
      {mensajes.map((mensaje,index)=>{
        if(mensaje.type==="file"){
          const blob= new Blob([mensaje.file], {type: mensaje.file });

          return(
            <div className='mensajes' key={index}>{/*por cada mensaje, va creando un div */}
            <RenderImage fileName={mensaje.nameFile} blob={blob}/>
              <p>{mensaje.from}: {mensaje.body}</p>
            </div>
          )
        }
        return(
          <div className='mensajes' key={index}>{/*por cada mensaje, va creando un div */}
            <p>{mensaje.from}: {mensaje.body}</p>
          </div>
        )

      })}
      </div>

      <form className='form' onSubmit={handleSubmit}>
        <input className='inputGrupal' type="text" onChange={e=>setmensaje(e.target.value) } value={mensaje /*para que el input quede sin nada*/}/>   {/* para ver en consola e=>console.log(e.target.value)*/}
        <input className='inputGrupal' type="file" onChange={handleFile}/>   {/* para ver en consola e=>console.log(e.target.value)*/}
        <button className='botonGrupal'>enviar</button>
      </form>


    </div>
  );
}

export default ChatGrupal;
