import { query } from "../config.js"

const clearTables = 'truncate users, tokens, logs cascade'

await query(clearTables)

const dropLogs = 'drop table if exists logs'

await query(dropLogs)

const createLogs = 'create table if not exists logs (id serial primary key, user_id int not null, tag varchar(50) not null, type varchar(100) not null, status varchar(100) not null, content varchar(255) not null, created_at timestamp not null, updated_at timestamp not null, foreign key (user_id) references users (id));'

await query(createLogs)