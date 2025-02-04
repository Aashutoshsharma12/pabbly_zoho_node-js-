import express from 'express'
const app = express();
import axios from 'axios';
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
});
app.post('/pabbly-webhook', async (req, res) => {
    console.log(req.body, "body-----", req)
    const data = req.body
    res.send({ data: data, code: 200 })
});
app.post('/add_data_on_zoho', async (req, res) => {
    console.log(req.body, "body-----zoho")
    const response = await axios.post(
        "https://www.zohoapis.in/crm/v2/Leads",
        {
            data: [
                {
                    Last_Name: "Doe",
                    First_Name: "John",
                    Email: "john.doe@example.com",
                    Phone: "+1234567890"
                }
            ]
        },
        {
            headers: {
                Authorization: "Bearer YOUR_ACCESS_TOKEN",
                "Content-Type": "application/json"
            }
        }
    );
    console.log("Lead added to Zoho CRM:", response.data);
    res.send({ data: data, code: 200 });
});

// Replace these with your Zoho app credentials
const client_id = '1000.4OTVVSWDK9P5P04IM6ZHGF24J14M7X';
const client_secret = 'd6859d752f9c36b4491d7bcee8c231e1a5185a2287';
const redirect_uri = 'https://pabbly-zoho-node-js.onrender.com/callback';

app.get("/callback", async (req, res) => {
    const authCode = req.query.code;
    console.log(authCode, "auth++++++++++++++++++++++++++++++")
    try {
        console.log(client_id,
            client_secret,
            redirect_uri,
            authCode, "--------------------------------")
        const response = await axios.post("https://accounts.zoho.com/oauth/v2/token", null, {
            params: {
                client_id: client_id,
                client_secret: client_secret,
                grant_type: "authorization_code",
                redirect_uri: redirect_uri,
                code: authCode
            }
        });

        res.json(response.data); // Contains access_token, refresh_token
    } catch (error) {
        res.status(500).json({ error: error.response.data });
    }
});
app.listen(4001, () => {
    console.log('Server is running on 4001 port')
});