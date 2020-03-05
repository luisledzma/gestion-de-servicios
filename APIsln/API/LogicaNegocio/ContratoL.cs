using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using API.Controllers;
using API.WebserviceData;

namespace API.LogicaNegocio
{
    public class ContratoL
    {
        private readonly DataServiceDataContext _db = new DataServiceDataContext();

        public List<Contrato> GetContratos(string usuarioConsulta)
        {
            try
            {

                var result = (from c in _db.SP_ADM_Seleccionar_Contratos(usuarioConsulta)

                              select new Contrato()
                              {
                                  ID = c.ID,
                                  Descripcion = c.Descripcion,
                                  ID_Cliente = c.ID_Cliente,
                                  Cliente = c.Cliente,
                                  Monto_Contrato = c.Monto_Contrato,
                                  Horas_Contratadas = c.Horas_Contratadas,
                                  Horas_Disponibles = c.Horas_Disponibles,
                                  Horas_Consumidas = c.Horas_Consumidas,
                                  Horas_Excedidas = c.Horas_Excedidas,
                                  Estado = c.Estado,
                                  Usuario_Creacion = c.Usuario_Creacion,
                                  Usuario_Modificacion = c.Usuario_Modificacion,
                                  Fecha_Creacion = c.Fecha_Creacion,
                                  Fecha_Modificacion = c.Fecha_Modificacion

                              }).ToList();


                if (result != null)
                    return result;
            }
            catch (Exception ex)
            {
                throw;
            }
            return new List<Contrato>();
        }
        public List<Contrato> GetContratosActivos()
        {
            try
            {

                var result = (from c in _db.SP_ADM_Seleccionar_Contratos_Activos()

                              select new Contrato()
                              {
                                  ID = c.ID,
                                  Descripcion = c.Descripcion,
                                  ID_Cliente = c.ID_Cliente,
                                  Cliente = c.Cliente,
                                  Monto_Contrato = c.Monto_Contrato,
                                  Horas_Contratadas = c.Horas_Contratadas,
                                  Horas_Consumidas = c.Horas_Consumidas,
                                  Horas_Disponibles = c.Horas_Disponibles, 
                                  Horas_Excedidas = c.Horas_Excedidas,
                                  Estado = c.Estado,
                                  Usuario_Creacion = c.Usuario_Creacion,
                                  Usuario_Modificacion = c.Usuario_Modificacion,
                                  Fecha_Creacion = c.Fecha_Creacion,
                                  Fecha_Modificacion = c.Fecha_Modificacion

                              }).ToList();


                if (result != null)
                    return result;
            }
            catch (Exception ex)
            {
                throw;
            }
            return new List<Contrato>();
        }
        public bool InsertarContrato(Contrato contrato)
        {
            TimeSpan tiempoF = new TimeSpan(contrato.horas, 00, 00);
            try
            {
                _db.SP_ADM_Insertar_Contrato(contrato.Descripcion,contrato.ID_Cliente,contrato.Monto_Contrato, tiempoF, contrato.Estado,contrato.Usuario_Creacion);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool EditarContrato(Contrato contrato)
        {
            TimeSpan tiempoF = new TimeSpan(contrato.horas, 00, 00);
            try
            {
                _db.SP_ADM_Editar_Contrato(contrato.ID,contrato.Descripcion, tiempoF, contrato.Monto_Contrato,contrato.Estado,contrato.Usuario_Modificacion);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool CierreDeMes(Contrato contrato)
        {
            int? idReporte = 0;
            string correoCliente = "";
            ReporteL repL = new ReporteL();
            try
            {
                _db.SP_ADM_EjecutarCierreMes(contrato.ID,ref idReporte, ref correoCliente);
                repL.EnviarCorreo(correoCliente, idReporte.ToString());
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}