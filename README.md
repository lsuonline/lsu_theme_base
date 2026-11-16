# LSU Moodle Theme SCSS Customizations

A collection of SCSS snippets used to refine the appearance, usability, and accessibility of LSU's Moodle interface. The snippets focus on LSU-inspired light and dark color palettes, gradebook readability, navigation, responsive controls, and selected Moodle/Boost Union interface elements.

> [!IMPORTANT]
> **This repository is not a standalone Moodle theme or installable Moodle plugin.** It contains SCSS overrides intended to be compiled by a compatible Moodle theme, principally **Boost Union**. Install or enable only the snippets appropriate for your site.

## Contents

| File | Purpose | Scope declared in snippet |
| --- | --- | --- |
| [`lsu_accessible_colors.scss`](lsu_accessible_colors.scss) | Defines LSU-inspired light/dark color variables and adjusts text, alerts, controls, surfaces, and Moodle's YUI file manager for improved contrast and legibility. | Global |
| [`lsu_gradebookrows.scss`](lsu_gradebookrows.scss) | Refines grade report row backgrounds; provides subtle, contiguous grade-category bands and coordinated grade-item heading colors across category levels. | Global |
| [`lsu_siteadmin.scss`](lsu_siteadmin.scss) | Tightens Site/Course Administration tree spacing, replaces branch indicators with chevrons, and customizes keyboard-focus styling. | Global |
| [`lsu_table_highlights.scss`](lsu_table_highlights.scss) | Improves dark-mode table highlight/hover contrast, preserves danger-cell styling, and adds scheduled-task table separators. | Global |
| [`lsu_boost_union_modal_width.scss`](lsu_boost_union_modal_width.scss) | Expands the course activity chooser to 80% of the viewport width and removes a conflicting inner width limit. | Course |
| [`lsu_mobile_drawers.scss`](lsu_mobile_drawers.scss) | Repositions drawer-toggle buttons near the top of the viewport on mobile screens. | Global |
| [`dark_mode_icons.scss`](dark_mode_icons.scss) | Applies readable dark-mode colors to Font Awesome icons and makes course activity/index SVG icons light-colored. | Global |
| [`lsu_qol.scss`](lsu_qol.scss) | Makes assorted interface refinements to block menus, links, course-index hover states, drawers, and course-section corners. | Global |

Each SCSS file includes a metadata header describing its intent, author, and tested environment.

## Requirements and compatibility

- A Moodle site with a theme that compiles **SCSS**. The intended integration is Boost Union's **SCSS snippets** feature.
- Administrator access to configure the active theme and upload/enable snippets.
- A theme/Bootstrap environment providing any SCSS variables or mixins referenced by the selected files. For example, `lsu_gradebookrows.scss` uses `$gray-100` and `$gray-900`; `lsu_mobile_drawers.scss` uses `media-breakpoint-down` and `$navbar-height`.

The source headers report testing on **Moodle 4.5.4** for several snippets and **Moodle 5.3** for others. This is **not** a blanket compatibility guarantee: the snippets were authored and tested individually, and Boost Union/Moodle markup may differ across versions. In particular, `lsu_boost_union_modal_width.scss` notes that browser verification is pending.

## Install with Boost Union

1. Download the repository as a ZIP using **Code → Download ZIP** on GitHub, or create a ZIP containing the desired `.scss` files.
2. In Moodle, navigate to **Site administration → Appearance → Boost Union → SCSS snippets → Settings**.
3. Enable **uploaded snippets**, upload the ZIP in the **Upload snippets** setting, and save.
4. Open **SCSS snippets → Overview** and enable the snippets you want to apply.
5. Review the enabled snippet order: Boost Union adds snippets sequentially to its SCSS stack, so later rules can override earlier ones.
6. Test the changes in a staging environment in **both light and dark modes**, including mobile layouts, before rolling them out to production.

Boost Union generally purges the theme cache when snippet settings are changed. If a change does not appear, purge Moodle caches and inspect the compiled SCSS output or browser developer tools for selector conflicts.

**Tip:** Start with one snippet at a time. `lsu_accessible_colors.scss` establishes broad color overrides, while `lsu_gradebookrows.scss`, `lsu_table_highlights.scss`, and `lsu_qol.scss` contain rules that may overlap in some contexts. Apply the most specific correction after the more general rules when cascade order matters.

