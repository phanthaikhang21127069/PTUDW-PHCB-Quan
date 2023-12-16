// document
//   .querySelector("#editUserModal")
//   .addEventListener("shown.bs.modal", () => {
//     document.querySelector("#firstNameEdit").focus();
//   });

// document
//   .querySelector("#addUserModal")
//   .addEventListener("shown.bs.modal", () => {
//     document.querySelector("#firstName").focus();
//   });


// ---------
// document
//   .querySelector("#editWardModal")
//   .addEventListener("shown.bs.modal", () => {
//     document.querySelector("#wardNameEdit").focus();
//   });

// document
//   .querySelector("#addWardModal")
//   .addEventListener("shown.bs.modal", () => {
//     document.querySelector("#wardName").focus();
//   });

// document
//   .querySelector("#addPlaceModal")
//   .addEventListener("shown.bs.modal", () => {
//     document.querySelector("#diaChi").focus();
//   });

// document
//   .querySelector("#editPlaceModal")
//   .addEventListener("shown.bs.modal", () => {
//     document.querySelector("#diaChiEdit").focus();
//   });

// document.querySelectorAll(".user-delete-btn").forEach((btnConfirm) => {
//   btnConfirm.addEventListener("click", (e) => {
//     let id = e.target.dataset.id;
//     const options = {
//       title: "Bạn có chắc chắn muốn xoá?",
//       type: "danger",
//       btnOkText: "Xoá",
//       btnCancelText: "Thoát",
//       onConfirm: () => {
//         console.log("Confirm");
//         console.log(id);
//         deleteUser(id);
//       },
//       onCancel: () => {
//         console.log("Cancel");
//       },
//     };
//     const {
//       el,
//       content,
//       options: confirmedOptions,
//     } = bs5dialog.confirm("Bạn có chắc chắn muốn xoá?", options);
//   });
// });

// document.querySelectorAll(".ward-delete-btn").forEach((btnConfirm) => {
//   btnConfirm.addEventListener("click", (e) => {
//     let id = e.target.dataset.id;
//     const options = {
//       title: "Bạn có chắc chắn xoá phường này?",
//       type: "danger",
//       btnOkText: "Xoá",
//       btnCancelText: "Thoát",
//       onConfirm: () => {
//         console.log("Confirm");
//         console.log(id);
//         deleteWard(id);
//       },
//       onCancel: () => {
//         console.log("Cancel");
//       },
//     };
//     const {
//       el,
//       content,
//       options: confirmedOptions,
//     } = bs5dialog.confirm("Bạn có chắc chắn xoá phường này?", options);
//   });
// });

// document.querySelectorAll(".place-delete-btn").forEach((btnConfirm) => {
//   btnConfirm.addEventListener("click", (e) => {
//     let id = e.target.dataset.id;
//     const options = {
//       title: "Bạn có chắc chắn muốn xoá?",
//       type: "danger",
//       btnOkText: "Xoá",
//       btnCancelText: "Thoát",
//       onConfirm: () => {
//         console.log("Confirm");
//         console.log(id);
//         deletePlace(id);
//       },
//       onCancel: () => {
//         console.log("Cancel");
//       },
//     };
//     const {
//       el,
//       content,
//       options: confirmedOptions,
//     } = bs5dialog.confirm("Bạn có chắc chắn muốn xoá?", options);
//   });
// });

// function showEditWardModal(btn) {
//   document.querySelector("#idWard").value = btn.dataset.id;
//   document.querySelector("#wardNameEdit").value = btn.dataset.wardName;
//   document.querySelector("#districtNameEdit").value = btn.dataset.districtName;
//   document.querySelector("#zipCodeEdit").value = btn.dataset.zipCode;
//   document.querySelector("#populationEdit").value = btn.dataset.population;
// }

// function showEditPlaceModal(btn) {
//   document.querySelector("#idPlace").value = btn.dataset.id;
//   document.querySelector("#diaChiEdit").value = btn.dataset.diaChi;
//   document.querySelector("#khuVucEdit").value = btn.dataset.khuVuc;
//   document.querySelector("#loaiVTEdit").value = btn.dataset.loaiVt;
//   document.querySelector("#hinhThucEdit").value = btn.dataset.hinhThuc;
//   document.querySelector("#quyHoachEdit").checked = btn.dataset.quyHoach == "ĐÃ QUY HOẠCH" ? true : false;
// }

