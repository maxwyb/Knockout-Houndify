// This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
function SeatReservation(name, initialMeal) {
    var self = this;
    self.name = name;
    self.meal = ko.observable(initialMeal);
}
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
    var self = this;
    self.transcriptionString = window.transcriptionString;
    self.transcriptionResponses = window.transcriptionResponses;

    self.onMicrophoneClick = function () {
        console.log("DEBUG: transcriptionResponses: ", self.transcriptionResponses());

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