import express from 'express';

const app = express();
const PORT = 2121;


app.listen(PORT, () => console.log(`Server has started on ${ PORT }`));