function loadFavourites() {
    var text = "";
    var last = JSON.parse(localStorage.getItem('lastVisited') || null);
    console.log(last);
    if (last == null) {
        document.getElementById('dropdownFav').style.display = 'none';
        return;
    }
    for (var i in last) {
        text += '<a class="dropdown-item" href="' + '/guild?id=' + last[i][0] + '">' + last[i][1] + '</a>\n'
    }

    document.getElementById("fav").innerHTML = text;
}