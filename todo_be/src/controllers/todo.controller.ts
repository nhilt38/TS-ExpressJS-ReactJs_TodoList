import {Request, Response} from 'express';
import TodoService from '../services/todo.services'


const service = new TodoService()
export default class UserController{
    async getAll(req: Request, res: Response){
        const response = await service.getAll()
        res.send(response)
    };
    async getOne(req: Request, res: Response){
        const { id } = req.params
        const response = await service.getOne(+id)
        if(response.length === 0) {
            res.status(404).send("Not found")
        } else {
            res.send(response[0])
        }
    };
    async post(req: Request, res: Response){
        const response = await service.post(req.body)
        res.send(response)
    };
    async put(req: Request, res: Response){
        const response = await service.put({id: req.params.id, completed: req.body.completed})
        res.send(response)
    };
    async delete(req: Request, res: Response){
        const { id } = req.params
        const response = await service.delete(+id)
        res.send("OK")
    }
}
