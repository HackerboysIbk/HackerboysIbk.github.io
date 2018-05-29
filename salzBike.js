let myMap = L.map("map");

let myLayers = {

    osm : L.tileLayer
    ("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {subdomains : ["a", "b", "c"],
    attribution : "Datenquelle: <a href='https://www.openstreetmap.org'>© OpenStreetMap-Mitwirkende</a>"
    }),

    geolandbasemap : L.tileLayer
    ("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png",
     {subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
      attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
    }),

    eKarte_sommer: L.tileLayer
    ("http://wmts.kartetirol.at/wmts/gdi_summer/GoogleMapsCompatible/normal/{z}/{x}/{y}.jpeg80",
    {attribution : "Datenquelle: <a href='https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol' >www.data.gv.at</a>"
    }),

    eKarte_winter:  L.tileLayer
    ("http://wmts.kartetirol.at/wmts/gdi_winter/GoogleMapsCompatible/normal/{z}/{x}/{y}.jpeg80",
    {attribution : "Datenquelle: <a href='https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol' >www.data.gv.at</a>"
    }),

    eKarte_ortho: L.tileLayer
    ("http://wmts.kartetirol.at/wmts/gdi_ortho/GoogleMapsCompatible/normal/{z}/{x}/{y}.jpeg80",
    {attribution : "Datenquelle: <a href='https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol' >www.data.gv.at</a>"
    })
};

myMap.addLayer(myLayers.geolandbasemap);

let myMapControl= L.control.layers({
    "Openstreetmap":myLayers.osm,
    "Geoland Basemap":myLayers.geolandbasemap,
    "Karte Sommer":myLayers.eKarte_sommer,
    "Karte Winter":myLayers.eKarte_winter,
    "Orthophoto":myLayers.eKarte_ortho
})

myMap.addControl (myMapControl);