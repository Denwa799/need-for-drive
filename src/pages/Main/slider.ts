import styles from './Main.module.less';

export const MainPageSlider = [
  {
    key: '1',
    title: 'Бесплатная парковка',
    text: 'Оставляйте машину на платных городских парковках и разрешенных местах, не нарушая ПДД, а также в аэропортах',
    backgroundClassName: styles.carouselImg1,
    button: 'Подробнее',
    btnBackground: 'linear-gradient(to right, #13493F, #0C7B1B)',
  },
  {
    key: '2',
    title: 'Страховка',
    text: 'Полная страховка страховка автомобиля',
    backgroundClassName: styles.carouselImg2,
    button: 'Подробнее',
    btnBackground: 'linear-gradient(to right, #132949, #0C7B67',
  },
  {
    key: '3',
    title: 'Бензин',
    text: 'Полный бак на любой заправке города за наш счёт',
    backgroundClassName: styles.carouselImg3,
    button: 'Подробнее',
    btnBackground: 'linear-gradient(to right, #493013, #7B0C3B)',
  },
  {
    key: '4',
    title: 'Обслуживание',
    text: 'Автомобиль проходит еженедельное ТО',
    backgroundClassName: styles.carouselImg4,
    button: 'Подробнее',
    btnBackground: 'linear-gradient(to right, #281349, #720C7B)',
  },
];
