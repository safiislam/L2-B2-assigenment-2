import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRouters } from './app/config/modules/User/user.router';
const app: Application = express()


app.use(express.json())
app.use(express.text())
app.use(cors())
// application routes 
app.use('/api/users', UserRouters)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

export default app