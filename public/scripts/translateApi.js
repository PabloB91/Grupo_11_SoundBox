// const axios = require('axios');

// const encodedParams = new URLSearchParams();
// encodedParams.set('source_language', 'esp');
// encodedParams.set('target_language', 'en');
// encodedParams.set('text', 'What is your name?');

// const options = {
//   method: 'POST',
//   url: 'https://text-translator2.p.rapidapi.com/translate',
//   headers: {
//     'content-type': 'application/x-www-form-urlencoded',
//     'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
//     'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
//   },
//   data: encodedParams,
// };

// try {
// 	const response = await axios.request(options);
// 	console.log(response.data);
// } catch (error) {
// 	console.error(error);
// }












/**
 * Sample Java code for youtube.videos.insert
 * See instructions for running these code samples locally:
 * https://developers.google.com/explorer-help/code-samples#java
 */

import = com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import = com.google.api.client.googleapis.json.GoogleJsonResponseException;
import = com.google.api.client.http.InputStreamContent;
import = com.google.api.client.http.javanet.NetHttpTransport;
import = com.google.api.client.json.JsonFactory;
import = com.google.api.client.json.jackson2.JacksonFactory;

import = com.google.api.services.youtube.YouTube;
import = com.google.api.services.youtube.model.Video;
import = com.google.api.services.youtube.model.VideoSnippet;
import = com.google.api.services.youtube.model.VideoStatus;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Arrays;
import java.util.Collection;

public class ApiExample {
    // You need to set this value for your code to compile.
    // For example: ... DEVELOPER_KEY = "YOUR ACTUAL KEY";
    private static final String DEVELOPER_KEY = "YOUR_API_KEY";

    private static final String APPLICATION_NAME = "API code samples";
    private static final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();

    /**
     * Build and return an authorized API client service.
     *
     * @return an authorized API client service
     * @throws GeneralSecurityException, IOException
     */
    public static YouTube getService() throws GeneralSecurityException, IOException {
        final NetHttpTransport httpTransport = GoogleNetHttpTransport.newTrustedTransport();
        return new YouTube.Builder(httpTransport, JSON_FACTORY, null)
            .setApplicationName(APPLICATION_NAME)
            .build();
    }

    /**
     * Call function to create API service object. Define and
     * execute API request. Print API response.
     *
     * @throws GeneralSecurityException, IOException, GoogleJsonResponseException
     */
    public static void main(String[] args)
        throws GeneralSecurityException, IOException, GoogleJsonResponseException {
        YouTube youtubeService = getService();
        
        // Define the Video object, which will be uploaded as the request body.
        Video video = new Video();
        
        // Add the snippet object property to the Video object.
        VideoSnippet snippet = new VideoSnippet();
        snippet.setCategoryId("22");
        snippet.setDescription("Description of uploaded video.");
        snippet.setTitle("Test video upload.");
        video.setSnippet(snippet);
        
        // Add the status object property to the Video object.
        VideoStatus status = new VideoStatus();
        status.setPrivacyStatus("private");
        video.setStatus(status);

        // TODO: For this request to work, you must replace "YOUR_FILE"
        //       with a pointer to the actual file you are uploading.
        //       The maximum file size for this operation is 274877906944.
        File mediaFile = new File("YOUR_FILE");
        InputStreamContent mediaContent =
            new InputStreamContent("application/octet-stream",
                new BufferedInputStream(new FileInputStream(mediaFile)));
        mediaContent.setLength(mediaFile.length());

        // Define and execute the API request
        YouTube.Videos.Insert request = youtubeService.videos()
            .insert("snippet,status", video, mediaContent);
        Video response = request.setKey(DEVELOPER_KEY).execute();
        System.out.println(response);
    }
}