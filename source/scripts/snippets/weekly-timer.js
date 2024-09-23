class TrueclassicCountdown extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.update();
  }

  update() {
    const now = new Date();
    const nowUtc = new Date(now.getTime() + now.getTimezoneOffset() * 60 * 1000);
    // Corrected PST is UTC-7 not -8
    const pstOffset = -7 * 60 * 60 * 1000;
    const nowPst = new Date(nowUtc.getTime() + pstOffset);
    const dayOfWeek = nowPst.getDay();
    // eslint-disable-next-line one-var
    let daysLeft, timeLeft;

    if (dayOfWeek === 0 && nowPst.getHours() < 21) {
      daysLeft = 0;
    } else {
      // eslint-disable-next-line prettier/prettier
      daysLeft = dayOfWeek === 0 ? 7 : 8 - dayOfWeek;
    }

    const nextSunday9PM = new Date(
      nowPst.getFullYear(),
      nowPst.getMonth(),
      nowPst.getDate() + daysLeft,
      21,
      0,
      0
    );
    const diff = nextSunday9PM - nowPst;
    daysLeft = Math.floor(diff / (24 * 60 * 60 * 1000));
    const hoursLeft = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutesLeft = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
    const secondsLeft = Math.floor((diff % (60 * 1000)) / 1000);

    // Corrected condition to show time left
    if (daysLeft === 0 && nowPst.getHours() <= 21 && dayOfWeek === 0) {
      timeLeft = `Time left: ${hoursLeft.toString().padStart(2, '0')}:${minutesLeft
        .toString()
        .padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`;
      this.shadow.querySelector('.days-left').innerHTML = '';
    } else {
      timeLeft = '';
      // accounts for the fact that the timer starts at 9PM PST on Sunday
      if (hoursLeft >= 21) {
        daysLeft += 1;
      }
      this.shadow.querySelector('.days-left').innerHTML = `${daysLeft} days left`;
    }

    this.shadow.querySelector('.time-left').innerHTML = timeLeft;

    requestAnimationFrame(() => {
      this.update();
    });
  }

  render() {
    const template = `
      <style>
        .countdown-container {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
        }
        .countdown-container > * {
          text-align: center;
        }
      </style>
      <div class="countdown-container">
        <div class="days-left"></div>
        <div class="time-left"></div>
      </div>`;
    this.shadow.innerHTML = template;
  }
}

customElements.define('trueclassic-countdown', TrueclassicCountdown);
