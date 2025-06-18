var HtmlCache = {
    init: function () {
        if ($('#htmlcachewrapper').length <= 0) {
            $('body').append(
                $('<div id="htmlcachewrapper" style="display: none;"></div>')
            );
        }
    },
    add: function (id, html) {
        this.init();
        if ($('#htmlcachewrapper #' + id).length <= 0) {
            var wrapper = $('<div id= "' + id + '"></div>');
            $('#htmlcachewrapper').append(wrapper);
        }
        var block = $('#htmlcachewrapper #' + id);
        block.html(html);
    },
    get: function (id) {
        this.init();
        return $('#htmlcachewrapper #' + id);
    }
};


// Отложенная загрузка картинок
//Check for browser support
if ('loading' in HTMLImageElement.prototype) {
    function changeImgSrc() {
        var images = document.querySelectorAll('.js-lazyload');
        //copy the value of the data-src to the src.
        images.forEach(function (img) {
            return img.src = img.dataset.src;
        });
    }

    $(window).on('load catalog-plates.resize', changeImgSrc);
}
else {
    //if no support, async load the lazysizes plugin
    window.lazySizesConfig = window.lazySizesConfig || {};
    window.lazySizesConfig.lazyClass = 'js-lazyload';

    var script = document.createElement("script");
    script.async = true;
    script.src = "/assets/js/vendor/lazysizes/lazysizes.min.js";
    document.body.appendChild(script);
}


$(window).on('load product', function(){
    //меняем на зеленую кнопку -В корзине- в карточке товара
        $('.b-product-price__buy').livequery(function () {
                let $context = $(this);
                let prodCodes = ($(".c-header__cart .b-cart-link").attr("data-products") || "").toString().split(',');
                let cartBtn = '<a href="/cart/" class="b-product-price__buy-ok">В корзине</a>';
                if(prodCodes.some(element => element == $context.attr("data-id"))){
                    $context.replaceWith(cartBtn);
                }
                function addBasket(){
                    prodCodes.push($context.attr("data-id"));
                    let arrArt = prodCodes[0] == "" ? prodCodes[1] : prodCodes.join(",");
                    prodCodes = (arrArt || "").toString().split(',');
                    $(".c-header__cart .b-cart-link").attr('data-products', arrArt);
                    $context.replaceWith(cartBtn);
                }

                $context.on('click', addBasket);

        });
    });

function initEyeInputs(domElement)
{
    var $eye = $('.b-password-input__eye', domElement);
    var $input = $('input[type=password]', domElement);
    $eye.on('click', function () {
        var $link = $(this);
        if($input.attr('type') == 'text') {
            $input.attr('type', 'password');
            $link.removeClass('_open');
        } else {
            $input.attr('type', 'text');
            $link.addClass('_open');
        }
    });
}

function pushDataLayerBasketAction(obj) {
    if (!window.dataLayer) {
        return;
    }
    window.dataLayer.push({
        'event': obj.event,
        'event-action' : obj.eventAction,
        'event-category' : 'ecommerce',
        'event-label' : obj.name,
        'event-non-interaction' : 'False',
        'ecommerce': {
            [obj.eventType]: {
                'actionField': {
                    'list': obj.list
                },
                'products': [{
                    'id': obj.id,
                    'name': obj.name,
                    'brand': obj.brand,
                    'category': obj.category,
                    'position': parseInt(obj.position),
                    'price': obj.price,
                    'quantity': obj.quantity || 1
                }]
            }
        }
    });
    window.dataLayer.push({
      'event': 'add_to_cart',
      'value': obj.price,
      'items': [{'id': obj.id, 'google_business_vertical': 'retail'}]
    });
}

// domElement допускается передавать html-строкой
function showPopup(domElement) {
    $.fancybox.open(
        domElement,
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
                $(".fancybox-wrap").appendTo(".fancybox-overlay");
            }
        }
    );
}

function closePopup() {
    $.fancybox.close()
}

//меняем на зеленую кнопку -В корзине- в каталоге
function productBtn(){
    let $context = $('.b-plate-product__buy').length ? $('.b-plate-product__buy') : $('.b-list-product__buy');
    let cartBtn = '<a href="/cart/" class="b-product-plate__buy-ok">В корзине</a>';
    let productCodes = ($(".c-header__cart .b-cart-link").attr("data-products") || "").toString().split(',');

    function addBasket(){
        productCodes.push($(this).data("id"));
        let arrArt = productCodes[0] == "" ? productCodes[1] : productCodes.join(",");
        productCodes = (arrArt || "").toString().split(',');
        $(".c-header__cart .b-cart-link").attr('data-products', arrArt);
        $(this).replaceWith(cartBtn);
    }

    $.each($context, function(index, value){
        $cont = $(this);

        if (productCodes.some(element => element == $cont.data("id"))){
            $cont.replaceWith(cartBtn);
        }
    });


    $.each($context,function(index,value){
        $(this).on('click', addBasket);
    });
}


$(document).on('click', '.button-gray-close', function() {
    $.fancybox.close();
});

var getDefaultFormValidationSettings = function () {
    return {
        ignore: 'hidden',
        highlight: function (element) {
            $(element).removeClass('success').addClass('error');

            if ($(element).hasClass('coupon')) {
                $(element).parent().find('#coupon-success').detach();
            }
        },
        unhighlight: function (element) {
            $(element).removeClass('error').addClass('success');
            if ($(element).hasClass('coupon')) {
                if(!$(element).parent().find('#coupon-success').length) {
                    $(element).parent().append('<label style= "display: block; margin-top: color: #61a616" id="coupon-success">Спасибо, купон применен! </label>')
                }
            }
        },
        onclick: function (element) {
            if (element.name in this.submitted) {
                this.element(element);
            } else if (element.parentNode.name in this.submitted) {
                this.element(element.parentNode);
            }
        }
    };
};
var dataValidateForm = function (index, el) {
    if ($(el).data('is-custom-valid') !== 'Y') {
        $(el).validate(getDefaultFormValidationSettings());
    }
}

// Fn to allow an event to fire after all images are loaded
$.fn.imagesLoaded = function () {

    // get all the images (excluding those with no src attribute)
    var $imgs = this.find('img[src!=""]');
    // if there's no images, just return an already resolved promise
    if (!$imgs.length) {return $.Deferred().resolve().promise();}

    // for each image, add a deferred object to the array which resolves when the image is loaded (or if loading fails)
    var dfds = [];
    $imgs.each(function(){

        var dfd = $.Deferred();
        dfds.push(dfd);
        var img = new Image();
        img.onload = function(){dfd.resolve();}
        img.onerror = function(){dfd.resolve();}
        img.src = this.src;

    });

    // return a master promise object which will resolve when all the deferred objects have resolved
    // IE - when all the images are loaded
    return $.when.apply($,dfds);

}

// Добавить аксессуары
$(function () {
    $('.b-accessories-choose').livequery(function () {
        var $context = $(this);

        function equalizer() {
            var $platesHolder = $('.b-accessories-choose__items', $context);
            var $plates = $('.b-accessories-choose__item', $platesHolder);
            var height = 0;

            if($plates.length == 0) return;

            $plates.not('.is-resized').css('height', '');

            setTimeout(function () {
                requestAnimFrame(function () {
                    var wW = $(window).width();
                    var countInRow = 3;

                    if((wW >= 1024 && wW <= 1140) || (wW > 620 && wW <= 820)) {
                        countInRow = 2;
                    } else if(wW <= 620) {
                        countInRow = 1;
                    }


                    $plates.each(function (i, el) {
                        if(i % countInRow == 0) {
                            var $el = $(this);
                            var height = 0;
                            var $rowSiblings = $el.nextAll().slice(0, countInRow-1);

                            if($el.is(':visible') && !$el.hasClass('is-resized')) {
                                height = Math.max($el.outerHeight(), height);
                            }

                            if($rowSiblings.is(':visible') && !$rowSiblings.hasClass('is-resized')) {
                                height = Math.max(Math.max.apply(null, $rowSiblings.map(function () {
                                    return $(this).height();
                                }).get()), height);
                            }

                            if(!$el.hasClass('is-resized')) {
                                $el.addClass('is-resized');
                                $el.find('.b-product-small').css('height', height);
                            }

                            if(!$rowSiblings.hasClass('is-resized')) {
                                $rowSiblings.addClass('is-resized');
                                $rowSiblings.find('.b-product-small').css('height', height);
                            }
                        }
                    });
                });
            }, 100);
        }

        equalizer();
        $(window).on('resizeWidth', equalizer);
        $(document).on('accessories-choose.resize', equalizer);

    });
});

// Личный кабинет
$(function () {
    $('.js-lk').each(function () {
        var $context = $(this);
        var $addLegalEntitysBtn = $('.js-lk-requisites-add', $context);
        var $addAdressBtn = $('.js-lk-address-add', $context);
        var $emailInput = $('.js-lk-email');
        var $birthdayInput = $('.js-lk-birthday');

        function checkEmail() {
            let email = this.value;
            let reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            if (reg.test(email)) {
                $(this).closest('.form-group').removeClass('has-error');
                $("#MY_NEW_EMAIL").val(email);
                $("#MAIN_PROFILE_LOGIN").val(email);
            } else {
                $(this).closest('.form-group').addClass('has-error');
            }
        }

        function checkBirthday() {
            if (/[0-9]{2}\.[0-9]{2}\.[0-9]{4}/.test(this.value)) {
                $(this).closest('.form-group').removeClass('has-error');
            } else {
                $(this).closest('.form-group').addClass('has-error');
            }
        }

        function addAddress () {
            var $item = $('.js-lk-address-form', $context).clone();
            $item.find('select').data('init', '');
            $item.livequery();
            $('.js-lk-address-form', $context).after($item);
            $item.removeClass('lk-address--form js-lk-address-form');
            $item.livequery(LKAddress);
            $('.js-lk-address-empty').hide();

            return false;
        }

        function addEntity () {
            var $item = $('.js-lk-requisites-form', $context).clone();
            $item.livequery();
            $('.js-lk-requisites-form', $context).after($item);
            $item.removeClass('lk-requisites--form js-lk-requisites-form');
            $item.livequery(LKLegalEntity);
            $('.js-lk-requisites-empty').hide();
            $('input[required]', $item).on('blur', function() {
                if (!this.value) {
                    $(this).closest('.form-group').addClass('has-error');
                } else {
                    if (!$(this).hasClass('js-lk-requisites-inn'))
                        $(this).closest('.form-group').removeClass('has-error');
                }
            });
            $('input.js-lk-requisites-bic', $item).mask('999999999');
            $('input.js-lk-requisites-ks', $item).mask('99999999999999999999');
            $('input.js-lk-requisites-rs', $item).mask('99999999999999999999');
            $('input.js-lk-requisites-inn', $item).on('change', function() {
                if (/^[0-9]{10}([0-9]{2})?$/.test(this.value)) {
                    $(this).closest('.form-group').removeClass('has-error');
                } else {
                    $(this).closest('.form-group').addClass('has-error');
                }
            });

            return false;
        }

        $addAdressBtn.on('click', addAddress);
        $addLegalEntitysBtn.on('click', addEntity);
        $emailInput.on('change', checkEmail);
        $birthdayInput.on('change', checkBirthday);
    });
})

