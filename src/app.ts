import express, {Express, Request, Response, NextFunction} from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
const app : Express = express();

type error_response = {
    status: string;
    error: string;
}

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('tiny'));

app.use((error: any, req: Request, res: Response)=>{
    const errStatus = error.status || 400;
    
    const error_message : error_response = {
        status : "error",
        error: error.message
    };

    res.status(errStatus).json(error_message);
});
  

app.listen(3001, ()=>{
    console.log("Listened on port 3001");
})