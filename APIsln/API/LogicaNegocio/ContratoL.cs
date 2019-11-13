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

        public List<Contrato> GetContratos()
        {
            try
            {

                var result = (from c in _db.SP_ADM_Seleccionar_Contratos()

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
        public bool InsertarContrato(Contrato contrato)
        {
            try
            {
                _db.SP_ADM_Insertar_Contrato(contrato.Descripcion,contrato.ID_Cliente,contrato.Monto_Contrato,contrato.Horas_Contratadas,contrato.Estado,contrato.Usuario_Creacion);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}