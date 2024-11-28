import jwt from 'jsonwebtoken';
const userId = 'user456';
const secretKey = '1234';

const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' });

console.log(token);
