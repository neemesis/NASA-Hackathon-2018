var token = 'pk.eyJ1IjoibmVlZW1lc2lzIiwiYSI6ImNqbmZvcTB5bjAyN2kzcXFuMDdhdmkxdG8ifQ.1Pcn_x5WJJfrgz_qNSni3w';

var prependC = "https://gibs-c.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi?";
var prependB = "https://gibs-b.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi?";
var prependA = "https://gibs-a.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi?";
var prepend = "https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi?";
var time = "TIME=2017-01-20T00:00:00Z";
var append = '&TileMatrix={z}&TileCol={x}&TileRow={y}';

var dict = {
    regular: '&layer=MODIS_Terra_CorrectedReflectance_TrueColor&style=default&tilematrixset=250m&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fjpeg',
    night: '&layer=VIIRS_CityLights_2012&style=default&tilematrixset=500m&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fjpeg',
    labels: '&layer=Reference_Labels&style=default&tilematrixset=250m&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',
    roads: '&layer=Reference_Features&style=default&tilematrixset=250m&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',

    // Air Quality
    carbonMonoxideL2: '&layer=MOPITT_CO_Daily_Total_Column_L2&style=default&tilematrixset=2km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',
    ozone50hpa: '&layer=MERRA2_Ozone_Mixing_Ratio_50hPa_Monthly&style=default&tilematrixset=2km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',
    sulfureDioxide: '&layer=MERRA2_SO2_Column_Mass_Density_Monthly&style=default&tilematrixset=2km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',
    aerosolIndex: '&layer=OMI_Aerosol_Index&style=default&tilematrixset=2km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',

    // Ash Plumes
    aerosolOpticalDepts: '&layer=MISR_Aerosol_Optical_Depth_Avg_Green_Monthly&style=default&tilematrixset=2km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',

    // Drought
    landSurfTempDay: '&layer=MODIS_Terra_Land_Surface_Temp_Day&style=default&tilematrixset=1km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',
    landSurfTempNight: '&layer=MODIS_Terra_Land_Surface_Temp_Night&style=default&tilematrixset=1km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',
    precipEstimateDay: '&layer=AIRS_Precipitation_Day&style=default&tilematrixset=2km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',
    precipEstimateNight: '&layer=AIRS_Precipitation_Night&style=default&tilematrixset=2km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',
    temp400hpaDay: '&layer=AIRS_Temperature_400hPa_Day&style=default&tilematrixset=2km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',
    temp400hpaNight: '&layer=AIRS_Temperature_400hPa_Night&style=default&tilematrixset=2km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',
    surfaceAirTemp: '&layer=AIRS_Surface_Air_Temperature_Daily_Day&style=default&tilematrixset=2km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',
    snowCover: '&layer=MODIS_Terra_NDSI_Snow_Cover&style=default&tilematrixset=500m&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',
    snowWaterEq: '&layer=AMSR2_Snow_Water_Equivalent&style=default&tilematrixset=2km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',
    soilMoisture: '&layer=SMAP_Sentinel-1_L2_Active_Passive_Soil_Moisture&style=default&tilematrixset=2km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',
    vegetationIndexNorm: '&layer=MODIS_Terra_NDVI_8Day&style=default&tilematrixset=250m&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',

    // Dust Storms
    dustPM25: '&layer=MERRA2_Dust_Surface_Mass_Concentration_PM25_Monthly&style=default&tilematrixset=2km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',
    dustMassConc: '&layer=MERRA2_Dust_Surface_Mass_Concentration_Monthly&style=default&tilematrixset=2km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',
    totalDust: '&layer=MERRA2_Total_Dust_Deposition_Dry_Wet_Monthly&style=default&tilematrixset=2km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',

    // Fires
    antropogenicBiomes: '&layer=Anthropogenic_Biomes_of_the_World_2001-2006&style=default&tilematrixset=1km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',
    croplands: '&layer=Agricultural_Lands_Croplands_2000&style=default&tilematrixset=1km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',
    pastures: '&layer=Agricultural_Lands_Pastures_2000&style=default&tilematrixset=1km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',

    // Floods
    cloudFractureDay: '&layer=MODIS_Terra_Cloud_Fraction_Day&style=default&tilematrixset=2km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',
    cloudFractureNight: '&layer=MODIS_Terra_Cloud_Fraction_Night&style=default&tilematrixset=2km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',
    cloudMultiLayerFlag: '&layer=MODIS_Terra_Cloud_Multi_Layer_Flag&style=default&tilematrixset=1km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',
    cloudPressureDay: '&layer=MODIS_Terra_Cloud_Top_Pressure_Day&style=default&tilematrixset=2km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',
    cloudPressureNight: '&layer=MODIS_Terra_Cloud_Top_Pressure_Night&style=default&tilematrixset=2km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',
    cloudEffectiveRadius: '&layer=MODIS_Terra_Cloud_Effective_Radius&style=default&tilematrixset=1km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',
    cloudTopTemperature: '&layer=MODIS_Terra_Cloud_Top_Temp_Day&style=default&tilematrixset=2km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',
    cloutTopHeight: '&layer=MODIS_Terra_Cloud_Top_Height_Day&style=default&tilematrixset=2km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',
    floodHazard: '&layer=NDH_Flood_Hazard_Frequency_Distribution_1985-2003&style=default&tilematrixset=1km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',
    global250mWaterMap: '&layer=MODIS_Water_Mask&style=default&tilematrixset=250m&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',
    urbanRuralExtentsBelow10mElevation: '&layer=LECZ_Urban_Rural_Extents_Below_10m&style=default&tilematrixset=1km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',
    waterVaporDay: '&layer=MODIS_Aqua_Water_Vapor_5km_Day&style=default&tilematrixset=2km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',
    waterVaporNight: '&layer=MODIS_Aqua_Water_Vapor_5km_Night&style=default&tilematrixset=2km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',

    // Storms
    windSpeedDay: '&layer=AMSR2_Wind_Speed_Day&style=default&tilematrixset=2km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',
    surfaceWindSpeed: '&layer=MERRA2_Surface_Wind_Speed_Monthly&style=default&tilematrixset=2km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',

    // Shipping
    seaIce: '&layer=MODIS_Aqua_Sea_Ice&style=default&tilematrixset=1km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',

    // Vegetation
    mangroveForests: '&layer=Mangrove_Forest_Distribution_2000&style=default&tilematrixset=1km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',
    grossPrimaryProduction: '&layer=SMAP_L4_Mean_Gross_Primary_Productivity&style=default&tilematrixset=2km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',
    heterotropicRespiration: '&layer=SMAP_L4_Mean_Heterotrophic_Respiration&style=default&tilematrixset=2km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',
    co2Exchange: '&layer=SMAP_L4_Mean_Net_Ecosystem_Exchange&style=default&tilematrixset=2km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',
    snowMass: '&layer=SMAP_L4_Snow_Mass&style=default&tilematrixset=2km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',
    potentialVegetationLightUse: '&layer=SMAP_L4_Emult_Average&style=default&tilematrixset=2km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',
    chlorophyll: '&layer=MODIS_Terra_Chlorophyll_A&style=default&tilematrixset=1km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',

    // Other
    globalDigitalElevation: '&layer=ASTER_GDEM_Color_Index&style=default&tilematrixset=31.25m&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',
    shuttleRadarTopology: '&layer=SRTM_Color_Index&style=default&tilematrixset=31.25m&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',
    populationDensity2000: '&layer=GPW_Population_Density_2000&style=default&tilematrixset=1km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',
    populationDensity2005: '&layer=GPW_Population_Density_2005&style=default&tilematrixset=1km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',
    populationDensity2010: '&layer=GPW_Population_Density_2010&style=default&tilematrixset=1km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',
    populationDensity2015: '&layer=GPW_Population_Density_2015&style=default&tilematrixset=1km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',
    populationDensity2020: '&layer=GPW_Population_Density_2020&style=default&tilematrixset=1km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng',
}

