DROP DATABASE IF EXISTS bingo_db;
CREATE DATABASE bingo_db;

CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    username VARCHAR (255),
    password VARCHAR (255),
)

CREATE TABLE gameRoom (
    id INT AUTO_INCREMENT NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id),
    balls_drawn VARCHAR,
    is_gameover BIT,
    winner_id INT,
    admin_id INT,
)