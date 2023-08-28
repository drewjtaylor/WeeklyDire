-- DROP DATABASE IF EXISTS weeklydire;
-- CREATE DATABASE weeklydire;

-- \connect weeklydire

-- SET statement_timeout = 0;
-- SET lock_timeout = 0;
-- SET client_encoding = 'UTF8';
-- SET standard_conforming_strings = on;
-- SET check_function_bodies = false;
-- SET client_min_messages = warning;
-- SET default_tablespace = '';
-- SET default_with_oids = false;

DROP TABLE IF EXISTS subscribers CASCADE;

CREATE TABLE subscribers (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL, 
    password TEXT NOT NULL, 
    first_name TEXT,
    last_name TEXT
);

INSERT INTO subscribers (id, email, password, first_name, last_name) VALUES
(1, 'test_subscriber@nothing.com', 'password', 'Andrew', 'Taylor'),
(2, 'john@smith.com', 'password', 'Mary', 'Jane'),
(3, 'me@you.com', 'password', 'Arthur', 'King');

DROP TABLE IF EXISTS creators CASCADE;

CREATE TABLE creators (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL, 
    password TEXT NOT NULL, 
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    bio TEXT,
    is_admin BOOLEAN DEFAULT FALSE
);

INSERT INTO creators (id, email, password, first_name, last_name, bio, is_admin) VALUES
(1, 'admin@nothing.com', 'password', 'creator_test_first_name', 'creator_test_last_name', 'test_bio', TRUE),
(2, 'I_make_videos@nothing.com', 'password', 'creator_test_first_name2', 'creator_test_last_name2', 'test_bio2', FALSE),
(3, 'I_write_articles@nothing.com', 'password', 'creator_test_first_name3', 'creator_test_last_name3', 'test_bio3', FALSE);

DROP TABLE IF EXISTS articles CASCADE;

CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    thumbnail TEXT,
    creator_id INT NOT NULL,
    CONSTRAINT fk_article_author FOREIGN KEY(creator_id) REFERENCES creators(id) ON DELETE CASCADE
);

INSERT INTO articles (id, title, body, thumbnail, creator_id) VALUES 
    (
        1, 
        'Test Title', 
        'This is the body of an article. if it is correctly written in html, <strong>this part will be bold</strong>', 
        'http://www.ikozmik.com/Content/Images/uploaded/its-free-featured.jpg',
        1);

DROP TABLE IF EXISTS comments CASCADE;

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    body TEXT NOT NULL,
    author_id INT NOT NULL,
    article_id INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_comment_author FOREIGN KEY(author_id) REFERENCES subscribers(id) ON DELETE CASCADE,
    CONSTRAINT fk_comment_article_id FOREIGN KEY(article_id) REFERENCES articles(id) ON DELETE CASCADE
);

INSERT INTO comments (id, body, author_id, article_id) VALUES
(1, 'This is the body of a test comment', 1, 1);

-- Comments-to-subscribers is a many-to-many table
DROP TABLE IF EXISTS likes CASCADE;

CREATE TABLE likes (
    subscriber_id INT NOT NULL,
    comment_id INT NOT NULL,
    PRIMARY KEY(subscriber_id, comment_id),
    CONSTRAINT fk_subscriber_id FOREIGN KEY(subscriber_id) REFERENCES subscribers(id) ON DELETE CASCADE,
    CONSTRAINT fk_comment_id FOREIGN KEY(comment_id) REFERENCES comments(id) ON DELETE CASCADE
);