// Адрес в лк
LKAddress = function() {
    var that = this;
    var $context = $(this);
    var $address = $('.js-lk-address-value', $context);
    var $comment = $('.js-lk-address-comment', $context);
    var $title = $('.js-lk-address-title', $context);
    var $form = $('form', $context);

    // Btns
    var $editBtn = $('.js-lk-address-edit', $context);
    var $saveBtn = $('.js-lk-address-save', $context);
    var $removeBtn = $('.js-lk-address-remove', $context);
    var $defaultBtns = $('.js-lk-address-default', $context);
    var $mainBtn = $('.js-lk-address-default-active', $context);
    var $secondaryBtn = $('.js-lk-address-default-set', $context);
    var $citySelect = $('.js-city-select', $context);
    var $streetSelect = $('.js-street-select', $context);
    var $houseDadata = $('.js-house-dadata', $context);
    var $buildingDadata = $('.js-building-dadata', $context);


    //Inputs
    var $inputs = $('[name]', $context);
    var $inputName = $('[name="NAME"]', $context);
    var $inputTown = $('[name="CITY"]', $context);
    var $inputStreet = $('[name="STREET"]', $context);
    var $inputBuilding = $('[name="HOUSE"]', $context);
    var $inputBlock = $('[name="BUILDING"]', $context);
    var $inputFlat = $('[name="APPARTMENT"]', $context);
    var $inputComment = $('[name="COMMENT"]', $context);
    var $inputAjaxToken = $('[name="AJAX_TOKEN"]', $context);

    function setEditState () {
        $context.addClass('edit-state');
        $form.trigger('resize.block');
        return false;
    }

    function setSaveState () {
        $context.removeClass('edit-state');
        preloader();
        $('body').animate({scrollTop: ($context.offset().top - 100)}, 500);
        return false;
    }

    function setAddressAsMain () {
        var $idHolder = $('[name="ADDRESS_ID"]', $form);
        var $id = $idHolder.val();
        $.ajax({
            url: this.dataset.href,
            data: {action: "makeMain", id: $id},
            success: function () {
                $('.js-lk-address').trigger('reset-main.block');
                $defaultBtns.addClass('active');
            }
        });

        return false;
    }

    function deleteAddressMain()
    {
        var $idHolder = $('[name="ADDRESS_ID"]', $form);
        var $id = $idHolder.val();
        $.ajax({
            url: $(this).attr('href'),
            data: {action: "deleteMain", id: $id},
            success: function () {
                $('.js-lk-address').trigger('reset-main.block');
                $defaultBtns.removeClass('active');
            }
        });

        return false;
    }

    function resetMainAddress () {
        $defaultBtns.removeClass('active');
    }

    function saveChanges () {
        if(validateChanges()) {
            preloader();
            applyChanges();
            sendChangesToServer();
            setSaveState();
        }

        return false;
    }

    function validateChanges () {
        var $requiredFields = $('[required]', $form);
        var condition = true;
        var scrollTarget;

        $requiredFields.each(function () {
            var $input = $(this);
            var isEmpty = $input.val()=='';

            if(isEmpty) {
                $input.closest('.form-group').addClass('has-error');
            } else {
                $input.closest('.form-group').removeClass('has-error');
            }

            if(condition && isEmpty) {
                scrollTarget = $input.offset().top;
            }

            condition = condition && !isEmpty;
        });

        if(!isNaN(scrollTarget)) {
            $('body').animate({scrollTop: (scrollTarget - 100)}, 500);
        }

        return condition;
    }

    function applyChanges (preventRender) {
        var name = $inputName.val();
        var town = $inputTown.val();
        var comment = $inputComment.val();
        var addressInputs = [$inputTown,  $inputStreet, $inputBuilding, $inputBlock, $inputFlat];
        var address =  [];

        for (i = 0; i < addressInputs.length; i++) {
            if(addressInputs[i].val() != '') {
                if(addressInputs[i].attr('name') == 'STREET') {
                    address.push('улица ' + addressInputs[i].val());
                    continue;
                }

                if(addressInputs[i].attr('name') == 'HOUSE') {
                    address.push('дом ' + addressInputs[i].val());
                    continue;
                }

                if(addressInputs[i].attr('name') == 'BUILDING') {
                    address.push('корпус ' + addressInputs[i].val());
                    continue;
                }

                if(addressInputs[i].attr('name') == 'APPARTMENT') {
                    address.push('квартира ' + addressInputs[i].val());
                    continue;
                }

                address.push(addressInputs[i].val());
            }
        }

        if (!preventRender) {
            $address.text(address.join(', '));
            $title.text(name);

            if (comment == '') {
                $comment.closest('.js-lk-address-group').addClass('hidden');
                $comment.text(comment);
            } else {
                $comment.closest('.js-lk-address-group').removeClass('hidden');
                $comment.text(comment);
            }
        }

        return [name, town, address.join(', '), comment];
    }

    function sendChangesToServer() {
        // accept any $.ajax options
        $form.ajaxSubmit({
            success: function (result) {
                var $result = JSON.parse(result);
                var $id = $('[name="ADDRESS_ID"]', $form);

                if($result.status == "success")
                {
                    if($id.length == 0)
                    {
                        $form.append('<input type="hidden" name="ADDRESS_ID" value="'+$result.id+'"/>');
                        $context.removeClass('js-lk-address-new');
                        $context.addClass('js-lk-address');
                        $('span.lk-address__edit-state-visible', $context).html('Редактирование');
                        if ($defaultBtns.hasClass('active')) {
                            $secondaryBtn.trigger('click');
                        } else {
                            $mainBtn.trigger('click');
                        }
                    }
                }

            },

            error: function () {
            }
        });
    }

    function removeItem (e) {
        e.preventDefault();

        var modal = $('#legal-address-delete-modal');
        var okButton = $('#legal-address-delete-modal .button-gray');

        $.fancybox.open(
            modal,
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

        var $idHolder = $('[name="ADDRESS_ID"]', $form);
        var $id = $idHolder.val();
        var $href = this.dataset.href;

        okButton.on('click', function(e){
            e.preventDefault();
            $.ajax({
                url: $href,
                data: {action: "remove", id: $id},
                success: function () {
                    $context.remove();
                    if (!$('.lk__main .js-lk-address,.lk__main .js-lk-address-new:not(.js-lk-address-form)').length) {
                        $('.lk-address--empty').show();
                    }
                }
            });
            $.fancybox.close();
        });


        /*var $idHolder = $('[name="ADDRESS_ID"]', $form);
        var $id = $idHolder.val();
        $.ajax({
            url: $(this).attr('href'),
            data: {action: "remove", id: $id},
            success: function () {
                $context.remove();
            }
        });*/

        return false;
    }

    $citySelect.select2({
        theme: 'main',
        minimumResultsForSearch: -1,
        language: "ru",
        width: '100%',
        tags: false,
        multiple: false,
        minimumInputLength: 2,
        ajax: {
            url: '/ajax/new/getCities.php',
            dataType: 'json',
            type: "GET",
            quietMillis: 50,
            data: function (query) {
                return {
                    query: query
                };
            },
            processResults: function (data) {
                return {
                    results: $.map(data.results, function (item) {
                        let text = item.city;
                        if (item.parent) {
                            text = item.city + ' (' + item.parent + ')';
                        }
                        return {
                            text: text,
                            id: item.city
                        }
                    })
                };
            }
        },
        language: {
            inputTooShort: function () {
                return 'Пожалуйста, начните вводить название города.';
            },
            "noResults": function () {
                return "К сожалению, город не найден";
            },
            "searching": function () {
                return "Поиск...";
            }
        }
    });

    function getSuggestions(request, response) {
        $.ajax({
            url: '/ajax/new/suggestions.php',
            dataType: 'json',
            type: "GET",
            data: {
                query: request.term,
                token: $inputAjaxToken.val(),
                city: $inputTown.val(),
            },
            success: function (data) {
                response($.map(data.results, function (item) {
                    return item;
                }));
            }
        });
    }

    $streetSelect.autocomplete({
        minLength: 1,
        appendTo: $context,
        source: getSuggestions,
        select: function (event, ui) {
            $streetSelect.val(ui.item.street);
            $houseDadata.val(ui.item.house);
            $buildingDadata.val(ui.item.block);
            if (!ui.item || !ui.item.full_name) return false;
            return false;
        },
        open: function (event, ui) {
        },
        close: function (event, ui) {
        }
    });
    $streetSelect.autocomplete("instance")._renderMenu = function (ul, items) {
        let that = this;
        $.each(items, function (index, item) {
            that._renderItemData(ul, item);
        });
    }
    $streetSelect.autocomplete("instance")._renderItem = function (ul, item) {
        let itemTemplate =
            '<li style="background-color: white;">'
            + item.name +
            '</li>';
        return $(itemTemplate).appendTo(ul);
    };

    $removeBtn.on('click', removeItem);
    $editBtn.on('click', setEditState);
    $saveBtn.on('click', saveChanges);
    $secondaryBtn.on('click', setAddressAsMain);
    $mainBtn.on('click', deleteAddressMain);

    $context.on('reset-main.block', resetMainAddress);
}

$(function () {
    $('.js-lk-address').livequery(LKAddress);
});

// Инпут выбора города с автокомплитом
    $(function () {
        $('.js-town-modal').on('click', function (event) {
            event.preventDefault();
            $.ajax({
                url: '/ajax/new/select_city_popup.php',
                method: 'get',
                success: function (result) {
                    $.fancybox.open(
                        result,
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
                                $(".fancybox-wrap").appendTo(".fancybox-overlay");
                            }
                        }
                    );
                }
            });
        });
    });
    var selectCityPopupInitCallback = function () {
        $('.b-autocomplete-address').each(function () {
            var $context = $(this);
            var $input = $('.b-autocomplete-address__input', $context);
            var $codeInput = $('.b-autocomplete-address__code', $context);
            var $arrow = $('.b-autocomplete-address__arrow', $context);

            function getCitiesCallback (request, response) {
                $.ajax({
                    url: '/ajax/new/getCities.php',
                    dataType: 'json',
                    type: "GET",
                    data: {query: {term: request.term}},
                    success: function (data) {
                        var results = $.map(data.results, function (item) {
                            return {
                                city: item.city,
                                parent: item.parent,
                                value: item.id
                            }
                        });

                        response(results);
                    }
                });
            }

            $input.autocomplete({
                minLength: 0,
                appendTo: $context,
                source: getCitiesCallback,
          select: function( event, ui ) {
                    if(ui.item != undefined) {
                        $input.val(ui.item.city);
                        preloader();
                        $.post("/ajax/new/setCity.php", {city_id: ui.item.value}, function (data)
                        {
                            if(data.status == "success")
                                window.location.reload();
                        }, "json");
                    }
            return false;
          },
          open: function( event, ui ) {
            $input.addClass('_opened');
          },
          close: function( event, ui ) {
            $input.removeClass('_opened');
          }
            });

            $input.autocomplete( "instance" )._renderMenu = function( ul, items ) {
              var that = this;
              $.each( items, function( index, item ) {
                that._renderItemData( ul, item );
              });
            }

            $input.autocomplete( "instance" )._renderItem = function (ul, item) {

          var itemTemplate =
            '<li class="b-autocomplete-address__item">' +
                '<div class="b-autocomplete-address__item-wrap">' +
                    '<div class="b-autocomplete-address__item-title">' + item.city + '</div>' +
                    '<div class="b-autocomplete-address__item-area">' + item.parent + '</div>' +
                '</div>' +
            '</li>';

        ul.addClass('b-autocomplete-address__items-list');
          return $(itemTemplate).appendTo(ul);
            };
        });

        $('.js-change_city').on('click', function()
        {
            var $context = $(this),
                city = $context.data('city');

            if(typeof city != 'undefined' && parseInt(city) > 0)
            {
                preloader();
                $.post("/ajax/new/setCity.php", {city_id: city}, function (data)
                {
                    if(data.status == "success")
                        window.location.reload();
                    else
                        preloader();
                }, "json");
            }
        });
    }
    $(function() {
        $('body').on('selectCityPopupInit', selectCityPopupInitCallback);
    });


// ЛК, бонусная карта
    $(function () {
        $('.b-bonus-card:not(.js-disable-blockjs)').livequery(function () {
            var $context = $(this);
            var $form = $('.c-lk__card-activation');
            var $saveBtn = $('.btn-bonus-card__activation', $context);
            var resultModal = $("#bonuscard-activation-result");
            var modalTitle = $(".js-modal-title", resultModal);
            var modalContent = $(".js-modal-content", resultModal);

            function saveChanges () {
                //setBirthday();
                sendChangesToServer();
                return false;
            }

            /*
            function setBirthday()
            {
                var day = parseInt($birthdayDay.val());
                var mon = parseInt($("option:selected",$birthdayMonth).val());
                var year = parseInt($birthdayYear.val());

                mon = mon > 9 ? mon : "0" + mon;

                if(day && mon && year)
                    $birthdayInput.val(day+"."+mon+"."+year)
            }

            function parseBirthday()
            {
                var dayParts = $birthdayInput.val().split(".");
                $birthdayDay.val(dayParts[0]);
                $birthdayMonth.val(parseInt(dayParts[1]));
                $birthdayYear.val(dayParts[2]);
            }
            */

            function sendChangesToServer() {
                preloader();
                $form.ajaxSubmit({
                    dataType: 'json',
                    success: function (result) {
                        preloader();

                        if(result.status == 'success') {
                            modalTitle.html('Карта активирована!');
                            modalContent.html('<p>Бонусная карта успешно активирована!</p>');
                            window.location.href = "/personal/bonus/";
                        } else {
                            modalTitle.html('Произошла ошибка!');
                            modalContent.html('<p>'+result.message+'</p>');
                        }

                        $.fancybox.open(
                            resultModal,
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
                                }
                            }
                        );
                    },
                    error: function () {
                    }
                });
            }


            $saveBtn.on('click', saveChanges);

            //parseBirthday();

        });
    });

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options) {
    options = options || {};

    var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

    value = encodeURIComponent(value);

    var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

    document.cookie = updatedCookie;
}

    //gtm метки для списка товаров
        function gtm(){
            let typeList = document.querySelectorAll('.b-catalog-list__item').length ? 'list' : 'plate';
            let typeS = document.querySelectorAll('.b-catalog-list__item').length ? '' : 's';
             let elements = document.querySelectorAll('.js-b-catalog-' + typeList + typeS + '__item');
             if(elements){
                for (var i = 0; i < elements.length; i++) {
                    elements[i].onclick = function(event) {
                        let nameClick;
                        let eventClick;
                        window.dataLayer = window.dataLayer || [];
                        let obj = JSON.parse(this.getAttribute('data-gtm'));
                        if(event.target.classList.contains('b-' + typeList + '-product__buy') || event.target.classList.contains('js-b-' + typeList + '-product__caption-text') || event.target.classList.contains('js-b-' + typeList + '-product__image')){
                            if(event.target.classList.contains('b-' + typeList + '-product__buy')){
                                nameClick = 'В корзину из списка';
                                eventClick = 'eec.add';
                                let mindbox = window.mindbox || function() {};
                                mindbox("async", {
                                  operation: "Cart.AddToList",
                                  data: {
                                    addProductToList: {
                                      product: {
                                        ids: {
                                          website: obj.id
                                        }
                                      },
                                      price: obj.price
                                    }
                                  }
                                });
                            }else if(event.target.classList.contains('js-b-' + typeList + '-product__caption-text') || event.target.classList.contains('js-b-' + typeList + '-product__image')){
                                nameClick = 'Переход в карточку';
                                eventClick = 'eec.impressionClick';
                            }
                            window.dataLayer.push({
                              'event': eventClick,
                              'event-action' : nameClick,
                              'event-category' : 'ecommerce',
                              'event-label' : obj.name,
                              'event-non-interaction' : 'False',
                              'ecommerce': {
                                'add': {
                                  'actionField': {
                                    'list': obj.list
                                  },
                                  'products': [{
                                    'id': obj.id,
                                    'name': obj.name,
                                    'brand': obj.brand,
                                    'category': obj.category,
                                    'position': obj.position,
                                    'price': obj.price,
                                    'quantity': 1
                                  }]
                                }
                              }
                            });
                            window.dataLayer.push({
                              'event': 'add_to_cart',
                              'value': obj.price,
                              'items': [{'id': obj.id, 'google_business_vertical': 'retail'}]
                            });
                        }
                     };
                }
            }
        }

        //gtm метка для карточки товара
        $(function () {
            let elementProd = document.querySelector('.b-product-price');
            if(elementProd){
                elementProd.onclick = function(event) {
                    window.dataLayer = window.dataLayer || [];
                    let obj = JSON.parse(this.getAttribute('data-gtm'));
                    if(event.target.classList.contains('b-product-price__buy')){
                        window.dataLayer.push({
                              'event': 'eec.add',
                              'event-action' : "В корзину из карточки",
                              'event-category' : 'ecommerce',
                              'event-label' : obj.name,
                              'event-non-interaction' : 'False',
                              'ecommerce': {
                                'add': {
                                  'actionField': {
                                    'list': obj.list
                                  },
                                  'products': [{
                                    'id': obj.id,
                                    'name': obj.name,
                                    'brand': obj.brand,
                                    'category': obj.category,
                                    'position': obj.position,
                                    'price': obj.price,
                                    'quantity': 1
                                  }]
                                }
                              }
                            });
                        window.dataLayer.push({
                          'event': 'add_to_cart',
                          'value': obj.price,
                          'items': [{'id': obj.id, 'google_business_vertical': 'retail'}]
                        });
                        let mindbox = window.mindbox || function() {};
                        mindbox("async", {
                            operation: "Cart.AddToList",
                            data: {
                            addProductToList: {
                              product: {
                                ids: {
                                  website: obj.id
                                }
                              },
                              price: obj.price
                            }
                            }
                        });
                    }
                }
        }
        });

