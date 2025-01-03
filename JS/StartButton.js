document.addEventListener("DOMContentLoaded", function() {
    // Get references to the button and the div
    const startButton = document.querySelector(".startbutton");
    const startDiv = document.querySelector(".start");

    // Add a click event listener to the button
    startButton.addEventListener("click", function() {
        // Toggle the "hidden" class on the div
        startDiv.classList.toggle("hidden");

        // Toggle the "startbuttonactive" class on the button
        startButton.classList.toggle("startbuttonactive");
    });
});