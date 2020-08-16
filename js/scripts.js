var qrcodelocal = $("#qrcodelocal").get(0);
var qrcode = new QRCode(qrcodelocal, {
    width : 300,
    height : 300
});

$(document).ready(function(){
    $("#locally-generated-qrcode").hide();
});

$("#qrcode-form").submit(function(e){
    e.preventDefault();
});

$("#btn-generate-via-localJS").click(function() {
    let data = $("#txtInput").val();
    $("#qrcode-header").html(data);
    $("#api-generated-qrcode").hide();
    generateQRviaLocalJS(data);
    $("#locally-generated-qrcode").show();
});

$("#btn-generate-via-API").click(function() {
    let data = $("#txtInput").val();
    $("#qrcode-header").html(data);
    $("#locally-generated-qrcode").hide();
    generateQRviaAPI(data);
    $("#api-generated-qrcode").show();
});

$("#btn-download-qr-code").click(function() {
    downloadQRCode();
});

function generateQRviaLocalJS(data){
    qrcode.makeCode(data);
}

function generateQRviaAPI(data){
    let size = '1000x1000';
    let baseURL = 'http://api.qrserver.com/v1/create-qr-code/';

    let url = `${baseURL}?data=${data}&size=${size}`;

    $("#qrcodeapi").attr("src",url);
}

function downloadQRCode() {
    var qrcodecard = $("#qrcodecard").get(0);

    domtoimage.toPng(qrcodecard)
        .then(function (dataUrl) {
            var img = new Image();
            img.src = dataUrl;
            downloadURI(dataUrl, "qrcode.png")
        })
        .catch(function (error) {
            console.error('Error!', error);
        });
}

function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
}


