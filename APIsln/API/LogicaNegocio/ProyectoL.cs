using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using API.Controllers;
using API.WebserviceData;

namespace API.LogicaNegocio
{
    public class ProyectoL
    {
        private readonly DataServiceDataContext _db = new DataServiceDataContext();

        public List<Proyecto> GetProyectos(string usuarioConsulta)
        {
            try
            {

                var result = (from p in _db.SP_ADM_Seleccionar_Proyectos(usuarioConsulta)

                              select new Proyecto()
                              {
                                  ID = p.ID,
                                  Descripcion = p.Descripcion,
                                  ID_Cliente = p.ID_Cliente,
                                  Cliente = p.Cliente,
                                  Horas_Estimadas = p.Horas_Estimadas,
                                  Horas_Invertidas = p.Horas_Invertidas,
                                  Monto_Total = p.Monto_Total,
                                  Estado = p.Estado,
                                  Usuario_Creacion = p.Usuario_Creacion,
                                  Usuario_Modificacion = p.Usuario_Modificacion,
                                  Fecha_Creacion = p.Fecha_Creacion,
                                  Fecha_Modificacion = p.Fecha_Modificacion

                              }).ToList();


                if (result != null)
                    return result;
            }
            catch (Exception ex)
            {
                throw;
            }
            return new List<Proyecto>();
        }
        public List<Proyecto> GetProyectosPorFecha(string usuarioConsulta, DateTime inicio, DateTime fin)
        {
            try
            {

                var result = (from p in _db.SP_ADM_Seleccionar_Proyectos_Por_Fecha(usuarioConsulta, inicio, fin)

                              select new Proyecto()
                              {
                                  ID = p.ID,
                                  Descripcion = p.Descripcion,
                                  ID_Cliente = p.ID_Cliente,
                                  Cliente = p.Cliente,
                                  Horas_Estimadas = p.Horas_Estimadas,
                                  Horas_Invertidas = p.Horas_Invertidas,
                                  Monto_Total = p.Monto_Total,
                                  Estado = p.Estado,
                                  Usuario_Creacion = p.Usuario_Creacion,
                                  Usuario_Modificacion = p.Usuario_Modificacion,
                                  Fecha_Creacion = p.Fecha_Creacion,
                                  Fecha_Modificacion = p.Fecha_Modificacion

                              }).ToList();


                if (result != null)
                    return result;
            }
            catch (Exception ex)
            {
                throw;
            }
            return new List<Proyecto>();
        }
        // --------------------------------------------------------------------------------------------------------------------------------------------------
        // Selecciona los proyectos que estan activos para poder hacer filtros en el formulario e insertar solo configuraciones a proyectos que esten activos
        public List<Proyecto> GetProyectosActivos(int idCliente) 
        {
            try
            {

                var result = (from p in _db.SP_ADM_Seleccionar_Proyectos_Activos(idCliente)

                              select new Proyecto()
                              {
                                  ID = p.ID,
                                  Descripcion = p.Descripcion,
                                  ID_Cliente = p.ID_Cliente,
                                  Cliente = p.Cliente,
                                  Horas_Estimadas = p.Horas_Estimadas,
                                  Horas_Invertidas = p.Horas_Invertidas,
                                  Monto_Total = p.Monto_Total,
                                  Estado = p.Estado,
                                  Usuario_Creacion = p.Usuario_Creacion,
                                  Usuario_Modificacion = p.Usuario_Modificacion,
                                  Fecha_Creacion = p.Fecha_Creacion,
                                  Fecha_Modificacion = p.Fecha_Modificacion

                              }).ToList();


                if (result != null)
                    return result;
            }
            catch (Exception ex)
            {
                throw;
            }
            return new List<Proyecto>();
        }

        public Proyecto GetProyectoPorId(int idProy)
        {
            try
            {

                //var result = (from c in _db.SP_SEG_SeleccionarRol()
                //              where c.ID == idRol

                //              select new Rol()
                //              {
                //                  ID = c.ID,
                //                  Descripcion = c.Descripcion,
                //                  Estado = c.Estado,
                //                  Usuario_Creacion = c.Usuario_Creacion,
                //                  Usuario_Modificacion = c.Usuario_Modificacion,
                //                  Fecha_Creacion = c.Fecha_Creacion,
                //                  Fecha_Modificacion = c.Fecha_Modificacion

                //              }).FirstOrDefault();


                //if (result != null)
                    return new Proyecto();
            }
            catch (Exception ex)
            {
                throw;
            }
            return new Proyecto();
        }

