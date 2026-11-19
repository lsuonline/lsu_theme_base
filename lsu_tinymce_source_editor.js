<script>
/**
 * TinyMCE HTML source editor dark mode fixes for Moodle 5.3.
 * Install the contents in Site administration > Appearance > Additional HTML
 * > Before BODY is closed, wrapped in HTML script tags.
 */
(() => {
    'use strict';

    const containerSelector = '[id$="_codeMirrorContainer"]';
    const baseStyleId = 'lsu-tiny-source-contrast';
    const tokenStyleId = 'lsu-tiny-source-contrast-tokens';

    const isDark = (host) => (
        (host.closest('[data-bs-theme]')?.getAttribute('data-bs-theme') ||
            document.documentElement.getAttribute('data-bs-theme')) === 'dark'
    );

    const applyContrast = (host) => {
        const root = host.shadowRoot;
        if (!root || !root.querySelector('.cm-editor') || !isDark(host)) {
            return;
        }
        if (root.getElementById(baseStyleId)) {
            return;
        }

        const base = document.createElement('style');
        base.id = baseStyleId;
        base.textContent = `
            .cm-editor,
            .cm-scroller,
            .cm-content {
                background-color: #283444 !important;
                color: #f4f5f8 !important;
            }
            .cm-content .cm-line span {
                color: #f4f5f8 !important;
            }
            .cm-gutters {
                background-color: #243246 !important;
                color: #d2e7f7 !important;
                border-right: 1px solid #8597aa !important;
            }
            .cm-gutterElement {
                color: #d2e7f7 !important;
            }
            .cm-activeLine,
            .cm-activeLineGutter {
                background-color: #35465b !important;
            }
            .cm-cursor {
                border-left-color: #ffffff !important;
            }
            .cm-selectionBackground,
            .cm-focused .cm-selectionBackground {
                background-color: #344358 !important;
            }
            .cm-content ::selection {
                background-color: #344358 !important;
                color: #ffffff !important;
            }
        `;
        root.appendChild(base);

        const tokenStyle = document.createElement('style');
        tokenStyle.id = tokenStyleId;
        root.appendChild(tokenStyle);

        // CodeMirror generates its token class names. Discover them from the
        // live HTML rather than depending on a build-specific class such as ͼe.
        const findTokens = () => {
            let stringClass = null;
            let tagClass = null;

            for (const element of root.querySelectorAll('.cm-line span[class]')) {
                const value = element.textContent.trim();
                const classes = [...element.classList];
                const tokenClass = classes.find(name => name.startsWith('ͼ'));
                if (!tokenClass) {
                    continue;
                }
                if (!stringClass && /^(?:"[\s\S]*"|'[\s\S]*')$/.test(value)) {
                    stringClass = tokenClass;
                }
                if (!tagClass && /^[a-z][\w:-]*$/i.test(value) &&
                    /<\/?$/.test(element.previousSibling?.textContent?.trimEnd() || '')) {
                    tagClass = tokenClass;
                }
                if (stringClass && tagClass) {
                    break;
                }
            }

            const selectors = [];
            if (stringClass) {
                selectors.push(`.cm-content .cm-line span.${CSS.escape(stringClass)} {
                    color: #ffd152 !important;
                }`);
            }
            if (tagClass) {
                selectors.push(`.cm-content .cm-line span.${CSS.escape(tagClass)} {
                    color: #31e0ff !important;
                }`);
            }
            tokenStyle.textContent = selectors.join('\n');
            return Boolean(stringClass && tagClass);
        };

        // Empty source documents may acquire syntax tokens as the user types.
        if (!findTokens()) {
            const content = root.querySelector('.cm-content');
            if (content) {
                const observer = new MutationObserver(() => {
                    if (findTokens()) {
                        observer.disconnect();
                    }
                });
                observer.observe(content, {childList: true, subtree: true});
            }
        }
    };

    const checkDialogs = () => {
        document.querySelectorAll(containerSelector).forEach(applyContrast);
    };

    const observer = new MutationObserver(checkDialogs);
    observer.observe(document.body, {childList: true, subtree: true});
    checkDialogs();
})();
</script>
