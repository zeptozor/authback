import express from 'express'
import cors from 'cors'
import { Mailer } from './mailer'
import auth from './auth'

const app = express()
app.use(cors())
app.use(express.json())
const PORT = 3002

const mailer = new Mailer({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'goobkabob771@gmail.com',
        pass: 'hhxw xizw buor pkgg'
    }
})

function generateOTP() {
    const chars = '0123456789'
    let otp = ''
    for (let i = 0; i < 6; i++) {
        otp += chars[Math.floor(Math.random() * chars.length)]
    }
    return parseInt(otp)
}

app.post('/auth', async (req, res) => {
    const { email } = req.body
    let user = await auth.getUser(email)
    if (typeof user == 'string') {
        user = await auth.createUser(email)
    }
    const token = await auth.createToken(user.uid)
    res.send({ token })
})

app.post('/sendOTP', (req, res) => {
    const { email } = req.body
    const otp = generateOTP()
    mailer.sendOTP(email, otp)
    res.send({ otp })
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))