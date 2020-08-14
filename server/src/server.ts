import express from 'express';
import routers from './routers';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());
app.use(routers);

app.listen(3333);
