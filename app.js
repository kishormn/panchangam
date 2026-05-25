// Hardcoded arrays matching traditional panchang systems
const WEEKDAYS = ["Adhitya Vaaram", "Soma Vaaram", "Mangala Vaaram", "Budha Vaaram", "Guru Vaaram", "Sukra Vaaram", "Sani Vaaram"];
const TAMIL_MONTHS = ["Chithirai", "Vaigasi", "Aani", "Aadi", "Aavani", "Purattasi", "Aippasi", "Karthigai", "Margazhi", "Thai", "Maasi", "Panguni"];

// Mock algorithm showing how browser UI extracts outputs dynamically
function calculatePanchangam() {
    const today = new Date();
    const lat = parseFloat(document.getElementById('lat').value);
    const lon = parseFloat(document.getElementById('lon').value);

    // Dynamic extraction rules placeholder (mimicking calculation results)
    document.getElementById('out-vaaram').innerText = WEEKDAYS[today.getDay()];
    document.getElementById('out-month').innerText = TAMIL_MONTHS[today.getMonth()]; // Approximated
    document.getElementById('out-paksha').innerText = today.getDate() % 2 === 0 ? "Shukla Paksham" : "Krishna Paksham";
    document.getElementById('out-thithi').innerText = "Ekadashi / Dvadashi"; 
    document.getElementById('out-nakshatra').innerText = "Hastham / Chithirai";

    // Reveal output block
    document.getElementById('result').style.display = 'block';
}
