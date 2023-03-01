

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
    }

    if(file){
      messageObject.file=file;
      messageObject.type="file";
      messageObject.mimiType=file.type;
      messageObject.nameFile=nameFile;
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

    const recibirMensaje=(mensaje)=>{
      setmensajes([...mensajes,{ //copia todo lo que tenga mensajes y añadele un nuevo objeto
        from: mensaje.from,
        body: mensaje.body,
        file: mensaje.file,
        type: mensaje.type,
        mimiType: mensaje.mimiType,
        nameFile: mensaje.nameFile,
      }]); 
      //facilmente se podria poner solo: " setmensajes([...mensajes,mensaje])
    };
    socket.on('mensaje',recibirMensaje);
    return()=>{ //para suscribir, es importante para volver a crear el componente
      socket.off('mensaje',recibirMensaje);
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
