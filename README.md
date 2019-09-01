# sliding-puzzle
Sliding puzzle game that counts your moves and the time it took to solve the puzzle

Use arrows to move or click on top of the piece you want to move.
Space for new game.

### Installation

```
npm install
```

### Start Dev Server

```
npm start
```

### Build Prod Version

```
npm run build

git add build && git commit -m "Initial dist subtree commit"

git subtree push --prefix build origin gh-pages


git checkout master # you can avoid this line if you are in master...
git subtree split --prefix build -b gh-pages # create a local gh-pages branch containing the splitted output folder
git push -f origin gh-pages:gh-pages # force the push of the gh-pages branch to the remote gh-pages branch at origin
git branch -D gh-pages # delete the local gh-pages because you will need it: ref

git push origin `git subtree split --prefix build gh-pages`:gh-pages --force

```

### Features:

* ES6 Support via [babel](https://babeljs.io/) (v7)
* SASS Support via [sass-loader](https://github.com/jtangelder/sass-loader)
* Linting via [eslint-loader](https://github.com/MoOx/eslint-loader)

When you run `npm run build` we use the [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) to move the css to a separate file. The css file gets included in the head of the `index.html`.