        public bool InsertarProyecto(Proyecto proyecto)
        {
            try
            {
                _db.SP_ADM_Insertar_Proyecto(proyecto.Descripcion,proyecto.ID_Cliente,proyecto.Horas_Estimadas,proyecto.Monto_Total,proyecto.Estado,proyecto.Usuario_Creacion);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool EditarProyecto(Proyecto proyecto)
        {
            try
            {
                _db.SP_ADM_Editar_Proyecto(proyecto.ID,proyecto.Descripcion,proyecto.Horas_Estimadas,proyecto.Monto_Total,proyecto.Estado,proyecto.Usuario_Modificacion);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }


        // ---------------------------------------------
        // --------------Etapa Proyecto-----------------

        public List<EtapaProyecto> GetEtapasProyectoPorProyecto(int idProyecto, string usuarioConsulta)
        {
            try
            {

                var result = (from p in _db.SP_ADM_Seleccionar_Etapas_de_Proyecto_por_Proyectos(idProyecto, usuarioConsulta)

                              select new EtapaProyecto()
                              {
                                  ID = p.ID,
                                  Descripcion = p.Descripcion,
                                  ID_Proyecto = p.ID_Proyecto,
                                  Proyecto = p.Proyecto,
                                  Horas_Estimadas = p.Horas_Estimadas,
                                  Horas_Invertidas = p.Horas_Invertidas,
                                  Estado = p.Estado,
                                  Usuario_Creacion = p.Usuario_Creacion,
                                  Usuario_Modificacion = p.Usuario_Modificacion,
                                  Fecha_Creacion = p.Fecha_Creacion,
                                  Fecha_Modificacion = p.Fecha_Modificacion

                              }).ToList();


                if (result != null)
                    return result;
            }
            catch (Exception ex)
            {
                throw;
            }
            return new List<EtapaProyecto>();
        }
        public List<EtapaProyecto> GetEtapasProyectoPorProyectoYFecha(int idProyecto, string usuarioConsulta, DateTime inicio, DateTime fin)
        {
            try
            {

                var result = (from p in _db.SP_ADM_Seleccionar_Etapas_de_Proyecto_por_Proyectos_Y_Fecha(idProyecto, usuarioConsulta, inicio, fin)

                              select new EtapaProyecto()
                              {
                                  ID = p.ID,
                                  Descripcion = p.Descripcion,
                                  ID_Proyecto = p.ID_Proyecto,
                                  Proyecto = p.Proyecto,
                                  Horas_Estimadas = p.Horas_Estimadas,
                                  Horas_Invertidas = p.Horas_Invertidas,
                                  Estado = p.Estado,
                                  Usuario_Creacion = p.Usuario_Creacion,
                                  Usuario_Modificacion = p.Usuario_Modificacion,
                                  Fecha_Creacion = p.Fecha_Creacion,
                                  Fecha_Modificacion = p.Fecha_Modificacion

                              }).ToList();


                if (result != null)
                    return result;
            }
            catch (Exception ex)
            {
                throw;
            }
            return new List<EtapaProyecto>();
        }
        // ---------------------------------------------------------------------------------------------------------------------------------------------------------
        // Selecciona las etapas que estan activas para poder hacer filtros en el formulario e insertar solo configuraciones a etapas por proyecto que esten activas
        public List<EtapaProyecto> GetEtapasProyectoActivasPorProyecto(int idProyecto)
        {
            try
            {

                var result = (from p in _db.SP_ADM_Seleccionar_Etapas_de_Proyecto_Activas_por_Proyectos(idProyecto)

                              select new EtapaProyecto()
                              {
                                  ID = p.ID,
                                  Descripcion = p.Descripcion,
                                  ID_Proyecto = p.ID_Proyecto,
                                  Proyecto = p.Proyecto,
                                  Horas_Estimadas = p.Horas_Estimadas,
                                  Horas_Invertidas = p.Horas_Invertidas,
                                  Estado = p.Estado,
                                  Usuario_Creacion = p.Usuario_Creacion,
                                  Usuario_Modificacion = p.Usuario_Modificacion,
                                  Fecha_Creacion = p.Fecha_Creacion,
                                  Fecha_Modificacion = p.Fecha_Modificacion

                              }).ToList();


                if (result != null)
                    return result;
            }
            catch (Exception ex)
            {
                throw;
            }
            return new List<EtapaProyecto>();
        }
        public bool InsertarEtapaProyecto(EtapaProyecto eProyecto)
        {
            try
            {
                _db.SP_ADM_Insertar_Etapa_Proyecto(eProyecto.Descripcion, eProyecto.ID_Proyecto, eProyecto.Horas_Estimadas, eProyecto.Estado, eProyecto.Usuario_Creacion);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool EditarEtapaProyecto(EtapaProyecto eProyecto)
        {
            try
            {
                _db.SP_ADM_Editar_Etapa_Proyecto(eProyecto.ID, eProyecto.Descripcion, eProyecto.Horas_Estimadas, eProyecto.Estado, eProyecto.Usuario_Modificacion);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}