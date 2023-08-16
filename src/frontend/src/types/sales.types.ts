export default interface ISalesReport {
  executionDate: string | number | Date;
  productName: string;
  totalQuantitySold: number;
  totalRevenue: number;
}
