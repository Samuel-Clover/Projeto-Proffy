import React from "react";
import WhatsappIcon from '../../assets/images/icons/whatsapp.svg';
import './styles.css';
import api from "../../services/api";
export interface TeacherItens{
    id: number,
    avatar:string,
    bio:string,
    cost: number,
    name:string,
    subject:string,
    whatsapp:string,
     
}
interface TeacherItemProps {
   teacherProps:TeacherItens
}
const TeacherItem:React.FC<TeacherItemProps> = ({teacherProps}) =>{
    function createNewConnection() {
        api.post('connections', {
            user_id: teacherProps.id,
        })
    }
    return( 
        <article className="teacher-item">
                <header>
                 <img src={teacherProps.avatar}/>
                    <div>
                        <strong>{teacherProps.name}</strong>
                        <span>{teacherProps.subject}</span>
                    </div>
                    </header>
                <p>
                    {teacherProps.bio}
                </p>
                <footer>
                    <p>
                     Preço/Hora 
                        <strong>R${teacherProps.cost}</strong>
                    </p>
                    <a
                    target="_black" 
                    onClick={createNewConnection} href={`https://wa.me/${teacherProps.whatsapp}`}>
                        <img src={WhatsappIcon} alt="Whatsapp"/>
                            Entrar em contato
                    </a>
                </footer>
        </article>
    )
}

export default TeacherItem;