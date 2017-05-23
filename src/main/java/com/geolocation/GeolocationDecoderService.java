package com.geolocation;

import org.apache.http.client.fluent.Content;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import org.apache.http.client.fluent.Request;
import org.apache.http.client.utils.URIBuilder;

import java.io.IOException;
import java.net.URISyntaxException;

@Service
public class GeolocationDecoderService {
    private static String API_URL = "https://maps.googleapis.com/maps/api/geocode/json";
    private static String API_KEY = "AIzaSyBk1ngi-DnYVCsKGWY74Te0menO9deGJwQ";

    public static String getDecodedGeolocation(String latitude, String longitude) throws IOException, URISyntaxException, JSONException {
        String latlng = latitude + "," + longitude;
        URIBuilder builder = new URIBuilder(API_URL).addParameter("latlng", latlng)
                .addParameter("key", API_KEY);
        String data = Request.Get(builder.build())
                .execute().returnContent().asString();
        JSONObject json = new JSONObject(data);
        return json.getJSONArray("results").getJSONObject(0).getString("formatted_address");
    }
}
