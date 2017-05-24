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
        var addressInput = document.getElementById('address-input').value;
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({address: addressInput}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var myResult = results[0].geometry.location;
                console.log(myResult);
                createMarker(myResult);
                map.setCenter(myResult);
                map.setZoom(17);
            } else {
                $("#wrongaddress").text("The Geocode was not successful for the following reason: " + status);
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
