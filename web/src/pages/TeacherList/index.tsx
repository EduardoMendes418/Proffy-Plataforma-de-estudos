import React, { FormEvent, useState } from 'react';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';

import './styles.css';

function TeacherList() {
        //BUSCAR OS PROFESSORES    
        const [teachers, setTeachers] = useState([]);

        const [subject, setSubject] = useState('');
        const [week_day, setWeek_day] = useState('');
        const [time, setTime] = useState('');

        //DISPARA SUBMIT NO FORMULARIO
       async function searchTeachers(e: FormEvent){
            e.preventDefault();
            
            //API BUSCANDO LISTA USUARIOS
           const response = await api.get('classes', {
                params:{
                    subject,
                    week_day,
                    time,
                }
            });
            setTeachers(response.data);
        }

        return (
            <div id="page-teacher-list" className="container">
                <PageHeader title="Estes são os Proffy disponíveis" >
                    <form action="" id="search-teachers" onSubmit={searchTeachers}>
                        <Select 
                        name="subject" 
                        label="Materia" 
                        value={subject}
                        onChange={(e) =>{setSubject(e.target.value)}}
                        options={[
                            {value:'Artes', label: 'Artes'},
                            {value:'Portugues', label: 'Portugues'},
                            {value:'Biologia', label: 'Biologia'},
                            {value:'Ciencias', label: 'Ciencias'},
                            {value:'Educacao Fisica', label: 'Educacao Fisica'},
                            {value:'Historia', label: 'Historia'},
                            {value:'Matematica', label: 'Matematica'},
                            {value:'Fisica', label: 'Fisica'},
                        ]}
                         />     
                         <Select 
                        name="week_day" 
                        label="Dia da semana" 
                        value={week_day}
                        onChange={(e) =>{setWeek_day(e.target.value)}}
                        options={[
                            {value:'0', label: 'Domingo'},
                            {value:'1', label: 'Segunda-feira'},
                            {value:'2', label: 'Terça-feira'},
                            {value:'3', label: 'Quarta-feira'},
                            {value:'4', label: 'Quinta-Feira'},
                            {value:'5', label: 'Sexta-Feira'},
                            {value:'6', label: 'Sabado'},
                        
                        ]}
                         />  

                        <Input 
                            type="time" 
                            name="time" 
                            label="Hora" 
                            value={time}
                            onChange={(e) =>{setTime(e.target.value)}}
                        />

                        <button type="submit">
                            Buscar
                        </button>
                    </form>

                </PageHeader>
                
                {/* LISTA */}                        
                <main>
                    {teachers.map((teacher: Teacher) =>  {
                        return <TeacherItem key={teacher.id} teacher={teacher} />;
                    })}
                </main>
            </div>

        )
    
}

export default TeacherList;
