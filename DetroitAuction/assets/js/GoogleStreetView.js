﻿
        var panorama;
        // The panorama that will be used as the entry point to the custom
        // panorama set.
        var entryPanoId = null;
        function initialize() {
          // The latlng of the entry point to the Google office on the road.
          var unionOffice = new google.maps.LatLng(43.648984, -79.39140199999997);
        // Set up the map and enable the Street View control.
          var mapOptions = {
            center: unionOffice,
        zoom: 0
      };
      var map = new google.maps.Map(document.getElementById('map-canvas'),
          mapOptions);
      panorama = map.getStreetView();
      // Set up Street View and initially set it visible. Register the
      // custom panorama provider function.
          var panoOptions = {
            position: unionOffice,
        visible: true,
        panoProvider: getCustomPanorama
      };
      panorama.setOptions(panoOptions);
      // Create a StreetViewService object.
      var streetviewService = new google.maps.StreetViewService();
      // Compute the nearest panorama to the Google Sydney office
      // using the service and store that pano ID.
      var radius = 50;
      streetviewService.getPanoramaByLocation(unionOffice, radius,
              function(result, status) {
            console.log("1", arguments);
        if (status == google.maps.StreetViewStatus.OK) {
            // We'll monitor the links_changed event to check if the current
            // pano is either a custom pano or our entry pano.
            google.maps.event.addListener(panorama, 'links_changed', function () {
                console.log("2", arguments);
                createCustomLinks(result.location.pano);
            });
        google.maps.event.addListener(panorama, 'position_changed', function() {
            console.log('panorama.getPosition()', panorama.getPosition());
        });
              google.maps.event.addListener(panorama, 'pov_changed', function() {
        });
      }
    });
  }
        function getCustomPanoramaTileUrl(pano, zoom, tileX, tileY) {
            // Return a pano image given the panoID.
            console.log('pana URL', arguments);
        if (pano === 'stairwell'){
            return './images/sm/union-stairwell-0.1.jpg';
          } else if(pano === 'desk') {
            return './images/sm/union-desk-0.1.jpg';
          } else if(pano === 'meetingroom') {
            return './images/sm/union-meetingroom-0.1.jpg';
      }
    }
        function getCustomPanorama(pano) {
          switch (pano) {
            case 'desk':
              return {
            location: {
            pano: 'desk',
        description: 'Developers Desk',
        latLng: new google.maps.LatLng(43.649153, -79.391469)
      },
      links: [],
      // The text for the copyright control.
      copyright: 'Imagery (c) 2010 Google',
      // The definition of the tiles for this panorama.
                tiles: {
            tileSize: new google.maps.Size(3000, 1500),
        worldSize: new google.maps.Size(3000, 1500),
        // tileSize: new google.maps.Size(1024, 512),
        // worldSize: new google.maps.Size(2048, 1024),
        // The heading at the origin of the panorama tile set.
        centerHeading: 105,
        getTileUrl: getCustomPanoramaTileUrl
      }
    };
    break;
  case 'stairwell':
              return {
            location: {
            pano: 'stairwell',
        description: 'UNION',
        latLng: new google.maps.LatLng(43.649179, -79.391393)
      },
      links: [],
      // The text for the copyright control.
      copyright: 'Imagery (c) 2010 Google',
      // The definition of the tiles for this panorama.
                tiles: {
            tileSize: new google.maps.Size(300, 300),
        worldSize: new google.maps.Size(3000, 1500),
        // tileSize: new google.maps.Size(1024, 512),
        // worldSize: new google.maps.Size(2048, 1024),
        // The heading at the origin of the panorama tile set.
        centerHeading: 105,
        getTileUrl: getCustomPanoramaTileUrl
      }
    };
    break;
  case 'meetingroom':
              return {
            location: {
            pano: 'meetingroom',
        description: 'Meeting Room',
        latLng: new google.maps.LatLng(43.649141, -79.391396)
      },
      links: [],
      // The text for the copyright control.
      copyright: 'Imagery (c) 2010 Google',
      // The definition of the tiles for this panorama.
                tiles: {
            tileSize: new google.maps.Size(3000, 1500),
        worldSize: new google.maps.Size(3000, 1500),
        // tileSize: new google.maps.Size(1024, 512),
        // worldSize: new google.maps.Size(2048, 1024),
        // The heading at the origin of the panorama tile set.
        centerHeading: 105,
        getTileUrl: getCustomPanoramaTileUrl
      }
    };
    break;
  default:
    return null;
}
}
        function createCustomLinks(entryPanoId) {
          var links = panorama.getLinks();
        var panoId = panorama.getPano();
          switch (panoId) {
            case entryPanoId:
          // Adding a link in the view from the entrance of the building to
          // reception.
              links.push({
            heading: 0,
        description: 'UNION',
        pano: 'stairwell'
      });
      break;
    case 'desk':
      // Adding a link in the view from the entrance of the office
      // with an arrow pointing at 100 degrees, with a text of 'Exit'
      // and loading the street entrance of the building pano on click.
              links.push({
            heading: 195,
        description: 'UNION',
        pano: 'stairwell'
      });
              links.push({
            heading: 260,
        description: 'Meeting Room',
        pano: 'meetingroom'
      });
      break;
      case 'stairwell':
      // Adding a link in the view from the entrance of the office
      // with an arrow pointing at 100 degrees, with a text of 'Exit'
      // and loading the street entrance of the building pano on click.
              links.push({
            heading: 110,
        description: 'Exit',
        pano: entryPanoId
      });
              links.push({
            heading: 195,
        description: 'Developers Desk',
        pano: 'desk'
      });
      break;
      case 'meetingroom':
      // Adding a link in the view from the entrance of the office
      // with an arrow pointing at 100 degrees, with a text of 'Exit'
      // and loading the street entrance of the building pano on click.
              links.push({
            heading: 30,
        description: 'Developers Desk',
        pano: 'desk'
      });
      break;
    default:
      return;
  }
}
google.maps.event.addDomListener(window, 'load', initialize);
   