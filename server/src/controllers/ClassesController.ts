import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';
import { Request, Response} from 'express';

interface scheduleItem {
    week_day:number;
    from: string;
    to: string;
}

export default class  ClassesController {
    //LISTA DAS AULAS
    async index(request: Request, response: Response){
        //filtro
        const filters = request.query;

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;


        if (!filters.week_day || !filters.subject || !filters.time) {
            return response.status(400).json({
                error: 'Missing filters to search classes'
            });
        }

        //CONVERTESR EM MINUTOS 
        const timeInMinutes = convertHourToMinutes(time);

        //VERIFICANDO SE MATERIA BATE
        const classes = await db('classes')

            //RELACIONAMENTOS NA TABELA SCHEDULE
            .whereExists(function(){    
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`') //informacoes da pessoa
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)]) //dia que agendou 
                    .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes]) //espero que  Eduardo  antes ou igual horario falado exemplo 9:00
                    .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes]) //apos depois do horario marcado nao pode mais agendar aula
            })

            //buscado usuario junto com materia
            .where('classes.subject', '=', subject) //materia
            .join('users', 'classes.user_id', '=', 'users.id') //usuario
            .select(['classes.*', 'users.*']); //buscando duas tabelas usuario e materia    

        return response.json(classes);
    }

    //CADASTRO
    async create(request: Request, response: Response) {
        const {
            name,
            cpf,
            email,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body;
          //ele verifica todos os campos antes de executar
          const trx = await db.transaction();
    
    
        // ********************************** VERIFICA TUDO PARA MIM  ************************
    try {
      
        //********* Campos do Usuario ***********
        const insertedUserids = await trx('users').insert({
            name,
            cpf,
            email,
            avatar,
            whatsapp,
            bio,
        });
        const user_id = insertedUserids[0]; //somente primeiro id inserido
    
    
        //********* Campos Classes *************
        const insertedClassesIds = await trx('classes').insert({
            subject,
            cost,
            user_id,
        });
        const class_id = insertedClassesIds[0]; //somente classes id inserido
    
    
        //************ Conversao de  Horarios das Aulas *************** */
        const classSchedule =  schedule.map((scheduleItem: scheduleItem) =>{
            return {
                class_id,
                week_day: scheduleItem.week_day,
                from: convertHourToMinutes(scheduleItem.from),
                to: convertHourToMinutes(scheduleItem.to),
            };
        })
    
        // vai adicionar na tabela 
        await trx('class_schedule').insert(classSchedule);
        
        //somente nesse momento ele executar para db
        await trx.commit();
    
        //Enviado com sucesso
        return response.status(201).send();
        
         // ******************** SE DER ERRO  *******************
    } catch (err) {
        //zera qualquer alteracao no db
        await trx.rollback();   
    
            return response.status(400).json({
                error: ' Errou '
            })
        }
    }
}