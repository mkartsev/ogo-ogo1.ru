// Gaming
$(function () {

  function smoothScroll(e) {
	e.preventDefault();
	var $target = $($(this).attr('href'));
	$('html, body').animate({
	  scrollTop: ($target.offset().top - 40)
	}, 400)
  }
  $(window).load(function() {
	$("#twentytwenty").twentytwenty({
	  before_label: '',
	  after_label: '',
	  //no_overlay: true
	});
  });
  $(document).on('click', '.smoothscroll', smoothScroll);
})
