using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace HeatMaps.Pages {
    public class PrivacyModel : PageModel {
        public ActionResult OnGet(int z, int x, int y) {
            try {
                var baseUrl =
                    $"https://gibs-c.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi?TIME=2018-10-20T00:00:00Z&layer=MERRA2_SO2_Column_Mass_Density_Monthly&style=default&tilematrixset=2km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=2&TileCol=2&TileRow=2";

                var request = (HttpWebRequest) WebRequest.Create(baseUrl);
                foreach (var h in HttpContext.Request.Headers)
                    request.Headers[h.Key] = h.Value;


                request.AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate;
                request.Method = "GET";
                
                using (var response = (HttpWebResponse) request.GetResponse())
                using (var stream = response.GetResponseStream()) {
                    HttpContext.Response.ContentType = response.ContentType;
                    stream.CopyTo(HttpContext.Response.Body);
                    return File(stream, response.ContentType);
                }

                //byte[] data = Encoding.UTF8.GetBytes(jsonString);
                //Response.ContentType = "application/json";
                //await Response.Body.WriteAsync(data, 0, data.Length);
            }
            catch (Exception e) {
                var a = 0;
            }

            return BadRequest();
        }

        public ActionResult OnGetTransform(int z, int x, int y) {
            try {
                var baseUrl =
                    $"https://gibs-c.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi?TIME=2018-10-20T00:00:00Z&layer=MERRA2_SO2_Column_Mass_Density_Monthly&style=default&tilematrixset=2km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=2&TileCol=2&TileRow=2";

                var request = (HttpWebRequest)WebRequest.Create(baseUrl);
                foreach (var h in HttpContext.Request.Headers)
                    request.Headers[h.Key] = h.Value;


                request.AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate;
                request.Method = "GET";

                using (var response = (HttpWebResponse)request.GetResponse())
                using (var stream = response.GetResponseStream()) {
                    HttpContext.Response.ContentType = response.ContentType;
                    stream.CopyTo(HttpContext.Response.Body);
                }
                //byte[] data = Encoding.UTF8.GetBytes(jsonString);
                //Response.ContentType = "application/json";
                //await Response.Body.WriteAsync(data, 0, data.Length);
            } catch (Exception e) {
                var a = 0;
            }

            return Content("bla");
        }
    }
}