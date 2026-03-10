const filterItems = document.querySelectorAll('.cars-filter li');
const carItems = document.querySelectorAll('.car');
const carsContent = document.getElementById('cars-content');

filterItems.forEach((item) => {
  item.onclick = () => {
    filterItems.forEach((el) => el.classList.remove('active'));
    item.classList.add('active');

    const filterText = item.textContent.toLowerCase();

    carItems.forEach((car) => {
      if (
        filterText === 'все марки' ||
        car.querySelector('h4').textContent.toLowerCase().includes(filterText)
      ) {
        car.style.display = 'flex';
      } else {
        car.style.display = 'none';
      }
    });

    carsContent.scrollIntoView({ behavior: 'instant' });
  };
});

const carField = document.getElementById('car');
const nameField = document.getElementById('name');
const phoneField = document.getElementById('phone');

const fields = [carField, nameField, phoneField];

fields.forEach(field => {
  field.addEventListener('input', () => {
    if (field.value.trim() !== '') {
      field.classList.remove('error');
    } 
  });
});

// Маска телефона: +7 (___) ___-__-__
phoneField.addEventListener('input', (e) => {
  let value = e.target.value.replace(/\D/g, '');

  if (value.startsWith('8')) value = '7' + value.slice(1);

  if (value.length > 11) value = value.slice(0, 11);

  let formatted = '+7 ';
  if (value.length > 1) formatted += '(' + value.slice(1, 4);
  if (value.length >= 4) formatted += ') ';
  if (value.length >= 5) formatted += value.slice(4, 7);
  if (value.length >= 7) formatted += '-' + value.slice(7, 9);
  if (value.length >= 9) formatted += '-' + value.slice(9, 11);

  e.target.value = formatted;
});

function validatePhone(value) {
  const digits = value.replace(/\D/g, '');
  return digits.length === 11 && digits.startsWith('7');
}

document.getElementById('order-action').addEventListener('click', function (event) {
  event.preventDefault();

  let isValid = true;

  fields.forEach((field) => {
    if (field.value.trim() === '') {
      field.classList.add('error');
      isValid = false;
    } else {
      field.classList.remove('error');
    }
  });

  if (phoneField.value.trim() !== '' && !validatePhone(phoneField.value)) {
    phoneField.classList.add('error');
    isValid = false;
    alert('Введите корректный номер телефона (не менее 10 цифр)');
    return;
  }

  if (isValid) {
    alert('Спасибо за заявку! Мы скоро с вами свяжемся');
    fields.forEach((field) => (field.value = ''));
  }
});
