Articles on laoazhang.cn are written in Markdown. [Jekyll][jekyll] (4.3.x) generates the static HTML into `_site`, which GitHub Pages serves.

## Requirements

- Ruby 3.4 with Bundler (Jekyll 4.3 requires Ruby >= 2.7)
- Node.js 18+ (only for rebuilding CSS/JS assets)

```bash
bundle install
npm install
```

### Ruby setup on macOS

Homebrew's `ruby@3.4` is keg-only, so put it on `PATH` first:

```bash
export PATH="/opt/homebrew/opt/ruby@3.4/bin:$PATH"
```

Ruby 3.4 removed several former default gems from the stdlib, and Jekyll 4.3
still `require`s them at load time. That is why `Gemfile` pins `csv`, `logger`,
`base64`, `bigdecimal` and `rake` explicitly — do not remove them, or
`bundle exec jekyll` fails with `cannot load such file -- csv`.

`google-protobuf` is pinned to the generic `3.25.8` build rather than a
platform build: the `arm64-darwin` precompiled variants only ship extensions up
to Ruby 3.3, while the generic gem compiles against the local Ruby.

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
