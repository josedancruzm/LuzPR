// Objects
const reportDialog = document.getElementById("report-dialog")
const receiptDialog = document.getElementById("receipt-dialog")
const detailsDialog = document.getElementById("details-dialog")
let activeMarker = null
// let signedIn = false;


/* --------------- Modal Functions --------------- */

// modal openers
function openDetailsDialog(marker) {
    activeMarker = marker
    document.getElementById("detail-id").textContent = marker.light_id;
    document.getElementById("detail-coords").textContent = `${marker.longitude}, ${marker.latitude}`;
    document.getElementById("detail-city").textContent = marker.city;
    detailsDialog.showModal();
    
}

function openReportDialog() {

    const form = document.getElementById("report-form")
    if (form) form.reset()

    reportDialog.showModal()
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
    reportDialog.close()
}

function closeReceiptDialog() {
    receiptDialog.close()
}

function closeDetailsDialog() {
    detailsDialog.close()
}

//when you click outside of the modal, close the modal
function addClickOutsideToClose(dialog) {
    dialog.addEventListener("click", (e) => {
        const rect = dialog.getBoundingClientRect()
        if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom)
            dialog.close()
    })
}

addClickOutsideToClose(reportDialog)
addClickOutsideToClose(receiptDialog)
addClickOutsideToClose(detailsDialog)

function openLogInPage(){
    window.location.href = "login.html"
}