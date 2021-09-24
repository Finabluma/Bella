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
        section.image = section.querySelector('.rg__image img');
        section.mask = section.querySelector('.rg__image--mask');
        section.text = section.querySelector('.rg__text');
        // section.textHeight = section.querySelector('.rg__text--copy').clientHeight;
        section.textCopy = section.querySelector('.rg__text--copy');
        section.textMask = section.querySelector('.rg__text--mask');
        section.textP = section.querySelector('.rg__text--copy p');

        // reset the image position
        gsap.set([section.imageBlock, section.textMask], { yPercent: -101 });
        gsap.set([section.mask, section.textP], { yPercent: 100 })
        gsap.set(section.image, { scale: 1.2 })

        // add eventlisteners to each sections
        section.addEventListener('mouseenter', createHoverReveal);
        section.addEventListener('mouseleave', createHoverReveal)
    });
}

function getTextHeight(textCopy) {
    return textCopy.clientHeight
}

function createHoverReveal(e) {
    // console.log(e.type)
    const { imageBlock, mask, text, textCopy, textMask, textP, image } = e.target;

    let tl = gsap.timeline({
        defaults: {
            duration: 0.7,
            ease: 'Power4.out'
        }
    })

    if (e.type === 'mouseenter') {
        tl.to([imageBlock, mask, textMask, textP], {
            yPercent: 0
        })
            .to(text, {
                y: () => -getTextHeight(textCopy) / 2
            }, 0)
            .to(image, { duration: 1.1, scale: 1 }, 0)

    } else if (e.type === 'mouseleave') {
        tl.to([mask, textP], { yPercent: 100 })
            .to([imageBlock, textMask], { yPercent: -101 }, 0)
            .to(text, { y: 0 }, 0)
            .to(image, { duration: 1.1, scale: 1.2 }, 0)
    }

    return tl;
}

function init() {
    initNavigation();
    initHeaderTilt();

    // Create a media condition that targets viewports at least 768px wide
    const mediaQuery = window.matchMedia('(min-width: 768px)')

    function handleSizeChange(e) {
        if (e.matches) {
            // Then log the following message to the console
            console.log('Media Query Matched!')
            initHoverReveal();
        } else {
            console.log('we\'re\ on mobile');
        }
    }

    // Register event listener
    mediaQuery.addListener(handleSizeChange);

    // Initial check
    handleSizeChange(mediaQuery); 

    
}

window.addEventListener('load', function () {
    init();
});
