const LEVELS = {
  SUCCESS: 'success',
  DANGER: 'danger'
};

function feedback(message, level) {
  const container = document.querySelector('#feedback');
  for (const l in Object.values(LEVELS)) {
    container.classList.remove(`text-${l}`);
  }
  container.classList.add(`text-${level}`);
  container.textContent = message;
}

function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: encode({
      'form-name': form.getAttribute('name'),
      ...Object.fromEntries(new FormData(form))
    })
  }).then(resp => {
    if (!(resp.status >= 200 && resp.status <= 299)) {
      throw Error(resp.statusText);
    }
  }).then(() => {
    feedback('Booking request sent successfully', LEVELS.SUCCESS);
    form.reset();
  }).catch(error => {
    feedback(error, LEVELS.DANGER);
  });
}

document
  .querySelector('form[name=book]')
  .addEventListener('submit', handleSubmit);

const dateInput = document
  .querySelector('form[name=book] input[type=date]');
const t = today();
dateInput.setAttribute('min', isoDate(t))
dateInput.valueAsDate = t;
