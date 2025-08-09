document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.filter-btn');
  const cardsWrap = document.querySelector('.cards');
  const cards = Array.from(cardsWrap.querySelectorAll('.card'));

  // запомним исходный порядок
  cards.forEach((card, i) => card.dataset.index = i);

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // активная кнопка
      buttons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      // разделим на подходящие и нет, сохраняя относительный порядок
      const showList = [];
      const hideList = [];
      cards.forEach(card => {
        (filter === 'all' || card.dataset.category === filter)
          ? showList.push(card)
          : hideList.push(card);
      });

      // при "Усі" вернём исходный порядок
      const newOrder = (filter === 'all')
        ? [...cards].sort((a, b) => a.dataset.index - b.dataset.index)
        : [...showList, ...hideList];

      // сначала анимированно скрываем всё
      cards.forEach(c => { c.classList.add('hide'); c.classList.remove('show'); });

      // переупорядочим DOM: подходящие окажутся сверху/слева
      newOrder.forEach(c => cardsWrap.appendChild(c));

      // после короткого тика показываем подходящие каскадом
      let delay = 0;
      showList.forEach(card => {
        setTimeout(() => {
          card.classList.remove('hide');
          card.classList.add('show');
        }, delay);
        delay += 100; // каскад
      });
    });
  });
});
