document.addEventListener('DOMContentLoaded', () => {
  const burgers = Array.from(document.querySelectorAll('.navbar-burger'));

  burgers.forEach((burger) => {
    burger.addEventListener('click', () => {
      const target = burger.dataset.target;
      const menu = document.getElementById(target);

      burger.classList.toggle('is-active');
      if (menu) {
        menu.classList.toggle('is-active');
      }
    });
  });

  const copyButton = document.getElementById('copy-bibtex');
  const copyStatus = document.getElementById('copy-status');
  const bibtexBlock = document.getElementById('bibtex-block');

  if (copyButton && copyStatus && bibtexBlock) {
    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(bibtexBlock.textContent);
        copyStatus.textContent = 'BibTeX copied.';
      } catch (error) {
        copyStatus.textContent = 'Clipboard unavailable. Copy manually from the block.';
      }
    });
  }

  const videos = Array.from(document.querySelectorAll('.dtv-video'));

  videos.forEach((video) => {
    const frame = video.closest('.video-frame');
    const overlayButton = frame ? frame.querySelector('.video-overlay-button') : null;

    const setHalfSpeed = () => {
      video.defaultPlaybackRate = 0.5;
      video.playbackRate = 0.5;
    };

    const updateState = () => {
      if (!frame) {
        return;
      }
      frame.classList.toggle('is-playing', !video.paused && !video.ended);
    };

    setHalfSpeed();

    video.addEventListener('loadedmetadata', setHalfSpeed);
    video.addEventListener('play', () => {
      setHalfSpeed();
      updateState();
    });
    video.addEventListener('pause', updateState);
    video.addEventListener('ended', updateState);

    if (overlayButton) {
      overlayButton.addEventListener('click', () => {
        if (video.paused || video.ended) {
          setHalfSpeed();
          video.play();
        } else {
          video.pause();
        }
      });
    }
  });

  const actionLinks = Array.from(document.querySelectorAll('.action-link'));

  actionLinks.forEach((link) => {
    link.addEventListener('click', () => {
      link.classList.add('is-pressed');
      window.setTimeout(() => {
        link.classList.remove('is-pressed');
      }, 160);
    });
  });
});
