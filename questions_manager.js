$(document).ready(function () {
    // Загрузка JSON-файла (замените 'data.json' на путь к вашему файлу)
    $.getJSON('https://gist.githubusercontent.com/RfailesDev/0cec1fc2dde09be5213dabe5a6415501/raw', function (data) {
        // Перебираем элементы JSON
        $.each(data, function (index, item) {
            createQuestionContainer(item.question, item.answer);
        });
    });
    const $scrolling_frame = $('.scrolling-frame')
    // Функция для создания контейера с вопросом и ответом
    function createQuestionContainer(question, answer) {
        var containerHtml = `
            <div class="container question-container">
                <div class="txt question-num">${$('.container.question-container').length + 1}</div>
                <div class="txt question">${question}</div>
                <div class="question-part2">
                    <div class="answer-container">
                        <div class="vert-line"></div>
                        <div class="txt answer">${answer}</div>
                    </div>
                </div>
                <div class="showMoreButton-container">
                    <button id="toggleButton" class="showMoreButton">
                        Показать ответ
                    </button>
                    <div class="txt-column">
                        <div class="hidden-txt">Ответ может быть неверным или неполным.</div>
                        <div class="hidden-txt">Ответ мог быть сгенерирован при помощи ИИ.</div>
                    </div>
                </div>
            </div>
        `;
        $scrolling_frame.append(containerHtml);
    }
    var scrollingFrame = $('.scrolling-frame');
    var isAnimating = false;
    var currentAnimation = null;
    var container = $(this).closest('.question-container');
    var searchTxt = $('.search-txt');
    // Обработчик события для поля ввода поиска
    $('#search-bar-input').on('input', function () {
        var searchText = $(this).val().toLowerCase();
        scrollingFrame.stop(); // Остановить текущую анимацию прокрутки
        if (searchText === '') {
            searchTxt.css('opacity', '1');
            // Если поле поиска пусто, убираем выделение и сбрасываем анимацию
            $('.container.question-container .question').removeClass('highlight');
            isAnimating = false;
            if (currentAnimation) {
                currentAnimation.stop();
            }
        } else {
            searchTxt.css('opacity', '0');
            // Если есть текст в поле поиска
            $('.container.question-container').each(function () {
                var questionText = $(this).find('.question').text().toLowerCase();
                var isMatch = questionText.includes(searchText);
                if (isMatch) {
                    // Найдено совпадение в вопросе, выделяем текст
                    $(this).find('.question').addClass('highlight');
                } else {
                    // Убираем выделение и восстанавливаем стандартные стили
                    $(this).find('.question').removeClass('highlight');
                }
            });
            // Прокрутка к первому найденному элементу с использованием smooth scroll
            var firstMatch = $('.container.question-container .question.highlight').first();
            if (firstMatch.length > 0) {
                var targetOffset = firstMatch.offset().top - scrollingFrame.offset().top + scrollingFrame.scrollTop();
                if (isAnimating) {
                    currentAnimation.stop();
                }
                isAnimating = true;
                currentAnimation = scrollingFrame.animate({
                    scrollTop: targetOffset - 50 // 50 - отступ от верха плитки
                }, 250, function () {
                    isAnimating = false;
                });
            }
        }
    });
    // Обработчик события для кнопки "X", чтобы стереть поиск
    $('#clear-search').on('click', function () {
        $('#search-bar-input').val('');
        $('#search-bar-input').trigger('input'); // Имитируем событие input для очистки выделений
    });
    const $MoveUpButton = $('#move-up-button')
    // Обработчик события для кнопки "Move Up"
    $MoveUpButton.on('click', function () {
        var currentScrollPosition = scrollingFrame.scrollTop();
        if (currentScrollPosition > 0 && !isAnimating) {
            isAnimating = true;
            currentAnimation = scrollingFrame.animate({
                scrollTop: 0
            }, 300, function () {
                isAnimating = false;
            });
        }
    });
    $scrolling_frame.on('scroll', function() {
        if ($scrolling_frame.scrollTop() >= 200) {
            $MoveUpButton.addClass('active');
        } else {
            $MoveUpButton.removeClass('active');
        }
    });
});