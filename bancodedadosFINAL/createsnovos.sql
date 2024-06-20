create table abrangencia (
id int primary key identity(1,1),
descricao varchar(30) not null
)
create table ramodireito (
id int primary key identity(1,1),
ramonome varchar(30) not null
)
--exec sp_rename 'ramodireito.descricao', 'ramonome', 'column';
create table lei (
id int primary key identity(1,1),
id_abrangencia int not null,
id_ramodireito int not null,
nome_proposta varchar(100) not null,
exposicao_motivos varchar(100) not null,
texto_lei varchar(1000) not null
)
alter table lei add foreign key (id_abrangencia) references abrangencia (id)
alter table lei add foreign key (id_ramodireito) references ramodireito (id)

insert into abrangencia (descricao) values ('Municipal'),('Estadual'),('Federal')

insert into ramodireito (descricao) values ('Processual'),('Administrativo'),('Constitucional'),('Consumidor'),('Ambiental'),('Tributária'),('Cível'),('Penal')




