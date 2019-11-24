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
        private readonly DataServiceDataContext _db = new DataServiceDataContext();
        public List<Reporte> GetReportes()
        {
            try
            {
                var result = (from r in _db.SP_ADM_Seleccionar_Reportes()
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


                //var resulte = Encrypt("Prueba Encrypte", "MECAGO");
                //var result2 = Decrypt(resulte,"MECAGOS");
                // EnviarCorreo("jimenezjozsef@hotmail.com", "2019");
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
                var result = _db.SP_ADM_Insertar_Reporte(reporte.ID_Cliente, reporte.ID_Tipo_Reporte, reporte.ID_Proyecto,reporte.ID_Etapa_Proyecto,reporte.ID_Contrato,reporte.ID_Proyecto_Garantia,reporte.ID_Contrato_Garantia,reporte.Hora_Inicio, reporte.Hora_Final, reporte.Horas_A_Facturar, reporte.ID_Tareas_Estandar, reporte.Descripcion, reporte.Observaciones, 'P', reporte.Usuario_Creacion, ref idReporte, ref correoCliente);


                EnviarCorreo(correoCliente, idReporte.ToString());

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
            catch (Exception)
            {
                return false;
            }
        }
        // --------------------------------------------------
        // ---------------PARA EDITAR REPORTE----------------
        public void EnviarCorreo(string correo, string idFormulario)
        {
            try
            {
                var reporte = _db.TBL_GS_REPORTE.FirstOrDefault(c => c.ID.Equals(idFormulario));
                if(reporte.Correo_Enviado == false)
                {
                    var resulte = Encrypt(idFormulario, "CB5%182");

                    var token = TokenGenerator.GenerateTokenJwt(resulte);


                    MailMessage email = new MailMessage("jimenezjozsef@gmail.com", correo, "Prueba", "<p>Se realizaron las tareas para el reporte "+reporte.Descripcion +" para aprovar dirijase al siguiente link</p><a href='http://localhost:4201/correo?id=" + token + "'>Confirmar</a>");
                    email.IsBodyHtml = true;
                    SmtpClient cliente = new SmtpClient("smtp.gmail.com", 587)
                    {
                        EnableSsl = true,
                        DeliveryMethod = SmtpDeliveryMethod.Network,
                        UseDefaultCredentials = false,
                        Credentials = new NetworkCredential("jimenezjozsef@gmail.com", "") // Agregar las credenciales del correo con el que se va a enviar la confirmacion
                    };
                    cliente.Send(email);
                    reporte.Correo_Enviado = true;
                    _db.SubmitChanges();
                }
            }
            catch (Exception ex)
            {
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