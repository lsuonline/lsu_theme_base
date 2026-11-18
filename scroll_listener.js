<script>
(() => {
    const init = () => {
        const body = document.body;
        const page = document.getElementById('page');

        if (!page ||
                !body.matches('.path-course-view:not(.single-section-page)') ||
                !document.querySelector('#bucourseheader.stacked #courseheaderimage.withimage') ||
                body.dataset.lsuHeaderScroll) {
            return;
        }

        body.dataset.lsuHeaderScroll = '1';

        const update = () => {
            const y = Math.max(
                window.scrollY,
                document.scrollingElement.scrollTop,
                page.scrollTop
            );

            if (y >= 80) {
                body.classList.add('lsu-course-header-collapsed');
            } else if (y <= 20) {
                body.classList.remove('lsu-course-header-collapsed');
            }
        };

        document.addEventListener('scroll', update, {passive: true});
        page.addEventListener('scroll', update, {passive: true});
        window.addEventListener('pageshow', update);
        update();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, {once: true});
    } else {
        init();
    }
})();
</script>