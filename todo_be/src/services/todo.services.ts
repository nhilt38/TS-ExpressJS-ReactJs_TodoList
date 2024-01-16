import { Request, Response } from "express"
import ITodo from '../interfaces/todo.interface'
import connection from '../db'
export default class TodoService{


    async getAll(): Promise<ITodo[]> {
        const query: string = "SELECT * FROM items";
        const data:any =  new Promise((resolve, reject) => {
            connection.query( query, (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        })
       return data
    }

    async getOne(id: number): Promise<ITodo[]> {
        const query: string = "SELECT * FROM items where id = ?"
        const data:any =  new Promise((resolve, reject) => {
            connection.query( query, [id], (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        })
       return data
    }

    async post(params: any){
        const { title, completed } = params
        const query: string = "insert into items (title, completed) values(?, ?)"
        const data:any =  new Promise((resolve, reject) => {
            connection.query( query, [title, completed], (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        })
       return data
    }
  
    async put(params: any){
        const { id, completed } = params
        const query: string = "UPDATE items set completed = ? where id=?";
        const data:any =  new Promise((resolve, reject) => {
            connection.query( query, [completed, id], (err, data) => {
                if (err) reject(err);
                resolve({id, completed});
            });
        })
       return data
    }


    async delete(id: number) {
        return new Promise((resolve, reject) => {
             connection.query("delete from items where id = ?", [id], (err, result) => {
                 if (err) reject(err);
                 resolve(result);
             });
         })
     }
}