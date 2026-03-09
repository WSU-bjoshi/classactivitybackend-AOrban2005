import decrypt from 'bcryptjs'
import { User } from '../models/user.model.js'
import { signAccessToken } from '../utils/jwt.util.js'

const SALT_ROUNDS = 10;

export async function register(name, email, password) {
    const normalizedEmail = email.toLowerCase();

    const existing = await User.findOne({ where: { user_email: normalizedEmail } });
    if (existing) {
        return { ok: false, status: 400, message: 'Email already registered' };
    
    const passwordHash = await decrypt.hash(password, SALT_ROUNDS);}

    const user = await User.create({
        name,
        user_email: normalizedEmail,
        passwordHash
    });

    const token = signAccessToken({ id: user.id, email: user.user_email });
    return { ok: true, data: { token }, user: { id: user.id, name: user.name, email: user.user_email } };
}

export async function login(email, password) {
    const normalizedEmail = email.toLowerCase();

    const user = await User.findOne({ where: { user_email: normalizedEmail } });
    if (!user) {
        return { ok: false, status: 401, error: 'Invalid credentials.' };
    }

    const match = await decrypt.compare(password, user.passwordHash);
    if (!match) {
        return { ok: false, status: 401, error: 'Invalid credentials.' };
    }

    const token = signAccessToken({ id: user.id, email: user.user_email });

    