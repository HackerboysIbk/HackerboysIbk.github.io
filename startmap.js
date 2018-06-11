var myMap = L.map("map");


let myLayers = {

    osm: L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            subdomains: ["a", "b", "c"],
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
    ),
    geolandbasemap: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
    bmapoverlay: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
    bmaporthofoto30cm: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
};

myMap.addLayer(myLayers.osm);

let myMapControl = L.control.layers({
    "Open Streetmap": myLayers.osm,
    "Geoland Basemap": myLayers.geolandbasemap,
    "Orthofoto": myLayers.bmaporthofoto30cm,
});


myMap.addControl(myMapControl);

myMap.setView([47.811195, 13.033229], 11);

L.control.scale({
    maxwidth: 200,
    metric: true,
    imperial: false,
    position: "bottomleft"
}).addTo(myMap)

//let gpxTrack = new L.GPX("data/Gaisberg_Gipfel.gpx",{async:true}).addTo(myMap);

    var gpxGaisberg_Zistelam = omnivore.gpx("data/Gaisberg_Zistelam.gpx").addTo(myMap);
    var gpxGaisberg_Gipfel = omnivore.gpx("data/Gaisberg_Gipfel.gpx").addTo(myMap);
    var gpxHoeglrunde = omnivore.gpx("data/Hoeglrunde.gpx").addTo(myMap);
    var gpxKleine_Dax_Lueg_Ausfahrt = omnivore.gpx("data/Kleine_Dax_Lueg_Ausfahrt.gpx").addTo(myMap);
    var gpxMuehlsteinrunde = omnivore.gpx("data/Muehlsteinrunde.gpx").addTo(myMap);
    var gpxRupertiwinkel = omnivore.gpx("data/Rupertiwinkel.gpx").addTo(myMap);
    var gpxStaufen_Umrundung = omnivore.gpx("data/Staufen_Umrundung.gpx").addTo(myMap);
    var gpxWallersee_Rundfahrt = omnivore.gpx("data/Wallersee_Rundfahrt.gpx").addTo(myMap);



