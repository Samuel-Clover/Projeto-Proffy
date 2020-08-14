import {Request, Response} from 'express'
import db from '../Database/conections';
export default class ConectionsController {
    async index(request: Request, response:Response){
     const totalConections = await db('conection').count('* as total')
     const { total } = totalConections[0]
     return response.json({ total });
    }

    async create(request: Request, response:Response){
        const {user_id} = request.body
        await db('conection').insert({
            user_id,
        })
        return response.status(201).send();
    }
}
