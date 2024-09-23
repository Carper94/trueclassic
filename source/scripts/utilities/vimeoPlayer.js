let player;

const playerWrapper = document.querySelectorAll('.player-wrapper');
const videoPoster = document.querySelector('.video-poster');

(function playVideo() {
  playerWrapper.forEach((wrapper) => {
    // wait until vimeo sdk is loaded
    if (!window.Vimeo || !window.Vimeo.Player) {
      return setTimeout(playVideo, 100);
    }

    if (!wrapper.dataset.videoUrlId) return false;

    const options = {
      url: wrapper.dataset.videoUrlId,
      background: true,
      autoplay: true,
      controls: false,
      muted: true,
      loop: true,
    };

    player = new window.Vimeo.Player(wrapper, options);

    player.on('play', () => {
      videoPoster.classList.toggle('hidden');
      wrapper.classList.toggle('loaded');
    });
    return true;
  });
})();

// const togglePlay = async () => {
//   playSpan.classList.toggle('hidden');
//   if (player) {
//     await player.play();
//   } else {
//     await player.pause();
//   }
// };

// if (button) {
//   button.addEventListener('click', togglePlay);
//   console.log('click play');
// }
