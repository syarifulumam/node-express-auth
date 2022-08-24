import 'dotenv/config'

const config = {
    accessKey: process.env.ACCESS_TOKEN_SECRET,
    refreshKey: process.env.REFRESH_TOKEN_SECRET,

    port: process.env.PORT,
    //Database
    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USER,
    dbPass: process.env.DB_PASS,
    dbName: process.env.DB_NAME,
    dbPort: process.env.DB_PORT,

}

export default config