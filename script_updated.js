document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       SETTINGS
    ========================================================= */

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    /* =========================================================
       1. HERO WAVEFORM / GRAPH
    ========================================================= */

    const trace = document.getElementById("scopeTrace");

    if (trace) {

        const width = 560;
        const height = 200;
        const centerY = 100;

        let time = 0;

        function createWave(offset) {

            let path = "M 0 " + centerY;

            const points = 120;

            for (let i = 0; i <= points; i++) {

                const x = (i / points) * width;

                /*
                 * Main waveform
                 */
                const wave1 =
                    Math.sin(i * 0.22 + offset) * 25;

                /*
                 * Smaller variation
                 */
                const wave2 =
                    Math.sin(i * 0.62 + offset * 1.4) * 9;

                /*
                 * Slow movement
                 */
                const wave3 =
                    Math.sin(i * 0.045 + offset * 0.5) * 13;

                const y =
                    centerY +
                    wave1 +
                    wave2 +
                    wave3;

                path +=
                    " L " +
                    x.toFixed(2) +
                    " " +
                    y.toFixed(2);
            }

            return path;
        }


        /*
         * Draw immediately.
         * This is important because even if animation
         * is disabled, the graph will still be visible.
         */

        trace.setAttribute(
            "d",
            createWave(0)
        );


        /*
         * Animate waveform
         */

        if (!reduceMotion) {

            function animateWave() {

                time += 0.035;

                trace.setAttribute(
                    "d",
                    createWave(time)
                );

                requestAnimationFrame(
                    animateWave
                );
            }

            animateWave();
        }
    }



    /* =========================================================
       2. MOBILE HAMBURGER MENU
    ========================================================= */

    const navToggle =
        document.getElementById("navToggle");

    const mainNav =
        document.querySelector(".main-nav");

    const navCta =
        document.querySelector(".nav-cta");


    if (navToggle && mainNav) {

        navToggle.addEventListener(
            "click",
            function () {

                const isOpen =
                    navToggle.classList.contains(
                        "is-open"
                    );


                if (isOpen) {

                    closeMobileMenu();

                } else {

                    openMobileMenu();

                }

            }
        );


        function openMobileMenu() {

            navToggle.classList.add(
                "is-open"
            );

            mainNav.classList.add(
                "mobile-open"
            );


            if (navCta) {

                navCta.classList.add(
                    "mobile-open"
                );

            }


            navToggle.setAttribute(
                "aria-expanded",
                "true"
            );

            navToggle.setAttribute(
                "aria-label",
                "Close menu"
            );


            document.body.classList.add(
                "menu-open"
            );
        }


        function closeMobileMenu() {

            navToggle.classList.remove(
                "is-open"
            );

            mainNav.classList.remove(
                "mobile-open"
            );


            if (navCta) {

                navCta.classList.remove(
                    "mobile-open"
                );

            }


            navToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            navToggle.setAttribute(
                "aria-label",
                "Open menu"
            );


            document.body.classList.remove(
                "menu-open"
            );
        }


        /*
         * Close menu after clicking a link
         */

        mainNav
            .querySelectorAll("a")
            .forEach(function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        if (
                            window.innerWidth <= 940
                        ) {

                            closeMobileMenu();

                        }

                    }
                );

            });


        /*
         * Close menu when switching back
         * to desktop.
         */

        window.addEventListener(
            "resize",
            function () {

                if (
                    window.innerWidth > 940
                ) {

                    closeMobileMenu();

                }

            }
        );
    }



    /* =========================================================
       3. HEADER SCROLL EFFECT
    ========================================================= */

    const header =
        document.getElementById(
            "siteHeader"
        );


    if (header) {

        function updateHeader() {

            if (window.scrollY > 20) {

                header.classList.add(
                    "scrolled"
                );

            } else {

                header.classList.remove(
                    "scrolled"
                );

            }

        }


        window.addEventListener(
            "scroll",
            updateHeader,
            {
                passive: true
            }
        );


        updateHeader();
    }



    /* =========================================================
       4. SECTION SCROLL ANIMATIONS
    ========================================================= */

    const animatedSections =
        document.querySelectorAll(
            ".assets, " +
            ".pillars, " +
            ".diagnostics, " +
            ".why, " +
            ".industries, " +
            ".certs, " +
            ".clients, " +
            ".resources, " +
            ".final-cta"
        );


    /*
     * Add animation class
     */

    animatedSections.forEach(
        function (section) {

            section.classList.add(
                "scroll-reveal"
            );

        }
    );


    /*
     * Cards
     */

    const animatedCards =
        document.querySelectorAll(
            ".asset-card, " +
            ".pillar-card, " +
            ".industry-card, " +
            ".resource-card, " +
            ".why-item, " +
            ".certs-badges li"
        );


    animatedCards.forEach(
        function (card, index) {

            card.classList.add(
                "scroll-card"
            );

            /*
             * Small stagger delay
             */

            card.style.setProperty(
                "--delay",
                Math.min(index * 80, 500) + "ms"
            );

        }
    );


    /*
     * If reduced motion is enabled,
     * show everything immediately.
     */

    if (
        reduceMotion ||
        !("IntersectionObserver" in window)
    ) {

        animatedSections.forEach(
            function (section) {

                section.classList.add(
                    "visible"
                );

            }
        );


        animatedCards.forEach(
            function (card) {

                card.classList.add(
                    "visible"
                );

            }
        );

    } else {

        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12,
                    rootMargin:
                        "0px 0px -60px 0px"
                }
            );


        animatedSections.forEach(
            function (section) {

                observer.observe(
                    section
                );

            }
        );


        animatedCards.forEach(
            function (card) {

                observer.observe(
                    card
                );

            }
        );
    }



    /* =========================================================
       5. DIAGNOSTIC TABS
    ========================================================= */

    const tabs =
        document.querySelectorAll(
            ".diag-tab"
        );

    const panels =
        document.querySelectorAll(
            ".diag-panel"
        );


    function activateTab(tab) {

        tabs.forEach(
            function (item) {

                item.classList.remove(
                    "is-active"
                );

                item.setAttribute(
                    "aria-selected",
                    "false"
                );

            }
        );


        panels.forEach(
            function (panel) {

                panel.classList.remove(
                    "is-active"
                );

                panel.hidden = true;

            }
        );


        tab.classList.add(
            "is-active"
        );

        tab.setAttribute(
            "aria-selected",
            "true"
        );


        const target =
            document.getElementById(
                "panel-" +
                tab.dataset.target
            );


        if (target) {

            target.hidden = false;

            target.classList.add(
                "is-active"
            );

        }
    }


    tabs.forEach(
        function (tab) {

            tab.addEventListener(
                "click",
                function () {

                    activateTab(tab);

                }
            );


            tab.addEventListener(
                "keydown",
                function (event) {

                    const list =
                        Array.from(tabs);

                    const current =
                        list.indexOf(tab);


                    if (
                        event.key ===
                        "ArrowRight" ||
                        event.key ===
                        "ArrowDown"
                    ) {

                        event.preventDefault();

                        list[
                            (current + 1) %
                            list.length
                        ].focus();

                    }


                    if (
                        event.key ===
                        "ArrowLeft" ||
                        event.key ===
                        "ArrowUp"
                    ) {

                        event.preventDefault();

                        list[
                            (current - 1 +
                                list.length) %
                            list.length
                        ].focus();

                    }


                    if (
                        event.key ===
                        "Enter" ||
                        event.key === " "
                    ) {

                        event.preventDefault();

                        activateTab(tab);

                    }

                }
            );

        }
    );



    /* =========================================================
       6. ASSET HORIZONTAL SCROLL
    ========================================================= */

    const assetTrack =
        document.getElementById(
            "assetsTrack"
        );

    const assetProgress =
        document.getElementById(
            "assetsProgress"
        );


    if (
        assetTrack &&
        assetProgress
    ) {

        function updateAssetProgress() {

            const maxScroll =
                assetTrack.scrollWidth -
                assetTrack.clientWidth;


            if (maxScroll <= 0) {

                assetProgress.style.width =
                    "100%";

                assetProgress.style.transform =
                    "translateX(0)";

                return;

            }


            const percentage =
                assetTrack.scrollLeft /
                maxScroll;


            const visibleWidth =
                (
                    assetTrack.clientWidth /
                    assetTrack.scrollWidth
                ) * 100;


            const width =
                Math.max(
                    15,
                    visibleWidth
                );


            assetProgress.style.width =
                width + "%";


            const movement =
                percentage *
                (100 - width);


            assetProgress.style.transform =
                "translateX(" +
                movement +
                "%)";
        }


        assetTrack.addEventListener(
            "scroll",
            updateAssetProgress,
            {
                passive: true
            }
        );


        window.addEventListener(
            "resize",
            updateAssetProgress
        );


        updateAssetProgress();
    }



    /* =========================================================
       7. HERO ENTRANCE ANIMATION
    ========================================================= */

    if (!reduceMotion) {

        const heroElements =
            document.querySelectorAll(
                ".hero .kicker, " +
                ".hero h1, " +
                ".hero-lead, " +
                ".hero-actions, " +
                ".hero-stats, " +
                ".scope-panel"
            );


        heroElements.forEach(
            function (element, index) {

                element.classList.add(
                    "hero-animate"
                );


                element.style.setProperty(
                    "--hero-delay",
                    (index * 120) + "ms"
                );

            }
        );

    }



    /* =========================================================
       8. SMOOTH SCROLL
    ========================================================= */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function (event) {

                        const id =
                            link.getAttribute(
                                "href"
                            );


                        if (
                            !id ||
                            id === "#"
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


                        event.preventDefault();


                        target.scrollIntoView({
                            behavior:
                                reduceMotion
                                    ? "auto"
                                    : "smooth",

                            block:
                                "start"
                        });

                    }
                );

            }
        );

});
