import express from "express";
import morgan from "morgan";
import {Server as SocketServer} from 'socket.io'; //{Server as SocketServer}, 'Server' es el modulo a importar, el  'as' es para un nuevo nombriamiento 
import http from 'http'; 
import cors from 'cors';
import { PORT } from "./config.js"; //me trae "la variable"



const app= express();//servidor http de express, no es compatible con el socket.io
const server = http.createServer(app);// convierte el app de expres en un nuevo objeto de servidor
const io = new SocketServer(server,{cors:{origin:'http://localhost:3000', }/*origin:'*' para que cualquier servidor se conecte*/});//recibe un servidor http
app.use(cors())//cualquier usuario externo a localhost 3000 podra conectarse
app.use(morgan('dev'));

const IPS =[];
var id_socket='';
let nombre=''

io.on('connection',(socket)=>{
    id_socket=socket.id;   
    
    socket.on('user', function(user){
        IPS.push({id_socket,user})
        console.log("user:",user,'Entrando: ',IPS)
    });
    socket.emit('lista',IPS);

    socket.on('pareja',function(pareja){
        nombre=pareja
        console.log('HAN SELECCIONADO nombre',nombre)
    })
    
    socket.emit('parejaUnica',nombre)


    socket.on('mensaje', function(data){
        console.log("1user:",data.from,'mensaje: ',data.body);
        socket.broadcast.emit('mensaje',{
            body:data.body,
            from:data.from,
            file:data.file,
            mimiType: data.mimiType,
            nameFile: data.nameFile,
            type: data.type,
        });  
    });


    socket.on('menIn', function(mensa){
        console.log("user individual:",data.from,'mensaje individual: ',data.body);
        const personaBuscada = personas.find(persona => persona.nombre === data.otro);
        console.log('mandae mensaje a: ',personaBuscada)
        if(socket.id!=personaBuscada.id_socket){
            io.to(personaBuscada.id_socket).emit('menIn',{
                body:mensa.body,
                from:mensa.from,
                file:mensa.file,
                mimiType: mensa.mimiType,
                nameFile: mensa.nameFile,
                type: mensa.type,
                otro:mensa.otro
        });  }else{
            console.log('LO SIENTO NO PUDE')
        }
    });
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
            console.log(id_socket)
            // const index = IPS.indexOf(id_socket);
            //     IPS.splice(index, 1);
      });
})



server.listen (PORT);
console.log('servidor en el puerto ',PORT);

