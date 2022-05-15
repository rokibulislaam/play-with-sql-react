export interface Database {
  categories?: Categories[] | null;
  customers?: Customers[] | null;
  employee_territories?: EmployeeTerritories[] | null;
  employees?: Employees[] | null;
  order_details?: OrderDetails[] | null;
  orders?: Orders[] | null;
  products?: Products[] | null;
  regions?: Regions[] | null;
  shippers?: Shippers[] | null;
  suppliers?: Suppliers[] | null;
  territories?: Territories[] | null;
}
export interface Categories {
  id?: string;
  categoryName?: string;
  description?: string;
  picture?: string;
}
export interface Customers {
  id?: string;
  companyName?: string;
  contactName?: string;
  contactTitle?: string;
  address?: string;
  city?: string;
  region?: string;
  postalCode?: string;
  country?: string;
  phone?: string;
  fax?: string;
}
export interface EmployeeTerritories {
  id?: string;
  territoryId?: string;
}
export interface Employees {
  id?: string;
  lastName?: string;
  firstName?: string;
  title?: string;
  titleOfCourtesy?: string;
  birthDate?: string;
  hireDate?: string;
  address?: string;
  city?: string;
  region?: string;
  postalCode?: string;
  country?: string;
  homePhone?: string;
  extension?: string;
  photo?: string;
  notes?: string;
  reportsTo?: string;
  photoPath?: string;
}
export interface OrderDetails {
  id?: string;
  productId?: string;
  unitPrice?: string;
  quantity?: string;
  discount?: string;
}
export interface Orders {
  id?: string;
  customerId?: string;
  employeeId?: string;
  orderDate?: string;
  requiredDate?: string;
  shippedDate?: string;
  shipVia?: string;
  freight?: string;
  shipName?: string;
  shipAddress?: string;
  shipCity?: string;
  shipRegion?: string;
  shipPostalCode?: string;
  shipCountry?: string;
}
export interface Products {
  id?: string;
  productName?: string;
  supplierId?: string;
  categoryId?: string;
  quantityPerUnit?: string;
  unitPrice?: string;
  unitsInStock?: string;
  unitsOnOrder?: string;
  reorderLevel?: string;
  discontinued?: string;
}
export interface Regions {
  id?: string;
  regionDescription?: string;
}
export interface Shippers {
  id?: string;
  companyName?: string;
  phone?: string;
}
export interface Suppliers {
  id?: string;
  companyName?: string;
  contactName?: string;
  contactTitle?: string;
  address?: string;
  city?: string;
  region?: string;
  postalCode?: string;
  country?: string;
  phone?: string;
  fax?: string;
  homePage?: string;
}
export interface Territories {
  id?: string;
  territoryDescription?: string;
  regionId?: string;
}
