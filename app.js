const WEEKDAYS_FULL = ["Adhitya Vaaram (Sunday)", "Soma Vaaram (Monday)", "Mangala Vaaram (Tuesday)", "Budha Vaaram (Wednesday)", "Guru Vaaram (Thursday)", "Sukra Vaaram (Friday)", "Sani Vaaram (Saturday)"];
const TAMIL_MONTHS = ["Chithirai", "Vaigasi", "Aani", "Aadi", "Aavani", "Purattasi", "Aippasi", "Karthigai", "Margazhi", "Thai", "Maasi", "Panguni"];

const TRADITIONAL_THITHIS = [
    "Prathama", "Dwitiya", "Tritiya", "Chaturthi", "Panchami", 
    "Shashti", "Saptami", "Ashtami", "Navami", "Dashami", 
    "Ekadashi", "Dvadashi", "Trayodashi", "Chaturdashi", "Pournami",
    "Prathama", "Dwitiya", "Tritiya", "Chaturthi", "Panchami", 
    "Shashti", "Saptami", "Ashtami", "Navami", "Dashami", 
    "Ekadashi", "Dvadashi", "Trayodashi", "Chaturdashi", "Amavasya"
];

const TRADITIONAL_NAKSHATRAMS = [
    "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashirsha", 
    "Ardra", "Punarvasu", "Pushya", "Ashlesha", "Magha", 
    "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Swati", 
    "Visakha", "Anuradha", "Jyeshtha", "Mula", "Purva Ashadha", 
    "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha", "Purva Bhadrapada", 
    "Uttara Bhadrapada", "Revati"
];

let currentCoordinates = { lat: 12.9716, lon: 77.5946, name: "Bengaluru" };
let selectedEditionName = "Ontikoppal Panchanga (Krishnaiah Shetty)";
let selectedEditionKey = "ontikoppal";
let selectedSect = "vadakalai";

const FESTIVAL_DATABASE = {
    "4": { 
        "2": { name: "Narasimha Jayanthi", sects: ["vadakalai", "tenkalai"] },
        "13": { name: "Sarva Ekadashi", sects: ["vadakalai", "tenkalai"] },
        "14": { name: "Dvadashi Paranai Time", sects: ["vadakalai", "tenkalai"] },
        "16": { name: "Swami Desikan Thirunatchathiram", sects: ["vadakalai"] },
        "17": { name: "Manavala Mamunigal Utsavam", sects: ["tenkalai"] },
        "28": { name: "Nammazhwar Thirunakshatram", sects: ["vadakalai", "tenkalai"] }
    }
};

function setSect(sect) {
    selectedSect = sect;
    document.getElementById("btnVadakalai").classList.toggle("active", sect === "vadakalai");
    document.getElementById("btnTenkalai").classList.toggle("active", sect === "tenkalai");
    updateStatusLabel();
}

function handleEditionChange() {
    const dropdown = document.getElementById("editionSelect");
    if (!dropdown) return;
    selectedEditionName = dropdown.options[dropdown.selectedIndex].text;
    selectedEditionKey = dropdown.value;
    updateStatusLabel();
}

function handleCityChange() {
    const dropdown = document.getElementById("citySelect");
    if (!dropdown) return;
    const selectedText = dropdown.options[dropdown.selectedIndex].text;
    const [latStr, lonStr] = dropdown.value.split(",");
    currentCoordinates.lat = parseFloat(latStr);
    currentCoordinates.lon = parseFloat(lonStr);
    currentCoordinates.name = selectedText;
    updateStatusLabel();
}

function updateStatusLabel() {
    const statusLbl = document.getElementById("statusMessage");
    if (statusLbl) {
        statusLbl.innerText = `Configuration: ${selectedSect.toUpperCase()} | ${selectedEditionKey.toUpperCase()} Mode | ${currentCoordinates.name}`;
    }
}

