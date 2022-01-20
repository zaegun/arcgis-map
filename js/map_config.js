// This script will create a map using the ArcGIS API for Javascript
require(["esri/config", "esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer"], 
    function(esriConfig,Map, MapView, FeatureLayer) {
    esriConfig.apiKey = "AAPKd69beb4d23094a7da5fbb6c1e847fa5a2yt4TvaDdFV0H1w8jtfAEC1jtWFTJ3-5vx7xUZFGYOVtmqEopmuXi8cSopWSMIpq";
    
    // Starts the process by creating a base layer map
    const map = new Map({
        basemap: "arcgis-topographic" // Basemap layer
    });

    // This centers the view on Tokyo
    const view = new MapView({
        map: map,
        center: [139.7513889,35.685], //Longitude, latitude
        zoom: 13,
        container: "viewDiv"
    });

    // Sets the image for the point of interests in the list
    const pointOfInterestIcon = {
        "type": "simple",
        "symbol": {
        "type": "picture-marker",
        "url": "https://th.bing.com/th/id/R.ce2fb8b5c9fee29e16810e154750a43c?rik=3Zfm3d%2boCMC2IA&riu=http%3a%2f%2fwww.sparkpeople.com%2fassets%2fNEWsitedesign%2fabo15_map.png&ehk=Ja8QEg72HVAZ%2bfpjYPKkGCzJtvsiQx3KZKslYuzQt5A%3d&risl=&pid=ImgRaw&r=0",
        "width": "18px",
        "height": "30px"
        }
    }

    // Sets additional parameters for the image 
    const pointOfInterestLabels = {
        symbol: {
        type: "text",
        color: "#FFFFFF",
        haloColor: "#5E8D74",
        haloSize: "2px",
        font: {
            size: "12px",
            family: "Noto Sans",
            style: "italic",
            weight: "normal"
        }
        }
    };

    // Defines the pop up for the point of interest
    const popUpPointOfInterest = {
        "title": "{name}",
        "content": "<table class='popup'><tr><td><b>Address:</b></td><td>{address}</td></tr><tr><td><b>Site:</b></td><td><a href='{website}'>Visit Site</a></td></tr></table>"
    }

    // Creates the feature layer from the list of Tokyo sites, adds the point images, and adds the labels
    const layer = new FeatureLayer({
        url: "https://services7.arcgis.com/KfQDjNd8OLAPMwvx/arcgis/rest/services/tokyo_locations/FeatureServer/0",
        renderer: pointOfInterestIcon,
        labelingInfo: [pointOfInterestLabels],
        outFields: ["name","address","website"],
            popupTemplate: popUpPointOfInterest
    });

    // Add the feature layer
    map.add(layer);


    });  