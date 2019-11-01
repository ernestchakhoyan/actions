function createJob() {
    const inputValue = document.querySelector("#input").value;

    const data = {
        eventName: "create-job",
        data: {
            templateId: 1,
            title: "Create job",
            inputValue
        }
    };
    coreJs.sendDataToPartner(data);
}

window.addEventListener("from-ios", (event) => {
    const textField = document.querySelector("#event-name");
    textField.innerHTML = `iOS event name: ${event.detail.eventName}`
});

