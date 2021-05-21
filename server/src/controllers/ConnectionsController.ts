import { Request, Response, response } from 'express';
import db from '../database/connection';

export default class ConnectionsController{

    //listar conexao de usuarios
    async index(request: Request, response: Response){
        const totalConnections = await db('connections').count('* as total');

        const {total} = totalConnections[0]; //buscar sempre primeira posicao

        return response.json({ total });
    }

    //criar conexao Usuario
    async create(request: Request, response: Response){
        const { user_id } = request.body;

        await db('connections').insert({
            user_id,
        });

        //agluma coias criada 
        return response.status(201).send();

    }

}