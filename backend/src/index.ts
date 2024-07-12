import express from 'express'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import cors from 'cors'
import { createClient } from '@supabase/supabase-js'
import { Database } from './types/types'

const app = express()
const port = 3000

const tokenSecret = process.env.TOKEN_SECRET as string
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string
let refreshToken: string

const supabase = createClient<Database>(
	'https://unutiazafknivaencrrj.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVudXRpYXphZmtuaXZhZW5jcnJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA2MzMxNjcsImV4cCI6MjAzNjIwOTE2N30.8rIrKuWTf6dWd9L71Z5l1GuFKXQUSfcimfDoJq6JnRE'
)

app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
	const { data, error } = await supabase.from('User').select('*')
    res.send(data)
})

app.post('/login',async (req, res) => {

	const { login, password } = req.body;
    const { data: users, error } = await supabase
        .from('User')
        .select('*')
        .eq('login', login)
        .eq('password', password);

    if (error || users.length === 0) {
        return res.status(401).json({ message: 'Invalid login or password' });
    }

    const user = users[0];
    const token = jwt.sign({ id: user.id, login: user.login, role: user.role }, tokenSecret, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: user.id }, refreshTokenSecret, { expiresIn: '7d' });

    res.status(200).json({ token, refreshToken, user });
})

app.post('/token', function (req, res) {
	const expTime = req.body.exp || 60
	const token = generateToken(+expTime)
	refreshToken = generateToken(60 * 60)
	res.status(200).send({ token, refreshToken })
})
app.post('/refreshToken', function (req, res) {
	const refreshTokenFromPost = req.body.refreshToken
	if (refreshToken !== refreshTokenFromPost) {
		res.status(400).send('Bad refresh token!')
	}
	const expTime = req.headers.exp || 60
	const token = generateToken(+expTime)
	refreshToken = generateToken(60 * 60)
	setTimeout(() => {
		res.status(200).send({ token, refreshToken })
	}, 3000)
})
app.get('/protected/:id/:delay?', verifyToken, (req, res) => {
	const id = req.params.id
	const delay = req.params.delay ? +req.params.delay : 1000
	setTimeout(() => {
		res.status(200).send(`{"message": "protected endpoint ${id}"}`)
	}, delay)
})
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})

function generateToken(expirationInSeconds: number) {
	const exp = Math.floor(Date.now() / 1000) + expirationInSeconds
	const token = jwt.sign({ exp, foo: 'bar' }, tokenSecret, { algorithm: 'HS256' })
	return token
}

function verifyToken(req: any, res: any, next: any) {
	const authHeader = req.headers['authorization']
	const token = authHeader?.split(' ')[1]

	if (!token) return res.sendStatus(403)

	jwt.verify(token, tokenSecret, (err: any, user: any) => {
		if (err) {
			console.log(err)
			return res.status(401).send(err.message)
		}
		req.user = user
		next()
	})
}