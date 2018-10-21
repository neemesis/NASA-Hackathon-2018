// To parse this JSON data, add NuGet 'Newtonsoft.Json' then do:
//
//    using ExternalModels;
//
//    var earthquakeModel = GeoModel.FromJson(jsonString);

using System.Collections.Generic;

namespace HeatMaps.ExternalModels {
    using System;

    using System.Globalization;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Converters;

    public partial class GeoModel {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("crs")]
        public Crs Crs { get; set; }

        [JsonProperty("features")]
        public List<Feature> Features { get; set; }
    }

    public partial class Crs {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("properties")]
        public CrsProperties Properties { get; set; }
    }

    public partial class CrsProperties {
        [JsonProperty("name")]
        public string Name { get; set; }
    }

    public partial class Feature {
        [JsonProperty("type")]
        public FeatureType Type { get; set; }

        [JsonProperty("properties")]
        public FeatureProperties Properties { get; set; }

        [JsonProperty("geometry")]
        public Geometry Geometry { get; set; }
    }

    public partial class Geometry {
        [JsonProperty("type")]
        public GeometryType Type { get; set; }

        [JsonProperty("coordinates")]
        public List<double> Coordinates { get; set; }
    }

    public partial class FeatureProperties {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("mag")]
        public double Mag { get; set; }

        [JsonProperty("time")]
        public long Time { get; set; }

        [JsonProperty("felt")]
        public long? Felt { get; set; }

        [JsonProperty("extra")]
        public string Extra { get; set; }
    }

    public enum GeometryType { Point };

    public enum FeatureType { Feature };

    public partial class GeoModel {
        public static GeoModel FromJson(string json) => JsonConvert.DeserializeObject<GeoModel>(json, Converter.Settings);
    }

    public static class Serialize {
        public static string ToJson(this GeoModel self) => JsonConvert.SerializeObject(self, Converter.Settings);
    }

    internal static class Converter {
        public static readonly JsonSerializerSettings Settings = new JsonSerializerSettings {
            MetadataPropertyHandling = MetadataPropertyHandling.Ignore,
            DateParseHandling = DateParseHandling.None,
            Converters = {
                GeometryTypeConverter.Singleton,
                FeatureTypeConverter.Singleton,
                new IsoDateTimeConverter { DateTimeStyles = DateTimeStyles.AssumeUniversal }
            },
        };
    }

    internal class GeometryTypeConverter : JsonConverter {
        public override bool CanConvert(Type t) => t == typeof(GeometryType) || t == typeof(GeometryType?);

        public override object ReadJson(JsonReader reader, Type t, object existingValue, JsonSerializer serializer) {
            if (reader.TokenType == JsonToken.Null) return null;
            var value = serializer.Deserialize<string>(reader);
            if (value == "Point") {
                return GeometryType.Point;
            }
            throw new Exception("Cannot unmarshal type GeometryType");
        }

        public override void WriteJson(JsonWriter writer, object untypedValue, JsonSerializer serializer) {
            if (untypedValue == null) {
                serializer.Serialize(writer, null);
                return;
            }
            var value = (GeometryType)untypedValue;
            if (value == GeometryType.Point) {
                serializer.Serialize(writer, "Point");
                return;
            }
            throw new Exception("Cannot marshal type GeometryType");
        }

        public static readonly GeometryTypeConverter Singleton = new GeometryTypeConverter();
    }

    internal class FeatureTypeConverter : JsonConverter {
        public override bool CanConvert(Type t) => t == typeof(FeatureType) || t == typeof(FeatureType?);

        public override object ReadJson(JsonReader reader, Type t, object existingValue, JsonSerializer serializer) {
            if (reader.TokenType == JsonToken.Null) return null;
            var value = serializer.Deserialize<string>(reader);
            if (value == "Feature") {
                return FeatureType.Feature;
            }
            throw new Exception("Cannot unmarshal type FeatureType");
        }

        public override void WriteJson(JsonWriter writer, object untypedValue, JsonSerializer serializer) {
            if (untypedValue == null) {
                serializer.Serialize(writer, null);
                return;
            }
            var value = (FeatureType)untypedValue;
            if (value == FeatureType.Feature) {
                serializer.Serialize(writer, "Feature");
                return;
            }
            throw new Exception("Cannot marshal type FeatureType");
        }

        public static readonly FeatureTypeConverter Singleton = new FeatureTypeConverter();
    }
}
