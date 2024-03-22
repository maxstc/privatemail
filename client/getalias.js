function getAliases(callback) {
    fetch("alias/get", {
        method: "POST",
        body: JSON.stringify({
            address: getCookie("auth").split(",")[0],
            password: getCookie("auth").split(",")[1]
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then((response) => response.json())
    .then((json) => {
        if (json === false) {
            alert("Your sign in details are invalid - make sure you are signed in!");
            window.location = "account.html";
        }
        else {
            aliases = json;
            callback();
        }
    });
}