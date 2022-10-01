import { query } from "../config.js"

const createUsers = 'create table if not exists users (id serial primary key, email varchar(255) unique not null, password varchar(255) not null, created_at timestamp not null, updated_at timestamp not null);'

const createTokens = 'create table if not exists tokens (id serial primary key, user_id int not null, token varchar(255) not null, created_at timestamp not null, updated_at timestamp not null, foreign key (user_id) references users (id));'

const createLogs = 'create table if not exists logs (id serial primary key, user_id int not null, type varchar(100) not null, status varchar(100) not null, content varchar(255) not null, created_at timestamp not null, updated_at timestamp not null, foreign key (user_id) references users (id));'

const sqlStrings = [createUsers, createTokens, createLogs]

for (const sqlString of sqlStrings) {
    await query(sqlString)
}