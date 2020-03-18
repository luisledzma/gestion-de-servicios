using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using API.Controllers;
using API.WebserviceData;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Security.Cryptography;
using System.IO;

namespace API.LogicaNegocio
{
    public class ReporteL
    {
        DataServiceDataContext _db = new DataServiceDataContext();
        public List<Reporte> GetReportes(string usuarioConsulta)
        {
            try
            {
                var result = (from r in _db.SP_ADM_Seleccionar_Reportes(usuarioConsulta)
                              select new Reporte
                              {
                                  ID = r.ID,
                                  ID_Cliente = r.ID_Cliente,
                                  Cliente = r.Cliente,
                                  ID_Tipo_Reporte = r.ID_Tipo_Reporte,
                                  Descripcion_Tipo_Reporte = r.Descripcion_Tipo_Reporte,
                                  Hora_Inicio = r.Hora_Inicio,
                                  Hora_Final = r.Hora_Final,
                                  Total_Horas = r.Total_Horas.ToString(),
                                  Horas_A_Facturar = r.Horas_A_Facturar,
                                  ID_Tareas_Estandar = r.ID_Tareas_Estandar,
                                  Tareas_Estandar = r.Tareas_Estandar,
                                  Descripcion = r.Descripcion,
                                  Observaciones = r.Observaciones,
                                  Estado = r.Estado,
                                  Usuario_Creacion = r.Usuario_Creacion,
                                  Usuario_Modificacion = r.Usuario_Modificacion,
                                  Fecha_Creacion = r.Fecha_Creacion,
                                  Fecha_Modificacion = r.Fecha_Modificacion
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
            return new List<Reporte>();
        }
        public List<TipoReporte> GetTipoReportes()
        {
            try
            {
                var result = (from r in _db.SP_ADM_Seleccionar_Tipo_Reportes()
                              select new TipoReporte
                              {
                                  ID = r.ID,
                                  Descripcion = r.Descripcion,
                                  Estado = r.Estado,
                                  Usuario_Creacion = r.Usuario_Creacion,
                                  Usuario_Modificacion = r.Usuario_Modificacion,
                                  Fecha_Creacion = r.Fecha_Creacion,
                                  Fecha_Modificacion = r.Fecha_Modificacion
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
            return new List<TipoReporte>();
        }
        public bool InsertarReporte(Reporte reporte)
        {
            int? idReporte = 0;
            string correoCliente = "";
            try
            {
                DateTime begin = DateTime.Parse(reporte.Begin_Hour);
                DateTime end = DateTime.Parse(reporte.End_Hour);
                var result = _db.SP_ADM_Insertar_Reporte(reporte.ID_Cliente, reporte.ID_Tipo_Reporte, reporte.ID_Proyecto,reporte.ID_Etapa_Proyecto,reporte.ID_Contrato,reporte.ID_Proyecto_Garantia,reporte.ID_Contrato_Garantia,begin, end, reporte.Horas_A_Facturar, reporte.ID_Tareas_Estandar, reporte.Descripcion, reporte.Observaciones, 'P', reporte.Usuario_Creacion, ref idReporte, ref correoCliente);


                EnviarCorreo(correoCliente, (int)idReporte);

                if(result < 0)
                {
                    return false;
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public bool EditarReporte(Reporte reporte)
        {
            try
            {
                _db.SP_ADM_Editar_Reporte(reporte.ID,reporte.Descripcion,reporte.Observaciones,reporte.Estado,reporte.Usuario_Modificacion);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool EditarReporteRespuestaCorreo(RespuestaCorreo respuesta)
        {
            try
            {
                var result2 = Decrypt(respuesta.Mensaje_Encriptado, respuesta.Clave);

                var reporte = _db.TBL_GS_REPORTE.FirstOrDefault(c => c.ID.Equals(result2));

                if (reporte.Correo_Respondido == false)
                {
                    var aprobacion = _db.SP_ADM_Aprobacion_Reporte(Convert.ToInt32(result2), respuesta.Estado);
                    if (aprobacion < 0)
                    {
                        return false;
                    }
                }
                else
                {
                    return false;
                }

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        // --------------------------------------------------
        // ---------------PARA EDITAR REPORTE----------------
        public void EnviarCorreo(string correo, int idFormulario)
        {
            int idReporte = 0;
            try
            {
                // var reporte = _db.TBL_GS_REPORTE.FirstOrDefault(c => c.ID.Equals(idFormulario));

                var reporte = (from r in _db.SP_ADM_Seleccionar_Reporte_Por_Id(idFormulario)
                               select new Reporte
                               {
                                   ID = r.ID,
                                   ID_Cliente = r.ID_Cliente,
                                   Cliente = r.Cliente,
                                   ID_Tipo_Reporte = r.ID_Tipo_Reporte,
                                   Descripcion_Tipo_Reporte = r.Descripcion_Tipo_Reporte,
                                   Hora_Inicio = r.Hora_Inicio,
                                   Hora_Final = r.Hora_Final,
                                   Total_Horas = r.Total_Horas.ToString(),
                                   Horas_A_Facturar = r.Horas_A_Facturar,
                                   ID_Tareas_Estandar = r.ID_Tareas_Estandar,
                                   Tareas_Estandar = r.Tareas_Estandar,
                                   Descripcion = r.Descripcion,
                                   Observaciones = r.Observaciones,
                                   Estado = r.Estado,
                                   Usuario_Creacion = r.Usuario_Creacion,
                                   Usuario_Modificacion = r.Usuario_Modificacion,
                                   Fecha_Creacion = r.Fecha_Creacion,
                                   Fecha_Modificacion = r.Fecha_Modificacion,
                                   Correo_Enviado = (bool)r.Correo_Enviado,
                                   Correo_Respondido = (bool)r.Correo_Respondido
                               }).FirstOrDefault();

                if(reporte != null)
                {
                    idReporte = reporte.ID;
                    if (reporte.Correo_Enviado == false)
                    {
                        var resulte = Encrypt(idFormulario.ToString(), "CB5%182");

                        var token = TokenGenerator.GenerateTokenJwt(resulte);

                        System.Text.StringBuilder message = new System.Text.StringBuilder();


                        MailMessage email = new MailMessage
                        {
                            Subject = "Aprobación del correo",
                            From = new MailAddress("test.gestionproyectos@gmail.com"),
                            SubjectEncoding = Encoding.UTF8,
                            IsBodyHtml = true
                        };

                        message.Append($"<p>Se ha generado un reporte con el detalle siguiente: </p>");
                        message.Append($"<br>");
                        message.Append("<ul>");
                        message.Append($"<li>Tipo del reporte: {reporte.Descripcion_Tipo_Reporte}</li>");
                        message.Append($"<li>Tarea estandar: {reporte.Tareas_Estandar}</li>");
                        message.Append($"<li>Descripción: {reporte.Descripcion}</li>");
                        message.Append($"<li>Observaciones: {reporte.Observaciones}</li>");
                        message.Append($"<li>Horas Totales: {reporte.Total_Horas}</li>");
                        message.Append("</ul>");
                        message.Append("<br>");
                        message.Append("<p>Para aprobar dirígase al siguiente link: </p>");
                        message.Append("<br>");
                        message.Append($"<a href='http://localhost:4200/correo?id=" + token + "'>Confirmar</a>");


                        //email.To.Add("jimenezjozsef@gmail.com");
                        email.To.Add(correo);

                        email.Body = message.ToString();

                        SmtpClient cliente = new SmtpClient("smtp.gmail.com", 587)
                        {
                            EnableSsl = true,
                            DeliveryMethod = SmtpDeliveryMethod.Network,
                            UseDefaultCredentials = false,
                            Credentials = new NetworkCredential("test.gestionproyectos@gmail.com", "C0ntras3nna") // Agregar las credenciales del correo con el que se va a enviar la confirmacion
                        };
                        cliente.Send(email);
                        _db.SP_ADM_Editar_Correo_Enviado(reporte.ID, true);
                    }
                }
            }
            catch (Exception ex)
            {
                _db.SP_ADM_Editar_Correo_Enviado(idReporte, false);
                throw ex;
            }
        }

        // Metodos para encriptar y desencriptar el link del correo.
        public static string Encrypt(string plainText, string password)
        {
            if (plainText == null)
            {
                return null;
            }

            if (password == null)
            {
                password = String.Empty;
            }

            // Get the bytes of the string
            var bytesToBeEncrypted = Encoding.UTF8.GetBytes(plainText);
            var passwordBytes = Encoding.UTF8.GetBytes(password);

            // Hash the password with SHA256
            passwordBytes = SHA256.Create().ComputeHash(passwordBytes);

            var bytesEncrypted = Encrypt(bytesToBeEncrypted, passwordBytes);

            return Convert.ToBase64String(bytesEncrypted);
        }
        private static byte[] Encrypt(byte[] bytesToBeEncrypted, byte[] passwordBytes)
        {
            byte[] encryptedBytes = null;

            // Set your salt here, change it to meet your flavor:
            // The salt bytes must be at least 8 bytes.
            var saltBytes = new byte[] { 1, 2, 3, 4, 5, 6, 7, 8 };

            using (MemoryStream ms = new MemoryStream())
            {
                using (RijndaelManaged AES = new RijndaelManaged())
                {
                    var key = new Rfc2898DeriveBytes(passwordBytes, saltBytes, 1000);

                    AES.KeySize = 256;
                    AES.BlockSize = 128;
                    AES.Key = key.GetBytes(AES.KeySize / 8);
                    AES.IV = key.GetBytes(AES.BlockSize / 8);

                    AES.Mode = CipherMode.CBC;

                    using (var cs = new CryptoStream(ms, AES.CreateEncryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(bytesToBeEncrypted, 0, bytesToBeEncrypted.Length);
                        cs.Close();
                    }

                    encryptedBytes = ms.ToArray();
                }
            }

            return encryptedBytes;
        }

        public static string Decrypt(string encryptedText, string password)
        {
            if (encryptedText == null)
            {
                return null;
            }

            if (password == null)
            {
                password = String.Empty;
            }

            // Get the bytes of the string
            var bytesToBeDecrypted = Convert.FromBase64String(encryptedText);
            var passwordBytes = Encoding.UTF8.GetBytes(password);

            passwordBytes = SHA256.Create().ComputeHash(passwordBytes);

            var bytesDecrypted = Decrypt(bytesToBeDecrypted, passwordBytes);

            return Encoding.UTF8.GetString(bytesDecrypted);
        }
        private static byte[] Decrypt(byte[] bytesToBeDecrypted, byte[] passwordBytes)
        {
            byte[] decryptedBytes = null;

            // Set your salt here, change it to meet your flavor:
            // The salt bytes must be at least 8 bytes.
            var saltBytes = new byte[] { 1, 2, 3, 4, 5, 6, 7, 8 };

            using (MemoryStream ms = new MemoryStream())
            {
                using (RijndaelManaged AES = new RijndaelManaged())
                {
                    var key = new Rfc2898DeriveBytes(passwordBytes, saltBytes, 1000);

                    AES.KeySize = 256;
                    AES.BlockSize = 128;
                    AES.Key = key.GetBytes(AES.KeySize / 8);
                    AES.IV = key.GetBytes(AES.BlockSize / 8);
                    AES.Mode = CipherMode.CBC;

                    using (var cs = new CryptoStream(ms, AES.CreateDecryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(bytesToBeDecrypted, 0, bytesToBeDecrypted.Length);
                        cs.Close();
                    }

                    decryptedBytes = ms.ToArray();
                }
            }

            return decryptedBytes;
        }
    }
}