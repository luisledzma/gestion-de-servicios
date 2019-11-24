using API.WebserviceData;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using API.Controllers;


namespace API.LogicaNegocio
{
    public class ClienteL
    {
        private readonly DataServiceDataContext _db = new DataServiceDataContext();

        public List<ClienteC> GetClientes()
        {
            try
            {
                var result = (from c in _db.SP_ADM_Seleccionar_Clientes()
                              select new ClienteC { 
                                  ID = c.ID,
                                  Cliente = c.Cliente,
                                  Nombre = c.NOMBRE,
                                  Costo_Hora = c.Costo_Hora,
                                  Estado = c.Estado,
                                  Usuario_Creacion = c.Usuario_Creacion,
                                  Usuario_Modificacion = c.Usuario_Modificacion,
                                  Fecha_Creacion = c.Fecha_Creacion,
                                  Fecha_Modificacion = c.Fecha_Modificacion
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
            return new List<ClienteC>();
        }
        public bool InsertarCliente(ClienteC cliente)
        {
            try
            {
                _db.SP_ADM_Insertar_Cliente(cliente.Cliente, cliente.Costo_Hora, cliente.Estado, cliente.Usuario_Creacion);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool EditarCliente(ClienteC cliente)
        {
            try
            {
                _db.SP_ADM_Editar_Cliente(cliente.Cliente, cliente.Costo_Hora, cliente.Estado, cliente.Usuario_Modificacion);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public List<ClienteC> GetClientesERP()
        {
            try
            {
                var result = (from c in _db.SP_ADM_Seleccionar_Clientes_ERP()
                              select new ClienteC
                              {
                                  Cliente = c.Cliente,
                                  Nombre = c.Nombre
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
            return new List<ClienteC>();
        }

        
    }
}