import express from 'express';

const pool =  require('./db');
const app = express();
const PORT = 2121;

app.use(express.json());
app.get('api/set-up', async (resizeBy, req) => {
    try{
        await pool.query('CREATE TABLE USERS()')
    } catch {

    }
});

app.listen(PORT, () => console.log(`Server has started on ${ PORT }`));