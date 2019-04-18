window.onload = function() {
    console.log('fcn ran');
    var password = document.querySelector("#regPW");
    var confPassword = document.querySelector("#regPWConfirm");
    var submitBtn = document.querySelector("#regSubmit");
    var alert = document.querySelector("#regPWMessage");

    confPassword.addEventListener('input', function() {
        console.log(confPassword.value);
        console.log(password.value);
        if (confPassword.value === password.value) {
            submitBtn.disabled = false;
            submitBtn.hidden = false;
            alert.hidden = true;
        } else {
            submitBtn.disabled = true;
            submitBtn.hidden = true;
            alert.hidden = false;
        }
    });

};