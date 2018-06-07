var myMap = L.map("map", {
    fullscreenControl: true,
});

let markerGroup = L.featureGroup().addTo(myMap);
const trailGroup = L.featureGroup();
let eleGroup =L.featureGroup().addTo(myMap);

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
}, {
        "Wegpunkte": trailGroup,
        "Start/Ziel": markerGroup,
        "Steigungslinie": eleGroup,
    });

//myMap.addLayer(markerGroup);
const start = [47.278225, 13.31937]
const ende = [47.287605, 13.309806]

let startMarker = L.marker(start,
    {
        icon: L.icon({
            iconUrl: 'images/start.png',
            iconAnchor: [16, 37]
        })
    }).addTo(markerGroup);

let endeMarker = L.marker(ende,
    {
        icon: L.icon({
            iconUrl: 'images/ziel.png',
            iconAnchor: [16, 37]
        })
    }).addTo(markerGroup);



myMap.addControl(myMapControl)
myMap.setView([47.267, 11.383], 11);

L.control.scale({
    maxwidth: 200,
    metric: true,
    imperial: false,
    position: "bottomleft"
}).addTo(myMap)



//HÃ¶henprofil einspeisen Ã¼ber leaflet.elevation plugin (23.05)
let hoehenprofil = L.control.elevation({
    position: "topright",
    theme: "steelblue-theme",
    collapsed: false,
}).addTo(myMap);

//console.log("Wegpunkte: ", trailjs);

let gpxTrack = new L.GPX("data/baierwald_runde.gpx", {
    async: true,
}).addTo(trailGroup);
/*gpxTrack.on("loaded", function(evt){
    console.log("Distanz:", evt.target.get_distance().toFixed(0))
    console.log("HÃ¶chste Punkt:", evt.target.get_elevation_min().toFixed(0))
    console.log("Niedrigster Punkt: ", evt.target.get_elevation_max().toFixed(0))
    console.log("HÃ¶henmeter (Anstieg):", evt.target.get_elevation_gain().toFixed(0))
    console.log("HÃ¶henmeter (Abstieg):", evt.target.get_elevation_loss().toFixed(0))

    let laenge = evt.target.get_distance().toFixed(0)
    document.getElementById("laenge").innerHTML=laenge;

    let punkt_hoch = evt.target.get_elevation_min().toFixed(0)
    document.getElementById("punkt_hoch").innerHTML=punkt_hoch;

    let punkt_tief = evt.target.get_elevation_max().toFixed(0)
    document.getElementById("punkt_tief").innerHTML=punkt_tief;

    let anstieg = evt.target.get_elevation_gain().toFixed(0)
    document.getElementById("anstieg").innerHTML=anstieg;

    let abstieg = evt.target.get_elevation_loss().toFixed(0)
    document.getElementById("abstieg").innerHTML=abstieg;

    myMap.fitBounds(evt.target.getBounds());
})*/



gpxTrack.on("addline",function(evt){
    hoehenprofil.addData(evt.line);
    /*console.log(evt.line);
    console.log(evt.line.getLatLngs());
    console.log(evt.line.getLatLngs()[0].meta);
    console.log(evt.line.getLatLngs()[0].lat);
    console.log(evt.line.getLatLngs()[0].lng);
    console.log(evt.line.getLatLngs()[0].meta.ele);*/


    let gpxLinie = evt.line.getLatLngs();
    for (i=1; i<gpxLinie.length; i++) {
        let p1= gpxLinie[i-1];
        let p2= gpxLinie[i];

        let dist = myMap.distance(
            [p1.lat, p1.lng],
            [p2.lat, p2.lng],
        );


        //HÃ¶henunterschied berechnen
        let delta = p2.meta.ele - p1.meta.ele;


        //Steigung in %
        let proz = (dist>0) ? (delta/dist*100.0).toFixed(2): 0

        //console.log(p1.lat, p1.lng, p2.lat, p2.lng, dist,delta,proz);

        let farbe = 
            proz > 10   ? "#cb181d" :
            proz > 6    ? "#fb6a4a" :
            proz > 2    ? "#fcae91" :
            proz > 0    ? "#fee5d9" :
            proz > -2   ? "#edf8e9" :
            proz > -6   ? "#bae4b3" :
            proz > -10  ? "#bae4b3" : 
                          "#bae4b3";

        let segment = L.polyline(
            [
                [p1.lat, p1.lng],
                [p2.lat, p2.lng],
            ], {
                color: farbe,
                weight: 9,
            }
        ).addTo(eleGroup);
    }
});
//https://github.com/mountainbikentirol/mountainbikentirol.github.io/tree/master/projekt