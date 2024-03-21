 drop database if exists todo;
 create database my_todo;
 use my_todo;

create table task (
id serial primary key,
description varchar (255) not null,

);
	
	insert into task (description) values ('My test task');
	insert into task (description) values ('My another test task');
	