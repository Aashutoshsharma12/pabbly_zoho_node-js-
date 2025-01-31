import express from 'express'
const app = express();
app.use(express.json());
app.listen(4001, () => {
    console.log('Server is running on 4001 port')
});