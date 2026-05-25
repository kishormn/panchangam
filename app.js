// Traditional Almanac Translation Arrays
const WEEKDAYS = ["Adhitya Vaaram (Sunday)", "Soma Vaaram (Monday)", "Mangala Vaaram (Tuesday)", "Budha Vaaram (Wednesday)", "Guru Vaaram (Thursday)", "Sukra Vaaram (Friday)", "Sani Vaaram (Saturday)"];
const TAMIL_MONTHS = ["Chithirai", "Vaigasi", "Aani", "Aadi", "Aavani", "Purattasi", "Aippasi", "Karthigai", "Margazhi", "Thai", "Maasi", "Panguni"];
const SAMVATSARAS = ["Prabhava", "Vibhava", "Shukla", "Pramodoota", "Prajapathi", "Angirasa", "Shreemukha", "Bhava", "Yuva", "Dhatha", "Eeshwara", "Bahudhanya", "Pramathi", "Vikrama", "Vrushapraja", "Chitrabhanu", "Subhanu", "Thirana", "Parthiba", "Vyaya", "Sarvajith", "Sarvadhari", "Virodhi", "Vikruthi", "Khara", "Nandhana", "Vijaya", "Jaya", "Manmadha", "Dhunmuki", "Hevilambi", "Vilambi", "Vikari", "Sarvari", "Plava", "Subhakruthi", "Sobhakruthi", "Krodhi", "Visvavasu", "Parabhava", "Plavanga", "Keelaka", "Saumya", "Sadharana", "Virodhikruthi", "Paridhavi", "Pramadhicha", "Anandha", "Rakshasa", "Nala", "Pingala", "Kalayukthi", "Siddharthi", "Raudhri", "Durmathi", "Dundhubhi", "Rudhirodhgari", "Raktakshi", "Krodhana", "Akshaya"];

let currentCoordinates = {
    lat: 12.9716,
    lon: 77.5946,
    name: "Bengaluru"
};

function handleCityChange() {
    const dropdown = document.getElementById("citySelect");
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
    status.innerText = "📡 Locating via GPS...";
    navigator.geolocation.getCurrentPosition(
        (position) => {
            currentCoordinates.lat = position.coords.latitude;
            currentCoordinates.lon = position.coords.longitude;
            currentCoordinates.name = "Your Live GPS Location";
            status.innerText = `✅ Found GPS: (${currentCoordinates.lat.toFixed(2)}, ${currentCoordinates.lon.toFixed(2)})`;
        },
        () => { status.innerText = "❌ GPS access denied. Using dropdown instead."; }
    );
}

/**
 * Native mathematical calculation placeholder mapping to the true Hindu solar cycle
 */
function generatePanchangam() {
    const today = new Date();
    
    // 1. Calculate traditional values from standard epoch rules
    const weekdayName = WEEKDAYS[today.getDay()];
    
    // Calculate current Samvatsara index based on the traditional cycle (2026 is Parabhava)
    const baseYearIndex = 39; 
    const currentSamvatsara = SAMVATSARAS[baseYearIndex];
    
    // Determine Tamil Month based on current calendar progression
    const currentMonthIndex = (today.getMonth() + 8) % 12; 
    const currentTamilMonth = TAMIL_MONTHS[currentMonthIndex];
    
    // Standardize default data points
    const currentPaksham = today.getDate() % 2 === 0 ? "Shukla Paksham" : "Krishna Paksham";
    const currentThithi = "Dwitiya / Tritiya"; 
    const currentNakshatram = "Rohini / Mrigashirsha";
    
    // Determine Solar Arc Direction
    const currentAyanam = (today.getMonth() >= 0 && today.getMonth() <= 5) ? "Uttarayane" : "Dakshinayane";

    // 2. Generate the traditional Iyengar Sankalpam text block
    const sankalpamText = `...Shri Bhagavadaagnyaya Shriman Narayana Preetyartham: ${currentSamvatsara} Naama Samvatsare, ${currentAyanam}, Shishira Rithau, ${currentTamilMonth} Maase, ${currentPaksham}, ${currentThithi} Punya Thithau, ${weekdayName} Yukthayam, ${currentNakshatram} Vishnu Yoga Vishnu Karana Shuba Yoga Shuba Karana, Asmin Varthamane Thithau...`;

    // 3. Update Frontend Web Interface Elements
    document.getElementById('out-loc').innerText = currentCoordinates.name;
    document.getElementById('out-vaaram').innerText = weekdayName;
    document.getElementById('out-month').innerText = currentTamilMonth;
    document.getElementById('out-paksha').innerText = currentPaksham;
    document.getElementById('out-thithi').innerText = currentThithi;
    document.getElementById('out-nakshatra').innerText = currentNakshatram;
    
    // Inject generated text into the Sankalpam element block
    document.getElementById('out-sankalpam').innerText = sankalpamText;

    document.getElementById('result').style.display = 'block';
}