// Список товаров каталога плиткой
    $(function () {
        $('.b-catalog-plates, .js-b-catalog-plates').livequery(function() {
            var $context = $(this);

            function equalizer() {
                productBtn();

                gtm();
            }

            $(window).on('resize', equalizer);
            $(document).on('catalog-plates.resize', equalizer);
            equalizer();
        });
    });

// Список товаров каталога плиткой
    $(function () {
        $('.b-catalog-list').livequery(function() {
            var $context = $(this);
            productBtn();
            $(window).on('resize', gtm);
            $(document).on('catalog-plates.resize', gtm);

        });
    });

    // Список товаров
    $(function () {
        $('.js-catalog-products').livequery(function() {
            productBtn();
        });
    });

// Чек-бокс
    $(function () {
        $('.b-checkbox').livequery(function () {
            var $context = $(this);
            var $input = $('input[type="checkbox"]', $context);

            function changeState () {
                if($input.prop('checked')) {
                    $context.addClass('_checked');
                } else {
                    $context.removeClass('_checked');
                }
            }

            changeState();
            $input.on('change', changeState);
        });
    });

// Список чекбоксов
    $(function () {
        $('.b-checkbox-cols').livequery(function () {
            var $context = $(this);
            var $moreBtn = $('.b-checkbox-cols__btn', $context)
            var $moreContainer = $('.b-checkbox-cols__more-container', $context)

            function toggleMoreContainer() {
                $moreBtn.toggleClass('b-checkbox-cols__btn_opened');
                $moreContainer.toggleClass('b-checkbox-cols__more-container_opened');
                return false;
            }

            $moreBtn.on('click', toggleMoreContainer);
        });
    });

// Список товаров конфигуратора
    $(function () {
        $('.b-configurator-items').livequery(function () {
            var $context = $(this);
            var $checkboxes = $('.b-checkbox', $context);

            $checkboxes.on('click touch', function () {
                return false;
            });
        })
    });

// Выбор даты
    $(function () {
        $('.b-date-select').each(function () {
            var $context = $(this);
            var $monthInput = $('[name="month"]', $context);
            var $dropdownArrow = $('.b-date-select__dropdown', $context);

            $monthInput.autocomplete({
                appendTo: $context,
                minLength: 0,
                source:
                    [
                        'января',
                        'февраля',
                        'марта',
                        'апреля',
                        'мая',
                        'июня',
                        'июля',
                        'августа',
                        'сентября',
                        'октября',
                        'ноября',
                        'декабря'
                    ]
            })

            $dropdownArrow.on('click', function () {
                $monthInput.autocomplete( "search", "" );
            });

        });
    });

// Реквизиты в личном кабинете
LKLegalEntity = function () {
    var $context = $(this);
    var $title = $('.js-lk-requisites-title', $context);
    var $form = $('form', $context);

    // Btns
    var $editBtn = $('.js-lk-requisites-edit', $context);
    var $saveBtn = $('.js-lk-requisites-save', $context);
    var $removeBtn = $('.js-lk-requisites-remove',$context);
    var $defaultBtns = $('.js-lk-requisites-default', $context);
    var $mainBtn = $('.js-lk-requisites-default-active', $context);
    var $secondaryBtn = $('.js-lk-requisites-default-set', $context);

    var $manualBtn = $('.b-details-item__manual', $context);

    var $inputs = {
        companyName: $('.js-lk-requisites-org-name', $context),
        orgName: $('.js-lk-requisites-org-name', $context),
        legalAddress: $('.js-lk-requisites-legal-address', $context),
        realAddress: $('.js-lk-requisites-real-address', $context),
        companyPhone: $('.js-lk-requisites-company-phone', $context),
        inn: $('.js-lk-requisites-inn', $context),
        kpp: $('.js-lk-requisites-kpp', $context),
        bank: $('.js-lk-requisites-bank', $context),
        rs: $('.js-lk-requisites-rs', $context),
        ks: $('.js-lk-requisites-ks', $context),
        bic: $('.js-lk-requisites-bic', $context),
        recognize: $('.js-lk-requisites-recognize', $context)
    };

    var $staticItems = {
        companyName: $('.js-lk-requisites-content-company-name', $context),
        legalAddress: $('.js-lk-requisites-content-company-legal-address', $context),
        realAddress: $('.js-lk-requisites-content-company-real-address', $context),
        companyPhone: $('.js-lk-requisites-content-company-phone', $context),
        inn: $('.js-lk-requisites-content-inn', $context),
        kpp: $('.js-lk-requisites-content-kpp', $context),
        bank: $('.js-lk-requisites-content-bank', $context),
        rs: $('.js-lk-requisites-content-rs', $context),
        ks: $('.js-lk-requisites-content-ks', $context),
        bic: $('.js-lk-requisites-content-bic', $context)
    };

    function setEditState () {
        $context.addClass('edit-state');
        $form.trigger('resize.block');
        return false;
    }

    function setStaticState () {
        $context.removeClass('edit-state');
        preloader();
        return false;
    }

    function saveChanges (e) {
        if(validateChanges()) {
            preloader();
            applyChanges();
            sendChangesToServer(this.dataset.href);
        }

        return false;
    }

    function validateChanges () {
        var $requiredFields = $('[required]', $form);
        var condition = true;
        var scrollTarget;
        var $allFields = $form.find('input');

        $requiredFields.each(function () {
            var $input = $(this);
            var isEmpty = $input.val()=='';

            if(isEmpty) {
                $input.closest('.form-group').addClass('has-error');
            } else {
                $input.closest('.form-group').removeClass('has-error');
            }

            if(condition && isEmpty) {
                scrollTarget = $input.offset().top;
            }

            condition = condition && !isEmpty;
        });

        $allFields.each(function() {
            if($("label[for='"+$(this).attr("name")+"']").hasClass('error') &&
                $("label[for='"+$(this).attr("name")+"']").css('display')!='none') {
                condition = false;
            }
        });

        if(!isNaN(scrollTarget)) {
            $('body').animate({scrollTop: (scrollTarget - 100)}, 500);
        }

        return condition;
    }

    function applyChanges (preventRender) {
        var itemsList = [
            'companyName',
            'legalAddress',
            'realAddress',
            'companyPhone',
            'inn',
            'kpp',
            'bank',
            'rs',
            'ks',
            'bic'
        ];

        var itemsVal = {};

        $.each(itemsList, function (index, val) {
            itemsVal[val] = $inputs[val].val();
        });

        if(!preventRender) {
            $.each(itemsVal, function(name, value) {
                if(value == '') {
                    $staticItems[name].closest('.js-lk-requisites-group').addClass('hidden');
                } else {
                    $staticItems[name].closest('.js-lk-requisites-group').removeClass('hidden');
                }
                $staticItems[name].text(value);
            });

            $title.text(itemsVal['companyName']);
        }

        return itemsVal;
    }

    function sendChangesToServer(url) {
        if (url) {
            // accept any $.ajax options
            $form.ajaxSubmit({
                url: url,
                dataType: "json",
                success: function (result) {
                    if(result.status == 'success')
                        setStaticState();
                    else if(result.status == 'error')
                    {
                        var modal = $('#legal-entities-error-modal'),
                            errorContainer = $('.errors-container', modal);

                        errorContainer.html(result.message);
                        $.fancybox.open(
                            modal,
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
                                    preloader();
                                }
                            }
                        );

                    }
                },

                error: function () {
                }
            });
        } else {
            $form.submit();
        }
    }

    function removeItem (e) {
        e.preventDefault();

        var modal = $('#legal-entities-delete-modal');
        var okButton = $('#legal-entities-delete-modal .button-gray');

        $.fancybox.open(
            modal,
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

        var $idHolder = $('[name="ENTITY_ID"]', $form);
        var $id = $idHolder.val();
        var $href = this.dataset.href;

        okButton.on('click', function(e){
            e.preventDefault();
            if ($id) {
                $.ajax({
                    url: $href,
                    type: 'POST',
                    data: {
                        action: "remove",
                        ENTITY_ID: $id
                    },
                    success: function () {
                        $context.remove();
                        if (!$('.lk__main .js-lk-requisites,.lk__main .js-lk-requisites-new:not(.js-lk-requisites-form)').length) {
                            $('.js-lk-requisites-empty').show();
                        }
                    }
                });
            } else {
                $context.remove();
                if (!$('.lk__main .js-lk-requisites,.lk__main .js-lk-requisites-new:not(.js-lk-requisites-form)').length) {
                    $('.js-lk-requisites-empty').show();
                }
            }
            $.fancybox.close();
        });

        return false;
    }

    function setEntityAsMain (e) {
        e.preventDefault();
        var $idHolder = $('[name="ENTITY_ID"]', $form);
        var $id = $idHolder.val();
        if (!$id) {
            $defaultBtns.addClass('active');
            $('.js-lk-requisites-main', $context).val('Y');
            return false;
        }
        $.ajax({
            url: this.dataset.href,
            type: "POST",
            data: {
                action: "makeMain",
                ENTITY_ID: $id
            },
            success: function () {
                $('.js-lk-requisites .js-lk-requisites-default').removeClass('active');
                $defaultBtns.addClass('active');
            }
        });

        return false;
    }

    function deleteEntityMain()
    {
        var $idHolder = $('[name="ENTITY_ID"]', $form);
        var $id = $idHolder.val();
        if (!$id) {
            $defaultBtns.removeClass('active');
            $('.js-lk-requisites-main', $context).val('N');
            return false;
        }
        $.ajax({
            url: this.href,
            type: "POST",
            data: {
                action: "deleteMain",
                ENTITY_ID: $id
            },
            success: function () {
                $defaultBtns.removeClass('active');
            }
        });

        return false;
    }

    $inputs['inn'].on('keyup', function() {
        let inn = this.value;
        if (inn.length < 10) {
            // инн не может быть короче 10 цифр, не проверяем, если значение короче
            return;
        }
        ajaxToken = $('[name=AJAX_TOKEN]', $context).val();
        $.ajax({
            url: '/ajax/new/suggestionsLegalEntity.php',
            data: {
                query: inn, //7707083893
                type: 'inn',
                token: ajaxToken,
            },
            success: function (response) {
                response['BN_ORG_KPP'] && $inputs['kpp'].val(response['BN_ORG_KPP']);
                response['BN_ORG_NAME'] && $inputs['orgName'].val(response['BN_ORG_NAME']);
                response['BN_ORG_ADDR'] && $inputs['legalAddress'].val(response['BN_ORG_ADDR']);
                response['BN_REAL_ADDR'] && $inputs['realAddress'].val(response['BN_REAL_ADDR']);
            },
        });

    });

    $removeBtn.on('click', removeItem);
    $editBtn.on('click', setEditState);
    $saveBtn.on('click', saveChanges);
    $secondaryBtn.on('click', setEntityAsMain);
    $mainBtn.on('click', deleteEntityMain);
};

$(function () {
    $('.js-lk-requisites').livequery(LKLegalEntity);
});

// Контент в экспандере
    $(function () {
        $('.b-expand-content').livequery(function () {
            var $context  = $(this);
            var $link = $('.b-expand-content__link', $context);
            var $holder = $('.b-expand-content__content-holder', $context);

            function toggleContainer () {
                if($link.hasClass('_open')){
                    $link.removeClass('_open');
                    $holder.slideUp(300);
                } else {
                    $link.addClass('_open');
                    $holder.slideDown(300, function () {
                        $('*', $holder).trigger('resize.block');
                    });
                }

                return false;
            }

            if($link.hasClass('_open')) {
                $holder.slideDown(300);
            } else {
                $holder.slideUp(300);
            }

            $link.on('click', toggleContainer);
        });
    });

