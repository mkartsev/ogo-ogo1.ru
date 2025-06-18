$(document).ready(function () {
  $("#series-grid").each(function () {
    let max = 11,
      duration = 250,
      item = '<li class="cell"><a href="#" class="lego-card"><img src="img/series/all-small.jpg" alt="Все серии"></a></li>';

    if ($(this).find("li").length > max) {
      $(this)
        .find("li:gt(" + (max - 2) + ")")
        .hide()
        .end()
        .append(
          $(item).on("click", function (e) {
            e.preventDefault();
            $(this).siblings(":hidden").slideDown("fast").end().remove();
          })
        );
    }
  });

  $("#interest-grid").each(function () {
    let max = 4,
      duration = 250,
      item = '<li class="cell maxlist-more"><a href="#" class="lego-card"><img src="img/interest/all.jpg" alt="Все по интересам"></a></li>';

    if ($(this).find("li").length > max) {
      $(this)
        .find("li:gt(" + (max - 2) + ")")
        .hide()
        .end()
        .append(
          $(item).on("click", function (e) {
            e.preventDefault();
            $(this).siblings(":hidden").slideDown("fast").end().remove();
          })
        );
    }
  });
});
