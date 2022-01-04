require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/GeoJSONLayer",
    "esri/widgets/Home",
], function (Map, MapView, GeoJSONLayer, Home) {

    const url =
        "layers/Stores.geojson";

    const url2 =
        "layers/StatesCount.json";

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
                ]
            }
        ]
    };


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
        }, {
            value: "Saar's Super Saver Foods",
            label: "Saar's Super Saver Foods",
            symbol: {
                type: "picture-marker",
                url: "png/Saars.png",
                width: "50px",
                height: "23px"
            }
        }, {
            value: "Safeway",
            label: "Safeway",
            symbol: {
                type: "picture-marker",
                url: "png/Safeway.png",
                width: "70px",
                height: "13px"
            }
        }, {
            value: "WinCo Foods",
            label: "WinCo Foods",
            symbol: {
                type: "picture-marker",
                url: "png/WinCo.png",
                width: "50px",
                height: "19px"
            }
        }, {
            value: "Haggen",
            label: "Haggen",
            symbol: {
                type: "picture-marker",
                url: "png/Haggen.png",
                width: "70px",
                height: "16px"
            }
        }, {
            value: "Cub",
            label: "Cub",
            symbol: {
                type: "picture-marker",
                url: "png/Cub.png",
                width: "50px",
                height: "34px"
            }
        }, {
            value: "Giant Food",
            label: "Giant Food",
            symbol: {
                type: "picture-marker",
                url: "png/Giant.png",
                width: "50px",
                height: "64px"
            }
        }, {
            value: "Marsh's Sun Fresh Market",
            label: "Marsh's Sun Fresh Market",
            symbol: {
                type: "picture-marker",
                url: "png/Mallys.png",
                width: "50px",
                height: "19px"
            }
        }, {
            value: "Woodman's",
            label: "Woodman's",
            symbol: {
                type: "picture-marker",
                url: "png/Woodmans.png",
                width: "70px",
                height: "28px"
            }
        }, {
            value: "Save A Lot",
            label: "Save A Lot",
            symbol: {
                type: "picture-marker",
                url: "png/SaveALot.png",
                width: "70px",
                height: "37px"
            }
        }, {
            value: "Crest Foods",
            label: "Crest Foods",
            symbol: {
                type: "picture-marker",
                url: "png/Crest.png",
                width: "70px",
                height: "29px"
            }
        }, {
            value: "Vons",
            label: "Vons",
            symbol: {
                type: "picture-marker",
                url: "png/Vons.png",
                width: "50px",
                height: "19px"
            }
        }, {
            value: "Morton Williams",
            label: "Morton Williams",
            symbol: {
                type: "picture-marker",
                url: "png/MortonWilliams.png",
                width: "50px",
                height: "39px"
            }                    
        }, {
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

    const StatesRenderer = {
        type: "unique-value",
        field: "name",
        defaultSymbol: {
            type: "simple-fill",
            color: "#b2b2b2", // light-gray
            size: "10px"
        },
        uniqueValueInfos: [{
            value: "Super 1 Foods",
            label: "Super 1 Foods",
            symbol: {
                type: "simple-fill",
                color: [254,247,205]            
            }
        }, {
            value: "WinCo Foods",
            label: "WinCo Foods",
            symbol: {
                type: "simple-fill",
                color: [170,31,36]
            }
        }, {
            value: "Cub",
            label: "Cub",
            symbol: {
                type: "simple-fill",
                color: [209,169,214]
            }
        }, {
            value: "Marsh's Sun Fresh Market",
            label: "Marsh's Sun Fresh Market",
            symbol: {
                type: "simple-fill",
                color: [18,167,77]
            }
        }, {
            value: "Kroger",
            label: "Kroger",
            symbol: {
                type: "simple-fill",
                color: [19,75,151]
            }
        }, {
            value: "Giant Food",
            label: "Giant Food",
            symbol: {
                type: "simple-fill",
                color: [99,41,100]
            }
        }, {
            value: "Woodman's",
            label: "Woodman's",
            symbol: {
                type: "simple-fill",
                color: [30,24,84]
            }
        }, {
            value: "Save A Lot",
            label: "Save A Lot",
            symbol: {
                type: "simple-fill",
                color: [249,228,16]
            }
        }, {
            value: "Crest Foods",
            label: "Crest Foods",
            symbol: {
                type: "simple-fill",
                color: [223,180,2]
            }
        }, {
            value: "Morton Williams",
            label: "Morton Williams",
            symbol: {
                type: "simple-fill",
                color: [17,15,13]
            }        
        }, {
            value: "Safeway",
            label: "Safeway",
            symbol: {
                type: "simple-fill",
                color: [215,43,49]
            }
        }]
    };

    const map = new Map({
        basemap: "streets-night-vector", // this basemap does not need an API key
    });

    const geojsonlayer = new GeoJSONLayer({
        url: url,
        copyright: "",
        popupTemplate: template,
        minScale: 10000000,
        renderer: uvrRenderer
    });

    const geojsonlayer2 = new GeoJSONLayer({
        url: url2,
        copyright: "",
        maxScale: 10000000,
        opacity: 0.5,
        renderer: StatesRenderer
    });

    map.add(geojsonlayer);
    map.add(geojsonlayer2);

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