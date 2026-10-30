Articles on laoazhang.cn are written in Markdown. [Jekyll][jekyll] (4.3.x) generates the static HTML into `_site`, which GitHub Pages serves.

## Requirements

- Ruby 3.x with Bundler (Jekyll 4.3 requires Ruby >= 2.7; `rouge`/`sass-embedded` need a modern Ruby)
- Node.js 18+ (only for rebuilding CSS/JS assets)

```bash
bundle install
npm install
```

## Build

```bash
# Full build: compile LESS + JS, then generate the site
npm run build

# Assets only
npm run assets      # main.min.css, ie.min.css, scripts.min.js

# Local preview at http://localhost:4444
npm run serve
```

The compiled assets `assets/css/main.min.css`, `assets/css/ie.min.css` and
`assets/js/scripts.min.js` are committed. They are treated as frozen artifacts:
only run `npm run assets` when you actually change `assets/less/**` or `assets/js/_main.js`.

## Writing a new article

Add a file under `_posts/<Category>/YYYY-MM-DD-title.md` with YAML front matter
(`layout: post`, `title`, `tagline`, `tags`, `categories`). Jekyll picks it up on the next build.

## Deploying

Commit to `master` and push — GitHub Pages builds the site automatically
(no `gh-pages` branch, no generated `_site` committed).

[jekyll]: https://jekyllrb.com/
