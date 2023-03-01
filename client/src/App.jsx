
import { BrowserRouter,Route, Routes } from "react-router-dom";
//luego importas los componentes para las rutas
import VistaGeneral from './pages/VistaGeneral'
import Decidir from './pages/VistaDecidir'
import Grupal from './pages/VistaGrupal'
import Individual from './pages/VistaIndividual'
import IndividualUser from './pages/VistaUsuarios'
import { UserDataContext } from "./context/UserContext";

function App() {

  return (
  <BrowserRouter>
   <UserDataContext>
      <Routes>
        <Route path='/' element={ <VistaGeneral/>}/>
        <Route path='/Decidir' element={<Decidir/>}/>  
        <Route path='/Grupo' element={<Grupal/>}/>
        <Route path='/Individual' element={<Individual/>}/>
        <Route path='/IndividualUser' element={<IndividualUser/>}/>
      </Routes>
    </UserDataContext>
  </BrowserRouter>

  );
}

export default App;