// Попап запроса оценки эксперта
$(function () {
    $('.b-expert-request').livequery(function () {
        var $context = $(this);
        var $form = $('form', $context);
        var $expertAjax = $('.b-expert-request__ajax', $context);
        var $mailAjax = $('.b-mail-request__ajax', $context);

        function sendChangesToServer(e, expert = true) {
            $.fancybox.close();
            preloader();
            e.preventDefault();

            if(!checkMandatory())
                return;

            $form.ajaxSubmit({
                success: function (e) {
                    let answerParse = JSON.parse(e);
                    if(answerParse.status == 'success'){
                        preloader();
                        $.fancybox.open({
                            href: expert ? '#form-expert-success-modal' : '#form-mail-success-modal'
                        });
                    }else{
                        preloader();
                        if (answerParse.message) {
                          document.getElementById('config-error-modal-msg').innerText = answerParse.message;
                        }
                        $.fancybox.open({
                            href: '#config-error-modal'
                        });
                    }

                },

                error: function () {
                    preloader();
                    $.fancybox.open({
                        href: '#config-error-modal'
                    });
                }
            });
        }

        $expertAjax.on('submit', function(e) {sendChangesToServer(e, true)});
        $mailAjax.on('submit', function(e) {sendChangesToServer(e, false)});

    });
});

