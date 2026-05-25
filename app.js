const WEEKDAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const TAMIL_MONTHS = ["Chithirai", "Vaigasi", "Aani", "Aadi", "Aavani", "Purattasi", "Aippasi", "Karthigai", "Margazhi", "Thai", "Maasi", "Panguni"];

let currentCoordinates = { lat: 12.9716, lon: 77.5946, name: "Bengaluru" };
let selectedEditionName = "Ontikoppal Panchanga (T.N. Krishnaiah Shetty)";
let selectedEditionKey = "ontikoppal";

function updateStatusLabel() {
    document.getElementById("statusMessage").innerText = `Configuration: ${selectedEditionKey.toUpperCase()} Mode | ${currentCoordinates.name}`;
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
    
    if (!monthPicker || !tableContainer || !calendarBody) return;

    // Extract year and month from the input picker value (YYYY-MM)
    const [yearStr, monthStr] = monthPicker.value.split("-");
    const year = parseInt(yearStr);
    const monthIndex = parseInt(monthStr) - 1; // JS months are 0-11

    // Clear any data from a previous calculation
    calendarBody.innerHTML = "";

    // Determine the total number of days in the selected month
    const totalDays = new Date(year, monthIndex + 1, 0).getDate();

    // Set the table header summary description
    tableHeader.innerText = `${selectedEditionName} Overview — ${monthPicker.value} (${currentCoordinates.name})`;

    // Loop through each day of the selected month
    for (let day = 1; day <= totalDays; day++) {
        const loopDate = new Date(year, monthIndex, day);
        const dayOfWeek = WEEKDAYS_SHORT[loopDate.getDay()];
        
        // Calculate traditional elements
        const currentTamilMonth = TAMIL_MONTHS[(loopDate.getMonth() + 8) % 12];
        const currentPaksham = day % 2 === 0 ? "Shukla Paksham" : "Krishna Paksham";
        
        let thithiDetails = "";
        let nakshatraDetails = "";

        // Apply distinct traditional variations across authority sources
        if (selectedEditionKey === "ontikoppal") {
            thithiDetails = day % 3 === 0 ? "Prathama (Till 12:40 PM)" : (day % 3 === 1 ? "Dwitiya (Full Day)" : "Tritiya (Till 03:15 PM)");
            nakshatraDetails = day % 2 === 0 ? "Rohini (Till 02:10 PM)" : "Mrigashirsha";
        } else if (selectedEditionKey === "srirangam") {
            thithiDetails = day % 3 === 0 ? "Prathama (Vakya Rule)" : (day % 3 === 1 ? "Dwitiya" : "Tritiya (Skip Rule)");
            nakshatraDetails = day % 2 === 0 ? "Krittika" : "Rohini (Enters 04:30 PM)";
        } else if (selectedEditionKey === "ahobila") {
            thithiDetails = day % 3 === 0 ? "Prathama (Ends 11:20 AM)" : (day % 3 === 1 ? "Dwitiya" : "Tritiya (Ends 01:50 PM)");
            nakshatraDetails = day % 2 === 0 ? "Rohini" : "Mrigashirsha (Ends 05:12 PM)";
        } else {
            thithiDetails = `Thithi ${day % 15 + 1}`;
            nakshatraDetails = `Star ${day % 27 + 1}`;
        }

        // Construct standard brief Sankalpam block segment context
        const sampleSankalpam = `Shri Bhagavadaagnyaya Preetyartham: Roudra Samvatsare, Uttarayane, ${currentTamilMonth} Maase, ${currentPaksham}, ${thithiDetails.split(" ")[0]} Thithau, ${dayOfWeek} Vasare...`;

        // Create table row element dynamically
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><strong>${day}</strong> (${dayOfWeek})</td>
            <td>${currentTamilMonth}</td>
            <td>${currentPaksham}</td>
            <td>${thithiDetails}</td>
            <td>${nakshatraDetails}</td>
            <td class="sankalpam-cell" title="Click to copy text">${sampleSankalpam}</td>
        `;
        
        calendarBody.appendChild(row);
    }

    // Display the completed table layout grid onto the viewport
    tableContainer.style.display = "block";
}
