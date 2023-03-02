// send req
const sendReq = async (reqUrl, body) => {
  try {
    const res = await fetch(reqUrl, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (res.status == 400) {
      const errMsg = await res.json();
      const resObj = JSON.parse(JSON.stringify(errMsg));
      throw new Error(resObj.error);
    }
    if (res.status == 403) {
      throw new Error("Log in to perform this action");
    }
    const json = await res.json();
    return json;
  } catch (err) {
    throw new Error(err);
  }
};

// show error
const showError = (errorMsg) => {
  var notyf = new Notyf({
    duration: 2000,
    dismissible: true,
  });

  // Display an error notification
  notyf.error(errorMsg);
};

// show success
const showSuccess = (successMsg) => {
  var notyf = new Notyf({
    duration: 2000,
    dismissible: true,
  });

  notyf.success(successMsg);
};

const customAlert = (msg) => {
  const notyf = new Notyf({
    types: [
      {
        type: "info",
        background: "#5bc0de",
        icon: false,
      },
    ],
    duration: 2500,
    dismissible: true,
  });

  notyf.open({
    type: "info",
    message: `<i class="fas fa-info-circle"></i> ${msg}`,
  });
};

export { sendReq, showSuccess, showError, customAlert };
