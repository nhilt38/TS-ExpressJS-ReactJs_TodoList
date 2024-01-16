import express, {Express} from 'express';
import dotenv from 'dotenv';
import router from './routes/todo.route'
import cors from 'cors'

dotenv.config()

const app:Express = express();
const port = 8080

app.use(cors())
app.use(express.json())
app.use('/api/v1', router)

app.listen(port, () => {
    console.log('Express listening on port ' + port);
})
