package com.geolocation;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.URISyntaxException;

@RestController
public class GeolocationProtoRestController {

    @RequestMapping(value = "/data", method = {RequestMethod.POST}, produces = MediaType.APPLICATION_JSON_VALUE)
    public String dataProvider(@RequestBody String myData) throws IOException, JSONException, URISyntaxException {
        JSONObject json = new JSONObject(myData);
        String latitude = json.getString("latitude");
        String longitude = json.getString("longitude");
        System.out.println(GeolocationDecoderService.getDecodedGeolocation(latitude, longitude));
        return GeolocationDecoderService.getDecodedGeolocation(latitude, longitude);
    }
}
