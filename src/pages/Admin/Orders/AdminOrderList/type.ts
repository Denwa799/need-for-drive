export type PageChangeHandlerType = (pageNumber: number, pageSize: number) => void;
export type CheckCancelBtnHandlerType = (
  isCheck: boolean,
  id: number,
  cityName: string,
  cityId: number,
  pointId: number,
  carId: number,
  color: string,
  dateFrom: string,
  dateTo: string,
  rateId: number,
  price: number,
  isFullTank: boolean,
  isNeedChildChair: boolean,
  isRightWheel: boolean
) => void;
