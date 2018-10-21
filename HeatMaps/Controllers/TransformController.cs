using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Security;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace HeatMaps.Controllers
{
    public class TransformController : Controller
    {
        public async Task<IActionResult> Index(int z = 1, int x = 1, int y = 1, int d1 = 1, int d2 = 1, int d3 = 1)
        {
            try {
                var baseUrl =
                    $"https://gibs-c.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi?TIME=2018-10-20T00:00:00Z&layer=MODIS_Terra_Land_Surface_Temp_Day&style=default&tilematrixset=1km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix={z - d1}&TileCol={x - d2}&TileRow={y - d3}";

                var request = (HttpWebRequest)WebRequest.Create(baseUrl);
                foreach (var h in HttpContext.Request.Headers)
                    request.Headers[h.Key] = h.Value;


                request.AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate;
                request.Method = "GET";
                request.Timeout = int.MaxValue;
                var ms = new MemoryStream();
                var ct = "";
                using (var response = (HttpWebResponse)request.GetResponse())
                using (var stream = response.GetResponseStream()) {
                    ct = response.ContentType;
                    var str = ReadMessage(stream);
                    return File(str, ct);
                    //System.IO.File.WriteAllText(str, @"C:\Users\nemesis\Desktop\NASA\a.jpg");
                    await stream.CopyToAsync(ms);


                    //HttpContext.Response.ContentType = response.ContentType;
                    //stream.CopyTo(HttpContext.Response.Body);

                }
                //var outStream = System.IO.File.OpenWrite(@"C:\Users\nemesis\Desktop\NASA\a.jpg");
                //ms.WriteTo(outStream);

                return File(ms, ct);
                //byte[] data = Encoding.UTF8.GetBytes(jsonString);
                //Response.ContentType = "application/json";
                //await Response.Body.WriteAsync(data, 0, data.Length);
            } catch (Exception e) {
                var a = 0;
            }

            return BadRequest();
        }

        static byte[] ReadMessage(Stream sslStream) {
            // Read the  message sent by the server.
            // The end of the message is signaled using the
            // "<EOF>" marker.
            var byList = new List<byte>();
            byte[] buffer = new byte[2048];
            StringBuilder messageData = new StringBuilder();
            int bytes = -1;
            do {
                bytes = sslStream.Read(buffer, 0, buffer.Length);
                byList.AddRange(buffer);

                // Use Decoder class to convert from bytes to UTF8
                // in case a character spans two buffers.
                Decoder decoder = Encoding.UTF8.GetDecoder();
                char[] chars = new char[decoder.GetCharCount(buffer, 0, bytes)];
                decoder.GetChars(buffer, 0, bytes, chars, 0);
                messageData.Append(chars);
                // Check for EOF.
                if (messageData.ToString().IndexOf("<EOF>") != -1) {
                    break;
                }
            } while (bytes != 0);

            return byList.ToArray();
        }
    }
}