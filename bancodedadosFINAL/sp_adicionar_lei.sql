CREATE PROCEDURE adicionarlei
  @id_abrangencia int,
  @id_ramodireito int,
  @nome_proposta varchar(100),
  @exposicao_motivos varchar(100),
  @texto_lei varchar(1000)
AS
BEGIN
  IF LEN(@texto_lei) >= 2
  BEGIN
    INSERT INTO lei(id_abrangencia, id_ramodireito, nome_proposta, exposicao_motivos, texto_lei )
    VALUES (
      @id_abrangencia,
      @id_ramodireito,
      @nome_proposta,
      @exposicao_motivos,
      @texto_lei
    );
    PRINT 'Lei Adicionada com Sucesso';
  END
  ELSE
  BEGIN
    PRINT 'Lei não adicionada';
  END
END