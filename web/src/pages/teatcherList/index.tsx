import React, { useState, FormEvent } from 'react';
import {Link} from 'react-router-dom';
import backIncon from '../../assets/images/icons/back.svg';
import logoImage from '../../assets/images/logo.svg';
import PageHeader from '../../components/pageHeader';
import './styles.css';
import TeacherItem, { TeacherItens } from '../../components/TeacherItem';
import Input from '../../components/input';
import Select from '../../components/select';
import api from '../../services/api';

function TeacherList () {
    const [subject, setSbuject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');
    const [Teachers, setTeachers] = useState([]);
    async function searchTeachers(e:FormEvent) {
        e.preventDefault();
        const response = await api.get('classes', {
            params: {
            subject,
            week_day,
            time,
            }
        })
        console.log(response.data);
        setTeachers(response.data);
        
    }
    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os Proffys Disponiveis">
                <form action="" onSubmit={searchTeachers} id="search-teachers">
                    <Select 
                    value={subject}
                    onChange={(e) => {setSbuject(e.target.value)}}
                    name="subject" 
                    label="Matéria"
                    options={[
                        {value: 'Artes', label: 'Artes'},
                        {value: 'Biologia', label: 'Biologia'},
                        {value: 'LOL', label: 'LoL'},
                        {value: 'Educação fisica', label: 'Educação fisica'}
                    ]}
                    />
                    <Select
                    value={week_day}
                    onChange={(e) => {setWeekDay(e.target.value)}}
                    name="week_day" 
                    label="Dia da semana"
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
                    <Input type="time" name="time" label="Hora"
                    value={time}
                    onChange={(e) => {
                    setTime(e.target.value)}}
                    />
                    <button type="submit">Buscar</button>
                </form>
            </PageHeader>
            <main>
                {Teachers.map((teacher:TeacherItens) => {
                    return <TeacherItem key={teacher.id} teacherProps={teacher}/>;
                })}
            </main>
        </div>
    )
}

export default TeacherList;