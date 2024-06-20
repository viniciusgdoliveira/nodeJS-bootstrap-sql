create view show_all as
select lei.id,abrangencia.descricao,ramodireito.ramonome,lei.nome_proposta, lei.exposicao_motivos, lei.texto_lei from lei
inner join
ramodireito
on lei.id_ramodireito=ramodireito.id
inner join 
abrangencia
on lei.id_abrangencia=abrangencia.id

select * from show_all