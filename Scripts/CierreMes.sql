
-- =============================================
-- Author:		<Luis Ledezma>
-- Create date: <22-2-2020>
-- Description:	<Ejecuta el proceso de cierre de mes>
-- =============================================
ALTER PROCEDURE [dbo].[SP_ADM_EjecutarCierreMes]
	@P_ID_CONTRATO INT,
	@P_ID_Reporte INT OUTPUT,
	@P_Correo_Cliente VARCHAR(250) OUTPUT
AS
BEGIN
	BEGIN TRAN
	--Contrato
	

	Declare @HorasContratadas time(7)= (Select Horas_Contratadas from TBL_GS_CONTRATO where ID = @P_ID_CONTRATO),
			@HorasDisponibles time(7) = (Select Horas_Disponibles from TBL_GS_CONTRATO where ID = @P_ID_CONTRATO),
			@HorasConsumidas time(7) = (Select Horas_Consumidas from TBL_GS_CONTRATO where ID = @P_ID_CONTRATO),
			@HorasExcedidas time(7) = (Select Horas_Excedidas from TBL_GS_CONTRATO where ID = @P_ID_CONTRATO),
			@Cliente int = (Select Cliente from TBL_GS_CONTRATO where ID = @P_ID_CONTRATO),
			@Tiempo TIME(7) = '00:00:00.0000000',
			@CalcHorasDisponibles int = (Select sum(datediff(HOUR,0,Horas_Contratadas)+datediff(HOUR,0,Horas_Disponibles)) from dbo.TBL_GS_CONTRATO where ID = @P_ID_CONTRATO) ;
			

			UPDATE TBL_GS_CONTRATO SET
			Horas_Consumidas = @Tiempo,
			Horas_Disponibles = (Select CONVERT(time(7),(SELECT DATEADD(hh,@CalcHorasDisponibles,@Tiempo)))),
			Horas_Excedidas = @Tiempo
			where ID = @P_ID_CONTRATO;

	--Reporte
	Declare @Tipo_Reporte int = (Select ID from TBL_GS_TIPO_REPORTE where Descripcion = 'Facturar'),
			@Hora_Inicial datetime = (Select Convert(datetime,(select Convert(date,getdate()))));
			

	IF (Select datediff(HOUR,0,@HorasExcedidas)) > 0
	BEGIN
		Declare @Horas_Facturar decimal(5,1) = (select DATEPART(hh,@HorasExcedidas)),
		@Tarea_Estandar int = (Select ID from TBL_GS_TAREA_ESTANDAR where Descripcion = 'N/A');
		Declare @Hora_Final datetime =Convert(datetime,(select dateadd(hh,@Horas_Facturar,@Hora_Inicial))),
		@V_Correo_Cliente varchar(250),
		@V_ID_Reporte int;

		EXEC [dbo].[SP_ADM_Insertar_Reporte] @Cliente,@Tipo_Reporte,0,0,@P_ID_Contrato,0,0,@Hora_Inicial,@Hora_Final,@Horas_Facturar,@Tarea_Estandar,'Horas Excedidas','Horas Excedidas','P','SA',@V_ID_Reporte OUTPUT,@V_Correo_Cliente OUTPUT;


		SET @P_Correo_Cliente = (SELECT @V_Correo_Cliente);
		SET @P_ID_Reporte = (SELECT @V_ID_Reporte);

		
	END
	COMMIT TRAN

END
