CREATE PROCEDURE alterarlei
	@lei_id int,
  @novo_id_abrangencia int,
  @novo_id_ramodireito int,
  @novo_nome_proposta varchar(100),
  @novo_exposicao_motivos varchar(100),
  @novo_texto_lei varchar(1000)
AS
BEGIN
  IF EXISTS (SELECT 1 FROM lei WHERE id = @lei_id)
  BEGIN
    BEGIN TRY

      UPDATE lei
      SET
        id_abrangencia = ISNULL(@novo_id_abrangencia, id_abrangencia),
        id_ramodireito = ISNULL(@novo_id_ramodireito, id_ramodireito),
        nome_proposta = ISNULL(@novo_nome_proposta, nome_proposta),
        exposicao_motivos = ISNULL(@novo_exposicao_motivos, exposicao_motivos),
		texto_lei = ISNULL(@novo_texto_lei, texto_lei)
      WHERE id = @lei_id;


      PRINT 'Lei Alterada com Sucesso';
    END TRY
    BEGIN CATCH
 
      PRINT 'Erro ao alterar a Lei. Consulte os logs para obter mais informações.';
    END CATCH
  END
  ELSE
  BEGIN
    PRINT 'A Lei com o ID especificado não foi encontrada. Nenhuma alteração realizada.';
  END
END