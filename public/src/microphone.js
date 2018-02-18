// Global parameters used by other parts of the app (knockout.js)
function HondifyResponse(resp) {
    var self = this;
    self.response = resp;
}

var transcriptionString = ko.observable();
var transcriptionResponses = ko.observableArray([new HondifyResponse("test response")]);

// Houndify parameter initializations
var clientId = "5EPSnXvMIUpGezVkC3QUGw==";
var clientKey = "UQVjbSfJSGUXMnEoixSwZHDa5TrpwE1t-_z3KvqARkhMqDabq8qKA2EP0ibFsqU2UxD7Ue3rtVy5LQRX9GA3zg==";
var conversationState = null;
var voiceRequest = null;

// Houndify recorder setup
var recorder = new Houndify.AudioRecorder();
recorder.on('start', function() {
    console.log("recorder.start");
    initVoiceRequest(recorder.sampleRate);
});

recorder.on('data', function(data) {
    console.log("recorder.data");
    voiceRequest.write(data);
});

recorder.on('end', function() {
    console.log("recorder.end");
    voiceRequest.end();
})

recorder.on('error', function(error) {
    console.log("recorder.error");
    voiceRequest.abort();
})

// callback functions for receiving Houndify API responses
function onResponse(response, info) {
    if (response.AllResults && response.AllResults.length) {
        console.log("onResponse: ");
        console.log(response.AllResults);

        // transcriptionResponses.push({ response: response.AllResults[0].WrittenResponse });
        // DEBUG
        var transcriptionResponses_old = window.transcriptionResponses;
        window.transcriptionResponses.push(new HondifyResponse(response.AllResults[0].WrittenResponse));
        console.log("Is the transcriptionResponses object the same after onResponse()? ", transcriptionResponses_old === window.transcriptionResponses);
        // END DEBUG
        conversationState = response.AllResults[0].ConversationState;
    }
}

function onError(err, info) {
    console.log("onError: ");
    console.log(err, info);
}

function onTranscriptionUpdate(transcript) {
    console.log("onTranscriptionUpdate:");
    console.log(transcript.PartialTranscript);
    transcriptionString(transcript.PartialTranscript);
}

// event-handler functions
function initVoiceRequest(sampleRate) {
    voiceRequest = new Houndify.VoiceRequest({
        //Your Houndify Client ID
        clientId: "5EPSnXvMIUpGezVkC3QUGw==",

        //For testing environment you might want to authenticate on frontend without Node.js server. 
        //In that case you may pass in your Houndify Client Key instead of "authURL".
        clientKey: "UQVjbSfJSGUXMnEoixSwZHDa5TrpwE1t-_z3KvqARkhMqDabq8qKA2EP0ibFsqU2UxD7Ue3rtVy5LQRX9GA3zg==",

        //Otherwise you need to create an endpoint on your server
        //for handling the authentication.
        //See SDK's server-side method HoundifyExpress.createAuthenticationHandler().
        //authURL: "/houndifyAuth",

        //REQUEST INFO JSON
        //See https://houndify.com/reference/RequestInfo
        requestInfo: {
            UserID: "web_test_user",
            Latitude: 37.428,
            Longitude: -122.174
        },

        //Pass the current ConversationState stored from previous queries
        //See https://www.houndify.com/docs#conversation-state
        conversationState: conversationState,

        //Sample rate of input audio
        sampleRate: sampleRate,

        //Enable Voice Activity Detection
        //Default: true
        enableVAD: true,

        //Partial transcript, response and error handlers
        onTranscriptionUpdate: onTranscriptionUpdate,

        onResponse: function (response, info) {
            recorder.stop();
            onResponse(response, info);
        },
        onError: function (err, info) {
            recorder.stop();
            onError(err, info);
        }
    });

    return voiceRequest;
}