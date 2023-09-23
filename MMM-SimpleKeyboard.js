Module.register("MMM-SimpleKeyboard", {
    defaults: {},

    getScripts: function() {
        return [
            this.file("node_modules/simple-keyboard/build/index.js")
        ];
    },

    getStyles: function() {
        return [
            this.file("node_modules/simple-keyboard/build/css/index.css")
        ];
    },

    start: function() {
        this.keyboardVisible = false;
    },
getDom: function() {
    let wrapper = document.createElement("div");

    if (this.keyboardVisible) {
        let keyboardDiv = document.createElement("div");
        keyboardDiv.className = "simple-keyboard";
        wrapper.appendChild(keyboardDiv);

        setTimeout(() => {
            this.initializeKeyboard(keyboardDiv);
        }, 100);
    }

    return wrapper;
},

initializeKeyboard: function(keyboardDiv) {
    console.log("Initializing keyboard...");
    console.log("Is keyboardDiv displayed?:", keyboardDiv.style.display);
    keyboardDiv.style.display = "block";

    if (typeof SimpleKeyboard === 'undefined' || !SimpleKeyboard.default) {
        console.error("SimpleKeyboard library is not loaded or not defined correctly.");
        return;
    }

    // Check if the keyboardDiv is available.
    if (!keyboardDiv) {
        console.error("Keyboard DOM element is not available.");
        return;
    }

    this.keyboard = new SimpleKeyboard.default({
        onChange: input => this.handleInput(input),
        onKeyPress: button => this.handleKeyPress(button)
    });
},
bindEventListeners: function() {
    let eventTitleInput = document.getElementById("eventTitle");
    let keyboardDiv = document.querySelector('.simple-keyboard');

    if (eventTitleInput) {

        // Event listener when the input field is focused.
        eventTitleInput.addEventListener("focus", (event) => {
            console.log("Event Title input field focused.");

            if(keyboardDiv) {
                keyboardDiv.style.display = 'block'; // Show the keyboard
            }

            this.keyboardVisible = true;
            this.updateDom();
        });

        // Event listener when the input field loses focus.
        eventTitleInput.addEventListener("blur", (event) => {
            console.log("Event Title input field lost focus.");

            if(keyboardDiv) {
                keyboardDiv.style.display = 'none'; // Hide the keyboard
            }

            this.keyboardVisible = false;
            this.updateDom();
        });

    } else {
        console.log("Event Title input field not found.");
    }
    
        document.addEventListener("blur", (event) => {
        if (event.target.tagName.toLowerCase() === "input") {
            this.keyboardVisible = false;
            this.updateDom();  // Ensure to update the DOM when keyboard visibility changes.
        }
    }, true);


        document.addEventListener("mousedown", (event) => {
            let inputField = document.querySelector("input");

            if (!keyboardDiv.contains(event.target) && event.target !== inputField) {
                keyboardDiv.style.display = "none";
            }
        });

        keyboardDiv.addEventListener("mousedown", (event) => {
            event.preventDefault();
        });
    },
    
        notificationReceived: function(notification, payload, sender) {
        if (notification === "SHOW_KEYBOARD") {
            this.keyboardVisible = true;
            this.updateDom();
        }
        
if (notification === 'FORM_CLOSED') {
    console.log("Received notification that the form was closed.");
    
    let keyboardDiv = document.querySelector('.simple-keyboard');
    console.log("keyboardDiv element:", keyboardDiv);  // Checking the retrieved element
    
    if(keyboardDiv) {
        console.log("Hiding the keyboardDiv...");  // Verifying logic execution
        keyboardDiv.style.display = 'none'; 
        console.log("keyboardDiv display style after setting:", keyboardDiv.style.display);  // Checking the applied style
    } else {
        console.log("keyboardDiv not found.");
    }
}
    },

    handleInput: function(input) {
        let inputField = document.getElementById('eventTitle'); // Assuming 'eventTitle' is the ID of your input field
        if(inputField) {
            inputField.value = input;
        }
    },

    handleKeyPress: function(button) {
        // Keep track if shift was pressed
        if (!this.shiftPressed) {
            this.shiftPressed = false;
        }
    
        // If shift or lock is pressed
        if (button === "{shift}") {
            let currentLayout = this.keyboard.options.layoutName;
            let shiftToggle = currentLayout === "default" ? "shift" : "default";
            this.keyboard.setOptions({
                layoutName: shiftToggle
            });
            this.shiftPressed = true;  // Set the flag to true when shift is pressed
        } else if (button === "{lock}") {
            let currentLayout = this.keyboard.options.layoutName;
            let shiftToggle = currentLayout === "default" ? "shift" : "default";
            this.keyboard.setOptions({
                layoutName: shiftToggle
            });
            this.shiftPressed = false;  // Ensure the flag is false for caps lock
        } else {
            // For any other key press
            if (this.shiftPressed) {
                // If shift was pressed earlier, revert back to default layout
                this.keyboard.setOptions({
                    layoutName: "default"
                });
                this.shiftPressed = false;  // Reset the flag
            }
        }
    }
    
});