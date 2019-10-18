window.addEventListener("message", (event) => {
    let userNameEl = document.querySelector("#username");
    let emailEl = document.querySelector("#email");
    let emailConfirmedEl = document.querySelector("#emailConfirmed");

    const parsedData = JSON.parse(event.data);
    const { data } = parsedData;
    const { email, username, emailConfirmed } = data;

    userNameEl.innerHTML = `Username: ${username}`;
    emailEl.innerHTML = `Email: ${email}`;
    emailConfirmedEl.innerHTML = `Email is confirmed: ${emailConfirmed}`;
});

function getUserData() {
    window.parent.postMessage("getUser", "*");
}