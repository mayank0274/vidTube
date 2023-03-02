import axios from "axios";

const removeBtn = Array.from(document.querySelectorAll(".removeBtn"));
const reportAction = Array.from(document.querySelectorAll(".selectAction"));
const toast = document.getElementById("myToast");
const msgElem = document.querySelector(".toast-body");

// function show toast

const showAlert = (Toastmsg) => {
  msgElem.innerText = Toastmsg;
  let myToast = new bootstrap.Toast(toast);
  myToast.show();
};

// removing user
if (removeBtn) {
  removeBtn.forEach((btn) => {
    const url = btn.getAttribute("data-href");
    btn.addEventListener("click", () => {
      axios
        .delete(url)
        .then((res) => {
          showAlert(JSON.stringify(res.data.message));
        })
        .catch((err) => {
         showAlert(JSON.stringify(err.data.error));
        });
    });
  });
}

// handle reportAction

if (reportAction) {
  reportAction.forEach((action) => {
    const reportId = action.getAttribute("data-reportId");
    let url = " ";
    action.addEventListener("change", () => {
      const selectedAction = action.value;
      if(selectedAction == "Review"){
        return;
      }
      if (selectedAction == "Delete") {
        url = `/admin/handleReport/${reportId}?action=Delete`;
      } else {
        url = `/admin/handleReport/${reportId}?action=Discard`;
      }
      axios
        .delete(url)
        .then((res) => {
          showAlert(JSON.stringify(res.data.success));
        })
        .catch((err) => {
          showAlert(JSON.stringify(err.data.error));
        });
    });
  });
}
