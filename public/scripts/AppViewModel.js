// This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
function AppViewModel() {
    /*
    this.firstName = ko.observable("Bert");
    this.lastName = ko.observable("Bertington");
    this.fullName = ko.computed(function() {
        return this.firstName() + " " + this.lastName();
    }, this);
    
    this.capitalizeLastName = function() {
        var currentVal = this.lastName();
        this.lastName(currentVal.toUpperCase());
    }
    */
    this.transcriptionString = window.transcriptionString;

    this.onMicrophoneClick = function () {
        if (!recorder) {
            return;
        }

        if (recorder.isRecording()) {
            recorder.stop();
            console.log("Microphone button clicked, stop recorder.");
        } else {
            recorder.start();
            console.log("Microphone button clicked, start recorder");
        }
    }
}

// Activates knockout.js
ko.applyBindings(new AppViewModel());