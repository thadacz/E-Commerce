import Address from "./address.type";
import ProductReportDTO from "./product-report-dto.type";

export default interface OrderReport {
  id?: any| null;
  customerFirstName: string;
  customerLastName: string;
  customerEmail: string;
  products: ProductReportDTO[];
  deliveryAddress: Address;
  orderStatus: string;
  date:  string;
  orderTotalAmount: number;
}