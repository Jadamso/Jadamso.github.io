# Jordan Adamson — Personal Website

Source for <https://jadamso.github.io>.

Built with [Quarto](https://quarto.org).

## Local preview

```bash
./scripts/sync_cv.sh        # copy latest CV PDF from the LaTeX source folder
quarto preview      # live reload
quarto render       # one-shot build to _site/
```

## Publish to GitHub Pages

```bash
./scripts/sync_cv.sh
git add -A && git commit -m "update site"
git push
quarto publish gh-pages --no-browser
```

