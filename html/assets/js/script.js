let editPlaceEle = document.querySelector("#editPlaceModal");

if (editPlaceEle) {
  editPlaceEle.addEventListener("shown.bs.modal", () => {
    initializeEditForm();
    document.querySelector("#diaChiEdit").focus();
  });
}

let editAdsEle = document.querySelector("#editAdsModal");
if (editAdsEle) {
  editAdsEle.addEventListener("shown.bs.modal", () => {
    initializeEditForm_ads();
    document.querySelector("#adNameEdit").focus();
  });
}

// ---------------------disable nút gửi yêu cầu chỉnh sửa place
function initializeEditForm() {
  let saveBtn = document.querySelector("#addPlaceForm button[type='submit']");
  saveBtn.disabled = true;

  // Lưu giá trị hiện tại của các ô input
  let currentValues = {
    diaChi: document.querySelector("#diaChiEdit").value,
    khuVuc: document.querySelector("#khuVucEdit").value,
    loaiVT: document.querySelector("#loaiVTEdit").value,
    hinhThuc: document.querySelector("#hinhThucEdit").value,
    quyHoach: document.querySelector("#quyHoachEdit").checked,
  };

  // Sự kiện input cho các ô input
  document.querySelectorAll("#addPlaceForm input").forEach((input) => {
    input.addEventListener("input", () => {
      checkFormChanges(currentValues);
    });
  });
}

// Hàm kiểm tra sự thay đổi và cập nhật trạng thái của nút "Lưu"
function checkFormChanges(currentValues) {
  let saveBtn = document.querySelector("#addPlaceForm button[type='submit']");
  let isFormChanged = false;

  // So sánh giá trị hiện tại với giá trị ban đầu
  if (currentValues.diaChi !== document.querySelector("#diaChiEdit").value ||
      currentValues.khuVuc !== document.querySelector("#khuVucEdit").value ||
      currentValues.loaiVT !== document.querySelector("#loaiVTEdit").value ||
      currentValues.hinhThuc !== document.querySelector("#hinhThucEdit").value ||
      currentValues.quyHoach !== document.querySelector("#quyHoachEdit").checked) {
    isFormChanged = true;
  }

  // Cập nhật trạng thái của nút "Lưu"
  saveBtn.disabled = !isFormChanged;
}

document.querySelectorAll(".delete-request-btn").forEach((btnConfirm) => {
  btnConfirm.addEventListener("click", (e) => {
    let id = e.target.dataset.id;
    const options = {
      title: "Bạn có chắc chắn xoá yêu cầu này?",
      type: "danger",
      btnOkText: "Xoá",
      btnCancelText: "Thoát",
      onConfirm: () => {
        console.log("Confirm");
        console.log(id);
        deleteRequest(id);
      },
      onCancel: () => {
        console.log("Cancel");
      },
    };
    const {
      el,
      content,
      options: confirmedOptions,
    } = bs5dialog.confirm("Bạn có chắc chắn xoá yêu cầu này?", options);
  });
});


async function deleteRequest(id) {
  let res = await fetch(`/yeu-cau/deleterequest/${id}`, {
    method: "DELETE",
  });
  location.reload();
}

// ---------------------disable nút gửi yêu cầu chỉnh sửa ads
function initializeEditForm_ads() {
  let saveBtn = document.querySelector("#editAdsForm button[type='submit']");
  saveBtn.disabled = true;

  let currentValues = {
    diaChi: document.querySelector("#adNameEdit").value,
    khuVuc: document.querySelector("#adSizeEdit").value,
    loaiVT: document.querySelector("#diaChiAdsEdit").value,
    hinhThuc: document.querySelector("#adQuantityEdit").value,
    quyHoach: document.querySelector("#expireDayEdit").value,
  };

  document.querySelectorAll("#editAdsForm input").forEach((input) => {
    input.addEventListener("input", () => {
      checkFormChanges_ads(currentValues);
    });
  });
}

function checkFormChanges_ads(currentValues) {
  let saveBtn = document.querySelector("#editAdsForm button[type='submit']");
  let isFormChanged = false;

  if (currentValues.diaChi !== document.querySelector("#adNameEdit").value ||
      currentValues.khuVuc !== document.querySelector("#adSizeEdit").value ||
      currentValues.loaiVT !== document.querySelector("#diaChiAdsEdit").value ||
      currentValues.hinhThuc !== document.querySelector("#adQuantityEdit").value ||
      currentValues.quyHoach !== document.querySelector("#expireDayEdit").value) {
    isFormChanged = true;
  }

  saveBtn.disabled = !isFormChanged;
}
// -------------------edit modal
function showEditPlaceModal(btn) {
  document.querySelector("#idPlace").value = btn.dataset.id;
  document.querySelector("#diaChiEdit").value = btn.dataset.diaChi;
  document.querySelector("#khuVucEdit").value = btn.dataset.khuVuc;
  document.querySelector("#loaiVTEdit").value = btn.dataset.loaiVt;
  document.querySelector("#hinhThucEdit").value = btn.dataset.hinhThuc;
  document.querySelector("#quyHoachEdit").checked = btn.dataset.quyHoach == "ĐÃ QUY HOẠCH" ? true : false;
  document.querySelector("#liDoChinhSua").value = '';
  initializeEditForm();

}


