// Общие скрипты
$(function () {
    $('input[placeholder], textarea[placeholder]').placeholder();

    // Модальные окна
    $('body').on('click', '.js-modal', function (e) {

        if($(this).hasClass("disabled"))
            return false;

        var target = $(this).data('href') || $(this).attr('href');
        var callbackFrame = null;
        if(target.indexOf("#callback") == 0)
        {
            callbackFrame = $(target);
            callbackFrame.click();
            target = callbackFrame.closest("._modal");
        }
        var $target = $(target);
        if ($target.data('video') && !document.getElementById($target.data('video'))) {
            var iframe = document.createElement('iframe');
            iframe.id = $target.data('video');
            iframe.src = 'https://www.youtube.com/embed/' + $target.data('video');
            iframe.width = '560';
            iframe.height = '315';
            iframe.frameborder = '0';
            iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = 1;
            $target.append(iframe);
        }
        if($.fancybox.isOpen) {
            $.fancybox.close(true);
            setTimeout(function() {open();}, 250);
        } else {
            open();
        }

        function open() {
            $.fancybox.open(
                $target,
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
        }

        e.preventDefault();
    });

    $('.js-accesories-modal').livequery(function () {
        $(this).on('click', function openShopDetail (e) {
            var $link = $(this);
            var href = $link.attr('href') || $link.data('href');

            $.fancybox.open( {href : href}, {
                type: 'ajax',
                width: 960,
                autoSize: false,
                padding: 0,
                margin: 20,
                autoCenter: true,
                fitToView: true,
                scrolling: 'visible',
                beforeShow: function () {
                    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
                    $('html').addClass('fancybox-margin fancybox-lock');
                    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
                        $('html').addClass('fancybox-ios');
                    }
                    $('.iblock', this.inner).trigger('resize.block');
                },
                afterShow: function () {
                    $('.fancybox-wrap').livequery();
                }
            });

            e.preventDefault();
        })
    });

    $('.js-gallery').livequery(function () {
        $(this).on('click', function openShopDetail (e) {
            var $link = $(this);
            var href = $link.data('href') || $link.attr('href');

            $.fancybox.open( {href : href}, {
                type: 'image',
                width: 960,
                autoSize: false,
                padding: 0,
                margin: 20,
                autoCenter: true,
                fitToView: true,
                wrapCSS: '_gallery',
                scrolling: 'visible',
                beforeShow: function () {
                    $('html').addClass('fancybox-margin fancybox-lock');
                    $('.iblock', this.inner).trigger('resize.block');
                },
                afterShow: function () {
                    $('.fancybox-wrap').livequery();
                }
            });

            e.preventDefault();
        })
    });

    $('body').on('click', '.js-shop-info', function openShopDetail (e) {
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

    // Инпуты
    $('select.select2').livequery(function () {
        if (!$(this).hasClass("select2-hidden-accessible") && $(this).data('init') !== false) {
            // if ($('html').hasClass('touch')) {
            //     return false;
            // }

            var placeholder = $(this).attr('placeholder');

            $(this).select2({
                theme: 'main',
                minimumResultsForSearch: -1,
                placeholder: placeholder,
                width: '100%'
            });
        }
    });

    $('.icheck[type="checkbox"]').livequery(function () {
        var $input = $(this),
            $label = $input.closest('label');
        $input.on('change', function () {
            if($input.prop('checked')) {
                $input.addClass('_checked');
                $label.addClass('_checked');
            } else {
                $input.removeClass('_checked');
                $label.removeClass('_checked');
            }
        });

        if($input.prop('checked')) {
            $input.addClass('_checked');
            $label.addClass('_checked');
        } else {
            $input.removeClass('_checked');
            $label.removeClass('_checked');
        }
    });

    $('.icheck[type="radio"]').livequery(function () {
        var $this = $(this);

        $(this).on('click', function () {
            $('[name="' + $(this).attr('name') + '"]').trigger('changeIchek');
        })

        $this.on('changeIchek', function () {
            if($(this).prop('checked')) {
                $(this).addClass('_checked')
                $(this).closest('.b-radio').addClass('_checked');
            } else {
                $(this).removeClass('_checked');
                $(this).closest('.b-radio').removeClass('_checked');
            }
        });
    });

    $('input[data-mask="date"]').mask('99.99.9999', {placeholder: '_'});

    // Контентные
    $('img.image-full').livequery(function () {
        var $image = $(this);
        var $placeholder = $('<div></div>');

        $image.after($placeholder);

        function setPlaceholderSize () {
            setTimeout(function () {
                $placeholder.height($image.height());
            }, 200);
        }

        setPlaceholderSize();
        $(window).on('resize', setPlaceholderSize);
    });

    // Узнаеш ширину скролла
    (function getScrollBarWidth () {
        var inner = document.createElement('p');
        inner.style.width = '100%';
        inner.style.height = '200px';

        var outer = document.createElement('div');
        outer.style.position = 'absolute';
        outer.style.top = '0px';
        outer.style.left = '0px';
        outer.style.visibility = 'hidden';
        outer.style.width = '200px';
        outer.style.height = '150px';
        outer.style.overflow = 'hidden';
        outer.appendChild (inner);

        document.body.appendChild (outer);
        var w1 = inner.offsetWidth;
        outer.style.overflow = 'scroll';
        var w2 = inner.offsetWidth;
        if (w1 == w2)
            w2 = outer.clientWidth;
        document.body.removeChild (outer);


        $('head').append('<style type="text/css">.scroll-fixer{margin-right: -' + (w1 - w2) + 'px;overflow-y: scroll;}</style>');
        $('head').append('<style type="text/css">.scroll-fixer-pos{right: -' + (w1 - w2) + 'px;overflow-y: scroll;}</style>');
    })();

    // Фиксатор высоты

    $('.js-equalizer').livequery(function () {
        var $elem = $(this);

        function heightEqualizer($elem) {
            $elem.css('height', '');
            setTimeout(function () {
                requestAnimFrame(function () {
                    $elem.height($elem.height());
                });
            }, 100);
        }

        heightEqualizer($elem);

        $(window).on('resizeWidth', function () {
            heightEqualizer($elem);
        });

        $elem.on('resize.block', function (e) {
            heightEqualizer($elem);
            e.stopPropagation();
        })
    });

    // Предобработка ресайза, для отсечения лишних событий (в основном для мобил)
    (function () {
        var windowWidth = $(window).width();

        $(window).on('resize', function () {
            var newWindowWidth = $(window).width();
            if(newWindowWidth != windowWidth) {
                windowWidth = newWindowWidth;
                $(window).trigger('resizeWidth');
            }
        });
    })();
});

// Каталог
    $(window).on('load catalog', function(){
        $('.c-catalog').each(function () {
            var $context = $(this);
            var $rightAside = $('.c-catalog__right-aside', $context);
            var $mobileFilters = $('.c-catalog__mobile-filters', $context);
            var $filterBtn = $('.c-catalog__filter-btn', $context);
            var $filterHolder = $('.c-catalog__fix-filter');
            var $filterCatalog = $('.c-catalog__filter');
            var $mainCol = $('.c-catalog__main-col', $context);
            var $productsHolder = $('.c-catalog__products', $context);
            var $moreBtn = $('.c-catalog__more-link', $context);
            var $loadingBlock = $('<div class="c-catalog__loading"></div>');
            var $productLinksHolder = $('.c-catalog__product-links', $context);
            var $productLinksHolderFixed = $('.c-catalog__product-links-fixed');
            var $linksBlocks = $('.b-product-links');
            var $linksBlocksItems = $('.b-product-links__link');
            var $cstscroll = $('.cstscroll');

            var mobileHeaderHeight = 50;
            var rightAsideTop;
            var rightAsideBottom;

            function calcAside () {
                rightAsideTop = $rightAside.offset().top;
                rightAsideBottom = rightAsideTop + $rightAside.outerHeight();
            }

            function hideFiltersOnMobile() {
                $('html').removeClass('_mobile-filter-opened');
                $filterHolder.removeClass('c-catalog__fix-filter_opened');
                $filterBtn.removeClass('c-catalog__filter-btn_opened');
                $mainCol.removeClass('c-catalog__main-col_filter');
            }

            function showFiltersOnMobile() {
                $('html').addClass('_mobile-filter-opened');
                $filterHolder.addClass('c-catalog__fix-filter_opened');
                $filterBtn.addClass('c-catalog__filter-btn_opened');
                $mainCol.addClass('c-catalog__main-col_filter');
                $('.c-catalog').trigger('header.close-left');
            }

            window.toggleFiltersOnMobile = function () {
                calcAside ();
                if($('html').hasClass('_left-aside-opened')) return false;

                if($filterBtn.hasClass('c-catalog__filter-btn_opened')) {
                    hideFiltersOnMobile();
                } else {
                    $('body').animate({
                        scrollTop: rightAsideTop - mobileHeaderHeight
                    }, 200, function () {
                        showFiltersOnMobile();
                    });
                }
                return false;
            };

            function addMoreElements () {
                var $link = $(this);
                var target = $link.attr('href');
                var requestParams = $link.data('params') || {};
                var $newHolder = $loadingBlock.clone();

                var params = $.extend({
                    url: target,
                    dataType: 'html',
                    success: appendAjaxContent,
                    error: errorHandle
                }, requestParams);

                function appendAjaxContent (data, status) {
                    var $additionalContent = $(data);
                    $newHolder.append($additionalContent);
                    $newHolder.livequery();
                }

                function errorHandle() {

                }

                $newHolder.addClass('_loading');
                $productsHolder.append($newHolder);

                $.ajax(params);
                return false;
            }

            function stickLinks () {
                var linkOffset = $productLinksHolder.offset();
                var scrollPos = $('body').scrollTop();

                if(scrollPos >= (linkOffset.top + 20)) {
                    $productLinksHolderFixed.addClass('_active');
                } else {
                    $productLinksHolderFixed.removeClass('_active');
                }

                $linksBlocksItems.removeClass('_active');

                if(scrollPos >= linkOffset.top) {
                    $linksBlocks.each(function () {
                        var $links = $(this).find('.b-product-links__link');

                        if(scrollPos < 2450) {
                            $links.eq(0).addClass('_active');
                        } else if(scrollPos < 2950) {
                            $links.eq(1).addClass('_active');
                        } else {
                            $links.eq(2).addClass('_active');
                        }
                    });
                }
            }

            function slowScrollToFeedbacks () {
                var $target = $($(this).data('href'));
                $('html, body').animate({
                    scrollTop: ($target.offset().top - 40)
                }, 400)
            }

            $filterBtn.on('click', window.toggleFiltersOnMobile);

            $cstscroll.on('click', slowScrollToFeedbacks);

            // $(window).on('resize', hideFiltersOnMobile);
            $('.b-smart-filter__submit').on('click', hideFiltersOnMobile);

            $('.b-smart-filter__reset').on('click', hideFiltersOnMobile);


            $('body').on('click', function (e) {
                if($(e.target).is($filterHolder) || $(e.target).closest($filterHolder).length > 0 || $(e.target).closest($filterCatalog).length > 0) return true;
                hideFiltersOnMobile();
            });

            // $moreBtn.on('click', addMoreElements);

            $context.on('catalog.close-filters', function (e) {
                hideFiltersOnMobile();
                return false;
            });

            if($productLinksHolder.length != 0) {
                stickLinks ();
                $(window).on('scroll', stickLinks);
            }

        });
    });

$(function () {

    $(document).on("click",".addCompareAr",function(  ){
        $this = $(this);
        $list = $this.attr('data-list');

        preloader();
        $.ajax({
            url: '/ajax/new/addCompareAr.php',
            data: {id: $(this).attr('data-complist')},
            success: function(result) {
                refreshBottom($list);
                    preloader();
            }
        });

    });

    $(document).on("change",".checkUniq",function(  ){

        console.log();
        if($(this).prop('checked'))
            $('.cstmUniq').css("display","none");
        else
            $('.cstmUniq').removeAttr("style");

    });
})

// Чекаут
    $(function () {
        $('.c-checkout').each(function () {
            var $context = $(this);
            var $orderFooter = $('.c-checkout__order-footer', $context);

            function fixFooterHeight() {
                $orderFooter.css('height', '');

                setTimeout(function () {
                    $orderFooter.height($orderFooter.height());
                }, 300);
            }

            fixFooterHeight();
            $(window).on('resize', fixFooterHeight);
        });
    })

// Новости
$(function () {
    $('.c-news').each(function () {
        var $context = $(this);
        var $newsLists = $('.c-news__list-cols', $context);

        $newsLists.each(function () {
            var $list = $(this);
            var $cols = $('.c-news__list-col', $list);

            function equalizer() {
                var height = 0;

                if($cols.length == 0) return;

                $cols.css('height', '');

                setTimeout(function () {
                    $cols.each(function () {
                        if($(this).is(':visible')) {
                            height = Math.max($(this).outerHeight(), height);
                        }
                    })
                    $cols.css('height', height);
                }, 200);
            }

            equalizer();
            $(window).on('resize', equalizer);
        });
    });
});

	/**
	 * При изменении email в личном кабинете - заменяется и логин пользователя
	 */
	$(function() {
        $('#showMoreHistory').on('click', function(){
            $('.hdnList').each(function(){
                if(!$(this).hasClass('hdnListAct')) {
                    $(this).addClass('hdnListAct');
                    $('#showMoreHistory').addClass('opened').text('Скрыть');
                } else {
                    $(this).removeClass('hdnListAct');
                    $('#showMoreHistory').removeClass('opened').text('Показать еще');
                }
            });
        });

        $('#REGISTER-EMAIL').on('change keydown keyup focusout focus blur keypress click', function() {
            $('#REGISTER-LOGIN').val($(this).val());
        });
    });

$(function() {

    /**
     * В Сафари наблюдается проблема работы плагина validate.
     * Поэтому такой хук с обманкой
     */
    $('.js-registration-modal input[type="submit"]').on('click', function(){
        var is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        if(is_safari)
        {
            $('#some-test-element').on('click', function() {
                $('.search').find('input').focus(); // works well on my iPhone - Keyboard slides in
            });


            var flag = true;
            var confirm = $('.js-registration-modal').find('input[type="checkbox"]').prop('checked');

            if($('#REGISTER-EMAIL').hasClass('error')) {
                flag = false;
            }

            if($('input[name="REGISTER[PASSWORD]"]').hasClass('error')) {
                flag = false;
            }

            if($('input[name="REGISTER[CONFIRM_PASSWORD]"]').hasClass('error')) {
                flag = false;
            }

            if(confirm && flag) {
                $('.b-checkbox__check-holder input[type="checkbox"]').click();
                $('.b-checkbox__check-holder input[type="checkbox"]').prop('checked', 'checked');
                $('.b-checkbox.iblock.js-label').addClass('_checked');
            }
        }
    });

    /**
     * После изменения параметров в ЛК - разрушается DOM, поэтому делегируем
     * смену чекбоксов.
     */
    $(document).on('change', '.mainProf.b-checkbox__input.icheck', function(){
        if($(this).prop('checked')) {
            $(this).addClass('_checked');
            $(this).parent().parent().addClass('_checked');
            $(this).val('Y');
        } else {
            $(this).removeClass('_checked');
            $(this).parent().parent().removeClass('_checked');
            $(this).val('N');
        }
    });
});
