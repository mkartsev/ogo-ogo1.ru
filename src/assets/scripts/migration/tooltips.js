const tooltips = (() => {
    let tooltips = document.querySelectorAll('.js-tooltip')
    let addProductBtns = document.querySelectorAll('.js-add-product_to-list')

    function setLike(el) {
        if (typeof(el._tippy) == 'undefined') return;
        switch (el.getAttribute('data-action')) {
            case 'add':
                el.setAttribute('data-tooltip-content', 'В избранное')
                el._tippy.setContent('В избранное')
                break

            case 'del':
                el.setAttribute('data-tooltip-content', "Удалить из избранного")
                el._tippy.setContent('Удалить из избранного')
                break

            default:
                break
        }
    }

    function setCompare(el) {
        if (typeof(el._tippy) == 'undefined') return;
        switch (el.getAttribute('data-action')) {
            case 'ADD_TO_COMPARE_LIST':
                el.setAttribute('data-tooltip-content', 'В сравнение')
                el._tippy.setContent('В сравнение')
                break

            case 'DELETE_FROM_COMPARE_LIST':
                el.setAttribute('data-tooltip-content', 'Удалить из сравнения')
                el._tippy.setContent('Удалить из сравнения')
                break

            default:
                break
        }
    }

    function handleLike(el) {
        el._tippy.hide()
        setTimeout(function () {
            setLike(el)
            el._tippy.show()
        }, el._tippy.props.delay);
    }

    function handleCompare(el) {
        el._tippy.hide();
        setTimeout(function () {
            setCompare(el);
            el._tippy.show();
        }, el._tippy.props.delay);
    }

    function bindHandlers() {
        window.addEventListener('click', (e) => {
            const clickedElement = e.target

            if (clickedElement.closest('.js-add-product_to-list')) {
                if (!clickedElement.classList.contains('js-tooltip')) {
                    return
                }
                handleLike(clickedElement)
                handleCompare(clickedElement)

            }
            if (clickedElement.closest('.tippy-close')) {
                e.preventDefault()
                tippy.hideAll()
            }
        })
    }

    // Эта функция заменяет initAddProductBtns из main.js
    // Если надо переиспользовать, то tooltipsTest возвращает эту функцию - tooltipsTest.initAddProduct()
    function initAddProduct() {
        if (addProductBtns.length > 0) {
            // Сначала фильтруем кнопки по спискам, потом для каждой проверяем,
            // есть ли её data-id в глобальных переменных CompareIDList и FavoriteIDList и устанавливаем тултип
            Array.from(addProductBtns).filter(el => el.getAttribute('data-list') === 'comparison').forEach(el => {
                if (CompareIDList.some(element => element == el.getAttribute('data-id'))) {
                    el.setAttribute('data-action', 'DELETE_FROM_COMPARE_LIST')
                    setCompare(el);
                }
            })

            Array.from(addProductBtns).filter(el => el.getAttribute('data-list') === 'favorites').forEach(el => {
                if (FavoriteIDList.some(element => element == el.getAttribute('data-id'))) {
                    el.setAttribute('data-action', 'del')
                    setLike(el);
                }
            })
        }
    }

    function init() {
        if (tooltips.length > 0) {
            tooltips.forEach((el, key) => {
                if (typeof(el._tippy) != 'undefined') return;
                tippy(el, {
                    allowHTML: true,
                    theme: 'ogo',
                    delay: 150,
                    hideOnClick: true,
                    maxWidth: 250,
                    offset: [0, 16],
                    trigger: 'mouseenter',
                    interactive: false,
                    interactiveBorder: 30,
                    zIndex: 11000,
                    content(reference) {
                        const title = reference.dataset.tooltipTitle
                        const content = reference.dataset.tooltipContent
                        const htmlSelector = reference.dataset.tooltipHtml
                        const close = reference.dataset.tippyClose

                        if (htmlSelector) {
                            const html = document.querySelector(htmlSelector);
                            if (html) {
                                return html.innerHTML
                            }
                        }

                        return (close ? '<div class="tippy-close"></div>' : '') +
                            (title ? '<div class="tippy-title">' + title + '</div>' : '') +
                            (content ? content : '')
                    },
                    appendTo: () => document.body
                })
            })
        }
        initAddProduct()
        bindHandlers()
    }

    function reinit() {
        tooltips = document.querySelectorAll('.js-tooltip')
        addProductBtns = document.querySelectorAll('.js-add-product_to-list')
        init()
    }

    return {
        init: init,
        reinit: reinit,
        setLike: setLike,
        setCompare: setCompare,
        initAddProduct: initAddProduct
    }

})()


// initAddProductBtns
function initAddProductBtns() {
    var $btns = $('.js-add-product_to-list.js-tooltip');

    $.each($btns.filter('[data-list="comparison"]'), function(index, value){
        $btn = $(this);

        if (CompareIDList.some(element => element == $btn.data("id"))) {
            $btn.attr('data-action', 'DELETE_FROM_COMPARE_LIST');
            tooltips.setCompare($btn[0]);
        }
    });

    $.each($btns.filter('[data-list="favorites"]'), function(index, value){
        $btn = $(this);

        if (FavoriteIDList.some(element => element == $btn.data("id"))) {
            $btn.attr('data-action', 'del');
            tooltips.setLike($btn[0]);
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    tooltips.init()
    initAddProductBtns();
    $(document).on('catalog-plates.resize', initAddProductBtns);
})