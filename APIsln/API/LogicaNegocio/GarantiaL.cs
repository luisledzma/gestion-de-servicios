using API.Controllers;
using API.WebserviceData;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace API.LogicaNegocio
{
    public class GarantiaL
    {
        private readonly DataServiceDataContext _db = new DataServiceDataContext();

        public List<Garantia> GetGaratias()
        {
            try
            {
                var result = (from c in _db.SP_ADM_Seleccionar_Garantias()
                              select new Garantia
                              {
                                  ID = c.ID,
                                  Cliente = c.Cliente,
                                  Horas_A_Facturar = c.Horas_A_Facturar,
                                  Tipo = c.Tipo,
                                  Descripcion = c.Descripcion,
                                  Fecha_Creacion = c.Fecha_Creacion
                              }).ToList();

                if (result != null)
                {
                    return result;
                }
            }
            catch (Exception ex)
            {
                throw;
            }
            return new List<Garantia>();
        }


    }
}