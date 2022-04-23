export interface IOrder {
  updatedAt: number;
  createdAt: number;
  orderStatusId: {
    name: string;
    id: string;
  };
  cityId: {
    name: string;
    id: string;
  };
  pointId: {
    name: string;
    address: string;
    id: string;
  };
  carId: {
    description: string;
    priceMin: number;
    priceMax: number;
    name: string;
    number: string;
    categoryId: {
      name: string;
      description: string;
      id: string;
    };
    thumbnail: {
      size: number;
      path: string;
      originalname: string;
      mimetype: string;
    };
    tank: number;
    colors: string[];
    id: string;
  };
  color: string;
  dateFrom: number;
  dateTo: number;
  rateId: {
    price: number;
    rateTypeId: {
      unit: string;
      name: string;
      id: string;
    };
    id: string;
  };
  price: number;
  isFullTank: boolean;
  isNeedChildChair: boolean;
  isRightWheel: boolean;
  id: string;
}

export interface IOrderPost {
  orderStatusId: {
    name: string;
    id: string;
  };
  cityId: {
    name: string;
    id: string;
  };
  pointId: string;
  carId: string;
  color: string;
  dateFrom: number;
  dateTo: number;
  rateId: string;
  price: number;
  isFullTank: boolean;
  isNeedChildChair: boolean;
  isRightWheel: boolean;
}
