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
        //markers: true
    })

}

function initHeaderTilt() {
    document.querySelector('header').addEventListener('mousemove', moveImages);
}

function moveImages(e) {
    const { offsetX, offsetY, target } = e;
    const { clientWidth, clientHeight } = target;

    // console.log(offsetX, offsetY, clientHeight, clientWidth);

    // get 0 0 in the center
    const xPos = (offsetX / clientWidth) - 0.5;
    const yPos = (offsetY / clientHeight) - 0.5;

    const leftImages = gsap.utils.toArray('.hg__left .hg__image');
    const rightImages = gsap.utils.toArray('.hg__right .hg__image');

    const modifier = (index) => index * 1.2 * 0.5;

    // move left three images
    leftImages.forEach((image, index) => {
        gsap.to(image, {
            duration: 1.2,
            x: xPos * 20 * modifier(index),
            y: yPos * 30 * modifier(index),
            rotationY: xPos * 40,
            rotationX: yPos * 10,
            ease: 'Power3.out'
        })
    });

    // move right images
    rightImages.forEach((image, index) => {
        gsap.to(image, {
            duration: 1.2,
            x: xPos * 20 * modifier(index),
            y: -yPos * 30 * modifier(index),
            rotationX: yPos * 40,
            rotationY: xPos * 10,
            ease: 'Power3.out'
        })
    });

    // decor_circle
    gsap.to('.decor__circle', {
        duration: 1.7,
        x: 100 * xPos,
        y: 120 * yPos,
        ease: 'Power3.out'
    })
}

function initHoverReveal() {
    const sections = document.querySelectorAll('.rg__column');

    sections.forEach(section => {
        // get components for animation
        section.imageBlock = section.querySelector('.rg__image');
        section.mask = section.querySelector('.rg__image--mask');

        // reset the image position
        gsap.set(section.imageBlock, { yPercent: -101 });
        gsap.set(section.mask, { yPercent: 100 })

        // add eventlisteners to each sections
        section.addEventListener('mouseenter', createHoverReveal);
        section.addEventListener('mouseleave', createHoverReveal)
    });
}

function createHoverReveal(e) {
    // console.log(e.type)

    const { imageBlock, mask } = e.target;

    let tl = gsap.timeline({
        defaults: {
            duration: 0.7,
            ease: 'Power4.out'
        }
    })

    if (e.type === 'mouseenter') {
        tl.to([imageBlock, mask], { yPercent: 0 })
    } else if (e.type === 'mouseleave') {
        tl.to(mask, { yPercent: 0 })
            .to(imageBlock, { yPercent: -101 }, 0)
    }

    return tl;
}

function init() {
    initNavigation();
    initHeaderTilt();
    initHoverReveal();
}

window.addEventListener('load', function () {
    init();
});
