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

function callIOS() {
    const obj = {
        method: "console",
        message: "Hello World!"
    };
    window.parent.postMessage(JSON.stringify(obj), "*");
}