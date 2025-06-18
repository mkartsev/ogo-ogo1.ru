$(".js-detail-page-review-block").on("reviews", function () {

  // Заполняем прогрессбар рейтинга
  function ratingProgress() {
    var $statsProgress = $('.b-rating__stats-progress');
    $statsProgress.each(function () {
      progressValue = $(this).data('value');
      $(this).css('width', progressValue + '%');
    })
  }

  let $feedbackBlock = $('#feedback-container'),
      $container = $('#feedback-items'),
      $buttonGetAll = $('#feedback-items-all'),
      $buttonGetOgo = $('#feedback-items-ogo'),
      $buttonSort = $('#feedback-items-sort'),
      $buttonMore = $('#feedback-items-more'),
      url = '/ajax/new/element_reviews.php',
      source = 'all',
      order = 'date',
      dir = 'desc',
      page = 1,
      totalPages,
      code,
      query = {
        'source': source,
        'page': page,
        'order': order,
        'dir': dir,
        'ajax': 1,
      };
  totalPages = $buttonMore.data("total");
  code = $feedbackBlock.data("code");
  query["code"] = code;


  //Рендер строки аватара юзера
  function renderPhoto(photo, author) {
    if (photo !== undefined && photo !== '') {
      return ('<img src="' + photo + '" class="b-feedback-product__photo" alt=""/>');
    } else {
      return '<span class="b-feedback-product__photo-placeholder">' + author.charAt(0) + '</span>';
    }
  }

  //Рендер звезд отзыва
  function renderStars(rate) {
    if (rate !== undefined) {
      stars = '';
      for (var i = 0; i < 5; i++) {
        if (i < rate) {
          stars += '<li class="b-rating__item b-rating__item_active"></li>'
        } else {
          stars += '<li class="b-rating__item"></li>'
        }
      }
      return stars
    }
  }

  //Конвертируем дату в DD.YY.MMMM
  function renderDate(date) {
    if (date !== undefined) {
      let date_ob = new Date(date);
      let day = ("0" + date_ob.getDate()).slice(-2);
      let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      let year = date_ob.getFullYear();
      return (day + '.' + month + '.' + year);
    } else {
      return '';
    }
  }

  //Рендер ссылки на отзыв в Яндексе
  function renderYandex(source) {
    if (source === 'yandex') {
      return ('<span class="b-feedback-product__external"><img src="/assets/img/icons/1200px-Yandex-market.png" srcset="/assets/img/icons/1200px-Yandex-market@2x.png 2x" title="отзыв на Яндексе" /></span>');
    } else {
      return '';
    }
  }

  //Рендер плюсов, минусов, текста
  function renderText(pros, cons, text) {
    var comment = '';
    if (pros !== undefined) {
      comment += ('<div class="b-feedback-product__content-item"><div class="b-feedback-product__content-caption">Плюсы: </div><div class="b-feedback-product__content-text">' + pros + '</div></div> ');
    }
    if (cons !== undefined) {
      comment += ('<div class="b-feedback-product__content-item"><div class="b-feedback-product__content-caption">Минусы: </div><div class="b-feedback-product__content-text">' + cons + '</div></div> ');
    }
    if (text !== undefined) {
      comment += ('<div class="b-feedback-product__content-item"><div class="b-feedback-product__content-caption">Комментарий: </div><div class="b-feedback-product__content-text">' + text + '</div></div>');
    }
    return comment;
  }

  //Рендер шаблона отзыва
  function renderTemplate(data) {
    var template = '<article class="b-feedback-product__item">' +
        '<header class="b-feedback-product__header">' +
        '<div class="b-feedback-product__contact">' +
        '<picture class="b-feedback-product__photo-holder">' +
        renderPhoto(data.photo, data.author) +
        '</picture>' +
        '<div class="b-feedback-product__contact-top">' +
        '<h2 class="b-feedback-product__name">' + data.author + '</h2>' +
        '<time class="b-feedback-product__date" datetime="' + renderDate(data.date) + '" pubdate>' + renderDate(data.date) + '</time>' +
        '</div>' +
        '<div class="b-feedback-product__contact-bottom">' +
        renderYandex(data.source) +
        '<div class="b-feedback-product__score">' +
        '<div class="b-rating">' +
        '<ul class="b-rating__items">' +
        renderStars(data.rate) +
        '</ul>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</header>' +
        '<div class="b-feedback-product__cols">' +
        '<div class="b-feedback-product__content-col">' +
        renderText(data.pros, data.cons, data.text) +
        '</div>' +
        '</div>' +
        '</article>';
    return template;
  }

  //Получаем отзывы
  function getFeedback(query) {
    $.ajax({
      url: url,
      type: 'GET',
      data: query,
      dataType: 'json',
      beforeSend: function () {
        $buttonMore.text("Загрузка...");
      },
      success: function (response) {
        totalPages = response['total_pages'];
        var feedbackArray = response['reviews'];

        for (var i = 0; i < feedbackArray.length; i++) {
          var element = feedbackArray[i]
          $container.append(renderTemplate(element));
        }

        if (totalPages > 1) {
          $buttonMore.text('Показать еще').show();
        }
        if (query.page == totalPages) {
          $buttonMore.hide();
        }
      },
      error: function (response) {
        $buttonMore.hide();
        console.log('ERROR:' + response);
      }
    });
  }

  function processFeedbackSourceClick($this, source) {
    if ($this.hasClass('b-tags__tag_active')) {
      return false;
    }
    $this.parents('.b-tags__items').find('.b-tags__tag').removeClass('b-tags__tag_active');
    $this.addClass('b-tags__tag_active');
    $container.html('');
    query.source = source;
    query.page = 1;
    getFeedback(query);
    if (totalPages > 1) {
      $buttonMore.text('Показать еще').show();
    }
    return true;
  }

  $buttonGetAll.on('click', function (e) {
    e.preventDefault();
    let $this = $(this);
    return processFeedbackSourceClick($this, 'all');
  });

  $buttonGetOgo.on('click', function (e) {
    e.preventDefault();
    let $this = $(this);
    return processFeedbackSourceClick($this, 'ogo');
  });

  $buttonSort.on('change', function () {
    $container.html('');
    query.page = 1;
    query.order = $(this).val();
    query.dir = $(this).find(':selected').data('order');
    getFeedback(query);
    if (totalPages > 1) {
      $buttonMore.text('Показать еще').show();
    }
  });

  $buttonMore.on('click', function (e) {
    e.preventDefault();
    if (query.page < totalPages) {
      query.page += 1;
      getFeedback(query);
    }
  });

  $('.b-feedback-item').livequery(function () {
    var $context = $(this);
    var $nameField = $('.b-feedback-item__save-field_name', $context);
    var $orderField = $('.b-feedback-item__save-field_order', $context);
    var $commentField = $('.b-feedback-item__save-field_comment', $context);
    var $ratingField = $('.b-feedback-item__rating .b-rating', $context);
    var $form = $('form', $context);

    // Btns
    var $editBtn = $('.b-feedback-item__edit-btn', $context);
    var $editBtnHolder = $('.b-feedback-item__ui-edit', $context);
    var $saveBtn = $('.b-feedback-item__save-btn', $context);
    var $saveBtnHolder = $('.b-feedback-item__ui-save', $context);
    var $removeBtn = $('.b-feedback-item__remove-btn', $context);
    var $removeBtnHolder = $('.b-feedback-item__ui-remove', $context);

    // Inputs
    var $inputName = $('[name="PROPERTY_VALUES[NAME]"]', $context);
    var $inputOrder = $('[name="PROPERTY_VALUES[ORDER]"]', $context);
    var $inputComment = $('[name="PROPERTY_VALUES[COMMENTS]"]', $context);
    var $inputRating = $('[name="PROPERTY_VALUES[RATING]"]', $context);

    function setEditState() {
      $saveBtnHolder.addClass('b-feedback-item__ui-save_active');
      $editBtnHolder.removeClass('b-feedback-item__ui-edit_active');
      $context.addClass('_edit-state');
      $('.b-address-form', $context).trigger('block.resize');
      return false;
    }

    function saveChanges(e) {
      e.preventDefault();
      preloader();
      applyChanges();
      sendChangesToServer();
      if (!$context.hasClass('b-comments-modal'))
        setSaveState();
      return false;
    }

    function applyChanges(isPreventRender) {
      var name = $inputName.val();
      var order = $inputOrder.val();
      var comment = $inputComment.val();
      var rating = parseInt($inputRating.val());

      if (!isPreventRender) {
        $nameField.find('.b-feedback-item__field-content').text(name);
        name == '' ? $nameField.addClass('_hide') : $nameField.removeClass('_hide');

        $orderField.find('.b-feedback-item__field-content').text(order);
        order == '' ? $orderField.addClass('_hide') : $orderField.removeClass('_hide');

        $commentField.find('.b-feedback-item__field-content').text(comment);
        comment == '' ? $commentField.addClass('_hide') : $commentField.removeClass('_hide');

        $ratingField.trigger('change-val.block', [rating]);
        return true;
      }

      return [name, order, comment, rating];
    }

    function sendChangesToServer() {
      // accept any $.ajax options
      $('.js-feedback-error-message').html('').hide();
      $form.ajaxSubmit({
        method: 'post',
        dataType: 'json',
        success: function (response) {
          if (response.status === 'success') {
            $.fancybox.open(
                $("#feedback-result"), {
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
          } else {
            if (response.message)
              $('.js-feedback-error-message').html(response.message).show();
          }
          preloader();
        },

        error: function () {
        }
      });
    }

    function setSaveState() {
      $saveBtnHolder.removeClass('b-feedback-item__ui-save_active');
      $editBtnHolder.addClass('b-feedback-item__ui-edit_active');
      $context.removeClass('_edit-state');
      return false;
    }

    function removeItem() {
      preloader();
      $.ajax({
        url: $(this).attr('href'),
        data: {
          'ID': $(this).data('item')
        },
        method: 'post',
        success: function () {
          $context.remove();
          preloader();
        }
      });
      return false;
    }

    $editBtn.on('click', setEditState);
    $saveBtn.on('click', saveChanges);
    $removeBtn.on('click', removeItem);

  });

  $('.b-rating-form').livequery(function () {
    var $context = $(this);
    var $items = $('.b-rating-form__item', $context);
    var $input = $('.b-rating-form__input input', $context);

    function changeValueByClick() {
      var $currItem = $(this);
      var index = $items.index($currItem);
      if (index === -1) {
        return;
      }
      var value = 5 - index;

      $input.val(value);

      $items.removeClass('b-rating-form__item_active');
      $currItem.find('~ .b-rating-form__item').addClass('b-rating-form__item_active');
      $currItem.addClass('b-rating-form__item_active');
    }

    function changeValueByInput() {
      var value = parseFloat($input.val());
      changeValueByClick.apply($items.eq(5 - value));
    }

    changeValueByInput();

    $items.on('click', changeValueByClick);
    $input.on('change.block', changeValueByInput);
  });

  $('select.select2').livequery(function () {

    if ($('html').hasClass('touch')) {
      return false;
    }

    var placeholder = $(this).attr('placeholder');

    $(this).select2({
      theme: 'main',
      minimumResultsForSearch: -1,
      placeholder: placeholder,
      width: '100%'
    });
  });

  ratingProgress();

  function GetURLParameter(sParam) {
    let sPageURL = window.location.search.substring(1);
    let sURLVariables = sPageURL.split('&');
    for (let i = 0; i < sURLVariables.length; i++) {
      let sParameterName = sURLVariables[i].split('=');
      if (sParameterName[0] === sParam) {
        return sParameterName[1];
      }
    }
    return '';
  }

  if (GetURLParameter('add_review') === "1") {
    try {
      let order_no = GetURLParameter('order_no').replace(/\D/g, '');
      let elements = document.getElementsByName('PROPERTY_VALUES[ORDER]');
      if (elements.length === 1) {
        elements[0].value = order_no;
      }
      document.getElementsByClassName("b-feedback-product__button")[0].click();
    } catch (e) {
    }
  }

});
