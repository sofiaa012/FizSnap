// audio.js
(function () {
    let backgroundMusic;

    // Check if audio is already playing
    if (!sessionStorage.getItem("audioInitialized")) {
        // Create a new audio element
        backgroundMusic = new Audio('Background Audio.mp3'); // Adjust path if needed
        backgroundMusic.loop = true; // Enable looping
        backgroundMusic.volume = 0.2; // Adjust volume as needed
        backgroundMusic.play();

        // Save reference in the global window object
        window.backgroundMusic = backgroundMusic;

        // Mark as initialized in sessionStorage
        sessionStorage.setItem("audioInitialized", "true");

        // Store the music's current time in sessionStorage periodically
        setInterval(() => {
            sessionStorage.setItem("audioCurrentTime", backgroundMusic.currentTime);
        }, 1000); // Save every second
    } else {
        // Resume playing the existing audio
        backgroundMusic = new Audio('Background Audio.mp3');
        backgroundMusic.loop = true;
        backgroundMusic.volume = 0.2;

        // Resume from where it stopped
        const savedTime = sessionStorage.getItem("audioCurrentTime");
        if (savedTime) {
            backgroundMusic.currentTime = parseFloat(savedTime);
        }
        backgroundMusic.play();

        // Save reference in the global window object
        window.backgroundMusic = backgroundMusic;

        // Update the music's current time in sessionStorage periodically
        setInterval(() => {
            sessionStorage.setItem("audioCurrentTime", backgroundMusic.currentTime);
        }, 1000);
    }
})();
