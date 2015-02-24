$(function() {
    var resize = [];
    $('#terminal').terminal(function(command, term) {
        if (command === 'help') {
            term.echo(
                'Доступные команды:\n' +
                '  getcake         получить тортик\n'+
                '  getgift         получить подарок\n' +
                '  auth            system auth\n'
            );
        } else if (command === 'auth') {
            var attempts = 1;
            var answers = 0;
            term.echo(
                'Авторизация в системе получения подарка\n' +
                'Нажмите [[b;#0E1;#000]ctrl+D] для выхода из системы авторизации\n' +
                'Пожалуйста, подтвердите, что вы не робот, а Эля ответив на несколько вопросов.\n'
            );
            term.echo();
            var currentQuestion = 0;
            var questions = [
                ['Введите номер вашего любимого Доктора', function(c) {return c === '10';}],
                ['Чье молоко в дозированных сливках?', function(c) {return c.indexOf('олен') > -1;}],
                ['Какие твои любимые конфеты?', function(c) {return c.indexOf('лакр') > -1;}]
            ];
            term.echo(questions[currentQuestion][0]);
            term.push(function(command, term) {
                console.log(command.toLowerCase());
                if (questions[currentQuestion][1](command.toLowerCase())) {
                    term.echo('Так бы ответила Эля!');
                    currentQuestion++;
                    if (currentQuestion === questions.length) {
                        term.echo('\nВы успешно авторизованы!\n');
                        localStorage.setItem('el-auth', 'ok');
                    }
                    if (currentQuestion >= questions.length) { term.pop(); return; }
                    term.echo('\n' + questions[currentQuestion][0]);
                } else {
                    term.echo('Эля бы так не ответила!');
                    if (++attempts > 3) {
                        term.echo('Превышено количество попыток входа. Попробуйте снова.\n');
                        term.pop();
                    }
                    term.echo('\n' + questions[currentQuestion][0]);
                }
            }, {
                prompt: 'Ваш ответ: ',
                name: 'auth.dw'
            });

        } else if (command === 'getgift') {
            if (localStorage.getItem('el-auth')) {
                term.echo('Назовите Александру секретный код [[b;#ff0000;#000]42]');
            } else {
                term.echo('Вы не авторизованы! Подарок только для Эли!');
            }
        }  else if (command === 'getcake') {
            if (localStorage.getItem('el-auth')) {
                cake = document.getElementById('cake');
                term.echo(
                    '\n         Сегодня [[b;#4752e0;#000]тортик] -- это не [[b;#dc143c;#000]ложь]!\n' +
                    cake.innerHTML
                );
            } else {
                term.echo('Вы не авторизованы! Поздравления только для Эли!');
            }
        } else if (command === 'unauth') {
            localStorage.removeItem('el-auth');
        } else {
            term.echo(
                'Неизвестная команда\n' +
                'Для вызова справки наберите [[b;#0E1;#000]help]\n'
            );
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
        },
        onBlur: function() {
            return false;
        }
    });
});
