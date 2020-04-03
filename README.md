Mysql Schemas for User & Admin

create database product;
use product;

create table user (
Username varchar (30) not null primary key,
Password varchar(100)not null );

create table `admin`(
Username varchar (30)not null primary key,
Password varchar(100)not null);

create table prodinfo(
ProductId int not null primary key,
ProductName varchar(30) not null,
Price float not null,
Description varchar(100) not null,
Rating varchar(10) not null);

==========================================================================================================
Required to run npm install in root folder as well as backend folder

To run client side -> npm run start 
To run server -> navigate to backend folder and run -> node server.js
