let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voic");

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 6;
    text_speak.volume = 3;
    text_speak.lang = "hi-IN";
    window.speechSynthesis.speak(text_speak);
};
// wishme me good morning / good afternoon / good evening
function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12 ) {
        speak("Good Morning Sir");
    }
    else if(hours >= 12 && hours < 16){
        speak("Good Afternoon Sir");
    }
    else{
        speak("Good evening Sir");
    }
};
// This is a wish loader
window.addEventListener('load', ()=> {
    wishMe()
});

// speek recogniton
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    let recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = function(event) {
        let transcript = event.results[event.resultIndex][0].transcript;
        content.innerText = transcript;
        takeCommand(transcript.toLowerCase())
        console.log('Recognized:', transcript);
    }
    document.getElementById('btn').addEventListener('click', function () {
        recognition.start();
        btn.style.display = "none"
        voice.style.display = "flex"
        console.log('Recognition started...')
    
    });
    
};

// take command
function takeCommand(massage){
    btn.style.display = "flex";
    voice.style.display = "none";
    if (massage.includes("hello") || massage.includes("hey")){
        speak("hello sir , what can i help you")
    }
    else if(massage.includes("who are you")){
        speak("I Am 'Assistant' , create by Mukesh kumar vishwakarma")
    }
    else if (massage.includes("open youtube") || massage.includes("youtube chalu karo")) {
        speak("welcome to youtube, aapka swagat hai")

        if (!youtubeWindow || youtubeWindow.closed) {
            youtubeWindow = window.open("https://www.youtube.com/", "_blank");
        } else {
            youtubeWindow.focus(); // re-focus if already open
        }
    }
    else if(massage.includes("open google")){
        speak("welcome in google , google mai aapka swagat hain")
        window.open("https://www.google.co.in/", "_blank")
    }
    else if(massage.includes("open facebook")){
        speak("welcome in facebook , facebook mai aapka swagat hain")
        window.open("https://www.facebook.com/", "_blank")
    }
    else {
        speak(`this is what i found on internet regarding ${massage}`)
        window.open(`https://www.google.com/search?q=${massage}`, "_blank")

        
    }
    
};
// auto refresh browser
//setTimeout(() => {
 //   location.reload();
//}, 1 * 60 * 1000); // 5 minutes


