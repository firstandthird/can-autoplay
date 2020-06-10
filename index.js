import getVideoBlob from './lib/media';

function setupDefaultValues (options) {
  return Object.assign({
    muted: false,
    timeout: 250,
    inline: false
  }, options);
}

function startPlayback ({ muted, timeout, inline }, elementCallback) {
  const { element, source } = elementCallback();
  let playResult;
  let timeoutId;
  let sendOutput;

  element.muted = muted;

  if (muted === true) {
    element.setAttribute('muted', 'muted');
  }
  // indicates that the video is to be played "inline",
  // that is within the element's playback area.
  if (inline === true) {
    element.setAttribute('playsinline', 'playsinline');
  }

  element.src = source;

  if (typeof window === 'undefined') {
    return Promise.resolve(false);
  }

  return new Promise(resolve => {
    playResult = element.play();
    timeoutId = setTimeout(() => {
      sendOutput(false, new Error(`Timeout ${timeout} ms has been reached`));
    }, timeout);
    sendOutput = (result, error = null) => {
      clearTimeout(timeoutId);
      resolve({ result, error });
    };

    if (playResult !== undefined) {
      playResult
        .then(() => sendOutput(true))
        .catch(playError => sendOutput(false, playError));
    } else {
      sendOutput(true);
    }
  });
}

//
// API
//
function video (options) {
  options = setupDefaultValues(options);

  return startPlayback(options, () => ({
    element: document.createElement('video'),
    source: URL.createObjectURL(getVideoBlob())
  }));
}

export default video;
