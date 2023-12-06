function openCustomDown(elm) {
    if (elm.parentElement.querySelector('.customDown').style.display === "none")
        elm.parentElement.querySelector('.customDown').style.display = "block";
    else
        elm.parentElement.querySelector('.customDown').style.display = "none";
}

function openViewDetail(elm) {
    let div = document.createElement('div');
    div.classList.add('modal-backdrop', 'fade', 'show');
    document.body.appendChild(div);

    elm.parentElement.parentElement.querySelector('.modal').classList.add('show');
    elm.parentElement.parentElement.querySelector('.modal.detail-ward').style.display = "block";

    elm.parentElement.style.display = "none";
}

function closeViewDetail(elm) {
    elm.closest('.modal.detail-ward').classList.remove('show');
    elm.closest('.modal.detail-ward').style.display = "none";
    document.querySelector('.modal-backdrop.fade.show').remove();
}