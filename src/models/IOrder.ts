export interface IOrder {
  updatedAt: string;
  createdAt: string;
  orderStatusId: {
    name: string;
    id: number;
  } | null;
  cityId: {
    name: string;
    id: number;
  } | null;
  pointId: {
    name: string;
    address: string;
    id: number;
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
      id: number;
    };
    thumbnail: {
      size: number;
      path: string;
      originalname: string;
      mimetype: string;
    };
    tank: number;
    colors: string[];
    id: number;
  };
  color: string;
  dateFrom: string;
  dateTo: string;
  rateId: {
    price: number;
    rateTypeId: {
      unit: string;
      name: string;
      id: number;
    };
    id: number;
  } | null;
  price: number;
  isFullTank: boolean;
  isNeedChildChair: boolean;
  isRightWheel: boolean;
  id: number;
}

export interface IOrderPost {
  orderStatusId: {
    name: string;
    id: number;
  };
  cityId: {
    name: string;
    id: number;
  };
  pointId: number;
  carId: number;
  color: string;
  dateFrom: string;
  dateTo: string;
  rateId: number;
  price: number;
  isFullTank: boolean;
  isNeedChildChair: boolean;
  isRightWheel: boolean;
}