// Адрес в лк
    $(function () {
        $('.b-feedback-item').livequery(function () {
            var $context = $(this);
            var $plusField = $('.b-feedback-item__save-field_plus', $context);
            var $minusField = $('.b-feedback-item__save-field_minus', $context);
            var $commentField = $('.b-feedback-item__save-field_comment', $context);
            var $ratingField = $('.b-feedback-item__rating .b-rating', $context);
            var $form = $('form', $context);

            // Btns
            var $editBtn= $('.b-feedback-item__edit-btn',$context);
            var $editBtnHolder = $('.b-feedback-item__ui-edit',$context);
            var $saveBtn = $('.b-feedback-item__save-btn',$context);
            var $saveBtnHolder = $('.b-feedback-item__ui-save',$context);
            var $removeBtn = $('.b-feedback-item__remove-btn',$context);
            var $removeBtnHolder = $('.b-feedback-item__ui-remove',$context);

            // Inputs
            var $inputPlus = $('[name="PROPERTY_VALUES[PROS]"]', $context);
            var $inputMinus = $('[name="PROPERTY_VALUES[CONS]"]', $context);
            var $inputComment = $('[name="PROPERTY_VALUES[COMMENTS]"]', $context);
            var $ratingInput = $('[name="PROPERTY_VALUES[RATING]"]', $context);

            function setEditState () {
                $saveBtnHolder.addClass('b-feedback-item__ui-save_active');
                $editBtnHolder.removeClass('b-feedback-item__ui-edit_active');
                $context.addClass('_edit-state');
                $('.b-address-form', $context).trigger('block.resize');
                return false;
            }

            function saveChanges () {
                preloader();
                applyChanges();
                sendChangesToServer();
                if(!$context.hasClass('b-comments-modal'))
                    setSaveState();
                return false;
            }

            function applyChanges (isPreventRender) {
                var plus = $inputPlus.val();
                var minus = $inputMinus.val();
                var comment = $inputComment.val();
                var rating = parseInt($ratingInput.val());

                if(!isPreventRender) {
                    $plusField.find('.b-feedback-item__field-content').text(plus);
                    plus == '' ? $plusField.addClass('_hide') : $plusField.removeClass('_hide');

                    $minusField.find('.b-feedback-item__field-content').text(minus);
                    minus == '' ? $minusField.addClass('_hide') : $minusField.removeClass('_hide');

                    $commentField.find('.b-feedback-item__field-content').text(comment);
                    comment == '' ? $commentField.addClass('_hide') : $commentField.removeClass('_hide');

                    $ratingField.trigger('change-val.block', [rating]);
                    return true;
                }

                return [plus, minus, comment, rating];
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
                                $("#feedback-result"),
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

            function setSaveState () {
                $saveBtnHolder.removeClass('b-feedback-item__ui-save_active');
                $editBtnHolder.addClass('b-feedback-item__ui-edit_active');
                $context.removeClass('_edit-state');
                return false;
            }

            function removeItem () {
                preloader();
                $.ajax({
                    url: $(this).attr('href'),
                    data: {'ID': $(this).data('item')},
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
    });

// Ссылки на содержимое карточки продукта
    var bTabsLiveQuery = function () {
        var $context = $(this);
        var $tabs = $('.b-tabs__col', $context);
        var $tabHolders = $('.b-tabs__holder', $context);

        function changeTab () {
            var $item = $(this);
            var $link = $('.b-tabs__link', $item);
            var index = $tabs.index($item);

            if($item.hasClass('b-tabs__col_active') || $link.hasClass('_disabled')) return false;

            $tabs.removeClass('b-tabs__col_active');
            $item.addClass('b-tabs__col_active');
            $tabHolders.removeClass('b-tabs__holder_active');
            $tabHolders.eq(index).addClass('b-tabs__holder_active');

            $('*', $tabHolders.eq(index)).trigger('resize.block');

            return false;
        }

        $tabs.on('click', changeTab);

    };
    $(function () {
        $('.b-tabs').livequery(bTabsLiveQuery);
    });

//Поп-ап обратной связи
$(function () {
    $('.js-feedbackform-modal,.js-callback-question-modal,.js-callback-call-modal,.js-callback-complain-modal').on('click', function (event) {
        event.preventDefault();
        var that = this;
        var clickCallback = function () {
            if ($(that).hasClass('js-callback-question-modal')) {
                $('#callback-question').click();
            }
            if ($(that).hasClass('js-callback-call-modal')) {
                $('#callback-call').click();
            }
            if ($(that).hasClass('js-callback-complain-modal')) {
                $('#callback-complain').click();
            }
        }
        if (!HtmlCache.get('feedback_form_popup').html()) {
            $.ajax({
                url: '/ajax/new/feedback_form_popup.php',
                method: 'get',
                success: function (result) {
                    HtmlCache.add('feedback_form_popup', result);
                    var block = HtmlCache.get('feedback_form_popup');
                    showPopup(block);
                    clickCallback();
                    improvedFields.init();
                }
            });
        } else {
            var block = HtmlCache.get('feedback_form_popup');
            showPopup(block);
            clickCallback();
        }
    });
});

//Поп-ап проверка ограничения 18+

function showAdultPopup() {
    $.ajax({
        url: '/ajax/new/formPopupForAdults.php',
        method: 'get',
        success: function (result) {
            showPopup(result);
        }
    });
}
function initAdultPopupHandlersAndCheckConfirm() {
    var forAdultsBox = $(document).find('.js-forAdults-category');
    if (forAdultsBox.hasClass('js-forAdults-category')) {
        $('.js-forAdults-category .b-plate-product').addClass('js-forAdult-link');
        $('.js-forAdults-category .c-catalog__product-photo').addClass('js-forAdult-photo');
        $('.js-forAdults-category .c-catalog__product-price').addClass('js-forAdult-price');
        $('.js-forAdults-category .c-catalog__filter').addClass('js-forAdult-filter');
        $('.js-forAdults-category .category-page__row-col').addClass('js-forAdult-link');
        showAdultPopup();
    }

    $('.js-forAdult-block,.js-forAdult-link,.js-forAdult-photo,.js-forAdult-price,.js-forAdult-filter,.js-forAdults-element').on('click', showAdultPopup);

}
$(function () {
    initAdultPopupHandlersAndCheckConfirm();
    $(document).on('click', '.js-forAdults-modal-form-popup input', function (event) {
        event.preventDefault();
        var that = this;
        if ($(that).hasClass('js-isAdult-btn')) {
            var formData = $('.js-forAdults-modal-form-popup form').serialize();
            $.post(
                '/ajax/new/confirmVisitorAdult.php',
                formData,
                function (response) {
                    if (response.result) {
                        $('.js-forAdults-category .js-forAdult-link').removeClass('js-forAdult-link');
                        $('#basket-app .js-forAdult-link').removeClass('js-forAdult-link');
                        $('.js-forAdult-block').removeClass('js-forAdult-block');
                        $('.js-forAdults-category .js-forAdult-photo').removeClass('js-forAdult-photo');
                        $('.js-forAdults-category .js-forAdult-price').removeClass('js-forAdult-price');
                        $('.js-forAdults-category .js-forAdult-filter').addClass('js-forAdult-filter');
                        $('.js-forAdults-category').removeClass('js-forAdults-category');
                        $('.js-forAdults-element').removeClass('js-forAdults-element');
                    }
                }, 'json');
            $('.js-forAdult-link,.js-forAdult-photo,.js-forAdult-price,.js-forAdult-filter,.js-forAdults-element').off('click', showAdultPopup);
        }
        closePopup();
    });

});
    var feedbackFormPopupInitCallback = function () {
        var $context = $('.js-feedback-modal-form-popup');
        $context.find('.b-tabs').livequery(bTabsLiveQuery);
        $context.find('select.select2').livequery(function () {

            if($('html').hasClass('touch')) {
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

        //Обратная связь прикрепить файл
        $context.find('.b-upload-input').each(function () {
            var $context = $(this);
            var $input = $('input[type="file"]', $context);
            var $form = $input.closest('form');

            $input.on('change', function () {
                var fullPath = $input.val();
                if (fullPath) {
                    var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
                    var filename = fullPath.substring(startIndex);
                    if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
                        filename = filename.substring(1);
                    }
                    $context.addClass('is-active');
                    $context.prepend('<p class="b-upload-input__filename">' + fullPath + '</p>');
                }
            });
            $('.b-upload-input__remove').on('click', function(e) {
                e.preventDefault();
                $('.b-upload-input__filename').remove();
                $context.removeClass('is-active');
                $input.val('');

                // $form.find('[type="submit"]').prop('disabled', true);
                // $form.find('[name="save"]').prop('disabled', true);
            });
        });
        var $forms = $("form", $context);
        $context.find('.b-feedback-vacancy-form').validate({
            ignore: 'hidden',
            // rules: {
            // },
            highlight: function (element) {
                $(element).removeClass('success').addClass('error');
            //     $(element).closest('.form__field-row').removeClass('is-ok').addClass('has-error');
            },
            unhighlight: function (element) {
                $(element).removeClass('error').addClass('success');
            },
            onkeyup: function( element, event ) {
                const isValid = this.checkForm();

                if (isValid) { // checks form for validity
                    $('form.b-feedback-vacancy-form').find('[type="submit"]').prop('disabled', false);
                    $('form.b-feedback-vacancy-form').find('[name="save"]').prop('disabled', false);
                } else {
                    $('form.b-feedback-vacancy-form').find('[type="submit"]').prop('disabled', true);
                    $('form.b-feedback-vacancy-form').find('[name="save"]').prop('disabled', true);
                }
            },
            onclick: function( element ) {
                // click on selects, radiobuttons and checkboxes
                if (element.name in this.submitted) {
                    this.element(element);

                    // or option elements, check parent select in that case
                } else if (element.parentNode.name in this.submitted) {
                    this.element(element.parentNode);
                }

                const isValid = this.checkForm();

                if (isValid) { // checks form for validity
                    $('form.b-feedback-vacancy-form').find('[type="submit"]').prop('disabled', false);
                    $('form.b-feedback-vacancy-form').find('[name="save"]').prop('disabled', false);
                } else {
                    $('form.b-feedback-vacancy-form').find('[type="submit"]').prop('disabled', true);
                    $('form.b-feedback-vacancy-form').find('[name="save"]').prop('disabled', true);
                }
            }
        });
        $context.find('form[data-validate="Y"]').each(dataValidateForm);
        function sendChangesToServer($form, e) {
            e.preventDefault();

            var required = $("input[required]", $form),
                formFilled = true;

            required.each(function(index, obj)
            {
                if(!$(obj).val())
                    formFilled = false;
            });

            if(!formFilled)
                return;

            preloader();

            // accept any $.ajax options
            $form.ajaxSubmit({
                success: function () {
                    $.fancybox.open(
                        $("#form-success-modal"),
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
                    $('.b-upload-input__remove').trigger('click');
                    $('.b-feedback-modal input[type="text"], .b-feedback-modal input[type="password"], .b-feedback-modal input[type="tel"], .b-feedback-modal input[type="email"], .b-feedback-modal textarea').val('');
                },

                error: function () {
                    preloader();
                }
            });
        }
        $forms.on('submit', function(e) {sendChangesToServer($(this), e)});

        $(".js-field-policy").on('click', function(e){
            if (e.target.tagName == 'A') return;
            e.preventDefault();
            if($(this).find('label').hasClass('_checked')){
                $(this).find('label').removeClass('_checked');
                $(this).find('.b-checkbox__input').removeClass('_checked');
                $(this).find('.b-checkbox__input').attr('aria-required', 'true');
                $(this).find('.b-checkbox__input').attr('aria-invalid', 'false');
                $(this).siblings().find('input[type="submit"]').attr('disabled', '');
            }else{
                $(this).find('label').addClass('_checked');
                $(this).find('.b-checkbox__input').addClass('_checked');
                $(this).find('.b-checkbox__input').attr('aria-required', 'false');
                $(this).find('.b-checkbox__input').attr('aria-invalid', 'true');
                $(this).siblings().find('input[type="submit"]').removeAttr('disabled', '');
            }
        });
    }
    $(function() {
        $('body').on('feedbackFormPopupInit', feedbackFormPopupInitCallback);
    });

// Шкала в фильтре
    $(function () {
        $('.b-filter-scale').livequery(function () {

            var $context = $(this);
            var $scale = $('.b-filter-scale__scale', $context);
            var $minInput = $('.js-min', $context);
            var $maxInput = $('.js-max', $context);
            var scaleMin = parseFloat($scale.data('min')) || 0;
            var scaleMax = parseFloat($scale.data('max')) || 10000;
            var currMin = scaleMin;
            var currMax = scaleMax;
            var scaleStep = parseFloat($scale.data('step'));


            if(scaleMax < scaleMin) scaleMax = scaleMin;
            if($minInput.length > 0) currMin = parseFloat($minInput.val());
            if($maxInput.length > 0) currMax = parseFloat($maxInput.val());

            function changeMaxVal() {

                var value = parseFloat($(this).val());
                if(isNaN(value)) value = scaleMax;
                if(value < currMin) value = currMin;
                if(value > scaleMax) value = scaleMax;
                currMax = value;

                $maxInput.val(value);
                $scale.slider('values', 1, value);
            }

            function changeMinVal() {
                var value = parseFloat($(this).val());
                if(isNaN(value)) value = scaleMin;
                if(value < scaleMin) value = scaleMin;
                if(value > currMax) value = currMax;
                currMin = value;

                $minInput.val(value);
                $scale.slider('values', 0, value);
            }

            function scaleChanges (event, ui) {
                var values = ui.values;

                $minInput.val(values[0]).trigger('change');
                $maxInput.val(values[1]).trigger('change');

                currMin = values[0];
                currMax =values[1];
            }

            $scale.slider({
                range: true,
                min: scaleMin,
                max: scaleMax,
                values: [currMin, currMax],
                slide: scaleChanges,
                step: scaleStep
            });

            $maxInput.on('change', changeMaxVal);
            $minInput.on('change', changeMinVal);
            $('.js-clear-filter').on('click', changeMaxVal);
            $('.js-clear-filter').on('click', changeMinVal);
        });
    });

// Список вакансий
    $(function () {
        $('.b-jobs-list').livequery(function () {
            var $context = $(this);
            var $itemLinks = $('.b-jobs-list__item-caption', $context);
            var $itemContainers = $('.b-jobs-list__item-content', $context);
            var $containers = $('.b-jobs-list__item-content',$context);

            function expandContent () {
                var $link = $(this);
                var $container = $link.nextAll('.b-jobs-list__item-content').eq(0);

                if($link.hasClass('_open')) {
                    $container.slideUp(400);
                    $link.removeClass('_open');
                } else {
                    $containers.slideUp(400);
                    $itemLinks.removeClass('_open');
                    $container.slideDown(400);
                    $link.addClass('_open');
                }

              return false;
            }

            function init () {
                $itemLinks.each(function () {
                    var $this = $(this);
                    if(!$this.hasClass('_open')) {
                        $this.nextAll('.b-jobs-list__item-content').eq(0).slideUp(0);
                    }
                });
            }

            init();
            $itemLinks.on('click', expandContent);
        });
    });

// Набор аксессуаров со скидкой

function numberWithSeparator(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// Что нужно знать перед покупкой
    $(function () {
        $('.b-know-how').livequery(function () {
            var $context = $(this);
            var $items = $('.b-know-how__item', $context);
            var height = 0;

            function equalizer () {
                height = 0;
                $items.css('height', '');

                setTimeout(function () {
                    $items.each(function () {
                        height = Math.max($(this).height(), height);
                    });

                    $items.css('height', height);
                }, 200);

            }

            equalizer();
            $(window).on('resize', equalizer);
            $context.on('resize.block', equalizer);

        });
    });

// comments
    $(function () {
        $('.b-list-product').livequery(function () {
            var $context = $(this);
            var $preview = $('.b-list-product__fast-view', $context);

            function showPreview () {
                $.fancybox.open(
                    {
                        href: $(this).attr('data-href')
                    },
                    {
                        wrapCSS: '_product-preview _ajax-appended',
                        type: 'ajax',
                        fitToView: true,
                        autoResize: true,
                        padding: 0,
                        margin: 20,
                        maxWidth: 1200,
                        afterLoad: function (current, previous) {
                            var $content = $(current.content);

                            $content.addClass('_ajax-append');
                            current.content = $('<div>').append($content.clone()).html();
                            $.fancybox .showLoading()
                        },
                        afterShow: function () {
                            $('.iblock').trigger('resize.block');

                            setTimeout(function () {
                                $.fancybox .hideLoading();
                                $('.fancybox-wrap._ajax-appended').removeClass('_ajax-appended');
                                $('.fancybox-wrap .b-product-preview._ajax-append').removeClass('_ajax-append');
                                $('.fancybox-wrap').livequery();
                            }, 400);
                        }
                    }
                );
                return false;
            }

            $preview.on('click', showPreview);

        });
    });

// Список салонов на карте
    $(function () {
        $('.b-map-contacts').livequery(function () {
            var $context = $(this);
            var $cols = $('.b-map-contacts__cols', $context);
            var $shops = $('.b-shops-list__shop', $context);
            var $map = $('.b-ymap')

            function equalize () {
                $cols.css('height', '');
                setTimeout(function () {
                    $cols.css('height', $cols.height());
                }, 200);
            }

            function fillMap() {
                $shops.each(function () {
                    var $shop = $(this);
                    $map.trigger('resetPlacemarks.block');
                    setTimeout(function () {
                        $map.trigger('setPlacemark.block',[{
                            key: $shop.data('coords'),
                            coords: $shop.data('coords').split(','),
                            address: $('.b-shops-list__shop-address', $shop).html(),
                            description: $('.b-shops-list__shop-description', $shop).html(),
                            phone: $('.b-shops-list__shop-phone', $shop).html(),
                            hours: $('.b-shops-list__shop-hours', $shop).html(),
                            link: $shop.data('link'),
                            type: $shop.closest('.b-shops-list__group').find('.b-shops-list__group-name').data('map-title')
                        }]);
                    }, 300);
                });
            }

            function showShop() {
                var thisCoordsString = $(this).data('coords');
                $map.trigger(
                    'setCenter.block',
                    [thisCoordsString.split(','), 14, thisCoordsString],
                );
                return false;
            }

            $shops.on('click', showShop);

            equalize();
            $(window).on('resize', equalize);
            $context.on('resize.block', equalize);

            $map.on('mapReady.block', fillMap);

        });
    });

// Точки получения заказа на отдельной карте
    $(function () {
        $('.b-map-point').livequery(function () {
            var $context = $(this);
            var $points = $('.b-map-point__option', $context);
            var $map = $('.b-ymap', $context);
            var $mapHolder = $('.b-map-point__map-section', $context);
            var $select = $('.b-map-point__select select', $context);
            var $chooseHolder = $('.b-map-point__choose-holder', $context);
            var $chooseBtn = $('.b-map-point__choose-btn', $context);

            function setPlacemarks() {
                $points.each(function () {
                    var $point = $(this);
                    var $address = $('.b-map-point__address', $point);
                    var $time = $('.b-map-point__time', $point);
                    var $metro = $('.b-map-point__metro', $point);
                    var metroList = [];

                    $metro.each(function () {
                        metroList.push($(this).html());
                    });

                    $map.trigger('setPlacemark.block', [{
                        coords: $point.data('coords').split(','),
                        address: $address.html(),
                        hours: $time.html(),
                        type: $address.html(),
                        data: {
                            metro: metroList,
                            index: $points.index($point)
                        },

                        // Шаблонизация https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Template-docpage
                        // Если будут использоваться внешние данные, то необходимо обойти использование |raw, иначе возможен XSS. Используется в основном для типографики.
                        balloonTemplate:
                            '<div class="b-ymap__balloon-inner _qiwi">' +
                                '<div class="b-ymap__balloon-header">' +
                                    '<div class="b-ymap__balloon__close"></div>' +
                                    '<div class="b-ymap__balloon-address">{{properties.address|raw}}</div>' +
                                '</div>' +
                                '<div class="b-ymap__balloon-content">' +
                                    '{% if properties.metro.length != 0 %}' +
                                    '<ul class="b-ymap__metro-items">' +
                                        '{% for metro in properties.metro %}' +
                                            '<li class="b-ymap__metro-item">{{metro|raw}}</li>'+
                                        '{% endfor %}' +
                                    '</ul>' +
                                    '{% endif %}' +
                                    '<div class="b-ymap__balloon-hours">{{properties.hours|raw}}</div>' +
                                    '<a href="#" class="b-ymap__balloon-apply button" data-index="{{properties.index}}"">Заберу отсюда</a>' +
                                '</div>' +
                            '</div>',

                        markTemplate:
                            '<div class="b-ymap__placemark _qiwi">' +
                                '<div class="b-ymap__placemark-round"></div>' +
                                '<div class="b-ymap__placemark-text">' +
                                    '{{ properties.iconContent }}' +
                                '</div>' +
                            '</div>',

                        buildCallback: balloonBehavior
                    }]);
                });

                $map.off('mapReady.block', setPlacemarks);
            }

            // Тут можно определить поведение балуна
            function balloonBehavior () {
                var template = this;
                var placemark = template.getParentElement()
                var $balloon = $(placemark).find('.b-ymap__balloon-inner');
                var $applyBtn = $('.b-ymap__balloon-apply', $balloon);

                $applyBtn.on('click', function (e) {
                    var index = $(this).data('index');
                    $select.get(0).selectedIndex = index;
                    $select.change();
                    setMode('save');
                    template.onCloseClick(e);
                });
            }

            function changeBySelect(e) {
                var index = this.selectedIndex;
                var mapTarget = $points.eq(index).data('coords');
                $points.removeClass('_active');
                $points.eq(index).addClass('_active');
                $map.trigger('setCenter.block', [mapTarget.split(','), 14]);
            }

            function setMode(mode) {
                if(mode == 'edit') {
                    $chooseHolder.removeClass('_active');
                    $mapHolder.addClass('_active');
                } else {
                    $chooseHolder.addClass('_active');
                    $mapHolder.removeClass('_active');
                }
            }

            $map.on('mapReady.block', setPlacemarks);

            $chooseBtn.on('click', function (e) {
                setMode('edit');
                e.preventDefault();
            });

            $select.on('change', changeBySelect);
        });
    });

    $('.b-shops-list__shop').on('click',function () {
        var w = screen.width;
        var mapContent = document.getElementsByClassName('b-map-contacts__cols');
        var mapContentHeight = parseInt(window.getComputedStyle(mapContent[0]).height);
        var scroll = mapContentHeight/2;

        if(w > 768) {
            window.scrollTo(0,scroll)
        } else {
            mapContent[0].scrollIntoView(top)
        }
    });

// Карта метро
    $(function () {
        $('.b-metro-map').livequery(function () {
            var $context = $(this);
            var $dotLinks = $('.b-metro-map__header-link', $context);
            var $dotsHolder = $('.b-metro-map__dots', $context);
            var items = [];
            var $i = 1;

            function fillMap () {
                $dotLinks.each(function () {
                    var $this = $(this).closest('.b-metro-map__header-link-item');
                    var $dot = $('<div class="b-metro-map__dot"'+ ' data-shop="shop' + $i + '"></div>');
                    var coords = $(this).data('offset').split(',');
                    var mod = '';

                    if(coords[0] > 50) mod += ' _right'

                    var templates = buildPlacemark({
                        iconContent: $this.find('.b-metro-map__icon-content').html(),
                        address: $this.find('.b-metro-map__address').html(),
                        description: $this.find('.b-metro-map__description').html(),
                        phone: $this.find('.b-metro-map__phone').html(),
                        hours: $this.find('.b-metro-map__hours').html(),
                        link: $(this).data('link'),
                        mod: mod
                    });

                    $dot.css({
                        left: coords[0] + '%',
                        top: coords[1] + '%'
                    });

                    $dot.append(templates.icon);
                    $dot.append(templates.balloon);

                    $dotsHolder.append($dot);

                    $dot.on('click', openBalloon);
                    items.push($dot);

                    $i++;
                });
            }

            function openBalloon () {
                var $this = $(this);

                $('.b-metro-map__dot._active').removeClass('_active');
                $this.addClass('_active');
                $('.b-ymap__balloon__close').on('click', function (e) {
                    closeBalloon(e);
                });

                $this.on('click', '.js-shop-info', function (e) {
                    var $link = $(this);
                    var href = $link.attr('href') || $link.data('href');

                    $.fancybox.open( {href : href}, {
                        type: 'ajax',
                        width: 960,
                        autoSize: false,
                        padding: 0,
                        margin: 20,
                        fitToView: true,
                        scrolling: 'visible',
                        beforeShow: function () {
                            $('html').addClass('fancybox-margin fancybox-lock');
                            $('.iblock', this.inner).trigger('resize.block');
                        },
                        beforeClose: function () {
                            $('.fancybox-inner .b-ymap').trigger('destroy.block');
                        },
                        afterShow: function () {
                            $('.fancybox-wrap').livequery();
                        }
                    });

                    e.preventDefault();
                });
                return false;
            }

            function closeBalloon (e) {
                var $target = $(e.target);
                if($target.is('.b-ymap__balloon__close') || ($target.closest('.b-metro-map__dot').length == 0 && !$target.is('.b-metro-map__dot') && !$target.is('.b-metro-map__header-link'))) {
                    $('.b-metro-map__dot').removeClass('_active');
                }
            }

            function buildPlacemark (params) {
                if(params.iconContent == 'Гипермаркет ОГО!'){
                    var icon =
                    '<div class="b-ymap__placemark-metro-hyper"></div>'
                }else{
                    var icon =
                    '<div class="b-ymap__placemark-metro-point"></div>'
                }

                var balloon =
                    '<div class="b-ymap__balloon-outer'+ params.mod +'">' +
                        '<div class="b-ymap__balloon-outer-holder">' +
                            '<div class="b-ymap__balloon-inner'+ params.mod +'">' +
                                '<div class="b-ymap__balloon-header">' +
                                    '<div class="b-ymap__balloon__close"></div>' +
                                    '<div class="b-ymap__balloon-address">' + params.address + '</div>' +
                                '</div>' +
                                '<div class="b-ymap__balloon-content">' +
                                    '<div class="b-ymap__balloon-apply">' + params.description + '</div>' +
                                    '<div class="b-ymap__balloon-phone">' + params.phone + '</div>' +
                                    '<div class="b-ymap__balloon-hours">' + params.hours + '</div>' +
                                    '<a href=' + params.link + ' class="b-ymap__balloon-details button js-shop-info">Подробнее</a>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>'

                return {
                    icon: icon,
                    balloon: balloon
                }
            }

            function showShop() {
                var shop = $(this).data("shop");

                $('.b-metro-map__dot').each(function () {
                    var $this = $(this);
                    if($this.data("shop") == shop){
                        $('html, body').animate({scrollTop: $this.position().top + 250}, 1000);
                        $this.trigger('click');

                    }
                });
            }

            fillMap();
            $('body').on('click', closeBalloon);

            $dotLinks.on('click', showShop);

        });
    });

    // Слайдер новостей
    document.addEventListener('DOMContentLoaded', function () {
        const newsSlider = () => {
            let sliders = document.querySelectorAll('.b-news-slider'),
                prevArrow = document.querySelectorAll('.b-news-slider__prev'),
                nextArrow = document.querySelectorAll('.b-news-slider__next'),
                pagination = document.querySelectorAll('.b-news-slider__pagination');

            if (sliders.length > 0) {
                sliders.forEach((carousel, index) => {
                    const swiper = new Swiper(carousel, {
                        loop: true,
                        freeMode: {
                            enabled: true,
                            sticky: true,
                            momentumBounceRatio: 0.05,
                            momentumRatio: 0.05,
                            momentumVelocityRatio: 3
                        },
                        mousewheel: {
                            forceToAxis: true,
                        },
                        watchSlidesProgress: true,
                        navigation: {
                            nextEl: nextArrow[index],
                            prevEl: prevArrow[index]
                        },
                        pagination: {
                            el: pagination[index],
                            type: 'bullets',
                            clickable: true
                        },
                        slidesPerView: 1,
                        spaceBetween: 10,
                        breakpoints: {
                            // when window width is >= 640px
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 10
                            },
                            // when window width is >= 1024px
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 14
                            }
                        }
                    });
                });
            }
        };
        newsSlider();
    });

// Статус заказа
    $(function () {
        $('.b-order-status').livequery(function () {
            var $context = $(this);
            var $submit = $('.b-order-status__submit', $context);
            var $main = $('.b-order-status__main', $context);
            var $result = $('.b-order-status__result', $context);

            $submit.on('click', function (e) {
                $main.removeClass('_active');
                $result.addClass('_active');
                e.preventDefault();
            });
        });
    });

// comments
    $(function () {
        $('.b-password-input').livequery(function () {
            var $context = $(this);
            var $eye = $('.b-password-input__eye', $context);
            var $input = $('input', $context);

            function changeInputType () {
                var $link = $(this);

                if($input.attr('type') == 'text') {
                    $input.attr('type', 'password');
                    $link.removeClass('_open');
                } else {
                    $input.attr('type', 'text');
                    $link.addClass('_open');
                }
            }

            $eye.on('click', changeInputType);
        });
    });

// Точка получения заказа
    $(function () {
        $('.b-pickpoint-confirm').livequery(function () {
            var $context = $(this);
            var $map = $('.b-ymap', $context)

            function equalize () {
                $context.css('height', '');
                setTimeout(function () {
                    $context.css('height', $context.height());
                }, 300);
            }

            equalize();
            $(window).on('resize', equalize);
            $context.on('resize.block', function () {
                equalize();
            });

        });
    });

// Ссылки на содержимое карточки продукта
    $(window).on('load links', function(){
        $('.b-product-links').livequery(function () {
            var $context = $(this);
            var $links = $('.b-product-links__link', $context);

            function slowScroll (e) {
                var $this = $(this);
                var $target = $($this.attr('href'));

                if($target.length == 0) return;

                $('body').animate({
                    scrollTop: ($target.offset().top - 80)
                }, 300);

                e.preventDefault();
            }

            $links.on('click', slowScroll);

        });
    });

// Параметры продукта
    $(window).on('load params', function(){
        $('.b-product-params').livequery(function () {
            var $context = $(this);
            var $sectionCaptions = $('.b-product-params__section-caption', $context);
            var $sectionContainers = $('.b-product-params__section-holder', $context);

            function toggleSection() {
                var $caption = $(this);
                var $container = $caption.next();

                $container.slideToggle(400);

                $caption.toggleClass('b-product-params__section-caption_active');
                $container.toggleClass('b-product-params__section-holder_active');
            }

            $sectionContainers.filter(':not(.b-product-params__section-holder_active)').slideUp(0);
            $sectionCaptions.on('click', toggleSection);
        });
    });

// Обзор продукта
    $(function () {
        $('.b-product-review').livequery(function () {
            var $context = $(this);
            var $moreBtn = $('.b-product-review__more', $context);
            var $moreHolder = $('.b-product-review__more-holder', $context);
            var $moreText = $('.b-product-review__full-text', $context);

            function showMore () {
                $moreText.slideDown(400);
                $moreHolder.addClass('_more-open');
                $moreText.addClass('_more-open');
                return false;
            }

            $moreBtn.on('click', showMore);

        });
    });

$(function (){
    function remove() {
        var hoverContent = $('.b-product-small__hover-content');
        hoverContent.find('.b-product-small__add-btn').removeClass('pointer-event-auto');
        hoverContent.find('.b-product-small__favor').removeClass('pointer-event-auto');
        hoverContent.find('.b-product-small__compare').removeClass('pointer-event-auto');
    }

    $(document).on('click', function(event) {
        var target = $( event.target );
        var hoverContent = $('.b-product-small__hover-content');
        var hoverContentChildren = $('.b-product-small__hover-content').children();

        if(target.is(hoverContent) || target.is(hoverContentChildren)) {
            remove();
            target.find('.b-product-small__add-btn').addClass('pointer-event-auto');
            target.find('.b-product-small__compare').addClass('pointer-event-auto');
            target.find('.b-product-small__favor').addClass('pointer-event-auto');
        }

        else if(target.is(':not(.b-product-small__hover-content)')) {
            remove();
        }
    })
})

// Публичный профиль
function changePhotor (obj) {
    if($(obj).val() == '') return;
    var $photoImg = $('.js-public-profile-photo', $('.js-public-profile'));
    var $photoChanger = $('.js-public-profile-change', $('.js-public-profile'));
    $('button', $(obj).parent('form')).removeAttr('disabled');

    var FR = new FileReader();

    FR.onload = function (event) {
        var contents = event.target.result;
        $photoImg.attr('src', contents);
    }

    FR.readAsDataURL($photoChanger.get(0).files[0]);
}

// Список чекбоксов
    $(function () {
        $('.b-radio-cols').livequery(function () {
            var $context = $(this);
            var $moreBtn = $('.b-radio-cols__btn', $context)
            var $moreContainer = $('.b-radio-cols__more-container', $context)

            function toggleMoreContainer() {
                $moreBtn.toggleClass('b-radio-cols__btn_opened');
                $moreContainer.toggleClass('b-radio-cols__more-container_opened');
                return false;
            }

            $moreBtn.on('click', toggleMoreContainer);
        });
    });

// Рейтинг отображаемый
    $(function () {
        $('.b-rating').livequery(function () {
            var $context = $(this);
            var $items = $('.b-rating__item', $context);

            function changeState(val) {
                $items.removeClass('b-rating__item_active');
                $items.slice(0, val).addClass('b-rating__item_active');
            }

            $context.on('change-val.block', function (event, val) {
                changeState(val);
            });
        });
    });

// Выбор рейтинга
    $(function () {
        $('.b-rating-form').livequery(function () {
            var $context = $(this);
            var $items = $('.b-rating-form__item', $context);
            var $input = $('.b-rating-form__input input', $context);

            function changeValueByClick () {
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

            function changeValueByInput () {
                var value = parseFloat($input.val());
                changeValueByClick.apply($items.eq(5 - value));
            }

            changeValueByInput();

            $items.on('click', changeValueByClick);
            $input.on('change.block', changeValueByInput);
        });
    });

// Строка поиска

    $(function () {
    $(document).on('click', function(e) {
        var targ = $(e.target)
        var className = $('.b-search-line__field-drop');

        if(targ.is('.b-search-line__input')) {
            className.addClass('b-search-line__field-drop__active');
        }

        else {
            className.removeClass('b-search-line__field-drop__active');
        }
    })
});

// Карточка магазина
    $(function () {
        $('.b-shop-card').livequery(function () {
            var $context = $(this);
            var $tabLinks = $('.b-shop-card__way-link', $context);
            var $tabContainers = $('.b-shop-card__way-tab', $context);

            function changeTab () {
                var $link = $(this);
                var index = $tabLinks.index($link);

                if($link.hasClass('_active')) return false;

                $tabLinks.removeClass('_active');
                $tabContainers.removeClass('_active');
                $link.addClass('_active');
                $tabContainers.eq(index).addClass('_active');

                return false;
            }

            $tabLinks.on('click', changeTab);
        });
    });

// Фильтр товаров каталога
    $(function () {
        $('.b-smart-filter').livequery(function () {
            var $context = $(this);
            var $paramLinks = $('.b-smart-filter__params-name', $context);

            $context.removeClass('_nojs');

            function toggleParams() {
                var $item = $(this).closest('.b-smart-filter__params-item');
                var $container = $('.b-smart-filter__params-holder', $item);
                $item.toggleClass('_opened');
                $container.slideToggle(400);
                return false;
            }

            function slideUp() {
                $('.b-smart-filter__params-item:not(._opened) .b-smart-filter__params-holder', $context).slideUp(0);
            }

            slideUp();
            $paramLinks.on('click', toggleParams);
        });
    });

$(function() {
    $.validator.addMethod('email', function(value, element) {
        return this.optional(element) || /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
    }, 'Пожалуйста, введите корректный адрес электронной почты');

    // $.validator.addMethod('phone', function(value, element) {
    //     var phoneNumber = value.replace(/\s+/g, '');
    //     return this.optional(element) || phoneNumber.length > 9 &&
    //         phoneNumber.match(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/);
    // }, 'Пожалуйста, укажите правильный номер телефона');

    $.validator.addMethod("phone", function(value, element) {
        var phone = value.replace(/\D/g, '');
        return this.optional(element) || phone.length >= 11;
    }, 'Пожалуйста, укажите правильный номер телефона');

    $.validator.addMethod('coupon', function(value, element) {
        return this.optional(element) || /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
    }, 'Ошибка! Купон не найден или истек его срок использования');

    $.validator.addMethod('bic', function(value, element) {
        return this.optional( element ) || (/^\d{9}$/.test(value ));
    }, 'БИК состоит из 9 цифровых символов');

    $.validator.addMethod('inn', function(value, element) {
        return this.optional(element) ||(/^\d{10,12}$/.test(value));
    }, 'ИНН не менее 10 символов');

    $.validator.addMethod('kpp', function(value, element) {
        return this.optional(element) ||(/^\d{9}$/.test(value));
    }, 'КПП 9 символов');

    $.validator.addMethod('rs', function(value, element) {
        return this.optional( element ) || (/^\d{20}$/.test(value));
    }, 'Номер счета состоит из 20 цифровых символов');

    $('form[data-validate="Y"]').each(dataValidateForm);

    $('form.b-feedback-vacancy-form').validate({
        ignore: 'hidden',
        // rules: {
        // },
        highlight: function (element) {
            $(element).removeClass('success').addClass('error');
        //     $(element).closest('.form__field-row').removeClass('is-ok').addClass('has-error');
        },
        unhighlight: function (element) {
            $(element).removeClass('error').addClass('success');
        },
        onkeyup: function( element, event ) {
            const isValid = this.checkForm();

            if (isValid) { // checks form for validity
                $('form.b-feedback-vacancy-form').find('[type="submit"]').prop('disabled', false);
                $('form.b-feedback-vacancy-form').find('[name="save"]').prop('disabled', false);
            } else {
                $('form.b-feedback-vacancy-form').find('[type="submit"]').prop('disabled', true);
                $('form.b-feedback-vacancy-form').find('[name="save"]').prop('disabled', true);
            }
        },
        onclick: function( element ) {
            // click on selects, radiobuttons and checkboxes
            if (element.name in this.submitted) {
                this.element(element);

                // or option elements, check parent select in that case
            } else if (element.parentNode.name in this.submitted) {
                this.element(element.parentNode);
            }

            const isValid = this.checkForm();

            if (isValid) { // checks form for validity
                $('form.b-feedback-vacancy-form').find('[type="submit"]').prop('disabled', false);
                $('form.b-feedback-vacancy-form').find('[name="save"]').prop('disabled', false);
            } else {
                $('form.b-feedback-vacancy-form').find('[type="submit"]').prop('disabled', true);
                $('form.b-feedback-vacancy-form').find('[name="save"]').prop('disabled', true);
            }
        }
    });
});

//для валидации чекбоксов (сделано через input[type=text])
$('.js-modal').on('click', function(){
    var a = $('.b-checkbox');
    var b = $('.checkbox-validator');

    if(a.hasClass('_checked')) {
        b.val('true');
    } else {
        b.val('');
    }
})



$(document).on("click",'.b-checkbox',function(){
    var a = $('.b-checkbox');
    var b = $('.checkbox-validator');

    if(a.hasClass('_checked')) {
        b.val('');
    } else {
        b.val('true');
    }
});
$('.b-checkbox').on('click', function(){

});


    $(function () {
        $('.b-ymap').livequery(function () {
            var $context = $(this);
            var $mapHolder = $('.b-ymap__map', $context);
            var $marks = $('.b-ymap__point', $context);
            var map;
            window.shopPlacemarksList = [];
            var placemarks = window.shopPlacemarksList;

            // Шаблонизация https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Template-docpage
            // Если будут использоваться внешние данные, то необходимо обойти использование |raw, иначе возможен XSS. Нужен в основном для типографики.
            var defaultBalloonTemplate =
                '<div class="b-ymap__balloon-inner">' +
                    '<div class="b-ymap__balloon-header">' +
                        '<div class="b-ymap__balloon__close"></div>' +
                        '<div class="b-ymap__balloon-address">{{properties.address|raw}}</div>'+
                    '</div>' +
                    '<div class="b-ymap__balloon-content">' +
                        '<div class="b-ymap__balloon-apply">{{properties.description|raw}}</div>' +
                        '<div class="b-ymap__balloon-phone">{{properties.phone|raw}}</div>' +
                        '<div class="b-ymap__balloon-hours">{{properties.hours|raw}}</div>' +
                        '{% if !properties.details %}' +
                        '<a href="{{properties.link|raw}}" class="b-ymap__balloon-details button js-shop-info">Подробнее</a>' +
                        '{% endif %}' +
                    '</div>' +
                '</div>';

            var defaultLayoutTemplate =
                '<div class="b-ymap__balloon-outer">' +
                    '<div class="b-ymap__balloon-outer-holder">' +
                        '$[[options.contentLayout]]' +
                    '</div>' +
                '</div>';

            var defaultMarkTemplate =
                '<div class="b-ymap__placemark">' +
                    '<div class="b-ymap__placemark-round"></div>' +
                    '<div class="b-ymap__placemark-text">' +
                        '{{ properties.iconContent }}' +
                    '</div>' +
                '</div>';

            // Основные функции
                function createMap () {
                    map = new ymaps.Map($mapHolder.get(0), {
                        center: $mapHolder.data('center').split(','),
                        zoom: 15,
                        controls: ['default']
                    });

                    map.behaviors.disable('scrollZoom');
                }

                function setPlacemark(mark) {
                    var placemark, icon, hint, icon_size;

                    if(mark.type == 'Гипермаркет ОГО!'){
                        icon = '/assets/img/map_shop_label.png';
                        hint = 'гипермаркет ОГО!';
                        icon_size = [81, 53];
                    }else{
                        icon = '/assets/img/map_point_label.png';
                        hint = 'точка выдачи ОГО!';
                        icon_size = [109, 55];
                    }

                    placemark = new ymaps.Placemark(
                        [parseFloat(mark.coords[0]), parseFloat(mark.coords[1])],
                        $.extend({
                            hintContent: hint,
                            address: mark.address,
                            description: mark.description,
                            phone: mark.phone,
                            hours: mark.hours,
                            link: mark.link,
                            iconContent: mark.type,
                            details: mark.details,
                            type: mark.type,
                            metro: mark.metro,
                            pickup: mark.pickup
                        }, mark.data),
                        {
                            // Изображение метки
                            iconLayout: 'default#image',
                            iconImageHref: icon,
                            iconImageSize: icon_size,
                            iconShape: {
                              type: 'Rectangle',
                              coordinates: [[0, -46], [178, 0]]
                            },
                            hideIconOnBalloonOpen: true,
                            // Свойства балуна
                            balloonShadow: false,
                            balloonContentLayout: balloonInnerTemplating(mark.balloonTemplate),
                            balloonLayout: balloonLayoutTemplating(mark.balloonLayout, mark.buildCallback),
                            balloonPanelMaxMapArea: 0
                        }
                    );
                    placemark.key = mark.key;
                    placemarks.push(placemark);
                    map.geoObjects.add(placemark);
                    if (placemarks.length <= 1) {
                        placemark.balloon.open();
                    }
                }

                function resetPlacemarks() {
                    for(var i = 0; i < placemarks.length; i++) {
                        map.geoObjects.remove(placemarks[i]);
                    }
                }

                function defaultPlacemarking($marks) {
                    $marks.each(function () {
                        var $this = $(this);

                        setPlacemark({
                            address: $('.b-ymap__point-address', $this).html(),
                            phone: $('.b-ymap__point-phone', $this).html(),
                            hours: $('.b-ymap__point-hours', $this).html(),
                            type: $('.b-ymap__point-type', $this).html(),
                            coords: $this.data('coords').split(','),
                            details: ($this.data('no-detail') !== undefined),
                            link: $this.data('link') || '/',
                            key: $this.data('coords'),
                        });
                    });
                }

                function mappingInit() {
                    createMap();
                    if($marks.length > 0) defaultPlacemarking($marks);
                    $context.triggerHandler('mapReady.block'); // without bubble up
                }

            // Шаблонизаторы
                function balloonInnerTemplating(balloonTemplate) {
                    var _balloonTemplate = balloonTemplate || defaultBalloonTemplate;
                    return ymaps.templateLayoutFactory.createClass(_balloonTemplate);
                }

                function markTemplateing(markTemplate) {
                    var _markTemplate = markTemplate || defaultMarkTemplate;
                    return ymaps.templateLayoutFactory.createClass(_markTemplate);
                }

                function balloonLayoutTemplating(layoutTemplate, buildCallback) {
                    var _layoutTemplate = layoutTemplate || defaultLayoutTemplate

                    var balloonHolder = ymaps.templateLayoutFactory.createClass(_layoutTemplate,
                        {
                            build: function () {
                                this.constructor.superclass.build.call(this);

                                this._$element = $('.b-ymap__balloon-outer', this.getParentElement());

                                // $('body').on('click', $.proxy(this.closeOnBlur, this));

                                if(buildCallback !== undefined) buildCallback.apply(this);

                                this.applyElementOffset();

                                this._$element.find('.b-ymap__balloon__close')
                                    .on('click', $.proxy(this.onCloseClick, this));
                            },

                            clear: function () {
                                $('body').off('click', this.closeOnBlur);
                                this.constructor.superclass.clear.call(this);
                            },

                            onSublayoutSizeChange: function () {
                                MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

                                if(!this._isElement(this._$element)) {
                                        return;
                                }

                                this.applyElementOffset();

                                this.events.fire('shapechange');
                            },

                            applyElementOffset: function () {
                                this._$element.css({
                                        left: -(this._$element[0].offsetWidth / 2),
                                        top: -(this._$element[0].offsetHeight)
                                });
                            },

                            closeOnBlur: function (e) {
                                var $target = $(e.target);
                                if($target.is(this._$element) || $target.closest(this._$element).length) {
                                    return true;
                                } else {
                                    this.events.fire('userclose');
                                }
                            },

                            getShape: function () {
                                if(!this._isElement(this._$element)) {
                                        return MyBalloonLayout.superclass.getShape.call(this);
                                }

                                var position = this._$element.position();

                                return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
                                        [position.left, position.top], [
                                                position.left + this._$element[0].offsetWidth,
                                                position.top + this._$element[0].offsetHeight
                                        ]
                                ]));
                            },

                            onCloseClick: function (e) {
                                e.preventDefault();
                                this.events.fire('userclose');
                            },

                            _isElement: function (element) {
                                return element && element[0];
                            }
                        }
                    );

                    return balloonHolder;
                }


            // ymapAPIready глобальная переменная, true если был загужен api карт, иначе ждем события загрузки апи.
                if(ymapAPIready) {
                    mappingInit();
                } else {
                    $(document).on('ymapAPIready', mappingInit);
                }

            // API блока
                $context.on('resize.block', function (event) {
                    setTimeout(function () {
                        if(map != undefined) map.container.fitToViewport(true);
                    }, 200);
                    event.stopPropagation();
                });

                $context.on('setPlacemark.block', function (event, mark) {
                    setPlacemark(mark);
                    event.stopPropagation();
                });

                $context.on('resetPlacemarks.block', function (event, mark) {
                    resetPlacemarks();
                    event.stopPropagation();
                });

                $context.on('setCenter.block', function (event, center, zoom, coordsKey) {
                    map.setCenter(center, zoom, {
                        duration: 600,
                    }).then(function () {
                        var placemark  = window.shopPlacemarksList.filter(function (el) {
                          return el.key === coordsKey;
                        })[0];
                        if (placemark) {
                            placemark.balloon.open();
                        }
                    }, function (err) {

                    });
                    event.stopPropagation();
                });

                $context.on('destroy.block', function () {
                    if(map !== undefined)	map.destroy();
                    event.stopPropagation();
                });
        });
    });
// Промоблок 2
    $(function () {
        $('.b-promo-block2').livequery(function () {
            var $context = $(this);
            var $expandLink = $('.b-promo-block2__expand-link', $context);
            var $closeLink = $('.b-promo-block2__close', $context);

            function expandBlock (e) {
                $context.removeClass('_collapsed');
                e.preventDefault();
            }

            function closeBlock (e) {
                $context.addClass('_collapsed');
                //$context.remove();
                e.preventDefault();
            }

            $expandLink.on('click', expandBlock);
            $closeLink.on('click', closeBlock);

        });
    });

$(function () {
    $(document).trigger('blocksReady');
});


$(document).on("change","#changeval",function(  ){
    /*if (this.checked){
        setAttr('DIFFERENT', 'Y');
    } else {
        setAttr('DIFFERENT', 'N');
    }*/
    //$($(this).val()).click();
    $('body').find($(this).val()).click();
});

function setAttr(prmName,val){
    var res = '';
    var d = location.href.split("#")[0].split("?");
    var base = d[0];
    var query = d[1];
    if(query) {
        var params = query.split("&");
        for(var i = 0; i < params.length; i++) {
            var keyval = params[i].split("=");
            if(keyval[0] != prmName) {
                res += params[i] + '&';
            }
        }
    }
    res += prmName + '=' + val;
    window.history.pushState("", "Сравнение", base + '?' + res);
    return false;
}

/**
 * У битрикса одно поля для ДР. Склеиваем из трех полей одно значение.
 * Фикс самый простой, без проверки ошибок.
 */
$(function() {
    $('.js-birthday-day, .js-birthday-mon, .js-birthday-year').on('change keypress focus click', function(){
        var p_day   = $('.js-birthday-day').val();
        var p_month = $('.js-birthday-mon').val();
        var p_year  = $('.js-birthday-year').val();

        if(p_day != '' && p_month != '' && p_year != '') {
            $('input[name="PERSONAL_BIRTHDAY"]').val(p_day+'.'+p_month+'.'+p_year);
        }
    });
});


// Поп-ап авторизации
$(function () {
    $('body').on('click', '.js-registration-popup-button', function (event) {
        event.preventDefault();
        if ($('#registration-modal').length > 1) {
            showPopup($('#registration-modal'));
            return;
        }
        if (HtmlCache.get('register_popup').length <= 0) {
            $.ajax({
                url: '/ajax/new/register_popup.php',
                method: 'get',
                success: function (result) {
                    HtmlCache.add('register_popup', result);
                    var block = HtmlCache.get('register_popup');
                    showPopup(block);
                    improvedFields.init();
                }
            });
        } else {
            var block = HtmlCache.get('register_popup');
            showPopup(block);
        }
    });
    var registerPopupInitCallback = function () {
        var $context = $('#registration-modal');
        initEyeInputs($context);
        var $checkbox = $context.find('.b-checkbox input[type="checkbox"]');
        var $label = $checkbox.closest('label');
        $checkbox.on('change', function () {
            if($checkbox.prop('checked')) {
                $checkbox.addClass('_checked');
                $label.addClass('_checked');
                $label.siblings('.js-validator').val('true');
            } else {
                $checkbox.removeClass('_checked');
                $label.removeClass('_checked');
                $label.siblings('.js-validator').val('');
            }
        });
        var validationSettings = getDefaultFormValidationSettings();
        validationSettings.submitHandler = function (form) {
            var data = $(form).serialize();
            var url = $(form).attr('action');
            $.ajax({
                url: url,
                method: 'post',
                data: data + '&register_submit_button=' + $(form).find('[name=register_submit_button]').val(),
                success: function (data) {
                    try {
                        var response = JSON.parse(data);
                        if (response.success) {
                            window.location.href = '/personal/?registered';
                        }
                    } catch (error) {
                        $context.html($(data).html());
                        registerPopupInitCallback();

                    }
                }
            });
        };
        $context.find('form').validate(validationSettings);
        $context.find('#REGISTER-EMAIL').on('change keydown keyup focusout focus blur keypress click', function() {
            $('#REGISTER-LOGIN').val($(this).val());
        });
    }
    $('body').on('registerPopupInit', registerPopupInitCallback);
});

$(function() {
    $('body').on('click', '.js-fastbuy-modal', function (event) {
        event.preventDefault();
        var dataFastBuyId = $(this).data('fastBuyId') || $(this).attr('data-fastBuyId');
        $.ajax({
            url: '/ajax/new/fast_buy_popup.php',
            success: function (result) {
                showPopup(result);
                if(typeof(dataFastBuyId) != 'undefined')
                {
                    $("#datafastBuyId").val(dataFastBuyId);
                }
                improvedFields.init();
            }
        });
    });
    $(document).on('submit', '.js-fast_buy', function(e) {
        var $this = $(this);
        e.preventDefault();
        if($this.attr('action'))
        {
            $.ajax({
                url: $this.attr('action'),
                data: $this.serialize(),
                method: 'post',
                success: function(result) {
                    result = JSON.parse(result);
                    if(result.status == 'success')
                        $.fancybox.close(true);
                }
            });
        }
    });
});
$(function () {
    $('body').on('click', '.js-auth-popup-modal', function (event) {
        event.preventDefault();
        var validationSettings = getDefaultFormValidationSettings();
        validationSettings.submitHandler = function (form) {
            $('.js-popup-auth-form-error-message').html('').hide();
            var data = $(form).serialize();
            var url = $(form).attr('action');
            $.ajax({
                url: url,
                data: data,
                method: 'POST',
                success: function (data) {
                    if (data.success === false) {
                        $('.js-popup-auth-form-error-message').html(data.message).show();
                    }
                    if (data.success === true) {
                        if (data.redirect) {
                            window.location.href = data.redirect;
                        } else {
                            window.location.reload();
                        }
                    }
                }
            });
        };
        if (HtmlCache.get('authform').length <= 0) {
            $.ajax({
                url: '/ajax/new/authform.php?backurl='+window.location.pathname,
                success: function (result) {
                    HtmlCache.add('authform', result);
                    var block = HtmlCache.get('authform');
                    showPopup(block);
                    $('#enter-modal form').validate(validationSettings);
                    initEyeInputs($('#enter-modal'));
                }
            });
        } else {
            var block = HtmlCache.get('authform');
            showPopup(block);
            $('#enter-modal form').validate(validationSettings);
            initEyeInputs($('#enter-modal'));
        }
    });
});
$(function () {
    $('body').on('click', '.js-forgotpassword-modal', function (event) {
        event.preventDefault();
        $.ajax({
            url: '/ajax/new/forgot_password_popup.php',
            success: function (response) {
                showPopup(response);
                var validationSettings = getDefaultFormValidationSettings();
                validationSettings.submitHandler = function (form) {
                    $('#forgotpass-modal .js-popup-forgot-form-error-message').html('').hide();
                    var data = $(form).serialize();
                    var url = $(form).attr('action');
                    $.ajax({
                        url: url,
                        data: data,
                        type: 'POST',
                        success: function (data) {
                            $('#forgotpass-modal').html($(data).html());
                            $('#forgotpass-modal form').validate(validationSettings);
                        }
                    });
                };
                $('#forgotpass-modal form').validate(validationSettings);
            }
        });
    });
});

$(function () {
    $('.js-category-menu').livequery(function () {
        var $items = $(this);
        var $moreBtns = $('.js-category-menu-toggle', $items);

        // $moreBtns.each(function () {
        // 	var $btn = $(this);
        // 	var $item = $btn.closest('.js-category-menu');
        // 	var $content = $('.js-category-menu-content', $item);

        // 	if (!$item.hasClass('active')) {
        // 		$content.slideUp();
        // 	} else {
        // 		$content.slideDown();
        // 	}
        // });

        $moreBtns.on('click', function(e) {
            var $item = $(this).closest('.js-category-menu');
            var $content = $item.find('.js-category-menu-content');

            if ($item.hasClass('active')) {
                $item.removeClass('active');
                $content.slideUp(400);
            }
            else {
                $item.addClass('active');
                $content.slideDown(400);
            }

            e.preventDefault();
        });
    });
});

$(function () {
    if ($('.js-masonry').length) {
        let masonry = new Masonry('.js-masonry', {
            itemSelector: '.js-masonry-item',
            columnWidth: '.js-masonry-sizer',
            percentPosition: true,
            horizontalOrder: true,
            transitionDuration: 0
        });
    }
});

$(function () {
    $(document).on('click', '.js-collapse-block-toggle', function(e) {
        var $item = $(this).closest('.js-collapse-block');
        var $content = $item.find('.js-collapse-block-content');

        if ($item.hasClass('active')) {
            $item.removeClass('active');
            $content.slideUp(400);
        }
        else {
            $item.addClass('active');
            $content.slideDown(400);
        }

        e.preventDefault();
    });
});

$(function () {
    $('.js-toggle-password-control').livequery(function () {
        var $btn = $(this);
        var $field = $btn.closest('.password-control').find('input');

        $btn.on('click', function(e) {
            if ($field.prop('type') === 'text') {
                $field.prop('type', 'password');
            }
            else {
                $field.prop('type', 'text');
            }

            $btn.toggleClass('icon-password-eye-off', $field.prop('type') === 'text');

            e.preventDefault();
        });
    });
});

$(function () {
    $(document).on('click', '.js-toggle-text', function(event) {
        var text = $(this).data('text');

        if (text != undefined){
            var tmp = $(this).text();
            $(this).text(text).data('text', tmp);
        }

        event.preventDefault();
    });
});

$(function () {
    $('.js-lk').livequery(function () {
        function updateOrderPics() {
            $('.js-lk-order-pics').each(function() {
                var $context = $(this);
                var $items = $('.js-lk-order-pics-item', $context);
                var $itemsMore = $('.js-lk-order-pics-more', $context);
                var itemsCount = $items.length;
                var blockW = $context.outerWidth();
                var itemW = $items.filter(':first').outerWidth(true);
                var itemsW = itemW * itemsCount;


                $items.show();

                if (itemsW > blockW) {
                    var maxCount = Math.floor(blockW / itemW);

                    for (var i = maxCount - 1; i < itemsCount; i++) {
                        $($items[i]).hide();
                    }

                    $itemsMore.text('+' + (itemsCount - maxCount + 1)).show();
                }
                else {
                    $itemsMore.hide();
                }
            });
        }

        updateOrderPics();

        $(window).on('resize', updateOrderPics);
    });
});

$(function() {
    if (getCookie('OGOUSER_ID')) {
        $.ajax({
            url: '/ajax/new/check.php',
        });
    }
});

$(function() {
    $(function () {
        const supplierFormPopupInitCallbackNew = function () {
            $.validator.addMethod("intphone", function(value, element) {
                var phoneNumber = value.replace(/\s+/g, "");
                return this.optional(element) || phoneNumber.length > 9 &&
                    phoneNumber.match(/(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})/);
            }, "Пожалуйста, укажите правильный номер телефона");

            var $context = $(".js-supplier-modal-form-popup");

            $context.find(".b-feedback-vacancy-form").validate({
                ignore: "hidden",
                rules: {
                    intphone: {
                        required: true,
                        maxlength: 20
                    }
                },
                messages: {
                    intphone: {
                        maxlength: jQuery.validator.format("Не больше {0} знаков")
                    }
                },
                highlight: function (element) {
                    $(element).removeClass("success").addClass("error");
                    //     $(element).closest('.form__field-row').removeClass('is-ok').addClass('has-error');
                },
                unhighlight: function (element) {
                    $(element).removeClass("error").addClass("success");
                },
                onkeyup: function (element, event) {
                    const isValid = this.checkForm();
                    if (isValid) {
                        // checks form for validity
                        $(".js-supplier-modal-form-popup").find('[type="submit"]').prop("disabled", false);
                        $(".js-supplier-modal-form-popup").find('[name="save"]').prop("disabled", false);
                    } else {
                        $(".js-supplier-modal-form-popup").find('[type="submit"]').prop("disabled", true);
                        $(".js-supplier-modal-form-popup").find('[name="save"]').prop("disabled", true);
                    }
                },
                onclick: function (element) {
                    // click on selects, radiobuttons and checkboxes
                    if (element.name in this.submitted) {
                        this.element(element);

                        // or option elements, check parent select in that case
                    } else if (element.parentNode.name in this.submitted) {
                        this.element(element.parentNode);
                    }

                    const isValid = this.checkForm();

                    if (isValid) {
                        // checks form for validity
                        $(".js-supplier-modal-form-popup").find('[type="submit"]').prop("disabled", false);
                        $(".js-supplier-modal-form-popup").find('[name="save"]').prop("disabled", false);
                    } else {
                        $(".js-supplier-modal-form-popup").find('[type="submit"]').prop("disabled", true);
                        $(".js-supplier-modal-form-popup").find('[name="save"]').prop("disabled", true);
                    }
                },
                submitHandler: function(form) {
                    // var required = $("input[required]", form),
                    //   formFilled = true;

                    // required.each(function (index, obj) {
                    //   if (!$(obj).val()) formFilled = false;
                    // });

                    // if (!formFilled) return;

                    preloader();

                    $(form).ajaxSubmit({
                        success: function () {
                            $.fancybox.open($("#form-success-modal"), {
                                padding: 0,
                                margin: 20,
                                closeEffect: "none",
                                closeSpeed: 0,
                                openSpeed: 0,
                                openEffect: "none",
                                openOpacity: false,
                                closeOpacity: false,
                                fitToView: true,
                                scrolling: "visible",
                                beforeShow: function () {
                                    $("html").addClass("fancybox-margin fancybox-lock");
                                },
                                afterShow: function () {
                                    $(".iblock", this.inner).trigger("resize.block");
                                },
                            });
                            preloader();
                            $('.b-feedback-modal input[type="text"], .b-feedback-modal input[type="password"], .b-feedback-modal input[type="tel"], .b-feedback-modal input[type="email"], .b-feedback-modal textarea').val("");
                        },

                        error: function () {
                            preloader();
                        },
                    });
                }
            });

            $(".js-field-policy").on("click", function (e) {
                if (e.target.tagName == "A") return;
                e.preventDefault();
                if ($(this).find("label").hasClass("_checked")) {
                    $(this).find("label").removeClass("_checked");
                    $(this).find(".b-checkbox__input").removeClass("_checked");
                    $(this).find(".b-checkbox__input").attr("aria-required", "true");
                    $(this).find(".b-checkbox__input").attr("aria-invalid", "false");
                    $(this).siblings().find('input[type="submit"]').attr("disabled", "");
                } else {
                    $(this).find("label").addClass("_checked");
                    $(this).find(".b-checkbox__input").addClass("_checked");
                    $(this).find(".b-checkbox__input").attr("aria-required", "false");
                    $(this).find(".b-checkbox__input").attr("aria-invalid", "true");
                    $(this).siblings().find('input[type="submit"]').removeAttr("disabled", "");
                }
            });
        };

        $("body").on("supplierFormPopupInitNew", supplierFormPopupInitCallbackNew);

        $("body").on("click", ".js-supplier-modal", function (event) {
            event.preventDefault();
            var that = this;
            var clickCallback = function () {
                if ($(that).hasClass("js-supplier-modal")) {
                    $("#supplier-modal").click();
                }
            };
            if (!HtmlCache.get("supplier_form_popup").html()) {
                $.ajax({
                    url: "/ajax/new/supplier_inquiry_form.php",
                    method: "get",
                    success: function (result) {
                        HtmlCache.add("supplier_form_popup", result);
                        var block = HtmlCache.get("supplier_form_popup");
                        showPopup(block);
                        clickCallback();
                        improvedFields.init();
                    },
                });
            } else {
                var block = HtmlCache.get("supplier_form_popup");
                showPopup(block);
                clickCallback();
            }
        });
    });
});

/*Каталог 3 уровня*/
const catalogNav = (() => {
    const items = document.querySelectorAll('.catalog-page__nav-item.has-child .catalog-page__nav-link');

    function accordion(element) {
        const instance = {}
        function init() {
            findElements(instance, element)
            measureHeight(instance)
            subscribe(instance)
        }
        init()
    }

    function findElements(object, element) {
        const instance = object
        instance.element = element
        instance.target = element.nextElementSibling
        instance.parent = element.parentElement
        if (instance.parent.classList.contains("is-active")) {
            instance.isActive = true
        }
    }

    function measureHeight(object) {
        const instance = object
        instance.height = object.target.firstElementChild.clientHeight
    }

    function subscribe(instance) {
        instance.element.addEventListener("click", (event) => {
            event.preventDefault()
            changeElementStatus(instance)
        })
        window.addEventListener("resize", () => measureHeight(instance))
    }

    function changeElementStatus(instance) {
        if (instance.isActive) {
            hideElement(instance)
        } else {
            showElement(instance)
        }
    }

    function hideElement(object) {
        const instance = object
        const { target } = instance
        target.style.height = null
        instance.isActive = false
        instance.parent.classList.remove("is-active")
    }

    function showElement(object) {
        const instance = object
        const { target, height } = instance
        target.style.height = `${height}px`
        instance.isActive = true
        instance.parent.classList.add("is-active")
    }

    function init() {
        items.forEach(accordion)
    }

    return {
        init: init
    }
})();

document.addEventListener('DOMContentLoaded', function () {
    catalogNav.init()
});