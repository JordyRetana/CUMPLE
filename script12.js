$(document).ready(function() {
  var flame = $('#flame');
  var isFlameOn = false;

  $('#igniteButton').click(function() {
    if (!isFlameOn) {
      flame.addClass('animate-flame');
      isFlameOn = true;
      $(this).text('Apagar Candela');
    } else {
      flame.removeClass('animate-flame');
      isFlameOn = false;
      $(this).text('Encender Candela');
    }
  });
});
