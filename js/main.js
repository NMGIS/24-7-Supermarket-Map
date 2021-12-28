require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/GeoJSONLayer",
    "esri/widgets/Home",
    "esri/renderers/UniqueValueRenderer"
], function (Map, MapView, GeoJSONLayer, Home, UniqueValueRenderer) {

    const url = 
        "Stores.geojson";
        //if hosted on github
        //"https://raw.githubusercontent.com/NMGIS/24-7-Store-Map.github.io/main/Stores.geojson";
        
  const template = {
    title: "{name}",
    lastEditInfoEnabled: false,
    content: [
      {
        type: "fields",
        fieldInfos: [
        {
            fieldName: "addr:housenumber",
            label: "Civic"
        },
        {
            fieldName: "addr:street",
            label: "Street"
        },
        {
            fieldName: "addr:city",
            label: "City"
        },
        {
            fieldName: "addr:state",
            label: "State"
        },
        {
            fieldName: "addr:postcode",
            label: "Zip"
        }
    ]}
    ]};


    const uvrRenderer = {
        type: "unique-value", 
        field: "name",
        defaultSymbol: {
          type: "simple-marker",
          color: "#b2b2b2", // light-gray
          size: "10px"
        },
        uniqueValueInfos: [{
            value: "Super 1 Foods",
            label: "Super 1 Foods", 
            symbol: {
              type: "picture-marker",
              url: "png/Super1.png",
              width: "50px",
              height: "39px"
            }
            },{
            value: "WinCo Foods",
            label: "WinCo Foods",
            symbol: {
                type: "picture-marker",
                url: "png/WinCo.png",
                width: "50px",
                height: "19px"
            }
            },{
            value: "Kroger",
            label: "Kroger",
            symbol: {
                type: "picture-marker",
                url: "png/Kroger.png",
                width: "50px",
                height: "28px"
            }
        }]
    };
       
    const map = new Map({
        basemap: "streets-night-vector", // this basemap does not need an API key
      });

    const geojsonlayer = new GeoJSONLayer({
        url: url,
        copyright: "NO-ONE",
        popupTemplate: template,
        renderer: uvrRenderer
    });

    map.add(geojsonlayer);
    
    const view = new MapView({
        container: "viewDiv",
        map: map,
        extent: {
          xmin: -138.62548828121317,
          ymin: 20.550508894190436,
          xmax: -54.2504882812356,
          ymax: 52.66972038367817,
          spatialReference: 4326
        }
    });
    
    let homeWidget = new Home({
        view: view,
    });

    view.ui.add(homeWidget, "top-left")
  
});