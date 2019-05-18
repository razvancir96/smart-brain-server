-- create database smart_brain_app;
-- \c smart_brain_app;

drop table if exists users;
create table users(
	id serial primary key,
	name varchar(50) not null,
	email varchar(50) not null,
	password varchar(100) not null,
	entries integer not null default 0,
	creation_date timestamp not null default current_timestamp
);

insert into users(name, email, password)
values('razvan', 'razvan@gmail.com', '$2b$12$l/y7KC.18YmPVVT87IQTuu0/TtPfiRWs34kX.YnzKVHz5gJN0WXU6'),
	('diana', 'diana@gmail.com', '$2b$12$K4vbdx8vf3YYm1T8alL.jO87j9C5ZwCwH9buoh4QnpiXhU4Jxp8ZS');

-- select * from users order by id;