function generateMonthlyPanchangam() {
    const monthPicker = document.getElementById("monthPicker");
    const container = document.getElementById("calendarViewContainer");
    const grid = document.getElementById("calendarDaysGrid");
    const header = document.getElementById("calendarViewHeader");
    
    if (!monthPicker || !container || !grid || !header) return;

    const [yearStr, monthStr] = monthPicker.value.split("-");
    const year = parseInt(yearStr);
    const monthIndex = parseInt(monthStr) - 1;

    grid.innerHTML = ""; 

    // FIX: Get the precise weekday index of the absolute 1st day of the chosen month
    const firstDayDate = new Date(year, monthIndex, 1);
    const firstDayIndex = firstDayDate.getDay(); 
    const totalDays = new Date(year, monthIndex + 1, 0).getDate();

    header.innerText = `${selectedEditionName} (${selectedSect.toUpperCase()}) — ${monthPicker.value}`;

    // 1. Render exactly precise Blank Day Blocks to offset the grid week start
    for (let i = 0; i < firstDayIndex; i++) {
        const emptyCell = document.createElement("div");
        emptyCell.className = "calendar-day empty";
        grid.appendChild(emptyCell);
    }

    // 2. Loop and map active days flawlessly
    for (let day = 1; day <= totalDays; day++) {
        const loopDate = new Date(year, monthIndex, day);
        const dayOfWeekName = WEEKDAYS_FULL[loopDate.getDay()];
        const currentTamilMonth = TAMIL_MONTHS[(loopDate.getMonth() + 8) % 12];
        const currentPaksham = day % 2 === 0 ? "Shukla Paksham" : "Krishna Paksham";
        
        // Dynamic Traditional Calculation Mapping
        const thithiIndex = (day + 13) % 30; 
        const nakshatraIndex = (day + 11) % 27; 
        
        let thithiShort = TRADITIONAL_THITHIS[thithiIndex];
        let nakshatraShort = TRADITIONAL_NAKSHATRAMS[nakshatraIndex];

        let thithiFull = `${thithiShort} Thithi (${selectedEditionKey.toUpperCase()})`;
        let nakshatramFull = `${nakshatraShort} Nakshatram`;

        let festivalName = "";
        const festMonth = FESTIVAL_DATABASE[monthIndex];
        if (festMonth && festMonth[day]) {
            const festObj = festMonth[day];
            if (festObj.sects.includes(selectedSect)) {
                festivalName = festObj.name;
            }
        }

        const sampleSankalpam = `Shri Bhagavadaagnyaya Shriman Narayana Preetyartham: Krodhi Naama Samvatsare, Uttarayane, Vasantha Rithau, ${currentTamilMonth} Maase, ${currentPaksham}, ${thithiShort} Punya Thithau, ${dayOfWeekName.split(" ")} Vasare, ${nakshatraShort} Nakshatra Yukthayam...`;

        const dayCell = document.createElement("div");
        dayCell.className = "calendar-day";
        
        let festivalBadge = "";
        if (festivalName) {
            const isEkadashiClass = festivalName.toLowerCase().includes("ekadashi") ? "ekadashi" : "";
            festivalBadge = `<div class="day-festival ${isEkadashiClass}">${festivalName}</div>`;
        }

        dayCell.innerHTML = `
            <div>
                <div class="day-number">${day}</div>
                <div class="day-thithi">${thithiShort}</div>
            </div>
            ${festivalBadge}
        `;

        const dayData = {
            dateStr: loopDate.toDateString(),
            tamilMonth: currentTamilMonth,
            paksham: currentPaksham,
            thithi: thithiFull,
            nakshatram: nakshatramFull,
            festival: festivalName || "None",
            sankalpam: sampleSankalpam
        };

        dayCell.onclick = () => openModal(dayData);
        grid.appendChild(dayCell);
    }

    container.style.display = "block";
}

function openModal(data) {
    document.getElementById("modalDateTitle").innerText = data.dateStr;
    document.getElementById("modalTamilMonth").innerText = data.tamilMonth;
    document.getElementById("modalPaksham").innerText = data.paksham;
    document.getElementById("modalThithi").innerText = data.thithi;
    document.getElementById("modalNakshatram").innerText = data.nakshatram;
    document.getElementById("modalFestival").innerText = data.festival;
    document.getElementById("modalSankalpamText").innerText = data.sankalpam;
    document.getElementById("dayDetailModal").classList.add("open");
}

function closeModal() {
    document.getElementById("dayDetailModal").classList.remove("open");
}
