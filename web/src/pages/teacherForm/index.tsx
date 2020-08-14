import React, {useState, FormEvent} from 'react';
import PageHeader from '../../components/pageHeader';
import './styles.css';
import {useHistory} from 'react-router-dom';
import Input from '../../components/input';
import warningIcon from "../../assets/images/icons/warning.svg";
import Select from '../../components/select';
import Textarea from '../../components/Textarea';
import api from '../../services/api';
function TeacherForm () {
    const history = useHistory(); 
    const[name, setName] = useState('');
    const[avatar, setAvatar] = useState('');
    const[whatsApp, setWhatsapp] = useState('');
    const[bio, setBio] = useState('');
    const [subject, setSubject] = useState('');
    const [cost, setcost] = useState('');
     const [scheduleItems, setScheduleItems] = useState([
        {week_day:0, from:'', to: ''}

    ])
    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            {week_day:0, from:'', to: ''}
        ]);
    }

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();
        api.post('classes',  {
            name,
            avatar,
            whatsapp: whatsApp,
            bio,
            subject,
            cost: Number(cost),
            schedule:scheduleItems

        }).then(() => {
            alert('cadastro feito com sucesso')
            history.push('/')
        }).catch(() => {
            alert('erro no cadastro')
        })
            console.log({
                name,
                avatar,
                whatsApp,
                bio,
                subject,
                cost,
                scheduleItems,
            })
    }
    function setScheduleitemValue(position:number, field: string, value:string){
        const updateScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if(index === position){
                return {...scheduleItem, [field]: value};
            }
            return scheduleItem;
        })
        setScheduleItems(updateScheduleItems)
    }
    return (
        <div id="page-teacher-form" className="container">
        <PageHeader title="Incrivel que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição"
        />
        <main>
            <form onSubmit={handleCreateClass}>
            <fieldset>
                <legend>Seus dados</legend>
                <Input name="name" label="Nome compelto" 
                value={name} 
                onChange={(e) => {setName(e.target.value) }}
                />
                <Input name="avatar" label="Avatar"
                value={avatar} 
                onChange={(e) => {setAvatar(e.target.value) }}
                />
                <Input name="Whatsapp" label="WhatsApp" 
                value={whatsApp} 
                onChange={(e) => {setWhatsapp(e.target.value) }}
                />
                <Textarea name="bio" label="biografia"
                value={bio}
                onChange={(e) => {setBio(e.target.value) }}
                />

            </fieldset>
            <fieldset>
                <legend>Sobre a aula</legend>
                <Select 
                name="subject" 
                label="Materia"
                value={subject}
                onChange={(e) => {setSubject(e.target.value)}}
                options={[
                    {value: 'Artes', label: 'Artes'},
                    {value: 'Biologia', label: 'Biologia'},
                    {value: 'LOL', label: 'LoL'},
                    {value: 'Educação fisica', label: 'Educação fisica'}
                ]}
                />
                <Input name="cost" label="Custo por hora"
                value={cost}
                onChange={(e) => {setcost(e.target.value)}}/>
            </fieldset>
            <fieldset>
                <legend>
                Horários disponiveis
                    <button type="button"  onClick={addNewScheduleItem}>
                        + Novo horário
                    </button>
                </legend>
                {scheduleItems.map((scheduleItems, index) => {
                    return (
                    <div key={scheduleItems.week_day} className="schedule-item">
                        <Select
                        name="week_day" 
                        label="Dia da semana"
                        value={scheduleItems.week_day}
                        onChange={e => setScheduleitemValue(index, 'week_day', e.target.value)}
                        options={[
                            {value: '0', label: 'Domingo'},
                            {value: '1', label: 'Segunda-Feira'},
                            {value: '2', label: 'Terça-Feira'},
                            {value: '3', label: 'Quarta-Feira'},
                            {value: '4', label: 'Quinta-Feira'},
                            {value: '5', label: 'Sexta-Feira'},
                            {value: '6', label: 'Sábado'}
                            
                        ]}
                        />
                        <Input name="from" label="Das" type="time"
                        value={scheduleItems.from}
                        onChange={e => setScheduleitemValue(index, 'from', e.target.value)}
                        />
                        <Input name="to" label="Até" type="time"
                        value={scheduleItems.to}
                        onChange={e => setScheduleitemValue(index, 'to', e.target.value)}
                        />
                    </div>
                    )
                })}
            </fieldset>
            <footer>
                <p>
                    <img src={warningIcon} alt="Aviso importante"/>
                    importante!
                    Preencha todos os dados
                </p>
                <button type="submit">
                    Cadastrar os dados
                </button>
            </footer>
            </form>
        </main>
        </div>
    )
}
export default TeacherForm;