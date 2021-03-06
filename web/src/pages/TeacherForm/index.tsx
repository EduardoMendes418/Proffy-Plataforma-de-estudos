import React, {FormEvent, useState} from 'react';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import Textarea from '../../components/PageArea';
import Select from '../../components/Select';
import  { useHistory } from 'react-router-dom';

import warningIcon from '../../assets/images/icons/warning.svg';
import api from '../../services/api';

import './styles.css';


function TeacherForm() {
        //direcionar 
        const history = useHistory();

        //FORMULARIO
        const [name, setName ] = useState('');
        const [cpf, setCpf] = useState('');
        const [email, setEmail] = useState('');
        const [avatar, setAvatar] = useState('');
        const [whatsapp, setWhatsapp] = useState('');
        const [bio, setBio] = useState('');
        const [subject, setSubject] = useState('');
        const [cost, setCost] = useState('');


        // FUNCAO DO BUTTON ADICIONAR
        const [ scheduleItens, setScheduleItens ] = useState ([
            { week_day: 0, from: '', to: ''}
        ]);

        function addNewscheduleItensBtn(){
            setScheduleItens([
                ...scheduleItens,
                { week_day: 0, from: '', to: ''}
            ]);
        }

        //FUNCAO  SEMANA DIA E HORARIOS   
         function setScheduleItemValue (position: number, field: string, value: string){
            const updatedScheduleItens = scheduleItens.map((scheduleItem, index ) => {
                if(index === position){
                    return {...scheduleItem, [field]: value};
                }
                return scheduleItem;

            });

            setScheduleItens(updatedScheduleItens);
        }

        //FUNCAO  FORMULARIO  NA HORA DE ENVIAR INFORMACAO
        function handleCreateClass(e: FormEvent){
            e.preventDefault();

            //API CADASTRAR
            api.post('classes', {
                name,
                cpf: Number(cpf),
                email,
                avatar,
                whatsapp,
                bio,
                subject,
                cost: Number(cost),
                schedule: scheduleItens
            }).then(() => {
                alert('Cadastro realizado com sucesso :)');
                
                //direcionar para pagina home
                history.push('/');
            }).catch(() => {
                alert('Error no cadastro :( ');
            })

        }

        return (
            <div id="page-teacher-form" className="container">
                <PageHeader title="Que incr??vel que voc?? quer dar aulas."
                description="O primeiro passo ??  preencher esse formularios de inscri????o"
    
                />
                <main>
                    <form onSubmit={handleCreateClass}>
                        <fieldset>
                            <legend>Seus Dados</legend>
                            <Input 
                                name="name" 
                                label="Name Completo" 
                                value={name}  
                                onChange={(e) => { setName(e.target.value) }}
                            />
                            <Input 
                                name="cpf" 
                                label="CPF"
                                value={cpf}
                                onChange={(e) => { setCpf(e.target.value) }}
                            />
                            <Input 
                                name="email" 
                                label="E-mail" 
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                            />
                            <Input 
                                name="avatar" 
                                label="Avatar" 
                                value={avatar}
                                onChange={(e) => { setAvatar(e.target.value) }}
                            />
                            <Input 
                                name="whatsapp" 
                                label="Whatsapp"
                                value={whatsapp}
                                onChange={(e) => { setWhatsapp(e.target.value) }}
                            />
                            <Textarea 
                                name="bio" 
                                label="Biografia" 
                                value={bio}
                                onChange={(e) => { setBio(e.target.value) }}
                            />
                        </fieldset>

                        <fieldset>
                            <legend>Sobre a aula</legend>
                            <Select 
                            name="subject" 
                            label="Materia" 
                            value={subject}
                            onChange={(e) => { setSubject(e.target.value) }}
                            options={[
                                {value:'Artes', label: 'Artes'},
                                {value:'Portugu??s', label: 'Portugu??s'},
                                {value:'Biologia', label: 'Biologia'},
                                {value:'Ci??ncias', label: 'Ci??ncias'},
                                {value:'Educa????o Fisica', label: 'Educa????o Fisica'},
                                {value:'Historia', label: 'Historia'},
                                {value:'Matermatica', label: 'Matermatica'},
                                {value:'Fisica', label: 'Fisica'},
                                {value:'Geografia', label: 'Geografia'},
                            ]}
                            
                            />
                            <Input 
                                name="cost" 
                                label="Custo da sua hora por aula" 
                                value={cost}
                                onChange={(e) => { setCost(e.target.value) }}
                            />

                        </fieldset>

                        <fieldset>  
                            <legend>
                                Hor??rio disponiveis
                                <button type="button" onClick={ addNewscheduleItensBtn}>
                                    + Novo horario 
                                </button>
                            </legend>

                        {scheduleItens.map((scheduleItem, index)=>{
                            return (
                                <div key={scheduleItem.week_day} className="schedule-item">
                                <Select 
                                name="week_day" 
                                label="Dia da semana" 
                                value={scheduleItem.week_day}
                                onChange={e => setScheduleItemValue(index,'week_day', e.target.value)}
                                options={[
                                    {value:'0', label: 'Domingo'},
                                    {value:'1', label: 'Segunda-feira'},
                                    {value:'2', label: 'Ter??a-feira'},
                                    {value:'3', label: 'Quarta-feira'},
                                    {value:'4', label: 'Quinta-Feira'},
                                    {value:'5', label: 'Sexta-Feira'},
                                    {value:'6', label: 'Sabado'},
                                
                                    ]}
                                    />

                                    <Input 
                                        name="from" 
                                        label="Das" 
                                        type="time" 
                                        value={scheduleItem.from}
                                        onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                                    />
                                    
                                    <Input 
                                        name="to" 
                                        label="At??" 
                                        type="time" 
                                        value={scheduleItem.to}
                                        onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                                    />
                                </div>
                            );
                        })}

                        </fieldset>   

                        <footer>
                            <p>
                                <img src={warningIcon} alt="Aviso importante" />  
                                Importante! <br/>  
                                Preencha todos os dados
                            </p>
                            <button type="submit">
                                Salvar Cadastro
                            </button>
                        </footer>
                    </form>
                </main>
            </div>
        )
    
}

export default TeacherForm;
