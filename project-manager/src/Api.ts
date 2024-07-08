import express from 'express'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import cors from 'cors'
import UserService from './services/UserService'

const app = express()
const port = 3000

const tokenSecret = process.env.TOKEN_SECRET as string
let refreshTokenStore: { [key: string]: string } = {}

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
	res.send('Hello World - simple api with JWT!')
})

app.post('/login', (req, res) => {
	const { login, password } = req.body
	const user = UserService.login(login, password)
	if (user) {
		const userId = user.id
		const token = generateToken(60, userId)
		const refreshToken = generateToken(60 * 60, userId)
		refreshTokenStore[userId] = refreshToken
		res.status(200).send({ token, refreshToken })
	} else {
		res.status(401).send('Invalid login or password')
	}
})

app.post('/token', (req, res) => {
	const expTime = req.body.exp || 60
	const token = generateToken(expTime)
	const refreshToken = generateToken(60 * 60)
	res.status(200).send({ token, refreshToken })
})

app.post('/refreshToken', (req, res) => {
	const { refreshToken } = req.body
	try {
		const decoded = jwt.verify(refreshToken, tokenSecret) as jwt.JwtPayload
		const userId = decoded.userId
		if (refreshTokenStore[userId] !== refreshToken) {
			return res.status(400).send('Invalid refresh token!')
		}
		const expTime = req.body.exp || 60
		const newToken = generateToken(expTime, userId)
		const newRefreshToken = generateToken(60 * 60, userId)
		refreshTokenStore[userId] = newRefreshToken
		res.status(200).send({ token: newToken, refreshToken: newRefreshToken })
	} catch (err) {
		return res.status(401).send('Invalid refresh token!')
	}
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

function generateToken(expirationInSeconds: number, userId?: string) {
	const exp = Math.floor(Date.now() / 1000) + expirationInSeconds
	const payload: any = { exp }
	if (userId) {
		payload.userId = userId
	}
	const token = jwt.sign(payload, tokenSecret, { algorithm: 'HS256' })
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
