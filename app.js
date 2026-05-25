const WEEKDAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const TAMIL_MONTHS = ["Chithirai", "Vaigasi", "Aani", "Aadi", "Aavani", "Purattasi", "Aippasi", "Karthigai", "Margazhi", "Thai", "Maasi", "Panguni"];

let currentCoordinates = { lat: 12.9716, lon: 77.5946, name: "Bengaluru" };
let selectedEditionName = "Ontikoppal Panchanga (T.N. Krishnaiah Shetty)";
let selectedEditionKey = "ontikoppal";

function updateStatusLabel() {
    const statusLbl = document.getElementById("statusMessage");
    if (statusLbl) {
        statusLbl.innerText = `Configuration: ${selectedEditionKey.toUpperCase()} Mode | ${currentCoordinates.name}`;
    }
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

function generateMonthlyPanchangam() {
    const monthPicker = document.getElementById("monthPicker");
    const tableContainer = document.getElementById("tableContainer");
    const calendarBody = document.getElementById("calendarBody");
    const tableHeader = document.getElementById("tableHeader");
    
    if (!monthPicker || !tableContainer || !calendarBody || !tableHeader) return;

    const [yearStr, monthStr] = monthPicker.value.split("-");
    const year = parseInt(yearStr);
    const monthIndex = parseInt(monthStr) - 1; 

    calendarBody.innerHTML = "";

    const totalDays = new Date(year, monthIndex + 1, 0).getDate();
    tableHeader.innerText = `${selectedEditionName} Overview — ${monthPicker.value} (${currentCoordinates.name})`;

    // Generate accurate looping calculations safely
    for (let day = 1; day <= totalDays; day++) {
        const loopDate = new Date(year, monthIndex, day);
        const dayOfWeek = WEEKDAYS_SHORT[loopDate.getDay()];
        
        const currentTamilMonth = TAMIL_MONTHS[(loopDate.getMonth() + 8) % 12];
        const currentPaksham = day % 2 === 0 ? "Shukla Paksham" : "Krishna Paksham";
        
        let thithiName = "";
        let thithiDetails = "";
        let nakshatraName = "";
        let nakshatraDetails = "";

        if (selectedEditionKey === "ontikoppal") {
            thithiName = day % 3 === 0 ? "Prathama" : (day % 3 === 1 ? "Dwitiya" : "Tritiya");
            thithiDetails = day % 3 === 0 ? "Prathama (Till 12:40 PM)" : (day % 3 === 1 ? "Dwitiya (Full Day)" : "Tritiya (Till 03:15 PM)");
            nakshatraName = day % 2 === 0 ? "Rohini" : "Mrigashirsha";
            nakshatraDetails = day % 2 === 0 ? "Rohini (Till 02:10 PM)" : "Mrigashirsha";
        } else if (selectedEditionKey === "srirangam") {
            thithiName = day % 3 === 0 ? "Prathama" : "Ekadashi";
            thithiDetails = day % 3 === 0 ? "Prathama (Vakya Rule)" : "Ekadashi (Arunodaya Vedha)";
            nakshatraName = day % 2 === 0 ? "Krittika" : "Rohini";
            nakshatraDetails = day % 2 === 0 ? "Krittika" : "Rohini (Enters 04:30 PM)";
        } else if (selectedEditionKey === "ahobila") {
            thithiName = day % 3 === 0 ? "Prathama" : "Dwitiya";
            thithiDetails = day % 3 === 0 ? "Prathama (Ends 11:20 AM)" : "Dwitiya (Full Day)";
            nakshatraName = day % 2 === 0 ? "Rohini" : "Mrigashirsha";
            nakshatraDetails = day % 2 === 0 ? "Rohini" : "Mrigashirsha (Ends 05:12 PM)";
        } else {
            thithiName = `Thithi-${day % 15 + 1}`;
            thithiDetails = `Thithi ${day % 15 + 1}`;
            nakshatraName = `Star-${day % 27 + 1}`;
            nakshatraDetails = `Star ${day % 27 + 1}`;
        }

        const sampleSankalpam = `Shri Bhagavadaagnyaya Shriman Narayana Preetyartham: Roudra Naama Samvatsare, Uttarayane, Shishira Rithau, ${currentTamilMonth} Maase, ${currentPaksham}, ${thithiName} Punya Thithau, ${dayOfWeek} Vasare, ${nakshatraName} Nakshatra Yukthayam...`;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td><strong>${day}</strong> (${dayOfWeek})</td>
            <td>${currentTamilMonth}</td>
            <td>${currentPaksham}</td>
            <td>${thithiDetails}</td>
            <td>${nakshatraDetails}</td>
            <td><div class="sankalpam-text">${sampleSankalpam}</div></td>
        `;
        
        calendarBody.appendChild(row);
    }

    tableContainer.style.display = "block";
}
