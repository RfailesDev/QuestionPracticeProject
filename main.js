// Основной JavaScript для обычного режима
$(document).ready(function () {
    $('#gotoQuestions_kp').click(function () {
        window.location.href = "questions_kp";
    });

    $('#gotoQuestions_history').click(function () {
        window.location.href = "questions_history";
    });
});

$(document).ready(function() {
    $('.scrolling-frame').on('click', '.showMoreButton', function() {
        var container = $(this).closest('.question-container');
        var button = container.find('.showMoreButton');
        var questionPart2 = container.find('.question-part2');
        var answerContainer = container.find('.answer-container');
        var txtColumn = container.find('.txt-column');

        if (questionPart2.hasClass('expanded')) {
            questionPart2.removeClass('expanded');
            if (button.hasClass('hide-answer-cls')) {
                button.removeClass('hide-answer-cls');
            }
            button.text('Показать ответ');
            questionPart2.css('max-height', '0');
            questionPart2.css('opacity', '0'); // Скрываем контент при скрытии

            txtColumn.css('opacity', '0');

            answerContainer.removeClass('showed');
        } else {
            questionPart2.addClass('expanded');
            button.text('Скрыть ответ');
            button.addClass('hide-answer-cls');
            questionPart2.css('max-height', answerContainer.height() + 30 + 'px'); // Установка максимальной высоты
            questionPart2.css('opacity', '1'); // Сделаем контент видимым при раскрытии

            txtColumn.css('opacity', '1');


            answerContainer.addClass('showed');
        }
    });
});
