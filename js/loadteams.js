var spinner = new Spinner().spin();
$('#mainTable').append(spinner.el);

window.onload = function() {
    init()
};


var public_spreadsheet_url = 'https://docs.google.com/spreadsheet/pub?hl=en_US&hl=en_US&key=1_mNN7NPsxEUaDuH_j6SN4KZLvYXQeLWXiWKZCW_y2c8&output=html';

function init() {

    Tabletop.init({
        key: public_spreadsheet_url,
        callback: createTable,
        simpleSheet: true
    })
}

function addToTable(table, v, number) {

    table.push('<tr><td>');
    table.push((number).toString());
    table.push('</td><td>');
    table.push(v['команда']);
    table.push('</td><td>');
    table.push(v['город']);
    table.push('</td></tr>');
}

function createTable(data, tabletop) {
    var mainTable = [],
        mainCount = 1;

    data.forEach(function(v, index) {
        addToTable(mainTable, v, mainCount++);
    });

    $('table').css("visibility", "visible");
    $('#mainTable').append(mainTable.join(''));
    spinner.stop();
}