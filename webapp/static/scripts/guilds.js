function loadTable(name) {
    fetch('/data/guilds' + name)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            var keys = [];
            for (var i in json['keys']) {
                keys.push({
                    title: json['keys'][i]
                });
            }
            $('#guilds').DataTable({
                "fnDrawCallback": function () {
                    $("#guilds tbody tr").click(function () {
                        var table = $('#guilds').dataTable();
                        var position = table.fnGetPosition(this);
                        var id = table.fnGetData(position, 0);
                        window.location.href = "/guild?id=" + id;
                    });
                },
                data: json['data'],
                columns: keys,
                "columnDefs": [{
                        "targets": [0],
                        "visible": false,
                        "searchable": false
                    },
                    {
                        "targets": -1,
                        "className": "dt-body-right"
                    }
                ],
                "order": [
                    [
                        2, "desc"
                    ]
                ],
                scrollX: true
            });
            var n = urlParams.get('find')
            if (typeof n == "string" && n != '') {}

            console.log(json);
        });
}


$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    var name = urlParams.get('find')
    if (typeof name == "string" && name != '') {
        name = '/' + name;
        document.getElementById('updateButton').style.display = 'block';
    } else {
        name = '';
    }
    loadTable(name);
});

function update() {
    var urlParams = new URLSearchParams(window.location.search);
    var name = urlParams.get('find')
    fetch('/data/guilds/update/' + name)
        .then(function (response) {
            var result = response.json();
            return result;
        })
        .then(function (json) {
            if (json['result'] === "ok") {
                location.reload()
                alert("Guild database was updated for guilds named: " + name + ". \n\n If your guild is not listed below, please go to the main page and try a search with the whole guild name, as it is written in game.")
            }
            console.log(json);
        });
}