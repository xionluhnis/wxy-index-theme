/**
 * Gallery code that preloads thumbnails and set the zigfy gallery loading
 *
 * @author Alexandre Kaspar <akaspar@csail.mit.edu>
 */

$('img').preload('init');

$(function () {
    $('#content .medias .image img').preload();
    $('#content .medias .image').css('opacity', 0.7);
    $('#gallery').zigfy({
        onLoad: function($img){
            var idx = $img.data('index');
            $('#content .medias .image:nth-child(' + (idx+1) + ')').css('opacity', 1.0);
        }
    });

  $('#content .medias .image').click(function () {
    var index = $(this).data('index') || $(this).parent().find('.image').index($(this));
    $('#gallery').zigfy('select', index).fadeIn();
  });
  $('#gallery .nav.full').click(function () {
    var layout = $(this).hasClass('full') ? 'maximize' : 'full';
    $('#gallery').zigfy('switchLayout', layout);
    $(this).removeClass('full', 'maximize').addClass(layout);
  });
  $('#gallery').click(function (event) {
    if (!$(event.target).hasClass('zigfy')) {
      return false;
    }
    $('#gallery').fadeOut();
  });
  $(window).keypress(function (event) {
    var $gal = $('#gallery');
    if ($gal.is(':visible')) {
      switch (event.keyCode || event.which) {
        case 102:
          // f
        case 70:
          // F
          var layout = $gal.hasClass('full') ? 'maximize' : 'full';
          $gal.zigfy('switchLayout', layout);
          $gal.removeClass('full', 'maximize').addClass(layout);
          break;
        case 39:
          // right
          $gal.zigfy('next');
          break;
        case 37:
          // left
          $gal.zigfy('prev');
          break;
      }
    }
  });
});
