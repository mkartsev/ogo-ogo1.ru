$(document).ready(function () {
    $('.js-filter-value-autocomplete').on('keyup', function (event) {
        event.preventDefault();
        let filterUrlId = $('select[name=UF_FILTER_URL]').val();
        let value = this.value;
        if (!filterUrlId || value.length < 1) {
            return;
        }
        $.ajax({
            url: '/ajax/new/admin/searchSphinxValue.php',
            data: {
                'q': value,
                'filterUrlId': filterUrlId
            },
            success: function (data) {
                result = '';
                data.forEach(function(el) {
                    result += `<div data-id="${el.id}">${el.value}</div>`
                })
                $('.js-filter-value-autocomplete-result').html(result);
            }
        });
    });
    $('body').on('click', '.js-filter-value-autocomplete-result div', function (event) {
        event.preventDefault();
        let id = this.dataset.id;
        if (!id) {
            return;
        }
        $('.js-filter-value-id').val(id);
        $('.js-filter-value-autocomplete-result').html('');
        $('.js-filter-value-autocomplete').val('');
    });
});