function showContinueEditPlaceModal(btn) {
  document.querySelector("#idPlaceRequest").value = btn.dataset.id;
  document.querySelector("#diaChiEditContinue").value = btn.dataset.diaChi;
  document.querySelector("#khuVucEditContinue").value = btn.dataset.khuVuc;
  document.querySelector("#loaiVTEditContinue").value = btn.dataset.loaiVt;
  document.querySelector("#hinhThucEditContinue").value = btn.dataset.hinhThuc;
  document.querySelector("#quyHoachEditContinue").checked = btn.dataset.quyHoach == "ĐÃ QUY HOẠCH" ? true : false;
  document.querySelector("#liDoChinhSuaContinue").value = '';
  // initializeEditForm();
}

function showEditAdsModal(btn) {
  document.querySelector("#idAds").value = btn.dataset.id;
  document.querySelector("#adNameEdit").value = btn.dataset.adName;
  document.querySelector("#diaChiAdsEdit").value = btn.dataset.diaChi;
  document.querySelector("#adSizeEdit").value = btn.dataset.adSize;
  document.querySelector("#adQuantityEdit").value = btn.dataset.adQuantity;
  document.querySelector("#expireDayEdit").value = btn.dataset.expireDay;
  document.querySelector("#liDoChinhSua").value = '';
}

function showContinueEditAdsModal(btn) {
  document.querySelector("#idAdsRequest").value = btn.dataset.id;
  document.querySelector("#adNameEditContinue").value = btn.dataset.adName;
  document.querySelector("#diaChiAdsEditContinue").value = btn.dataset.diaChi;
  document.querySelector("#adSizeEditContinue").value = btn.dataset.adSize;
  document.querySelector("#adQuantityEditContinue").value = btn.dataset.adQuantity;
  document.querySelector("#expireDayEditContinue").value = btn.dataset.expireDay;
  document.querySelector("#liDoChinhSuaContinue").value = '';
}

function showEditRequestModal(btn) {
  document.querySelector("#idRequest").value = btn.dataset.id;
  document.querySelector("#congTYEditRequest").value = btn.dataset.congTy;
  document.querySelector("#diaChiCongTyEditRequest").value = btn.dataset.diaChiCongTy;
  document.querySelector("#dienThoaiEditRequest").value = btn.dataset.dienThoai;
  document.querySelector("#emailEditRequest").value = btn.dataset.email;
  document.querySelector("#diaChiEditRequest").value = btn.dataset.diaChi;
  
  document.querySelector("#tenBangQuangCaoEditRequest").value = btn.dataset.tenBangQuangCao;
  document.querySelector("#loaiQCEditRequest").value = btn.dataset.loaiQC;
  document.querySelector("#kichThuocEditRequest").value = btn.dataset.kichThuoc;
  document.querySelector("#soLuongEditRequest").value = btn.dataset.soLuong;
  document.querySelector("#ngayBatDauEditRequest").value = btn.dataset.ngayBatDau;
  document.querySelector("#ngayKetThucEditRequest").value = btn.dataset.ngayKetThuc;
  console.log(btn.dataset.loaiQC);
}

// submit form to server
async function editRequest(e) {
  
  e.preventDefault();

  const formData = new FormData(document.getElementById("editRequestForm"));
  const data = Object.fromEntries(formData.entries());
  

  let res = await fetch(`/yeu-cau/editrequest`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    
  });

  location.reload();
}


// ---------------------open view modal, and close modal
function openCustomDown(elm) {
  if (elm.parentElement.querySelector('.customDown').style.display === "none")
      elm.parentElement.querySelector('.customDown').style.display = "block";
  else
      elm.parentElement.querySelector('.customDown').style.display = "none";
}

function openViewDetail(elm, wardName, districtName, zipCode, population) {
  console.log("openViewDetail function called");
  let div = document.createElement('div');
  div.classList.add('modal-backdrop', 'fade', 'show');
  document.body.appendChild(div);

  let ancElm = elm.parentElement.parentElement.parentElement.parentElement.querySelector('.modal');
  ancElm.classList.add('show');
  elm.parentElement.parentElement.parentElement.parentElement.querySelector('.modal.detail-ward').style.display = "block";

  ancElm.querySelector('.detail-card :nth-child(1) span').textContent = wardName + ", " + districtName;
  ancElm.querySelector('.detail-card :nth-child(3) .span-content').textContent = zipCode;
  ancElm.querySelector('.detail-card :nth-child(4) .span-content').textContent = population;
}

