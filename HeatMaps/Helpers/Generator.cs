using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using HeatMaps.ExternalModels;
using Microsoft.AspNetCore.Http;

namespace HeatMaps.Helpers {
    public static class Generator {
        public static GeoModel Create() {
            return new GeoModel {
                Type = "FeatureCollection",
                Crs = new Crs {
                    Type = "name",
                    Properties = new CrsProperties {
                        Name = "urn:ogc:def:crs:OGC:1.3:CRS84"
                    }
                },
                Features = new List<Feature>()
            };
        }

        //public static void CopyTo(this HttpRequest source, HttpWebRequest destination) {
        //    destination.Method = source.Method;

        //    // Copy unrestricted headers (including cookies, if any)
        //    foreach (var hk in source.Headers) {
        //        destination.Headers[hk.Key] = hk.Value;
        //    }

        //    // Copy restricted headers
        //    //if (source.AcceptTypes.Any()) {
        //    //    destination.Accept = string.Join(",", source.AcceptTypes);
        //    //}
        //    destination.ContentType = source.ContentType;

        //    // Copy content (if content body is allowed)
        //    if (source.Method != "GET"
        //        && source.Method != "HEAD"
        //        && source.ContentLength > 0) {
        //        var destinationStream = destination.GetRequestStream();
        //        source.InputStream.CopyTo(destinationStream);
        //        destinationStream.Close();
        //    }
        //}

    }
}
