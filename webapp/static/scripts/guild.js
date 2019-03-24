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
                        "className": "dt-body-right",
                        "type": "num"
                    },
                    {
                        "targets": [1, 2],
                        "className": "dt-body-left"
                    },
                    // {
                    //     targets: 2,
                    //     render: $.fn.dataTable.render.moment()
                    // }
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
            console.log(json);
        });
}


$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id')
    if (id == 'undefined') {
        alert('Undefined parameter "id"')
    }
    loadData(id);
});