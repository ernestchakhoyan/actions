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

window.addEventListener("DOMContentLoaded" , () => {
    var btn = document.getElementById("upload-button");

    btn.addEventListener("change" , (event) => {
        console.log(event,999);

        const blob = event.target.files[ 0 ];

        SendBlob(blob);

    })
})



function SendBlob(blob) {
    var sasKey ="?sv=2019-02-02&ss=bfqt&srt=sco&sp=rwdlacup&se=2023-05-01T14:34:15Z&st=2019-11-07T06:34:15Z&spr=https&sig=I9geFNi%2FqjVxDkfbcM72faalU2reEtlZ7m19KAfW0go%3D";
    var blobUri = "https://storageaccountactiob4b8.blob.core.windows.net";

    var blobService = AzureStorage.Blob.createBlobServiceWithSas(blobUri, sasKey).withFilter(new AzureStorage.Blob.ExponentialRetryPolicyFilter());

    blobService.createBlockBlobFromBrowserFile('jobactioncontainer', blob.name, blob,  function(error, result, response){
        if (error) {
            alert('Upload filed, open browser console for more detailed info.');
            console.log(error);
        } else {
            console.log(result, response,888);

            const a = blobService.getUrl('jobactioncontainer', blob.name);
            console.log(a);
            alert('Upload successfully!');
        }
    });
}

function getBlobUrl(snapshot) {
    var sasKey ="?sv=2019-02-02&ss=bfqt&srt=sco&sp=rwdlacup&se=2023-05-01T14:34:15Z&st=2019-11-07T06:34:15Z&spr=https&sig=I9geFNi%2FqjVxDkfbcM72faalU2reEtlZ7m19KAfW0go%3D";
    var blobUri = "https://storageaccountactiob4b8.blob.core.windows.net";

    var blobService = AzureStorage.Blob.createBlobServiceWithSas(blobUri, sasKey).withFilter(new AzureStorage.Blob.ExponentialRetryPolicyFilter());

    const a = blobService.getUrl('jobactioncontainer', null, null);
    console.log(a);
}