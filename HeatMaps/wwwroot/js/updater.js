$(document).ready(function () {
    connection.on("FlyTo", function (x, y, z) {
        mapFlyTox(x, y, z);
    });

    connection.on("Zoom", function (z) {
        mapZoom(z);
    });

    connection.on("Clean", function () {
        clearMap();
    });

    connection.on("UpdateData", function (type, from, to, city, lon, lat) {
        clearMap();
        time = "TIME=" + from + "Z";
        addLayer(dict[type]);
        mapFlyTo(lon, lat, 6);
    });
});