document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;


  /* =========================================================
     1. HERO OSCILLOSCOPE TRACE — ANIMATED WAVEFORM
     ========================================================= */

  const trace = document.getElementById('scopeTrace');

  if (trace) {

    const width = 560;
    const height = 200;
    const mid = height / 2;

    let t = 0;

    function buildPath(offset) {

      let d = `M 0 ${mid}`;

      const points = 70;

      for (let i = 0; i <= points; i++) {

        const x = (i / points) * width;

        const y =
          mid +
          Math.sin((i * 0.35) + offset) * 26 +
          Math.sin((i * 0.9) + offset * 1.7) * 10 +
          Math.sin((i * 0.05) + offset * 0.4) * 14;

        d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
      }

      return d;
    }


    if (reduceMotion) {

      trace.setAttribute(
        'd',
        buildPath(0)
      );

    } else {

      function animateWaveform() {

        t += 0.035;

        trace.setAttribute(
          'd',
          buildPath(t)
        );

        requestAnimationFrame(animateWaveform);
      }

      animateWaveform();
    }
  }



  /* =========================================================
     2. DIAGNOSTIC TABS
     ========================================================= */

  const tabs = document.querySelectorAll('.diag-tab');
  const panels = document.querySelectorAll('.diag-panel');


  function activateTab(tab) {

    tabs.forEach((item) => {

      item.classList.remove('is-active');

      item.setAttribute(
        'aria-selected',
        'false'
      );

    });


    panels.forEach((panel) => {

      panel.classList.remove('is-active');

      panel.hidden = true;

    });


    tab.classList.add('is-active');

    tab.setAttribute(
      'aria-selected',
      'true'
    );


    const target = document.getElementById(
      'panel-' + tab.dataset.target
    );


    if (target) {

      target.hidden = false;

      target.classList.add(
        'is-active'
      );

    }
  }



  tabs.forEach((tab) => {


    /* Mouse / touch */

    tab.addEventListener(
      'click',
      () => {
        activateTab(tab);
      }
    );


    /* Keyboard navigation */

    tab.addEventListener(
      'keydown',
      (e) => {

        const list = Array.from(tabs);

        const index = list.indexOf(tab);


        if (
          e.key === 'ArrowRight' ||
          e.key === 'ArrowDown'
        ) {

          e.preventDefault();

          list[
            (index + 1) % list.length
          ].focus();

        }


        if (
          e.key === 'ArrowLeft' ||
          e.key === 'ArrowUp'
        ) {

          e.preventDefault();

          list[
            (index - 1 + list.length) %
            list.length
          ].focus();

        }


        if (e.key === 'Home') {

          e.preventDefault();

          list[0].focus();

        }


        if (e.key === 'End') {

          e.preventDefault();

          list[list.length - 1].focus();

        }


        if (
          e.key === 'Enter' ||
          e.key === ' '
        ) {

          e.preventDefault();

          activateTab(tab);

        }

      }
    );

  });



  /* =========================================================
     3. ASSET HORIZONTAL SCROLL
     ========================================================= */

  const track =
    document.getElementById('assetsTrack');

  const progress =
    document.getElementById('assetsProgress');


  if (track && progress) {


    function updateProgress() {

      const max =
        track.scrollWidth -
        track.clientWidth;


      const ratio =
        max > 0
          ? track.scrollLeft / max
          : 0;


      const barWidth =
        Math.max(
          15,
          (track.clientWidth /
            track.scrollWidth) * 100
        );


      progress.style.width =
        barWidth + '%';


      progress.style.transform =
        `translateX(${
          ratio *
          (100 / barWidth - 1) *
          100
        }%)`;

    }


    track.addEventListener(
      'scroll',
      updateProgress,
      {
        passive: true
      }
    );


    window.addEventListener(
      'resize',
      updateProgress
    );


    updateProgress();

  }



  /* =========================================================
     4. MOBILE NAVIGATION
     ========================================================= */

  const navToggle =
    document.getElementById('navToggle');

  const mainNav =
    document.querySelector('.main-nav');

  const navCta =
    document.querySelector('.nav-cta');


  function closeMobileNav() {

    if (!navToggle || !mainNav) {
      return;
    }


    navToggle.setAttribute(
      'aria-expanded',
      'false'
    );


    mainNav.style.display = '';

    mainNav.style.flexDirection = '';

    mainNav.style.position = '';

    mainNav.style.top = '';

    mainNav.style.left = '';

    mainNav.style.right = '';

    mainNav.style.background = '';

    mainNav.style.padding = '';

    mainNav.style.borderBottom = '';

    mainNav.style.boxShadow = '';


    const list =
      mainNav.querySelector('ul');


    if (list) {

      list.style.flexDirection = '';

      list.style.gap = '';

    }


    if (navCta) {

      navCta.style.display = '';

      navCta.style.flexDirection = '';

      navCta.style.padding = '';

      navCta.style.marginTop = '';

    }

  }



  if (navToggle && mainNav) {


    navToggle.addEventListener(
      'click',
      () => {

        const expanded =
          navToggle.getAttribute(
            'aria-expanded'
          ) === 'true';


        if (expanded) {

          closeMobileNav();

          return;

        }


        navToggle.setAttribute(
          'aria-expanded',
          'true'
        );


        mainNav.style.display =
          'flex';

        mainNav.style.flexDirection =
          'column';

        mainNav.style.position =
          'absolute';

        mainNav.style.top =
          '100%';

        mainNav.style.left =
          '0';

        mainNav.style.right =
          '0';

        mainNav.style.background =
          '#ffffff';

        mainNav.style.padding =
          '1.5rem 24px';

        mainNav.style.borderBottom =
          '1px solid #dce4eb';

        mainNav.style.boxShadow =
          '0 15px 30px rgba(23,33,43,.08)';


        const list =
          mainNav.querySelector('ul');


        if (list) {

          list.style.flexDirection =
            'column';

          list.style.gap =
            '1rem';

        }


        if (navCta) {

          navCta.style.display =
            'flex';

          navCta.style.marginTop =
            '1rem';

        }

      }
    );


    /* Close menu when a link is clicked */

    mainNav
      .querySelectorAll('a')
      .forEach((link) => {

        link.addEventListener(
          'click',
          () => {

            if (
              window.innerWidth <= 940
            ) {

              closeMobileNav();

            }

          }
        );

      });


    /* Close menu when resizing to desktop */

    window.addEventListener(
      'resize',
      () => {

        if (
          window.innerWidth > 940
        ) {

          closeMobileNav();

        }

      }
    );

  }



  /* =========================================================
     5. HEADER SHADOW WHEN SCROLLING
     ========================================================= */

  const header =
    document.getElementById(
      'siteHeader'
    );


  if (header) {


    function updateHeader() {

      if (window.scrollY > 10) {

        header.style.boxShadow =
          '0 8px 30px rgba(23,33,43,.08)';

      } else {

        header.style.boxShadow =
          'none';

      }

    }


    window.addEventListener(
      'scroll',
      updateHeader,
      {
        passive: true
      }
    );


    updateHeader();

  }



  /* =========================================================
     6. SECTION REVEAL ANIMATIONS
     ========================================================= */

  const sections =
    document.querySelectorAll(
      'main > section, .hero, .site-footer'
    );


  const cards =
    document.querySelectorAll(
      '.pillar-card, ' +
      '.industry-card, ' +
      '.resource-card, ' +
      '.asset-card, ' +
      '.why-item, ' +
      '.certs-badges li'
    );


  /*
     If the browser doesn't support
     IntersectionObserver, show everything.
  */

  if (
    reduceMotion ||
    !('IntersectionObserver' in window)
  ) {

    sections.forEach(
      (section) => {

        section.classList.add(
          'section-reveal',
          'is-visible'
        );

      }
    );


    cards.forEach(
      (card) => {

        card.classList.add(
          'stagger-item',
          'is-visible'
        );

      }
    );

  } else {


    /*
       Add reveal class to sections.
    */

    sections.forEach(
      (section) => {

        if (
          !section.classList.contains(
            'hero'
          ) &&
          !section.classList.contains(
            'site-footer'
          )
        ) {

          section.classList.add(
            'section-reveal'
          );

        }

      }
    );


    /*
       Intersection Observer
    */

    const sectionObserver =
      new IntersectionObserver(

        (entries, observer) => {

          entries.forEach(
            (entry) => {

              if (
                !entry.isIntersecting
              ) {
                return;
              }


              /*
                 Show the section
              */

              entry.target.classList.add(
                'is-visible'
              );


              /*
                 Find cards inside
                 the current section
              */

              const childCards =
                entry.target.querySelectorAll(
                  '.pillar-card, ' +
                  '.industry-card, ' +
                  '.resource-card, ' +
                  '.asset-card, ' +
                  '.why-item, ' +
                  '.certs-badges li'
                );


              /*
                 Animate cards one
                 after another.
              */

              childCards.forEach(
                (card, index) => {

                  card.classList.add(
                    'stagger-item'
                  );


                  setTimeout(
                    () => {

                      card.classList.add(
                        'is-visible'
                      );

                    },
                    Math.min(
                      index * 100,
                      500
                    )
                  );

                }
              );


              /*
                 Stop observing once
                 animation has happened.
              */

              observer.unobserve(
                entry.target
              );

            }
          );

        },
        {
          threshold:0.12,

          rootMargin:
            '0px 0px -50px 0px'
        }

      );


    /*
       Observe all sections.
    */

    sections.forEach(
      (section) => {

        if (
          !section.classList.contains(
            'hero'
          ) &&
          !section.classList.contains(
            'site-footer'
          )
        ) {

          sectionObserver.observe(
            section
          );

        }

      }
    );


    /*
       Cards outside normal sections
       are also animated.
    */

    cards.forEach(
      (card) => {

        if (
          !card.closest('section')
        ) {

          card.classList.add(
            'stagger-item'
          );

          sectionObserver.observe(
            card
          );

        }

      }
    );

  }



  /* =========================================================
     7. HERO ENTRANCE ANIMATION
     ========================================================= */

  if (!reduceMotion) {


    const heroParts =
      document.querySelectorAll(
        '.hero .kicker, ' +
        '.hero h1, ' +
        '.hero-lead, ' +
        '.hero-actions, ' +
        '.hero-stats, ' +
        '.scope-panel'
      );


    heroParts.forEach(
      (item, index) => {


        item.animate(

          [
            {
              opacity:0,

              transform:
                'translateY(22px)'
            },

            {
              opacity:1,

              transform:
                'translateY(0)'
            }
          ],

          {
            duration:650,

            delay:
              100 + index * 100,

            easing:
              'cubic-bezier(.22,1,.36,1)',

            fill:'both'
          }

        );

      }
    );

  }



  /* =========================================================
     8. FLOATING SCOPE PANEL
     ========================================================= */

  const scopePanel =
    document.querySelector(
      '.scope-panel'
    );


  if (
    scopePanel &&
    !reduceMotion
  ) {


    scopePanel.animate(

      [
        {
          transform:
            'translateY(0)'
        },

        {
          transform:
            'translateY(-6px)'
        },

        {
          transform:
            'translateY(0)'
        }
      ],

      {
        duration:5000,

        iterations:
          Infinity,

        easing:
          'ease-in-out'
      }

    );

  }



  /* =========================================================
     9. SMOOTH ANCHOR SCROLLING
     ========================================================= */

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach(
      (link) => {


        link.addEventListener(
          'click',
          (e) => {

            const id =
              link.getAttribute(
                'href'
              );


            if (
              !id ||
              id === '#'
            ) {
              return;
            }


            const target =
              document.querySelector(
                id
              );


            if (!target) {
              return;
            }


            e.preventDefault();


            target.scrollIntoView({

              behavior:
                reduceMotion
                  ? 'auto'
                  : 'smooth',

              block:'start'

            });

          }
        );

      }
    );

});
