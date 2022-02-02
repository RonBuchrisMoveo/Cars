import dotenv from 'dotenv'
dotenv.config()

const SERVER_TOKEN_EXPORETIME = process.env.SERVER_TOKEN_EXPORETIME || 3600
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || "coolIssuer"
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || "superencryptedsecret"

const SERVER = {
    token:{
        expireTime : SERVER_TOKEN_EXPORETIME, 
        issuer: SERVER_TOKEN_ISSUER,
        secret: SERVER_TOKEN_SECRET,
    }
}

const config = {
    server:SERVER
}

export default config