function openViewPlaceDetail(elm, diaChi, khuVuc, loaiVT, hinhThuc, quyHoach, hinhAnh) {
  let div = document.createElement('div');
  div.classList.add('modal-backdrop', 'fade', 'show');
  document.body.appendChild(div);

  let ancElm = elm.parentElement.parentElement.parentElement.parentElement.querySelector('.modal');
  ancElm.classList.add('show');
  elm.parentElement.parentElement.parentElement.parentElement.querySelector('.modal.detail-place').style.display = "block";

  ancElm.querySelector('.detail-card :nth-child(1)').textContent = diaChi + ", " + khuVuc;
  ancElm.querySelector('.detail-card :nth-child(3) .span-content').textContent = loaiVT;
  ancElm.querySelector('.detail-card :nth-child(4) .span-content').textContent = hinhThuc;
  ancElm.querySelector('.detail-card :nth-child(5) .span-content').textContent = quyHoach;

  ancElm.querySelector('.img-card :nth-child(1)').textContent = diaChi;

  if (hinhAnh) ancElm.querySelector('img').src = hinhAnh;

}

function openViewAdsDetail(elm, adName, diaChi, khuVuc, adSize, adQuantity, expireDay, imagePath) {
  let div = document.createElement('div');
  div.classList.add('modal-backdrop', 'fade', 'show');
  document.body.appendChild(div);

  let ancElm = elm.parentElement.parentElement.parentElement.parentElement.querySelector('.modal');
  ancElm.classList.add('show');
  elm.parentElement.parentElement.parentElement.parentElement.querySelector('.modal.detail-ads').style.display = "block";

  ancElm.querySelector('.detail-card :nth-child(1) span').textContent = adName;
  ancElm.querySelector('.detail-card :nth-child(2) .span-content').textContent = diaChi + ", " + khuVuc;
  ancElm.querySelector('.detail-card :nth-child(3) .span-content').textContent = adSize;
  ancElm.querySelector('.detail-card :nth-child(4) .span-content').textContent = adQuantity;
  ancElm.querySelector('.detail-card :nth-child(5) .span-content').textContent = expireDay;

  if (imagePath) ancElm.querySelector('img').src = imagePath;
}

function openViewRequestDetail(elm, congTy,
  diaChiCongTy,
  dienThoai,
  email,
  diaChi,
  khuVuc,
  loaiVT,
  longitude,
  latitude,
  tenBangQuangCao,
  loaiQC,
  kichThuoc,
  soLuong,
  ngayBatDau,
  ngayKetThuc,
  tinhTrang) {
  let div = document.createElement('div');
  div.classList.add('modal-backdrop', 'fade', 'show');
  document.body.appendChild(div);

  let ancElm = elm.parentElement.parentElement.parentElement.parentElement.querySelector('.modal');
  ancElm.classList.add('show');
  elm.parentElement.parentElement.parentElement.parentElement.querySelector('.modal.detail-request').style.display = "block";
  ancElm.querySelector('#tinhTrang').textContent = tinhTrang;
  ancElm.querySelector('.detail-card-part-1 :nth-child(1) .span-content').textContent = congTy;
  ancElm.querySelector('.detail-card-part-1 :nth-child(2) .span-content').textContent = diaChiCongTy;
  ancElm.querySelector('.detail-card-part-1 :nth-child(3) .span-content').textContent = dienThoai;
  ancElm.querySelector('.detail-card-part-1 :nth-child(4) .span-content').textContent = email;

  ancElm.querySelector('.detail-card-part-2 :nth-child(1) .span-content').textContent = diaChi;
  ancElm.querySelector('.detail-card-part-2 :nth-child(2) .span-content').textContent = khuVuc;
  ancElm.querySelector('.detail-card-part-2 :nth-child(3) .span-content').textContent = loaiVT;
  ancElm.querySelector('.detail-card-part-2 :nth-child(4) .span-content').textContent = "(" + longitude + " , " + latitude + ")";

  ancElm.querySelector('.detail-card-part-3 :nth-child(1) .span-content').textContent = loaiQC;
  ancElm.querySelector('.detail-card-part-3 :nth-child(2) .span-content').textContent = tenBangQuangCao;
  ancElm.querySelector('.detail-card-part-3 :nth-child(3) .span-content').textContent = kichThuoc;
  ancElm.querySelector('.detail-card-part-3 :nth-child(4) .span-content').textContent = soLuong;
  ancElm.querySelector('.detail-card-part-3 :nth-child(5) .span-content').textContent = ngayBatDau;
  ancElm.querySelector('.detail-card-part-3 :nth-child(6) .span-content').textContent = ngayKetThuc;

  ancElm.querySelector('#img-title').textContent = diaChi;

}

