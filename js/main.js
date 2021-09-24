gsap.registerPlugin(ScrollTrigger);

function initNavigation() {
    const mainNavLinks = gsap.utils.toArray('.main-nav a');
    mainNavLinks.forEach(link => {
        link.addEventListener('mouseleave', e => {
            // add class
            link.classList.add('animate-out')
            setTimeout(() => {
                // remove class
                link.classList.remove('animate-out')
            }, 300);
        })
    });

    // Scrolltrigger
    ScrollTrigger.create({
        start: 100,
        toggleClass: {
            targets: 'body',
            className: 'has-scrolled'
        },
        markers: true
    })

}

function init() {
    initNavigation()
}

window.addEventListener('load', function () {
    init();
});
