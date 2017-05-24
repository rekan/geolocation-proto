$(function () {

    var mapOptions = {
        center: new google.maps.LatLng(40.680898,-8.684059),
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    var marker;


    $('#addressbutton').click(function(){
        searchAddress();
    });

    function searchAddress() {
        var addressInput = $("#address-input").val();
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({address: addressInput}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var myResult = results[0].geometry.location;
                var lat = myResult.lat();
                var lng = myResult.lng();
                $("#coordinates").text("Lat: " + lat + " Lon: " + lng);
                createMarker(myResult);
                map.setCenter(myResult);
                map.setZoom(17);
            } else {
                $("#coordinates").text("The Geocode was not successful for the following reason: " + status);
            }
        });
    }

    function createMarker(latlng) {
        if (marker != undefined && marker != '') {
            marker.setMap(null);
            marker = '';
        }
        marker = new google.maps.Marker({
            map: map,
            position: latlng
        });
    }
    
});
