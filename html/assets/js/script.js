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

// document
//   .querySelector("#editWardModal")
//   .addEventListener("shown.bs.modal", () => {
//     document.querySelector("#wardNameEdit").focus();
//   });

document
  .querySelector("#addWardModal")
  .addEventListener("shown.bs.modal", () => {
    document.querySelector("#wardName").focus();
  });

document.querySelectorAll(".delete-btn").forEach((btnConfirm) => {
  btnConfirm.addEventListener("click", (e) => {
    let id = e.target.dataset.id;
    const options = {
      title: "Are you sure?",
      type: "danger",
      btnOkText: "Yes",
      btnCancelText: "No",
      onConfirm: () => {
        console.log("Confirm");
        console.log(id);
        deleteUser(id);
      },
      onCancel: () => {
        console.log("Cancel");
      },
    };
    const {
      el,
      content,
      options: confirmedOptions,
    } = bs5dialog.confirm("Do you really want to delete this user?", options);
  });
});

function showEditUserModal(btn) {
  document.querySelector("#id").value = btn.dataset.id;
  document.querySelector("#usernameEdit").value = btn.dataset.username;
  document.querySelector("#firstNameEdit").value = btn.dataset.firstName;
  document.querySelector("#lastNameEdit").value = btn.dataset.lastName;
  document.querySelector("#mobileEdit").value = btn.dataset.mobile;
  document.querySelector("#isAdminEdit").checked = btn.dataset.isAdmin == "true" ? true : false;
}

async function editUser(e) {
  e.preventDefault();

  const formData = new FormData(document.getElementById("editUserForm"));
  const data = Object.fromEntries(formData.entries());

  // data = {
  //   firstName: document.querySelector('#firstNameEdit').value,
  // }

  let res = await fetch('/users', {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  location.reload();
}

async function deleteUser(id) {
  let res = await fetch(`/users/${id}`, {
    method: "DELETE",
  });

  location.reload();
}

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
