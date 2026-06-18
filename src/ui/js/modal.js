//function declaration to create modal(s)
const reportDialog = document.getElementById("report-dialog")
const receiptDialog = document.getElementById("receipt-dialog")
const detailsDialog = document.getElementById("details-dialog")

let activeMarker = null

//opens report dialog
function openReportDialog(marker) {
    activeMarker = marker

    const form = document.getElementById("report-form")
    if (form) form.reset()

    reportDialog.showModal()
}

//closes report dialog
function closeReportDialog() {
    reportDialog.close()
}

function closeReceiptDialog() {
    receiptDialog.close()
}

function openDetailsDialog() {
    detailsDialog.showModal()
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

function openDetailsDialog(row) {
    document.getElementById("detail-id").textContent = row.light_id;
    document.getElementById("detail-coords").textContent = `${row.longitude}, ${row.latitude}`;
    document.getElementById("detail-city").textContent = row.city;
    detailsDialog.showModal();
}