function closeViewDetail(elm) {
  elm.closest('.modal.detail-ward').classList.remove('show');
  elm.closest('.modal.detail-ward').style.display = "none";
  document.querySelector('.modal-backdrop.fade.show').remove();
}

function closeViewDetailPlace(elm) {
  elm.closest('.modal.detail-place').classList.remove('show');
  elm.closest('.modal.detail-place').style.display = "none";
  document.querySelector('.modal-backdrop.fade.show').remove();
}

function closeViewRequestDetail(elm) {
  elm.closest('.modal.detail-request').classList.remove('show');
  elm.closest('.modal.detail-request').style.display = "none";
  document.querySelector('.modal-backdrop.fade.show').remove();
}

function closeViewAdsDetail(elm) {
  elm.closest('.modal.detail-ads').classList.remove('show');
  elm.closest('.modal.detail-ads').style.display = "none";
  document.querySelector('.modal-backdrop.fade.show').remove();
}


// ---------------------searching
document.getElementById('phuongDropdown').addEventListener('change', function () {
  var selectedOptions = Array.from(this.selectedOptions).map(option => option.value);
  // Check if "All Phường" is selected
  if (selectedOptions.includes('all')) {
      // Show all rows
      document.querySelectorAll('#filteredContent tbody tr').forEach(function (row) {
          row.style.display = '';
      });
  } else {
      // Hide all rows
      document.querySelectorAll('#filteredContent tbody tr').forEach(function (row) {
          row.style.display = 'none';
      });
      // Show rows for selected Phường values
      selectedOptions.forEach(function (phuong) {
          var rowsToShow = document.querySelectorAll('#filteredContent tbody tr[data-phuong="' + phuong + '"]');
          rowsToShow.forEach(function (row) {
              row.style.display = '';
          });
      });
  }
});

// ---------------------sort places
// document.addEventListener("DOMContentLoaded", function () {
//     const tableBody = document.querySelector("#filteredContent tbody");
//     const sortButtons = document.querySelectorAll("[data-sort]");

//     sortButtons.forEach((button) => {
//       button.addEventListener("click", function () {
//         const sortBy = this.getAttribute("data-sort");

//         const rows = Array.from(tableBody.querySelectorAll("tr"));
//         const sortedRows = rows.sort((a, b) => {
//           const valueA = a.querySelector(`[data-sort="${sortBy}"]`).textContent.trim().toLowerCase();
//           const valueB = b.querySelector(`[data-sort="${sortBy}"]`).textContent.trim().toLowerCase();
//           return valueA.localeCompare(valueB);
//         });
//         tableBody.innerHTML = "";
//         sortedRows.forEach((row) => {
//           tableBody.appendChild(row);
//         });
//       });
//     });
//   });

// ---------------------check valid date in ads edit
function checkValidDate(elm, event) {
  event.preventDefault();

  const inputDate = elm.value;
  const isValidDate = moment(inputDate, 'MM/DD/YYYY', true).isValid();

  if (!isValidDate) {
    elm.setCustomValidity('Ngày không hợp lệ');
  } else {
    elm.setCustomValidity('');
  }
}
// -------sort

// async function editPlace(e) {
//   e.preventDefault();

//   const formData = new FormData(document.getElementById("addPlaceForm"));
//   const data = Object.fromEntries(formData.entries());

//   let res = await fetch('/diem-dat-bang-quang-cao/editplace', {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//   location.reload();
// }

async function editPlace(e) {
  e.preventDefault();

  const formData = new FormData(document.getElementById("editPlaceForm"));
  const data = Object.fromEntries(formData.entries());

  let res = await fetch('/diem-dat-bang-quang-cao/editplacerequest', {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  location.reload();
}

async function editAds(e) {
  e.preventDefault();

  const formData = new FormData(document.getElementById("editAdsFormRequest"));
  const data = Object.fromEntries(formData.entries());

  let res = await fetch('/bang-quang-cao/editadsrequest', {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  location.reload();
}


function sortTable(column, tableId) {
  console.log('Sorting by column:', column);

  const table = document.querySelector(`#${tableId} tbody`);
  const rows = Array.from(table.getElementsByTagName('tr'));

  rows.sort((a, b) => {
      const aValue = a.getAttribute(`data-${column}`);
      const bValue = b.getAttribute(`data-${column}`);

      if (aValue === null || bValue === null) {
          return 0;
      }

      // Convert the formatted date to a JavaScript Date object for comparison
      const dateA = new Date(aValue);
      const dateB = new Date(bValue);

      // Check if the conversion is successful
      if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
          // If conversion fails, fall back to localeCompare
          return aValue.localeCompare(bValue);
      }

      // Compare dates
      return dateA - dateB;
  });

  rows.forEach(row => {
      table.appendChild(row);
  });
}
