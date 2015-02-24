$(function() {
    var resize = [];
    $('#terminal').terminal(function(command, term) {
        if (command === 'help') {
            term.echo(
                'Доступные команды:\n' +
                '  auth\tавторизоваться в системе\n'+
                '  getgift\tполучить подарок'
            );
        } else if (command === 'auth') {
            term.echo('На подарок');
        } else if (command === 'getgift') {
            term.echo('На подарок');
        } else {
            term.echo('Для вызова справки наберите `help`');
        }
    }, {
        greetings: null,
        onInit: function(term) {
            term.echo('El Happy Birthday Terminal\n');
        },
        onResize: function(term) {
            for (var i=resize.length;i--;) {
                resize[i](term);
            }
        }
    });
});
