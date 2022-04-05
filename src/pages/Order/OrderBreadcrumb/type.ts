export interface IOrderBreadcrumb {
  activeStage: number;
  maxStage: number;
  setActiveStage: (value: number) => void;
}
