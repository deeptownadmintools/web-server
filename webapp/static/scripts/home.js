function setNameForSearch() {
    var urlParams = new URLSearchParams(window.location.search);
    localStorage.setItem('guildSearchString', document.getElementById('mainSearchBar').value);
    urlParams.set('find', document.getElementById('mainSearchBar').value);
    window.location.href = "/guilds?"+urlParams;
};

var input = document.getElementById("mainSearchBar");
    input.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            document.getElementById("submitButton").click();
        }
    });