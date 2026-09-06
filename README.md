# Jordan Adamson — Personal Website

Source for <https://jadamso.github.io>.

Built with [Quarto](https://quarto.org).

## Local Update

"My CV has been updated with a new publication/course. Copy the new CV here and update my research/teaching page."

## Local preview

```bash
quarto preview      # live reload
quarto render       # one-shot build to _site/
```

## Publish to GitHub Pages

```bash
git add -u && git commit -m "update site"
git push
quarto publish gh-pages --no-browser
```

