let aliases = [];

function updateAliases() {
    document.getElementsByTagName("table")[0].innerHTML = "<th>Address</th>\n<th>Nickname</th>\n<th>Change Nickname</th>";
    for (let i = 0; i < Object.keys(aliases).length; i++) {
        let tr = document.createElement("tr");

        let tdAddress = document.createElement("td");
        tdAddress.innerHTML = Object.keys(aliases)[i];

        let tdNickname = document.createElement("td");
        tdNickname.innerHTML = aliases[Object.keys(aliases)[i]];

        let tdChangeNickname = document.createElement("td");
        let inputChangeNickname = document.createElement("input");
        inputChangeNickname.setAttribute("id", "alias" + Object.keys(aliases)[i]);
        tdChangeNickname.appendChild(inputChangeNickname);

        let tdButtonChangeNickname = document.createElement("td");
        let buttonChangeNickname = document.createElement("button");
        buttonChangeNickname.innerHTML = "Submit";
        buttonChangeNickname.onclick = () => {setAlias(Object.keys(aliases)[i])};
        tdButtonChangeNickname.appendChild(buttonChangeNickname);

        tr.appendChild(tdAddress);
        tr.appendChild(tdNickname);
        tr.appendChild(tdChangeNickname);
        tr.appendChild(tdButtonChangeNickname);

        document.getElementsByTagName("table")[0].appendChild(tr);
    }
}

function setAlias(address) {
    fetch("alias/rename", {
        method: "POST",
        body: JSON.stringify({
            address: getCookie("auth").split(",")[0],
            password: getCookie("auth").split(",")[1],
            aliasAddress: address,
            nickname: document.getElementById("alias" + address).value
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
            updateAliases();
        }
    });
}

function createNewAlias() {
    fetch("alias/add", {
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
            updateAliases();
        }
    });
}

getAliases(updateAliases);