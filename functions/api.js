import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';


const app = express();
const router =  express.Router()
app.use(cors());
// const port = 3001;

app.use(express.json());

router.get('/', (req, res) => {
    console.log(req.data);
    
    res.send('Hello, World!');
});

router.post('/webhook/url', (req, res) => {
    console.log(req.data);

    res.send(200);
});


app.use("/.netlify/functions/api", router);
// eslint-disable-next-line no-undef
module.exports.handler = serverless(app);












