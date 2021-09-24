gsap.registerPlugin(ScrollTrigger);

function initNavigation() {
    const mainNavLinks = gsap.utils.toArray('.main-nav a');
    const mainNavLinksRev = gsap.utils.toArray('.main-nav a').reverse();
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

    function navAnimation(direction) {
        // console.log(direction)
        const scrollingDown = direction === 1;
        const links = scrollingDown ? mainNavLinks : mainNavLinksRev;

        return gsap.to(links, {
            duration: 0.3,
            stagger: 0.05,
            autoAlpha: () => scrollingDown ? 0 : 1,
            y: () => scrollingDown ? 20 : 0,
            ease: 'Power4.out'
        })
    }

    // Scrolltrigger
    ScrollTrigger.create({
        start: 100,
        end: 'bottom bottom-=20',
        toggleClass: {
            targets: 'body',
            className: 'has-scrolled'
        },
        onEnter: ({ direction }) => { navAnimation(direction) },
        onLeaveBack: ({ direction }) => { navAnimation(direction) },
        markers: true
    })

}

function init() {
    initNavigation()
}

window.addEventListener('load', function () {
    init();
});
