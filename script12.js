$(function() {
  var flame = $('#flame');
  var txt = $('h1');

  flame.on({
    click: function() {
      flame.removeClass('burn').addClass('puff');
      $('.smoke').each(function() {
        $(this).addClass('puff-bubble');
      });
      $('#glow').remove();
      txt.html(" <b>Feliz <b> <b>Cumpleaños</b> niña...").delay(2750).fadeOut(300);
      $('#candle').animate({
        //'opacity': '.5'
      }, 100);

      // Crear el contexto de audio y reproducir el sonido dentro del evento de clic
      var ctx = new AudioContext();
      createSound(ctx, 20, 5000, 1, "sawtooth", 1); // Ajusta los parámetros según tus necesidades
    }
  });

  // Manejador de eventos para tocar la pantalla en cualquier lugar
  document.addEventListener("touchstart", function() {
    // Crear el contexto de audio y reproducir el sonido dentro del evento de toque
    var ctx = new AudioContext();
    createSound(ctx, 20, 5000, 1, "sawtooth", 1); // Ajusta los parámetros según tus necesidades
  });

  // Función para crear el sonido
  function createSound(ctx, size, fr, delay, type, vol) {
    for (let i = 0; i < size; i++) {
      let osc = ctx.createOscillator(),
          gain = ctx.createGain();

      setTimeout(function() {
        osc.frequency.value = fr * i;
        gain.gain.value = vol;
        osc.type = type;
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        setTimeout(function() {
          let gVal = gain.gain.value;
          let smooth;

          function reduceGain() {
            gVal -= 0.02;
            if (gVal > 0) {
              smooth = requestAnimationFrame(reduceGain);
            } else {
              osc.stop();
              cancelAnimationFrame(smooth);
            }

            gain.gain.value = gVal / 7;
          }
          reduceGain();

        }, delay);

      }, i * delay);
    }
  }
});
