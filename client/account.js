function signIn() {
    fetch("auth/signin", {
        method: "POST",
        body: JSON.stringify({
            address: document.getElementById("signin-address").value,
            password: document.getElementById("signin-password").value
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then((response) => response.json())
    .then((json) => {
        if (json == true) {
            document.cookie = "auth=" + document.getElementById("signin-address").value + "," + document.getElementById("signin-password").value + "; expires=" + oneYearExpireTime() + "; path=/;"
            alert("Signin successful");
            window.location = "index.html";
        }
        else {
            alert("Signin failed - Check your address and password!");
            window.location = "account.html";
        }
    });
}

function signUp() {
    if (document.getElementById("signup-password").value === document.getElementById("signup-confirmpassword").value) {
        createAccount();
    }
    else {
        alert("Password and confirm password do not match");
    }
}

function createAccount() {
    fetch("auth/signup", {
        method: "POST",
        body: JSON.stringify({
            address: document.getElementById("signup-address").value,
            password: document.getElementById("signup-password").value
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then((response) => response.json())
    .then((json) => {
        if (json == true) {
            document.cookie = "auth=" + document.getElementById("signup-address").value + "," + document.getElementById("signup-password").value + "; expires=" + oneYearExpireTime() + "; path=/;"
            alert("Signup successful");
            window.location = "index.html";
        }
        else {
            alert("Signup failed - Check your address and password!");
            window.location = "account.html";
        }
    });
}

function signOut() {
    document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function oneYearExpireTime() {
    let date = new Date();
    let time = date.getTime();
    time += 36000000;
    date.setTime(time);
    return date.toUTCString();
}