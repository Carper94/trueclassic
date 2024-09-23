/* eslint-disable */
const quizes = document.querySelectorAll('.quiz-wrapper');
const result = document.querySelectorAll('.result-button');
let tag;

quizes.forEach((quiz, i) => {
  const next = quiz.querySelectorAll('.next-button');
  const quizOptions = quiz.querySelectorAll('.selection-button');
  const quizDropdowns = quiz.querySelectorAll('.quiz-dropdown');

  quizOptions.forEach((quizOption) => {
    quizOption.addEventListener('click', function (e) {
      if (e.target.dataset.collection_url) {
        result[0].href = e.target.dataset.collection_url;
      }
      quizOptions.forEach((button) => {
        button.classList.remove('selected');
      });
      e.target.classList.add('selected');
      next[0].removeAttribute('disabled');
      if (e.target.dataset.tag !== undefined) {
        if (tag !== undefined) {
          tag += '+' + e.target.dataset.tag;
        } else {
          tag = '/' + e.target.dataset.tag;
        }
      }
    });
  });

  quizDropdowns.forEach((quizDropdown) => {
    quizDropdown.addEventListener('change', function () {
      next[0].removeAttribute('disabled');

      if (tag !== undefined) {
        tag += '+' + quizDropdown.value;
      } else {
        tag = '/' + quizDropdown.value;
      }
    });
  });

  next[0].addEventListener('click', function () {
    if (i + 1 < quizes.length) {
      quizes[i + 1].classList.remove('hide');
      quizes[i + 1].scrollIntoView({ block: 'center' });
    } else {
      result[0].href += tag;
    }
  });
});

function showCookieValue(value, e) {
  const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith(value))
    ?.split('=')[1];
  e.textContent = `${cookieValue}`;
}

if (document.cookie.indexOf('recipient=') !== false) {
  const recipient = document.querySelectorAll('.gifting-recipient');
  if (recipient[0]) {
    showCookieValue('recipient', recipient[0]);
  }
}

if (document.cookie.indexOf('style=') !== false) {
  const style = document.querySelectorAll('.gifting-style');
  if (style[0]) {
    showCookieValue('style', style[0]);
  }
}
