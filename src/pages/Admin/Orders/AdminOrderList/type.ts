export type PageChangeHandlerType = (pageNumber: number, pageSize: number) => void;
export type CheckCancelBtnHandlerType = (
  isCheck: boolean,
  id: string,
  cityName: string,
  cityId: string,
  pointId: string,
  carId: string,
  color: string,
  dateFrom: number,
  dateTo: number,
  rateId: string,
  price: number,
  isFullTank: boolean,
  isNeedChildChair: boolean,
  isRightWheel: boolean
) => void;
