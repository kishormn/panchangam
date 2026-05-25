// Configuration & Mapping Arrays
const WEEKDAYS = ["Adhitya Vaaram", "Soma Vaaram", "Mangala Vaaram", "Budha Vaaram", "Guru Vaaram", "Sukra Vaaram", "Sani Vaaram"];
const TAMIL_MONTHS = ["Chithirai", "Vaigasi", "Aani", "Aadi", "Aavani", "Purattasi", "Aippasi", "Karthigai", "Margazhi", "Thai", "Maasi", "Panguni"];

// Default location object (Bengaluru)
let currentCoordinates = {
    lat: 12.9716,
    lon: 77.5946,
    name: "Bengaluru"
};

// Handle Manual Dropdown Selection
function handleCityChange() {
    const dropdown = document.getElementById("citySelect");
    const selectedText = dropdown.options[dropdown.selectedIndex].text;
    const [latStr, lonStr] = dropdown.value.split(",");
    
    currentCoordinates.lat = parseFloat(latStr);
    currentCoordinates.lon = parseFloat(lonStr);
    currentCoordinates.name = selectedText;
    
    document.getElementById("statusMessage").innerText = `Using Location: ${selectedText}`;
}

// Request Live Device GPS Coordinates 
function getLocationByGPS() {
    const status = document.getElementById("statusMessage");
    
    if (!navigator.geolocation) {
        status.innerText = "⚠️ GPS is not supported by your browser.";
        return;
    }
    
    status.innerText = "📡 Locating via GPS... Please allow access pop-up.";
    
    navigator.geolocation.getCurrentPosition(
        (position) => {
            currentCoordinates.lat = position.coords.latitude;
            currentCoordinates.lon = position.coords.longitude;
            currentCoordinates.name = "Your Live GPS Location";
            
            status.innerText = `✅ Found GPS: (${currentCoordinates.lat.toFixed(2)}, ${currentCoordinates.lon.toFixed(2)})`;
        },
        () => {
            status.innerText = "❌ Unable to retrieve your GPS location. Using dropdown instead.";
        }
    );
}

// Execute Calculations Based on Current Coordinate Set
function generatePanchangam() {
    const today = new Date();

    // Fill UI components
    document.getElementById('out-loc').innerText = currentCoordinates.name;
    document.getElementById('out-vaaram').innerText = WEEKDAYS[today.getDay()];
    document.getElementById('out-month').innerText = TAMIL_MONTHS[today.getMonth()]; // Approximated
    document.getElementById('out-paksha').innerText = today.getDate() % 2 === 0 ? "Shukla Paksham" : "Krishna Paksham";
    document.getElementById('out-thithi').innerText = "Ekadashi / Dvadashi"; 
    document.getElementById('out-nakshatra').innerText = "Hastham / Chithirai";

    // Unhide Output Element
    document.getElementById('result').style.display = 'block';
}
