# can-autoplay.js

The auto-play feature detection in HTMLMediaElement (`<audio>` or `<video>`).

Table of contents:

- [Installation](#installation)
- [Files](#files)
- [API](#api)
- [Example](#example)
- [Media](#media)
- [Implementation Details](#implementation-details)

## Installation

```
npm install can-autoplay
```

## Files

Build files are available in the `dist/` directory. Bundlers will choose get the correct file chosen for them but if you just want to include it on the page, grab the `dist/can-autoplay.js` file.

## API

### `audio(options)`

Parameters:

- options.inline `<Boolean>`, check if auto-play is possible for an inline playback, default value is `false`
- options.muted `<Boolean>`, check if auto-play is possible for a muted content
- options.timeout `<Number>`, timeout for a check, default value is `250` ms

Returns:

- `<Promise>`, resoles to a `<Object>`:
  - `result <Boolean>`, `true` - if auto-play is possible
  - `error <Error>`, internal or timeout Error object


```js
canAutoplay().then(({result}) => {
  if (result === true) {
    // Can auto-play
  } else {
    // Can not auto-play
  }
})
```

## Media

- `video.mp4`. Source: https://github.com/mathiasbynens/small
