var l1Table;
var l2Table;
var tableBuilt = false;
var countTable;

function loadData(id) {
    fetch('/data/guild/id/' + id +'/times')
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            var keys = [];
            for (var i in json['times']['keys']) {
                keys.push({
                    title: json['times']['keys'][i]
                });
            }
            $('#guildName').text(json['name']);
            // var data = [];
            // for (var i in json['times']['data']) {
            //     var d = new Date(json['times']['data'][i][1])
            //     console.log(json['times']['data'][i][1])
            //     data.push([json['times']['data'][i][0], d.toLocaleString()]);
            // }
            json['times']['data'].push([2147483647, "Dawn of time"]);
            json['times']['data'].push([-1, "Dawn of time"]);
            l1Table = $('#list1').DataTable({
                data: json['times']['data'],
                columns: keys,
                "select": {
                    "style": "single",
                    "info": false
                },
                "columnDefs": [{
                        "targets": [0],
                        "visible": false,
                        "searchable": false
                    },
                    {
                        "targets": [1],
                        "className": "dt-center"
                    },
                    {
                        'orderData': [0],
                        'targets': [1]
                    }
                ],
                "order": [
                    [
                        0, "desc"
                    ]
                ]
            });
            json['times']['data'][json['times']['data'].length - 1][1] = 'Now';
            json['times']['data'][json['times']['data'].length - 2][1] = 'Now';
            l2Table = $('#list2').DataTable({
                data: json['times']['data'],
                columns: keys,
                "select": {
                    "style": "single",
                    "info": false
                },
                "columnDefs": [{
                        "targets": [0],
                        "visible": false,
                        "searchable": false
                    },
                    {
                        "targets": [1],
                        "className": "dt-center"
                    },
                    {
                        'orderData': [0],
                        'targets': [1]
                    }
                ],
                "order": [
                    [
                        0, "desc"
                    ]
                ]
            });
            console.log(json);
            localStorage.setItem("times", json);
        });
}


$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id')
    if (id == 'undefined') {
        // window.location.href = '/400';
        alert('Undefined parameter "id"')
    }
    loadFavourites();
    loadData(id);
});

function displayCount(json) {
    if (tableBuilt) {
        countTable.clear();
        countTable.rows.add(json['data']);
        countTable.draw();
        return;
    }
    tableBuilt = true;
    let keys = [];
    for (var i in json['keys']) {
        keys.push({
            title: json['keys'][i]
        });
    }
    countTable = $('#count').DataTable({
        data: json['data'],
        columns: keys,
        "columnDefs": [{
                "targets": [1, 2],
                "className": "dt-right",
                "type": "num"
            },
            {
                "targets": [0],
                "className": "dt-left"
            }
        ],
        "order": [
            [
                1, "desc"
            ]
        ],
        scrollX: true
    });
}

function don(timeId) {
    var urlParams = new URLSearchParams(window.location.search);
    var guildId = urlParams.get('id')
    if (guildId == 'undefined') {
        alert('Undefined parameter "id"')
        return;
    }
    fetch('/data/donations/difference/guild/id/' + guildId + '/time/id/' + timeId)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            displayCount(json);
            console.log(json);
        });
}

function donc() {
    var urlParams = new URLSearchParams(window.location.search);
    var guildId = urlParams.get('id')
    if (guildId == 'undefined') {
        alert('Undefined parameter "id"')
        return;
    }
    fetch('/data/donations/current/guild/id/' + guildId)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            displayCount(json);
            console.log(json);
        });

}

function dond(timeId1, timeId2) {
    fetch('/data/donations/difference/time/id/' + timeId1 + '/time/id/' + timeId2)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            displayCount(json);
            console.log(json);
        });
}

function dons(timeId) {
    fetch('/data/donations/specified/time/id/' + timeId)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            displayCount(json);
            console.log(json);
        });

}

function count() {
    let selected1 = l1Table.rows({
        selected: true
    });
    let selected2 = l2Table.rows({
        selected: true
    });
    if (selected1.count() != 1 || selected2.count() != 1) {
        alert('Please select both dates "From" and  "To".\n\nIf you wish to make a count from selected date up until now, you can select "Now" in the "To" column.\n\nIf you wish to get a count from stat of the game, please select "Dawn of time" in the "From" column.');
        return;
    }
    let id1 = l1Table.rows(selected1[0]).data()[0][0];
    let id2 = l2Table.rows(selected2[0]).data()[0][0];
    console.log(id1);
    console.log(id2);
    if (id1 == 2147483647 || id1 == -1) {
        if (id2 == 2147483647 || id2 == -1) {
            donc();
        } else {
            dons(id2);
        }
    } else {
        if (id2 == 2147483647 || id2 == -1) {
            don(id1);
        } else {
            dond(id1, id2);
        }
    }
}