For details on the feature, see the [Boost Union theme repository](https://github.com/moodle-an-hochschulen/moodle-theme_boost_union) and its [community SCSS snippets repository](https://github.com/moodle-an-hochschulen/moodle-theme_boost_union_snippets).

## Alternative: integrate SCSS into a theme

Developers maintaining a custom Boost/Boost Union-based theme can integrate selected snippets into the theme's SCSS build process. This is an **alternative** to uploading snippets through Boost Union; it is not the same as installing this repository under Moodle's `theme/` directory.

When integrating manually:

- Ensure Bootstrap/Moodle SCSS variables and mixins are available before compiling files that use them.
- Load local overrides *after* the core styles they are intended to adjust.
- Retain the light/dark-mode selectors such as `[data-bs-theme="dark"]`.
- Avoid loading the same snippet twice through both the theme build and the Boost Union snippets feature.

Copying these SCSS files verbatim into a plain CSS-only setting will **not** work for files containing SCSS variables, mixins, loops, or nested selectors.

## Design and accessibility notes

The customization palette uses LSU purple (`#461d7c`) and gold (`#fdd023`) as visual references, with restrained surface and border tones and separate colors for light and dark modes. The aim is to improve clarity without introducing heavy borders or aggressive table highlighting.

Some overrides use `!important` because they must take precedence over Moodle/Bootstrap component styling. That also means they may interact with site-specific presets, third-party plugins, or future Moodle upgrades.

**Accessibility review is still required.** These files do not constitute a WCAG conformance certification. In particular:

- `lsu_qol.scss` removes outlines and box shadows from focused elements inside `.block`; check that affected interactive controls retain a visible keyboard focus indicator elsewhere.
- `dark_mode_icons.scss` applies broad icon-color overrides and a CSS filter to selected activity SVGs; review status/semantic icons to make sure meaningful colors are not lost.
- Test link visibility, focus indicators, text/background contrast, danger states, gradebook headers, and file-manager controls with actual site content.

## Recommended regression checks

After enabling, updating, or reordering snippets, verify:

- **Gradebook:** grader report, user report, single view, category nesting, heading cells, row hovers, and light/dark modes.
- **Administration navigation:** Site Administration and Course Administration trees, branch chevrons, keyboard tab navigation, and focus visibility.
- **Tables:** primary/danger states, hovered rows, scheduled tasks, and action links/icons.
- **Course editing:** activity chooser width, course index, activity icons, and section corners.
- **Responsive layout:** left/right drawers and drawer-toggle placement on narrow screens.
- **File manager:** alternating rows, toolbars, and icon visibility in light and dark modes.

## Updating or troubleshooting

To update a snippet, replace the uploaded source with the newer `.scss` file or ZIP, save the Boost Union snippet settings, and confirm that the intended snippet is enabled on **Overview**. Recheck the order and purge caches if necessary.

If styling breaks or fails to appear:

1. Disable the most recently enabled snippet to isolate the regression.
2. Check the browser developer tools for winning CSS selectors and inherited Bootstrap variables.
3. Check for SCSS compilation errors, especially when a snippet references unavailable variables or mixins.
4. Verify the current page's `data-bs-theme` value and whether selectors still match your Moodle version.
5. Look for conflicts between broad table, block, or icon overrides and the active theme's own rules.

## Contributing

Changes that improve accessibility, maintainability, or compatibility are welcome through [GitHub issues](https://github.com/lsuonline/lsu_theme_base/issues) and pull requests.

When submitting a snippet change, please include:

- The affected file and a clear explanation of the issue and proposed behavior.
- Moodle and Boost Union versions used for testing.
- Browsers and operating systems tested, including relevant mobile devices.
- Light- and dark-mode results and, when useful, before/after screenshots.
- Notes about affected selectors, accessibility considerations, and interaction with other snippets.

Preserve the existing file headers and license notices when modifying source files.

## License and credits

This project is distributed under the **GNU General Public License, version 3**. See [LICENSE](LICENSE).

The SCSS source headers credit **Robert Russo** (2026); certain files also carry **Louisiana State University** copyright notices. Individual file headers contain additional attribution and testing notes.

This repository collects LSU-specific styling customizations and is not an official Moodle core theme distribution.
