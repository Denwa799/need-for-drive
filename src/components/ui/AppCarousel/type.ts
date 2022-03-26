export interface IAppCarousel {
  items: {
    key: string;
    title: string;
    text: string;
    backgroundClassName: string;
    button: string;
    btnBackground?: string;
  }[];
}
