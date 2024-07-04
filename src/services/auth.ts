import bcryptjs from 'bcryptjs'
import { sign } from 'jsonwebtoken'

const secret = process.env.JWT_SECRET || 'secret'
const duration = process.env.JWT_DURATION || '24h'

async function passwordMatches(password: string, oldPassword: string): Promise<boolean>{
    return await bcryptjs.compare(password, oldPassword)
}

function generateToken(payload: Object): {token: string, expiresIn: number}{
    const token = sign(payload, secret, { expiresIn: duration })
    const expiresIn = parseInt(duration.replace('h', '')) * 3600
    return {token, expiresIn}
}

export { passwordMatches, generateToken }