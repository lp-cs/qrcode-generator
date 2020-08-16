var qrcodelocal = $("#qrcodelocal")[0];
var qrcode = new QRCode(qrcodelocal, {
    width : 300,
    height : 300
});

$(document).ready(function(){
    $("#locally-generated-qrcode").hide();
    $('#btn-download-qr-code').prop('disabled', true);
    $("#btn-generate-via-API").prop('disabled', true);
});

$('#txtInput').keyup(function(){
    if($("#txtInput").val()==""){
        $('#btn-download-qr-code').prop('disabled', true);
    } else {
        $('#btn-download-qr-code').prop('disabled', false);
        generateQRCodes();
    }
});

$("#qrcode-form").submit(function(e){
    e.preventDefault();
});

$("#btn-generate-via-localJS").click(function() {
    $("#api-generated-qrcode").hide();
    $("#btn-generate-via-localJS").prop('disabled', true);
    $("#btn-generate-via-API").prop('disabled', false);
    $("#locally-generated-qrcode").show();
});

$("#btn-generate-via-API").click(function() {
    $("#locally-generated-qrcode").hide();
    $("#btn-generate-via-API").prop('disabled', true);
    $("#btn-generate-via-localJS").prop('disabled', false);
    $("#api-generated-qrcode").show();
});

function generateQRCodes(){
    let data = $("#txtInput").val();
    $("#qrcode-header").html(data);
    generateQRviaLocalJS(data);
    generateQRviaAPI(data);
}

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
    var qrcodecard = document.getElementById('qrcodecard');

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


