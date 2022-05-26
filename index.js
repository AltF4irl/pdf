function check() {
    var myHeaders = new Headers();
    myHeaders.append("apikey", "idy5htn2NpBxgh5DGrcSHF4SOGwoAGhZ");

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };
    
    var email=document.getElementById('email').value;
    
    fetch("https://api.apilayer.com/email_verification/check?email="+email, requestOptions)
    .then(response => response.text())
    .then(result => {
        if (JSON.parse(result).did_you_mean!="" && JSON.parse(result).did_you_mean!=undefined){
            alert(JSON.parse(result).did_you_mean+"?");
        }
        else if (JSON.parse(result).format_valid==true && JSON.parse(result).mx_found==true){
            var access_key = "?access_key=b8ea5e2f66ea186f315f042eb5a48654";
            var document_url = "&document_url="+document.getElementById('url').value;
            var api_url = "http://api.pdflayer.com/api/convert";
            
            Email.send({
                Host : "smtp.elasticemail.com",
                Username : "altf4irl@gmail.com",
                Password : "58D9489443AA736A9BD7A05A376E5777610A",
                To : document.getElementById('email').value,
                From : "altf4irl@gmail.com",
                Subject : "Requested file",
                Body : api_url+access_key+document_url,
                Attachments : [{
                    name : "file.pdf",
                    path : api_url+access_key+document_url
                }]
            }).then(
                message => {
                    if (message=='OK'){
                        alert("Success, check your spam folder");
                    }
                }
            );
        }
        else {
            alert("The requested email is fake");
        }
    })
    .catch(error => alert(error));
}

document.querySelector(".btn").addEventListener('click', check);