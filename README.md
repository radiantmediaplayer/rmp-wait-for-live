# rmp-wait-for-live

This script handles timed live event automatically for use with Radiant Media Player (HLS or MPEG-DASH).

When live event is offline a splash screen is shown to the viewer (images/splashscreen-start.jpg).
When live stream becomes online, the splash screen becomes hidden, and the player shows the live stream (autoplay).
When live stream becomes offline again, an end of live poster is shown to the viewer (images/splashscreen-end.jpg)

## Instructions

Go to js/index.js and configure the first 3 lines according to your live setup. Enter your Radiant Media Player license key as well.

Go to images/ and replace the default images with your images.

Start live streaming!

## Support notes

This script is just a baseline for more advanced use-cases, feel free to customize it as per your requirements.

The script uses JavaScript fetch function on the manifest (.m3u8 or .mpd) URL to check for availability, so make sure your manifest can be reached that way.
If the manifest URL returns a network error (4** or 5**), if the manifest is empty or does not contain any streaming data, it is considered that the live stream is offline.

## Issues

Please open an [issue](https://github.com/radiantmediaplayer/rmp-wait-for-live/issues) on this GitHub page and we will do our best to review it.

## License for rmp-wait-for-live

rmp-wait-for-live is released under MIT.

## License for Radiant Media Player

Radiant Media Player is a commercial HTML5 media player, not covered by the above MIT license.

Radiant Media Player license can be found here: [https://www.radiantmediaplayer.com/terms-of-service.html](https://www.radiantmediaplayer.com/terms-of-service.html).

You may request a free trial for Radiant Media Player at: [https://www.radiantmediaplayer.com/free-trial.html](https://www.radiantmediaplayer.com/free-trial.html).
