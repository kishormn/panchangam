const WEEKDAYS = ["Adhitya Vaaram (Sunday)", "Soma Vaaram (Monday)", "Mangala Vaaram (Tuesday)", "Budha Vaaram (Wednesday)", "Guru Vaaram (Thursday)", "Sukra Vaaram (Friday)", "Sani Vaaram (Saturday)"];
const TAMIL_MONTHS = ["Chithirai", "Vaigasi", "Aani", "Aadi", "Aavani", "Purattasi", "Aippasi", "Karthigai", "Margazhi", "Thai", "Maasi", "Panguni"];

let currentCoordinates = {
    lat: 12.9716,
    lon: 77.5946,
    name: "Bengaluru"
};

function handleCityChange() {
    const dropdown = document.getElementById("citySelect");
    if (!dropdown) return;
    const selectedText = dropdown.options[dropdown.selectedIndex].text;
    const [latStr, lonStr] = dropdown.value.split(",");
    
    currentCoordinates.lat = parseFloat(latStr);
    currentCoordinates.lon = parseFloat(lonStr);
    currentCoordinates.name = selectedText;
    
    document.getElementById("statusMessage").innerText = `Using Location: ${selectedText}`;
}

function getLocationByGPS() {
    const status = document.getElementById("statusMessage");
    if (!navigator.geolocation) {
        status.innerText = "⚠️ GPS is not supported by your browser.";
        return;
    }
    status.innerText = "📡 Locating via GPS... Please approve permissions.";
    navigator.geolocation.getCurrentPosition(
        (position) => {
            currentCoordinates.lat = position.coords.latitude;
            currentCoordinates.lon = position.coords.longitude;
            currentCoordinates.name = "Your Live GPS Location";
            status.innerText = `✅ Found GPS: (${currentCoordinates.lat.toFixed(2)}, ${currentCoordinates.lon.toFixed(2)})`;
        },
        () => { 
            status.innerText = "❌ GPS access denied. Using dropdown instead."; 
        }
    );
}

function generatePanchangam() {
    // Force grab elements safely to verify they exist
    const resultBox = document.getElementById('result');
    if (!resultBox) return;

    const today = new Date();
    
    // Set standard variables
    const weekdayName = WEEKDAYS[today.getDay()];
    const currentTamilMonth = TAMIL_MONTHS[(today.getMonth() + 8) % 12]; 
    const currentPaksham = today.getDate() % 2 === 0 ? "Shukla Paksham" : "Krishna Paksham";
    const currentThithi = "Dashami / Ekadashi"; 
    const currentNakshatram = "Hasta / Chitra";
    const currentAyanam = (today.getMonth() >= 0 && today.getMonth() <= 5) ? "Uttarayane" : "Dakshinayane";

    // 2026 maps out to the traditional Roudra Nama Samvatsara profile cycle
    const currentSamvatsara = "Roudra"; 

    // Construct the Sankalpam Text Output
    const sankalpamText = `...Shri Bhagavadaagnyaya Shriman Narayana Preetyartham: ${currentSamvatsara} Naama Samvatsare, ${currentAyanam}, Shishira Rithau, ${currentTamilMonth} Maase, ${currentPaksham}, ${currentThithi} Punya Thithau, ${weekdayName} Yukthayam, ${currentNakshatram} Shuba Yoga Shuba Karana, Asmin Varthamane Thithau...`;

    // Map safely into HTML elements
    document.getElementById('out-loc').innerText = currentCoordinates.name;
    document.getElementById('out-vaaram').innerText = weekdayName;
    document.getElementById('out-month').innerText = currentTamilMonth;
    document.getElementById('out-paksha').innerText = currentPaksham;
    document.getElementById('out-thithi').innerText = currentThithi;
    document.getElementById('out-nakshatra').innerText = currentNakshatram;
    document.getElementById('out-sankalpam').innerText = sankalpamText;

    // Unhide output result window block container
    resultBox.style.display = 'block';
}
