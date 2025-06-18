$(".js-detail-page-questions-block").on("questions", function () {
	let $questionModal = $('.b-questions-answer-modal'),
		$form = $('form', $questionModal),
		$submitButton = $('.button', $form);

	$submitButton.on('click', function () {

		preloader();
		$form.ajaxSubmit({
			method: 'post',
			dataType: 'json',
			success: function (result) {
				let text = "Ваш вопрос принят и на него вскоре ответит оператор, спасибо.";
				let header = "Ваш вопрос принят!";
				if (result.status === "error") {
					text = result.message;
					header = "Ошибка!";
				}

				$('#errorResult').text(text);
				$('#headerModalr').text(header);
				$('.b-faq-block__text-area textarea').val('');

				$.fancybox.open(
					$("#question-result"),
					{
						padding: 0,
						margin: 20,
						closeEffect: 'none',
						closeSpeed: 0,
						openSpeed: 0,
						openEffect: 'none',
						openOpacity: false,
						closeOpacity: false,
						fitToView: true,
						scrolling: 'visible',
						beforeShow: function () {
							$('html').addClass('fancybox-margin fancybox-lock');
						},
						afterShow: function () {
							$('.iblock', this.inner).trigger('resize.block');
						}
					}
				);

				preloader();
			},

			error: function () {
                preloader();
			}
		});

	});

	// Дебаунс обыкновенный
	function debounce(func, wait, immediate) {
		let timeout;
		return function () {
			let context = this, args = arguments;
			let later = function () {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			let callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	}

	let $section = $('#' + $('.b-faq__toggler').data('target'));

	$('body').on('click', '.b-faq__toggler', function (e) {
		e.preventDefault();
		$(this).toggleClass('_is-active');
		//var $target = $('#' + $(this).data('target'));
		$section.slideToggle('fast');
	});

	$('.show-all').showTotalListItems({
		'max': 3,
		'speed': 300,
		'moreText': 'Показать еще',
		'lessText': 'Показать меньше',
		'moreHTML': '<div class="b-faq-questions__more pagination maxlist-total">' +
			'<a href="#" class="b-faq-questions__more-link button-more">Показать еще</a>' +
			'</div>'
	});

	// Использование
	let checkBreakpoint = debounce(function () {
		if (window.matchMedia('(min-width: 1024px)').matches) {
			$('.b-faq__toggler').removeClass('_is-active');
			$section.show('fast');
		}
	}, 100);

	window.addEventListener('resize', checkBreakpoint);

});
