// Add the reveal class to the text element after 1 second
setTimeout(() => {
    document.querySelector('.text').classList.add('reveal');
}, 1000);

// window.onload = function () {
//     document.body.style.opacity = "1";
// }


$(window).scroll(function() {
    if ($(window).scrollTop() > 400) {
        $('.project').css('visibility', 'visible');
        $('img').fadeIn(2000);
    } else {
        $('.project').css('visibility', 'hidden');
        $('img').fadeOut(500)
    }
});

// $(document).ready(function() {
//     $('img').fadeIn(2000); // 2 seconds animation duration
// });