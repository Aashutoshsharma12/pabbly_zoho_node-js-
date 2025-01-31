import express from 'express'
const app = express();
app.use(express.json());
app.get('/list', async (req, res) => {
    const array = [
        {
            _id: 1,
            name: "Aashutosh"
        },
        {
            _id: 2,
            name: "Aashutosh sharma"
        },
        {
            _id: 3,
            name: "Punit Sharma"
        }
    ]
    res.send({ data: array, code: 200 })
})
app.listen(4001, () => {
    console.log('Server is running on 4001 port')
});