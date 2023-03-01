import IChat from '../assets/images/heChat.png'
import '../assets/styles/header.css'

function Header() {
    return (  
        <div>
            <div className='parteazul'> 
                <h2 className='titulo'>Kr_PM</h2>
                <img className='IChat' src={IChat} />  
            </div>
        </div>
    );
}

export default Header;