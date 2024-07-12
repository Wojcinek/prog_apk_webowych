"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const supabase_js_1 = require("@supabase/supabase-js");
const app = (0, express_1.default)();
const port = 3000;
const tokenSecret = process.env.TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
let refreshToken;
const supabase = (0, supabase_js_1.createClient)('https://unutiazafknivaencrrj.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVudXRpYXphZmtuaXZhZW5jcnJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA2MzMxNjcsImV4cCI6MjAzNjIwOTE2N30.8rIrKuWTf6dWd9L71Z5l1GuFKXQUSfcimfDoJq6JnRE');
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield supabase.from('User').select('*');
    res.send(data);
}));
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, password } = req.body;
    const { data: users, error } = yield supabase
        .from('User')
        .select('*')
        .eq('login', login)
        .eq('password', password);
    if (error || users.length === 0) {
        return res.status(401).json({ message: 'Invalid login or password' });
    }
    const user = users[0];
    const token = jsonwebtoken_1.default.sign({ id: user.id, login: user.login, role: user.role }, tokenSecret, { expiresIn: '1h' });
    const refreshToken = jsonwebtoken_1.default.sign({ id: user.id }, refreshTokenSecret, { expiresIn: '7d' });
    res.status(200).json({ token, refreshToken, user });
}));
app.post('/token', function (req, res) {
    const expTime = req.body.exp || 60;
    const token = generateToken(+expTime);
    refreshToken = generateToken(60 * 60);
    res.status(200).send({ token, refreshToken });
});
app.post('/refreshToken', function (req, res) {
    const refreshTokenFromPost = req.body.refreshToken;
    if (refreshToken !== refreshTokenFromPost) {
        res.status(400).send('Bad refresh token!');
    }
    const expTime = req.headers.exp || 60;
    const token = generateToken(+expTime);
    refreshToken = generateToken(60 * 60);
    setTimeout(() => {
        res.status(200).send({ token, refreshToken });
    }, 3000);
});
app.get('/protected/:id/:delay?', verifyToken, (req, res) => {
    const id = req.params.id;
    const delay = req.params.delay ? +req.params.delay : 1000;
    setTimeout(() => {
        res.status(200).send(`{"message": "protected endpoint ${id}"}`);
    }, delay);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
function generateToken(expirationInSeconds) {
    const exp = Math.floor(Date.now() / 1000) + expirationInSeconds;
    const token = jsonwebtoken_1.default.sign({ exp, foo: 'bar' }, tokenSecret, { algorithm: 'HS256' });
    return token;
}
function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1];
    if (!token)
        return res.sendStatus(403);
    jsonwebtoken_1.default.verify(token, tokenSecret, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(401).send(err.message);
        }
        req.user = user;
        next();
    });
}
