//tabla usurio
create table users (
	id serial primary key,
	name varchar(50) not null,
	email varchar(50) not null unique,
	password varchar(60) not null,
	date_birth int
);

//tabla de productos
create table product (
	id serial primary key,
	titulo varchar(100) not null,
	imagen varchar(200),
	descripcion varchar(200),
	precio int ,
	stock int
);

//tabla de favoritos

create table favorito(
	id serial primary key,
	id_product int,
	id_user int
);