let mail = [];

function getCookie(cookieName) {
    let cookies = decodeURIComponent(document.cookie);
    let index = cookies.indexOf(cookieName+"=");
    if (index == -1) {
        return undefined;
    }
    startIndex = index + cookieName.length + 1;
    endIndex = cookies.indexOf(";", startIndex);
    if (endIndex == -1) {
        endIndex = cookies.length;
    }
    return cookies.substring(startIndex, endIndex);
}

console.log(getCookie("auth"));

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
            alert("Your sign in details are invalid - make sure you are signed in!");
        }
        else {
            mail = json;
            updateMail(json);
        }
    });
}

function updateMail(json) {
    for (let i = 0; i < json.length; i++) {
        let tr = document.createElement("tr");
        tr.setAttribute("class", "hoverunderline");
        tr.setAttribute("onclick", `selectRow(${i})`);

        let tdSubject = document.createElement("td");
        tdSubject.innerHTML = json[i].subject;

        let tdFrom = document.createElement("td");
        tdFrom.innerHTML = json[i].from;

        let tdTo = document.createElement("td");
        tdTo.innerHTML = json[i].parsedTo;

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
    mail[index].text;
}

getMail();