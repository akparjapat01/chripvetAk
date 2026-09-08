export const countdown = (duration, callback) => {
  let timer = duration * 60;
  let intervalId;
  const startCountdown = () => {
    intervalId = setInterval(() => {
      const minutes = Math.floor(timer / 60);
      const seconds = timer % 60;
      `${minutes}:${seconds}`;

      if (--timer < 0) {
        clearInterval(intervalId);
        callback();
      }
    }, 1000);
  };

  const stopCountdown = () => {
    clearInterval(intervalId);
  };

  const resumeCountdown = () => {
    startCountdown();
  };

  return {
    start: startCountdown,
    stop: stopCountdown,
    resume: resumeCountdown,
    getTimeRemaining: () => {
      const minutes = Math.floor(timer / 60);
      const seconds = timer % 60;
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    },
  };
};
