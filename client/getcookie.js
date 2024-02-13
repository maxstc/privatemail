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