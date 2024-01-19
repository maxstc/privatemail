function signIn() {
    alert("Signin");
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
            address: document.getElementById("signup-address"),
            password: document.getElementById("signup-password")
        })
    })
    .then((response) => response.json())
    .then((json) => alert(json));
}

function signOut() {
    document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}