mapboxgl.accessToken = token;
//var map = new mapboxgl.Map({
//    container: 'map',
//    style: 'mapbox://styles/mapbox/navigation-guidance-night-v2',
//    center: [-120, 50],
//    zoom: 0
//});

var map = L.map('map').setView([70, 50], 3);

var newLayers = [];

addLayer(dict["night"], "night");
addLayer(dict["roads"], "roads");
addLayer(dict["labels"], "labels");

function addLayer(layerUrl, name) {
    var l = L.tileLayer(prepend + time + layerUrl + append,
        {
            //attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: name ? name : 'mapbox_' + Math.random(),
            accessToken: token
        }).addTo(map);

    if (!name) newLayers.push(l);

    return l;
}

function clearMap() {
    newLayers.forEach(function (item) {
        map.removeLayer(item);
    });
}

function mapZoom(zoom) {
    map.setZoom(zoom);
}

function mapFlyTo(x, y, zoom) {
    map.setView(L.latLng(x, y), zoom);
}

map.on('load', function () {
    console.log("in load");
    // Add a geojson point source.
    // Heatmap layers also work with a vector tile source.
    map.addSource('datasource', {
        "type": "geojson",
        "data": JSON_URL//"https://www.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
    });

    //map.addLayer({
    //    "id": "datasource-heat",
    //    "type": "heatmap",
    //    "source": "datasource",
    //    "maxzoom": 9,
    //    "paint": {
    //        // Increase the heatmap weight based on frequency and property magnitude
    //        "heatmap-weight": [
    //            "interpolate",
    //            ["linear"],
    //            ["get", "mag"],
    //            0, 0,
    //            6, 1
    //        ],
    //        // Increase the heatmap color weight weight by zoom level
    //        // heatmap-intensity is a multiplier on top of heatmap-weight
    //        "heatmap-intensity": [
    //            "interpolate",
    //            ["linear"],
    //            ["zoom"],
    //            0, 1,
    //            9, 3
    //        ],
    //        // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
    //        // Begin color ramp at 0-stop with a 0-transparancy color
    //        // to create a blur-like effect.
    //        // "heatmap-color": [
    //        //     "interpolate",
    //        //     ["linear"],
    //        //     ["heatmap-density"],
    //        //     0, "rgba(33,102,172,0)",
    //        //     0.2, "rgb(103,169,207)",
    //        //     0.4, "rgb(209,229,240)",
    //        //     0.6, "rgb(253,219,199)",
    //        //     0.8, "rgb(239,138,98)",
    //        //     1, "rgb(178,24,43)"
    //        // ],
    //        "heatmap-color": [
    //            "interpolate",
    //            ["linear"],
    //            ["heatmap-density"],
    //            0, "rgba(255, 112, 169,0)",
    //            0.2, "rgb(248, 100, 159)",
    //            0.4, "rgb(223, 56, 123)",
    //            0.6, "rgb(216, 44, 113)",
    //            0.8, "rgb(203, 22, 95)",
    //            1, "rgb(191, 0, 77)"
    //        ],
    //        // Adjust the heatmap radius by zoom level
    //        "heatmap-radius": [
    //            "interpolate",
    //            ["linear"],
    //            ["zoom"],
    //            0, 2,
    //            9, 20
    //        ],
    //        // Transition from heatmap to circle layer by zoom level
    //        "heatmap-opacity": [
    //            "interpolate",
    //            ["linear"],
    //            ["zoom"],
    //            7, 1,
    //            9, 0
    //        ],
    //    }
    //    //}, 'waterway-label');
    //}, 'water');

    //map.addLayer({
    //    "id": "datasource-point",
    //    "type": "circle",
    //    "source": "datasource",
    //    "minzoom": 7,
    //    "paint": {
    //        // Size circle radius by earthquake magnitude and zoom level
    //        "circle-radius": [
    //            "interpolate",
    //            ["linear"],
    //            ["zoom"],
    //            7, [
    //                "interpolate",
    //                ["linear"],
    //                ["get", "mag"],
    //                1, 1,
    //                6, 4
    //            ],
    //            16, [
    //                "interpolate",
    //                ["linear"],
    //                ["get", "mag"],
    //                1, 5,
    //                6, 50
    //            ]
    //        ],
    //        // Color circle by earthquake magnitude
    //        // "circle-color": [
    //        //     "interpolate",
    //        //     ["linear"],
    //        //     ["get", "mag"],
    //        //     1, "rgba(33,102,172,0)",
    //        //     2, "rgb(103,169,207)",
    //        //     3, "rgb(209,229,240)",
    //        //     4, "rgb(253,219,199)",
    //        //     5, "rgb(239,138,98)",
    //        //     6, "rgb(178,24,43)"
    //        // ],
    //        "circle-color": [
    //            "interpolate",
    //            ["linear"],
    //            ["get", "mag"],
    //            1, "rgba(255, 112, 169,0)",
    //            2, "rgb(248, 100, 159)",
    //            3, "rgb(223, 56, 123)",
    //            4, "rgb(216, 44, 113)",
    //            5, "rgb(203, 22, 95)",
    //            6, "rgb(191, 0, 77)"
    //        ],
    //        "circle-stroke-color": "white",
    //        "circle-stroke-width": 1,
    //        // Transition from heatmap to circle layer by zoom level
    //        "circle-opacity": [
    //            "interpolate",
    //            ["linear"],
    //            ["zoom"],
    //            7, 0,
    //            8, 1
    //        ]
    //    }
    //    //}, 'waterway-label');
    //}, 'water');

    //map.addLayer({
    //    'id': 'wms-test-layer',
    //    'type': 'raster',
    //    'source': {
    //        'type': 'raster',
    //        'tiles': [
    //            //'https://gibs.earthdata.nasa.gov/wmts/epsg3413/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/2013-11-04/EPSG4326_250m/{z}/{y}/{x}.jpg'
    //        //'https://gibs.earthdata.nasa.gov/wmts/epsg3413/best/MODIS_Aqua_CorrectedReflectance_TrueColor/default/2013-11-04/EPSG3031_250m/{z}/{y}/{x}.jpg'
    //            //'https://gibs-c.earthdata.nasa.gov/wms/wms.php?TIME=2018-10-20T00:00:00Z&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&LAYERS=MODIS_Fires_All&WIDTH=256&HEIGHT=256&SRS=EPSG%3A4326&STYLES=&BBOX={bbox-epsg-3857}'
    //            '&layer=OMI_Single_Scattering_Albedo&style=default&tilematrixset=2km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix={z}&TileCol={x}&TileRow={y}'

    //        ],
    //        'tileSize': 256
    //    },
    //    'paint': {}
    //}, 'water');

    //map.addLayer({
    //    'id': 'wms-test-layer2',
    //    'type': 'raster',
    //    'source': {
    //        'type': 'raster',
    //        'tiles': [
    //            //'https://gibs.earthdata.nasa.gov/wmts/epsg3413/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/2013-11-04/EPSG4326_250m/{z}/{y}/{x}.jpg'
    //            //'https://gibs.earthdata.nasa.gov/wmts/epsg3413/best/MODIS_Aqua_CorrectedReflectance_TrueColor/default/2013-11-04/EPSG3031_250m/{z}/{y}/{x}.jpg'
    //            //'https://gibs-c.earthdata.nasa.gov/wms/wms.php?TIME=2018-10-20T00:00:00Z&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&LAYERS=MODIS_Fires_All&WIDTH=256&HEIGHT=256&SRS=EPSG%3A4326&STYLES=&BBOX={bbox-epsg-3857}'
    //            '&layer=MOPITT_CO_Daily_Total_Column_L2&style=default&tilematrixset=2km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix={z}&TileCol={x}&TileRow={y}'
    //        ],
    //        'tileSize': 256
    //    },
    //    'paint': {}
    //}, 'water');

    //map.addLayer({
    //    'id': 'wms-test-layer3',
    //    'type': 'raster',
    //    'source': {
    //        'type': 'raster',
    //        'tiles': [
    //            //'https://gibs.earthdata.nasa.gov/wmts/epsg3413/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/2013-11-04/EPSG4326_250m/{z}/{y}/{x}.jpg'
    //            //'https://gibs.earthdata.nasa.gov/wmts/epsg3413/best/MODIS_Aqua_CorrectedReflectance_TrueColor/default/2013-11-04/EPSG3031_250m/{z}/{y}/{x}.jpg'
    //            //'https://gibs-c.earthdata.nasa.gov/wms/wms.php?TIME=2018-10-20T00:00:00Z&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&LAYERS=MODIS_Fires_All&WIDTH=256&HEIGHT=256&SRS=EPSG%3A4326&STYLES=&BBOX={bbox-epsg-3857}'
    //            '&layer=MERRA2_SO2_Column_Mass_Density_Monthly&style=default&tilematrixset=2km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix={z}&TileCol={x}&TileRow={y}'
    //        ],
    //        'tileSize': 256
    //    },
    //    'paint': {}
    //}, 'water');

    map.addLayer({
        'id': 'wms-test-layer4',
        'type': 'raster',
        'source': {
            'type': 'raster',
            'tiles': [
                //'https://gibs.earthdata.nasa.gov/wmts/epsg3413/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/2013-11-04/EPSG4326_250m/{z}/{y}/{x}.jpg'
                //'https://gibs.earthdata.nasa.gov/wmts/epsg3413/best/MODIS_Aqua_CorrectedReflectance_TrueColor/default/2013-11-04/EPSG3031_250m/{z}/{y}/{x}.jpg'
                //'https://gibs-c.earthdata.nasa.gov/wms/wms.php?TIME=2018-10-20T00:00:00Z&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&LAYERS=MODIS_Fires_All&WIDTH=256&HEIGHT=256&SRS=EPSG%3A4326&STYLES=&BBOX={bbox-epsg-3857}'
                //'/Transform?z={z}&x={x}&y={y}&d1=0&d2=5&d3=10'
                '&layer=MODIS_Terra_Land_Surface_Temp_Day&style=default&tilematrixset=1km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix={z}&TileCol={x}&TileRow={y}'
            ],
            'tileSize': 256
        },
        'paint': {}
    }, 'water');

    // https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/{layer}/default/{time}/{tileMatrixSet}/{z}/{y}/{x}.jpg

});