var myMap = L.map("map");

let trailGroup = L.featureGroup().addTo(myMap);
let eleGroup =L.featureGroup().addTo(myMap);
let markerGroup=L.featureGroup().addTo(myMap);

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
    /*bmapoverlay: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),*/
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
        //"Routenverlauf": trailGroup,
        "Steigungslinie": eleGroup,
    });



var start = ["KoordinatenStart"]
var ende = ["KoordinatenZiel"]

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

//myMap.setView([47.811195, 13.033229], 11);

L.control.scale({
    maxwidth: 200,
    metric: true,
    imperial: false,
    position: "bottomleft"
}).addTo(myMap)



//Hoehenprofil einspeisen ueber leaflet.elevation plugin (23.05)
let hoehenprofil = L.control.elevation({
    position: "bottomleft",
    theme: "steelblue-theme",
    collapsed: false,
}).addTo(myMap);


function loadTrack(track) {

    //Etappeninfo anzeigen
    document.getElementById("Titel").innerHTML = window.TOURENINFO[track].Titel;
    document.getElementById("Kurztext").innerHTML = window.TOURENINFO[track].Kurztext;
    document.getElementById("Tourenbeschreibung").innerHTML = window.TOURENINFO[track].Tourenbeschreibung;
    //document.getElementById("KoordinatenStart").innerHTML = window.TOURENINFO[track].KoordinatenStart;
    document.getElementById("Start").innerHTML = window.TOURENINFO[track].Start;
    //document.getElementById("KoordinatenZiel").innerHTML = window.TOURENINFO[track].KoordinatenZiel;
    //document.getElementById("Ziel").innerHTML = window.TOURENINFO[track].Ziel;
    document.getElementById("auf").innerHTML = window.TOURENINFO[track].auf;
    document.getElementById("ab").innerHTML = window.TOURENINFO[track].ab;
    document.getElementById("HoechsterPunkt").innerHTML = window.TOURENINFO[track].HoechsterPunkt;
    //document.getElementById("NiedrigsterPunkt").innerHTML = window.TOURENINFO[track].NiedrigsterPunkt;
    document.getElementById("Schwierigkeit").innerHTML = window.TOURENINFO[track].Schwierigkeit;
    document.getElementById("Kondition").innerHTML = window.TOURENINFO[track].Kondition;
    //document.getElementById("Technik").innerHTML = window.TOURENINFO[track].Technik;
    document.getElementById("Landschaft").innerHTML = window.TOURENINFO[track].Landschaft;
    document.getElementById("Laenge").innerHTML = window.TOURENINFO[track].Laenge;
    document.getElementById("Zeit").innerHTML = window.TOURENINFO[track].Zeit;
    document.getElementById("Parkplatz").innerHTML = window.TOURENINFO[track].Parkplatz;
    //document.getElementById("Quelle").innerHTML = window.TOURENINFO[track].Quelle;
    //document.getElementById("Foto").innerHTML = window.TOURENINFO[track].Foto;


    // GPX Track laden
    trailGroup.clearLayers();
    gpxTrack = omnivore.gpx('data/' + track).addTo(trailGroup)

    eleGroup.clearLayers();
    gpxTrack.on("ready", function() {

        // Höhenprofil erzeugen
        hoehenprofil.clear();
        gpxTrack.eachLayer(function(layer) {
            hoehenprofil.addData(layer.feature);




            var pts = layer.feature.geometry.coordinates;

            for (var i = 1; i < pts.length; i += 1) {

                // Entfernung bestimmen
                var dist = myMap.distance(
                    [pts[i][1], pts[i][0]], [pts[i - 1][1], pts[i - 1][0]]
                ).toFixed(0);


                var delta = pts[i][2] - pts[i - 1][2];


                var rad = Math.atan(delta / dist);
                var deg = rad * (180 / Math.PI).toFixed(1);



                var farbe;
                switch (true) {
                    case (deg >= 20):
                        farbe = "#bd0026";
                        break;
                    case (deg >= 15):
                        farbe = "'#f03b20";
                        break;
                    case (deg >= 10):
                        farbe = "#fd8d3c";
                        break;
                    case (deg >= 5):
                        farbe = "#feb24c";
                        break;
                    case (deg >= 1):
                        farbe = "#fed976";
                        break;
                    case (deg >= -1):
                        farbe = "yellow";
                        break;
                    case (deg >= -5):
                        farbe = "#d9f0a3";
                        break;
                    case (deg >= -10):
                        farbe = "#addd8e";
                        break;
                    case (deg >= -15):
                        farbe = "#78c679";
                        break;
                    case (deg >= -20):
                        farbe = "#31a354";
                        break;
                    case (deg < -20):
                        farbe = "#006837";
                        break;
                }



                var pointA = new L.LatLng(pts[i][1], pts[i][0]);
                var pointB = new L.LatLng(pts[i - 1][1], pts[i - 1][0]);
                var pointList = [pointA, pointB];

                var firstpolyline = new L.Polyline(pointList, {
                    color: farbe,
                    weight: 5,
                    opacity: 0.7,
                    smoothFactor: 1

                });

                firstpolyline.addTo(eleGroup);

                myMap.fitBounds(gpxTrack.getBounds());

            }
        });
    });

}


var tourenSelektor = document.getElementById("gpx");
		tourenSelektor.onchange = function(evt) {
        console.log("change event: ", evt);
        console.log("GPX Track laden: ", tourenSelektor.selectedIndex);
        loadTrack(tourenSelektor.options[tourenSelektor.options.selectedIndex].value);
    }

    if (window.location.search) {
        var gpx = window.location.search.split("=")[1];
        for (var i = 0; i < tourenSelektor.options.length; i += 1) {
            if (tourenSelektor.options[i].value == gpx) {
                // Menüeintrag selektieren
                tourenSelektor.options.selectedIndex = i;

                // Track laden
                loadTrack(gpx);
            }
        }
    } else loadTrack("Gaisberg_Gipfel.gpx")

