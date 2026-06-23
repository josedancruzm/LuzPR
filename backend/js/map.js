var map = L.map('map', {
    maxBounds: [[17.820447, -68.012458], [18.555231, -65.111299]],
    maxBoundsViscosity: 1.0,
    minZoom: 10
}).setView([18.2, -66.5], 10);

L.tileLayer('https://api.maptiler.com/maps/streets-v4/{z}/{x}/{y}.png?key=KdpEk71LcB3GnVCNZ9CR', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
}).addTo(map);

var defaultIcon = L.icon({
    iconUrl: '../../frontend/library/streetlight_icon_ON.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

var reportedIcon = L.icon({
    iconUrl: '../../frontend/library/streetlight_icon_OFF.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});
// fetch("http://localhost:8000/streetlights") //for local resting
fetch("/streetlights") // for pushing to cloud
    .then(res => res.json())
    .then(data => {

        var markers = L.markerClusterGroup({
            maxClusterRadius: 25
        });

        data.forEach(row => {
            var marker = L.marker([row.latitude, row.longitude], { icon: defaultIcon })
                .on('click', () => openDetailsDialog(row))
            markers.addLayer(marker);
        });

        map.addLayer(markers);
    });