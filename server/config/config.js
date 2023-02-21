const dotenv = require('dotenv')
const path = require('path')
const Joi = require('joi');
const { env } = require('process');
// path.join(__dirname + '../../.env')
// console.log(__dirname + "../../.env");
//set the path to the .env file, default is process.cwd()
dotenv.config({ path: path.join(__dirname, "../.env") });
// console.log(path.join(__dirname , '../.env'));

const envVarsSchema = Joi.object().
    keys({
        NODE_ENV: Joi.string().valid("production", "development", "test").required(),
        PORT: Joi.number().default(3000).required(),
        JWT_SECRET: Joi.string().required().description("JWT secret key"),
        JWT_EXPIRES_IN: Joi.string().description(
            "seconds/minutes/days after which access tokens expire"
        ),
        PG_USER: Joi.string().required(),
        PG_HOST: Joi.string().required(),
        PG_NAME: Joi.string().required(),
        PG_PASSWORD: Joi.string().required(),
        PG_PORT: Joi.string().required(),
        // INSTANCE_CONNECTION_NAME: Joi.string().required().description('postgres connection')
    
    }).unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`)
}

module.exports = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    jwt: {
        secret: envVars.JWT_SECRET,
        expireIn: envVars.JWT_EXPIRES_IN
    },
    postgres: {
        host: envVars.PG_HOST,
        user: envVars.PG_USER,
        password: envVars.PG_PASSWORD,
        database: envVars.PG_NAME,
        port: envVars.PG_PORT,
        // instanceConnectionName: envVars.INSTANCE_CONNECTION_NAME
    }
}


//Refer this: https://dev.to/sukruozdemir/how-to-validate-environment-file-in-nodejs-m2m
