import Filter from "../components/Filter";
import Products from "../components/Products";

export default function Productlar() {
  return (
    <div className="flex w-full gap-[50px] justify-center border-t-2 pt-[50px]">
       <Filter></Filter>
       <Products/>
    </div>
  );
}
