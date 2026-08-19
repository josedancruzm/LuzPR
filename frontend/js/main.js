// Objects
const modal = document.getElementById("modal")
const modalDetails = document.getElementById("modal-details")
const modalReport = document.getElementById("modal-report")

let activeMarker = null

// modal openers
function openDetailsDialog(marker) {
    activeMarker = marker

    // animation
    modal.classList.add("modal-slider")

    // details of selected marker
    document.getElementById("detail-id").textContent = marker.light_id;
    document.getElementById("detail-coords").textContent = `${marker.longitude}, ${marker.latitude}`;
    document.getElementById("detail-city").textContent = marker.city;
    
    // finally, show modal
    modal.showModal();
}

function openCreateBlip() {
    document.querySelector('.create-blip-tray').classList.add('create-blip-clicked')
}

function openReportDialog() {
    modalReport.style.display = "flex";
    modalDetails.style.display = "none";

    const form = document.getElementById("report-form")
    if (form) form.reset()
}

function submitReportForm(){

    const checked = document.querySelector('input[name="reason"]:checked')

    if (checked == null){
        alert("Please select an issue.")
        return
    }

    let reason = checked.value

    if (reason === "other") {

        let detail = document.getElementById("other-reason").value

        if (detail.trim() == "") {
            alert("Please specify the issue.")
            return
        }
        reason = detail
    }

    // fetch("/tickets", {
    fetch("http://localhost:8000/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },        
        body: JSON.stringify({
            light_id: activeMarker.light_id,
            detail: reason,
            status_id: 1,
        })
    })
    closeReportDialog()
    closeDetailsDialog()
}

// modal closers
function closeReportDialog() {
    modalReport.style.display = "none";
    modalDetails.style.display = "block";
    modal.close()
}

function closeDetailsDialog() {
    modal.close()
    modalReport.style.display = "none";
    modalDetails.style.display = "block";
    modal.classList.remove("modal-slider")

}

//when you click outside of the modal, close the modal
function addClickOutsideToClose(dialog) {
    dialog.addEventListener("click", (e) => {
        const rect = dialog.getBoundingClientRect()
        if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom)
            dialog.close()
    })
}

addClickOutsideToClose(modal)

function openLogInPage(){
    window.location.href = "login.html"
}