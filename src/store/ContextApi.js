import { createContext } from "react";
 
export const AllProducts=createContext("");
export const Gender=createContext("");
export const ProductCategory=createContext("");
export const SubCategoryList=createContext("");
export const SubSqrCategoryList=createContext("");
export const Banners=createContext("");
export const TrendProducts=createContext("");
export const WishListProducts=createContext([]);
export const CartProducts=createContext([]);
export const PageNumber=createContext(1);
export const MinimumPrice=createContext("0");
export const MaximumPrice=createContext("");
export const LoadingProducts=createContext(true);
export const IsFinishPageNumber=createContext(false);
export const Productss=createContext([]);//to determine finish page
