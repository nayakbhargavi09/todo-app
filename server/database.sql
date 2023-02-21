CREATE DATABASE todolist;

CREATE TABLE users(
    user_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL
);

CREATE TABLE tasks(
    task_id SERIAL PRIMARY KEY,
    user_id UUID,
    description VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(user_id)
);

-- https://dbdiagram.io/d/63f5078e296d97641d82ae50