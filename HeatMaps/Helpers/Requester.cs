using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace HeatMaps.Helpers {
    public static class Requester {
        private static Dictionary<string, KeyValuePair<double, double>> predef = new Dictionary<string, KeyValuePair<double, double>> {
            {"madrid", new KeyValuePair<double, double>(40,75) },
            {"london", new KeyValuePair<double, double>(44,78) },
            {"new york", new KeyValuePair<double, double>(-48,75) },
            {"pretoria", new KeyValuePair<double, double>(78,33) },
            {"berlin", new KeyValuePair<double, double>(61,79) },
        };

    public static Model Do(string input, string url) {
            //return new Model {
            //    Type = "populationDensity2010",
            //    FromDate = "2017-01-20T00:00:00"
            //};

            using (var client = new HttpClient(new HttpClientHandler { AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate })) {
                client.BaseAddress = new Uri(url);
                var response = client.GetAsync($"?query={System.Web.HttpUtility.HtmlEncode(input)}").Result;
                response.EnsureSuccessStatusCode();
                var strRespo = response.Content.ReadAsStringAsync().Result;
                var bm = JsonConvert.DeserializeObject<BotModel>(strRespo);


                var pm = predef.SingleOrDefault(x => x.Key == bm.location.name.ToLower());

                return new Model {
                    City = bm.location.name,
                    FromDate = bm.datetime.from.value.ToString("yyyy-MM-ddThh:mm:ss"),
                    Msg = input,
                    Type = bm.@event == "earthquakes" ? "populationDensity2010" : bm.@event,
                    Lat = !string.IsNullOrEmpty(pm.Key) ? pm.Value.Key.ToString() : (bm.location.lat + 47).ToString(),
                    Lon = !string.IsNullOrEmpty(pm.Key) ? pm.Value.Value.ToString() : bm.location.lon.ToString()
                };
            }
        }
    }

    

    public class Model {
        public string Type { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string City { get; set; }
        public string Msg { get; set; }
        public string Lon { get; set; }
        public string Lat { get; set; }
    }

    public class Location {
        public string name { get; set; }
        public double lon { get; set; }
        public double lat { get; set; }
    }

    public class To {
        public DateTime value { get; set; }
        public string grain { get; set; }
    }

    public class From {
        public DateTime value { get; set; }
        public string grain { get; set; }
    }

    public class Datetime {
        public To to { get; set; }
        public From from { get; set; }
        public string type { get; set; }
    }

    public class BotModel {
        public string @event { get; set; }
        public Location location { get; set; }
        public Datetime datetime { get; set; }
    }
}
