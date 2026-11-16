# LSU Boost Union — External SCSS (Pre and Post)

This deployment combines the eight published uploaded SCSS snippets from [`lsuonline/lsu_theme_base`](https://github.com/lsuonline/lsu_theme_base), with the order from LSU's test instance on  November 16, 2026.

- `lsu_pre.scss`: **color definitions only**. Sass maps define the light/dark Moodle Design System and Bootstrap runtime palette, category-level tints, file-manager colors, focus colors, and table-highlight colors. No CSS selectors are emitted here.
- `lsu_post.scss`: **compiled styles**. The light and dark runtime CSS custom properties are emitted here *after* Bootstrap; all layout, hover, gradebook, filemanager, dark-mode icons, navigation, activity chooser, mobile, and table rules are here.

The theme's `$gray-100`, `$gray-900`, `$navbar-height`, and `media-breakpoint-down` remain inherited from Moodle / Bootstrap, and are used only in the POST file (after the theme imports).

## Install

1. Add `lsu_pre.scss` and `lsu_post.scss` to the repository's `main` branch.
2. Go to **Site administration > Appearance > Boost Union > Look > SCSS**.
3. Choose **Public download URL** as the external SCSS source.
4. Set **External Pre SCSS download URL** (`extscssurlpre`) to:

   `https://raw.githubusercontent.com/lsuonline/lsu_theme_base/main/lsu_pre.scss`

5. Set **External Post SCSS download URL** (`extscssurlpost`) to:

   `https://raw.githubusercontent.com/lsuonline/lsu_theme_base/main/lsu_post.scss`

6. Save and purge the theme cache.
7. **Disable the eight corresponding uploaded snippets** to prevent double application: `LSU quality of life improvements`, `LSU accessibility and colors`, `LSU dark mode icons`, `LSU Gradebook rows and contiguous category levels`, `LSU Site Administration Spacing`, `LSU Activity Chooser Modal Width`, `Mobile compliant drawer controls`, and `LSU Accessible Table Highlights`.
8. **Keep enabled** `LSU menu bar icon hovers` (not in the public repository), `Aligned course section borders`, and `Tertiary navigation button` (the latter two are shipped with Boost Union). Leave the disabled built-in snippets disabled.
9. Validate the compiled SCSS on your installed Boost Union branch, then examine page headers, grader report, drawers, activity chooser, file manager, tables, and navigation in both light and dark modes. For Boost Union versions with the validator, from Moodle root run `php theme/boost_union/cli/validate_scss.php` (confirm the exact invocation and options with `--help`).

## Order and compatibility caveat

Boost Union adds **external Post SCSS before its enabled SCSS snippets**. Therefore, remaining enabled built-in snippets and the unpublished `LSU menu bar icon hovers` snippet will apply **after** all rules in `lsu_post.scss` rather than being interleaved at their screenshot positions. For these particular sources, the rules appear focused on different components, but their precise original cascade order cannot be guaranteed without consolidating the missing menu-hover source and active built-in snippets too.

This is not a standalone Moodle theme or a CSS file; it requires the SCSS compiler and Boost Union variable/mixin context. The source snippets were independently documented for Moodle 4.5.4 or 5.3; test the combined output with the exact Boost Union/Moodle version in use.

The existing `lsu_qol.scss` resets focus outlines within blocks. That potentially reduces visible keyboard-focus indication. It has been preserved to minimize changes in appearance, but should be reviewed for accessibility separately.

## Updates and cache management

Boost Union normally fetches external SCSS during cache generation. Saving theme settings or purging theme caches can force a new fetch; for regular automatic refresh, Boost Union ships a normally disabled scheduled `theme_boost_union\task\purge_cache` task that can be enabled deliberately. If the external URL is unreachable, the theme may skip that source while still showing the site.

## License

GNU GPL v3 or later. Source credits remain with Robert Russo and Louisiana State University.
