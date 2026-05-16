var map = L.map('map', {
    maxBounds: [[17.820447, -68.012458], [18.555231, -65.111299]],
    maxBoundsViscosity: 1.0,
    minZoom: 10
}).setView([18.2, -66.5], 10);

L.tileLayer('https://api.maptiler.com/maps/streets-v4/{z}/{x}/{y}.png?key=KdpEk71LcB3GnVCNZ9CR', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
}).addTo(map);

fetch("http://localhost:8000/lightposts")
    .then(res => res.json())
    .then(data => {

        //block of code that maps lightpost icon
        var customIcon = L.icon({
            iconUrl: '../assets/icons/lightpost_icon_ON.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]

        });

        var markers = L.markerClusterGroup({
            maxClusterRadius: 25
        });

        data.forEach(row => {
            var marker = L.marker([row.latitude, row.longitude], { icon: customIcon })
            marker.bindPopup(`
                <b>ID:</b> ${row.light_id}<br>
                <b>Coordinates:</b> ${row.longitude}, ${row.latitude}<br>
                <b>City:</b> ${row.city}<br>

                <div class="popup-footer">
                    <span title="Report">    
                        <svg onclick="showReportDialog()" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-flag-icon lucide-flag"><path d="M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528"/></svg>
                    </span>
                </div>
            `);
            markers.addLayer(marker);
        });

        map.addLayer(markers);
    });

//function declaration to create modal
const dialog = document.getElementById("report-dialog")

//opens modal
function showReportDialog() {
    dialog.showModal()
}

//closes modal
function closeReportDialog() {
    dialog.close()
}

//when you click outside of the modal, close the modal
dialog.addEventListener("click", () => dialog.close())