var table;

function loadData(id) {
    fetch('/data/guild/' + id)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            let keys = [];
            for (var i in json['players']['keys']) {
                keys.push({
                    title: json['players']['keys'][i]
                });

            }
            // for (var i in json['players']['data']) {
            //     json['players']['data'][i][2] = moment(json['players']['data'][i][2]);
            //     console.log(json['players']['data'][i][2])
            // }
            $('#guildName').text(json['name']);
            document.getElementById('donationsLink').href = '/donations?id=' + json['id'];

            // $.fn.dataTable.moment('ddd, DD MMM YYYY HH:mm:ss zz');
            $.fn.dataTable.moment('ddd, DD MMM YYYY HH:mm:ss');
            table = $('#players').DataTable({
                data: json['players']['data'],
                columns: keys,
                "columnDefs": [{
                        "targets": [0],
                        "visible": false,
                        "searchable": false
                    },
                    {
                        "targets": [2],
                        "visible": false,
                        // "render": function (data, type, row, meta) {
                        //     var ThisDate = data.format('ddd, DD MMM YYYY HH:mm:ss');
                        //     console.log(ThisDate);
                        //     return ThisDate;
                        // },
                        "render": function (data, type, row, meta) {
                            return data.substring(0, data.length - 4);
                        },
                    },
                    {
                        "targets": [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                        "className": "dt-right",
                        "type": "num"
                    },
                    {
                        "targets": [1, 2],
                        "className": "dt-left"
                    },
                ],
                "order": [
                    [
                        10, "desc"
                    ]
                ],
                scrollX: true
            });
            $('.columnToggler').on('click', function (e) {
                e.preventDefault();

                // Get the column API object
                var column = table.column($(this).attr('data-column'));

                // Toggle the visibility
                column.visible(!column.visible());
            });

            var last = JSON.parse(localStorage.getItem('lastVisited') || null);
            console.log(last);
            console.log(typeof (last));
            if (last == null) {
                last = []
            }
            console.log(last);
            var found = false;
            for (var i in last) {
                if (last[i][0] == id) {
                    last[i][2] = Date.now();
                    found = true;
                    break;
                }
            }
            if (!found) {
                if (last.length < 8) {
                    last.push([id, json['name'], Date.now()]);
                } else {
                    last[7] = [id, json['name'], Date.now()];
                }
            }
            last.sort(function (a, b) {
                return b[2] - a[2];
            })
            console.log(last);
            localStorage.setItem('lastVisited', JSON.stringify(last));
            localStorage.setItem('data', JSON.stringify(json));

            console.log(json);
        });
}


$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id')
    if (id == 'undefined') {
        alert('Undefined parameter "id"')
    }
    loadFavourites();
    loadData(id);
});


function toCsv() {
    var data = JSON.parse(localStorage.getItem('data') || null);
    if (data == null) {
        return;
    }

    var csv = 'data:text/csv;charset=utf-8,"';
    csv += 'name","' + data['name'] + '"\r\n"';
    csv += 'level","' + data['level'] + '"\r\n"';
    csv += '"\r\n"';
    csv += data['players']['keys'].join('","') + '"\r\n"';
    data['players']['data'].forEach(function (arr) {
        csv += arr.join('","') + '"\r\n"';
    });
    csv += '"'
    
    var name = data['name'].split(' ').join('_');
    name += '_' + Date.now() + '.csv';

    var link = document.createElement("a");
    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", name);
    document.body.appendChild(link);
    link.click();
}