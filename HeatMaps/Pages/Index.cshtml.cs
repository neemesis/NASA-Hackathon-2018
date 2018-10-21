using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace HeatMaps.Pages {
    public class IndexModel : PageModel {
        public void OnGet(string d = "/json/earthquakes.geojson") {
              ViewData["url"] = d;
        }
    }
}
