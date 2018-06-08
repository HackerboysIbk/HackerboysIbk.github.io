var myMap = L.map("map");

let markerGroup = L.featureGroup().addTo(myMap);
let trailGroup = L.featureGroup();
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



//Hoehenprofil einspeisen ueber leaflet.elevation plugin (23.05)
let hoehenprofil = L.control.elevation({
    position: "topright",
    theme: "steelblue-theme",
    collapsed: false,
}).addTo(myMap);



//console.log("Wegpunkte: ", trailjs);

function loadTrack(track) {

    //Etappeninfo anzeigen
    document.getElementById("Titel").innerHTML = window.TOURENINFO[track].Titel;
    document.getElementById("Kurztext").innerHTML = window.TOURENINFO[track].Kurztext;
    document.getElementById("ArtderTour").innerHTML = window.TOURENINFO[track].ArtderTour;
    document.getElementById("Tourenbeschreibung").innerHTML = window.TOURENINFO[track].Tourenbeschreibung;
    document.getElementById("Start").innerHTML = window.TOURENINFO[track].Start;
    document.getElementById("auf").innerHTML = window.TOURENINFO[track].auf;
    document.getElementById("ab").innerHTML = window.TOURENINFO[track].ab;
    document.getElementById("HoechsterPunkt").innerHTML = window.TOURENINFO[track].HoechsterPunkt;
    document.getElementById("Schwierigkeit").innerHTML = window.TOURENINFO[track].Schwierigkeit;
    document.getElementById("Laenge").innerHTML = window.TOURENINFO[track].Laenge;
    document.getElementById("Zeit").innerHTML = window.TOURENINFO[track].Zeit;
    document.getElementById("Einkehr").innerHTML = window.TOURENINFO[track].Einkehr;
    document.getElementById("Einkehr1").innerHTML = window.TOURENINFO[track].Einkehr1;
    document.getElementById("EinkehrHomepage").innerHTML = '<a target="_blank" href="' + window.TOURENINFO[track].EinkehrHomepage + '"> mehr Infos </a>';
    document.getElementById("Einkehr1Homepage").innerHTML = '<a target="_blank" href="' + window.TOURENINFO[track].Einkehr1Homepage + '"> mehr Infos </a>';
    document.getElementById("Parkplatz").innerHTML = window.TOURENINFO[track].Parkplatz;
    document.getElementById("Gebirgszug").innerHTML = window.TOURENINFO[track].Gebirgszug;
    document.getElementById("specials").innerHTML = window.TOURENINFO[track].specials;
    document.getElementById("specialsWebsite").innerHTML = '<a target="_blank" href="' + window.TOURENINFO[track].specialsWebsite + '"> mehr Infos </a>';
    document.getElementById("specials1").innerHTML = window.TOURENINFO[track].specials1;
    document.getElementById("specials1Website").innerHTML = '<a target="_blank" href="' + window.TOURENINFO[track].specials1Website + '"> mehr Infos </a>';
    document.getElementById("Quelle").innerHTML = '<a target="_blank" href="' + window.TOURENINFO[track].Quelle + '"> hier </a>';
    document.getElementById("Foto").innerHTML = '<img class="Bild" src="' + window.TOURENINFO[track].Foto + '"> <img>';


    // GPX Track laden
    gpxTrack = omnivore.gpx('bikedata/' + track).addTo(map);
};


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