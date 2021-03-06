$(document).ready(function () {
  $('select').material_select();

  $('.dropdown-button').dropdown({
    inDuration: 300,
    outDuration: 225,
    constrainWidth: false, // Does not change width of dropdown to that of the activator
    hover: true, // Activate on hover
    gutter: 0, // Spacing from edge
    belowOrigin: true, // Displays dropdown below the button
    alignment: 'left', // Displays dropdown with edge aligned to the left of button
    stopPropagation: false // Stops event propagation
  });


  $('.carousel.carousel-slider').carousel({
    fullWidth: true
  });

  $('.datepicker').pickadate({
    selectMonths: true,
    selectYears: 10,
    format: 'dd/mm/yyyy'
  });

  $(".auto .carousel").jCarouselLite({
      auto: 2000,
      speed: 2000,
      vertical: true
    });

});