if (getCookie("auth") === undefined) {
    redirectToAccount();
}
else {
    document.getElementById("signedinas").innerHTML = "Signed in as " + getCookie("auth").split(",")[0];
}

function getMail() {

    fetch("mail/inbox", {
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
            redirectToAccount();
            return;
        }
        else {
            mail = json;
            updateMail();
        }
    });
}

function redirectToAccount() {
    alert("Your sign in details are invalid - make sure you are signed in!");
    window.location = "account.html";
}

function updateMail() {
    for (let i = 0; i < mail.length; i++) {
        let tr = document.createElement("tr");
        tr.setAttribute("class", "hoverunderline");
        tr.setAttribute("onclick", `selectRow(${i})`);

        let tdSubject = document.createElement("td");
        tdSubject.innerHTML = mail[i].subject;

        let tdFrom = document.createElement("td");
        tdFrom.innerHTML = mail[i].from;

        let tdTo = document.createElement("td");
        tdTo.innerHTML = mail[i].parsedTo;

        let tdDate = document.createElement("td");
        tdDate.innerHTML = "NYI";

        tr.appendChild(tdSubject);
        tr.appendChild(tdFrom);
        tr.appendChild(tdTo);
        tr.appendChild(tdDate);

        document.getElementsByTagName("table")[0].appendChild(tr);
    }
}

function selectRow(index) {
    document.getElementsByTagName("div")[1].innerHTML = 
    "<p>To: " + mail[index].to + "</p>" +
    "<p>From: " + mail[index].from + "</p>" +
    "<p>Subject: " + mail[index].subject + "</p>" +
    "<div style=\"white-space: pre-wrap\">" + mail[index].text + "</div>";
}

getMail();