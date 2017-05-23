$(function() {

    $('#geobutton').click(function(){
        getLocation();
    });

    var geolocationMapPanel = document.getElementById("geolocationMap");
    geolocationMapPanel.style.height = '250px';
    geolocationMapPanel.style.width = '500px';
    var geolocationDataPanel = document.getElementById("geolocationData");

    function getLocation() {
        if (navigator.geolocation) {
            // navigator.geolocation.getCurrentPosition(showPositionOnMap, showError);
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            geolocationMapPanel.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    function showPosition(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        latlon = new google.maps.LatLng(lat, lon);

        // GET FORMATTED ADDRESS FROM SERVER AND DISPLAY AS TEXT
        $.ajax({
            type: "POST",
            url: "/data",
            data: JSON.stringify({"latitude": lat, "longitude": lon}),
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                console.log(data);
                geolocationDataPanel.innerHTML = data;
            },
            dataType: "text"
        })
        // DISPLAY ON MAP
            .done(function() {
            var myOptions = {
                center:latlon,zoom:14,
                mapTypeId:google.maps.MapTypeId.ROADMAP,
                mapTypeControl:false,
                navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
            };
            var map = new google.maps.Map(geolocationMapPanel, myOptions);
            var marker = new google.maps.Marker({position:latlon,map:map,title:"You are here!"});})
    }



    function showError(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                x.innerHTML = "User denied the request for Geolocation."
                break;
            case error.POSITION_UNAVAILABLE:
                x.innerHTML = "Location information is unavailable."
                break;
            case error.TIMEOUT:
                x.innerHTML = "The request to get user location timed out."
                break;
            case error.UNKNOWN_ERROR:
                x.innerHTML = "An unknown error occurred."
                break;
        }
    }

});
