// configure the following 3 lines according to your live setup
const LIVE_STREAM_SOURCE = 'https://your-live-server.com/test-live/stream/playlist.m3u8';
const END_OF_LIVE_POSTER = 'images/splashscreen-end.jpg';
const MANIFEST_CHECK_INTERVAL = 10; // in seconds

const HLS_REG_EXP = /(#EXT-X-STREAM-INF|#EXTINF)/m;
const MPEG_DASH_REG_EXP = /(<AdaptationSet)/m;
const playerElement = document.getElementById('rmp');
const splashScreenElement = document.getElementById('splash-screen');

const fetchOptions = {
  method: 'GET', // *GET, POST, PUT, DELETE, etc.
  mode: 'cors', // no-cors, *cors, same-origin
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, *same-origin, omit
};

let manifestCheck;

// our live stream URI
const src = {
  hls: LIVE_STREAM_SOURCE
  // or DASH if you use MPEG-DASH
  //dash: LIVE_STREAM_SOURCE
};
// player configuration
const settings = {
  licenseKey: 'your-radiant-media-player-license-key',
  src: src,
  autoHeightMode: true,
  autoHeightModeRatio: 16/9,
  skin: 's1',
  autoplay: true
};
const elementID = 'rmp';
const rmp = new RadiantMP(elementID);

// when live event starts we init player
function initPlayer() {
  clearInterval(manifestCheck);
  // when player is ready we show player and hide splash screen
  rmp.one('ready', () => {
    splashScreenElement.style.display = 'none';
    playerElement.style.display = 'block';
  });
  rmp.init(settings);
}

// when live event ends we hide player and show end of live poster
function endOfLive() {
  splashScreenElement.src = END_OF_LIVE_POSTER;
  splashScreenElement.style.display = 'block';
  playerElement.style.display = 'none';
}

function showSplashScreen() {
  if (splashScreenElement.style.display === 'none') {
    splashScreenElement.style.display = 'block';
  }
}

async function fetchManifest() {
  try {
    const response = await fetch(LIVE_STREAM_SOURCE, fetchOptions);
    if (!response.ok) {
      // live stream URL is not available at this point in time -> show splash screen  
      // another check will happen at MANIFEST_CHECK_INTERVAL 
      console.error('Network response was not OK');
      showSplashScreen();
      return;
    }
    const textResponse = await response.text();
    if (textResponse !== '' && (HLS_REG_EXP.test(textResponse) || MPEG_DASH_REG_EXP.test(textResponse))) {
      console.log(textResponse);
      // when player faces a fatal error, likely the live event is over, we show end of live poster
      rmp.one('error', endOfLive);
      // we are good -> show player, hide splash screen
      initPlayer();
      return;
    }
    // if we reach this point live stream URL is not available -> show splash screen 
    // another check will happen at MANIFEST_CHECK_INTERVAL 
    showSplashScreen();
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    showSplashScreen();
  }
}

// start fetching manifest 
fetchManifest();

// periodic check for live stream to start
manifestCheck = setInterval(() => {
  fetchManifest();
}, MANIFEST_CHECK_INTERVAL * 1000);