// function showEditUserModal(btn) {
//   document.querySelector("#id").value = btn.dataset.id;
//   document.querySelector("#usernameEdit").value = btn.dataset.username;
//   document.querySelector("#firstNameEdit").value = btn.dataset.firstName;
//   document.querySelector("#lastNameEdit").value = btn.dataset.lastName;
//   document.querySelector("#mobileEdit").value = btn.dataset.mobile;
//   document.querySelector("#isAdminEdit").checked = btn.dataset.isAdmin == "true" ? true : false;
// }

// async function editWard(e) {
//   e.preventDefault();

//   const formData = new FormData(document.getElementById("editWardForm"));
//   const data = Object.fromEntries(formData.entries());

//   // data = {
//   //   wardName: document.querySelector('#wardNameEdit').value,
//   // }

//   let res = await fetch('/danh-sach/wards', {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//   location.reload();
// }

// async function editPlace(e) {
//   e.preventDefault();

//   const formData = new FormData(document.getElementById("editPlaceForm"));
//   const data = Object.fromEntries(formData.entries());

//   // data = {
//   //   wardName: document.querySelector('#wardNameEdit').value,
//   // }

//   let res = await fetch('/danh-sach/places', {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//   location.reload();
// }

// async function editUser(e) {
//   e.preventDefault();

//   const formData = new FormData(document.getElementById("editUserForm"));
//   const data = Object.fromEntries(formData.entries());

//   // data = {
//   //   firstName: document.querySelector('#firstNameEdit').value,
//   // }

//   let res = await fetch('/users', {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//   location.reload();
// }

// async function deleteUser(id) {
//   let res = await fetch(`/users/${id}`, {
//     method: "DELETE",
//   });

//   location.reload();
// }

// async function deleteWard(id) {
//   let res = await fetch(`/danh-sach/wards/${id}`, {
//     method: "DELETE",
//   });

//   location.reload();
// }

// async function deletePlace(id) {
//   let res = await fetch(`/danh-sach/places/${id}`, {
//     method: "DELETE",
//   });

//   location.reload();
// }
// ---------
// let editPlaceEle = document.querySelector("#editPlaceModal");
// if (editPlaceEle) {
//   editPlaceEle.addEventListener("shown.bs.modal", () => {
//     document.querySelector("#diaChiEdit").focus();
//   });
// }

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
    document.querySelector("#adNameEdit").focus();
  });
}


// Hàm khởi tạo giá trị và trạng thái của form khi mở modal
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

function showEditPlaceModal(btn) {
  document.querySelector("#idPlace").value = btn.dataset.id;
  document.querySelector("#diaChiEdit").value = btn.dataset.diaChi;
  document.querySelector("#khuVucEdit").value = btn.dataset.khuVuc;
  document.querySelector("#loaiVTEdit").value = btn.dataset.loaiVt;
  document.querySelector("#hinhThucEdit").value = btn.dataset.hinhThuc;
  document.querySelector("#quyHoachEdit").checked = btn.dataset.quyHoach == "ĐÃ QUY HOẠCH" ? true : false;
  initializeEditForm();

}

function showEditAdsModal(btn) {
  document.querySelector("#idAds").value = btn.dataset.id;
  document.querySelector("#adNameEdit").value = btn.dataset.adName;
  document.querySelector("#diaChiAdsEdit").value = btn.dataset.diaChi;
  document.querySelector("#adSizeEdit").value = btn.dataset.adSize;
  document.querySelector("#adQuantityEdit").value = btn.dataset.adQuantity;
  document.querySelector("#expireDayEdit").value = btn.dataset.expireDay;
}


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


// searching
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

// sort places
document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector("#filteredContent tbody");
    const sortButtons = document.querySelectorAll("[data-sort]");

    sortButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const sortBy = this.getAttribute("data-sort");

        const rows = Array.from(tableBody.querySelectorAll("tr"));
        const sortedRows = rows.sort((a, b) => {
          const valueA = a.querySelector(`[data-sort="${sortBy}"]`).textContent.trim().toLowerCase();
          const valueB = b.querySelector(`[data-sort="${sortBy}"]`).textContent.trim().toLowerCase();
          return valueA.localeCompare(valueB);
        });
        tableBody.innerHTML = "";
        sortedRows.forEach((row) => {
          tableBody.appendChild(row);
        });
      });
    });
  });

// check valid date in ads edit
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