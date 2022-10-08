import {
  Grid,
  Pagination,
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import AppPagination from "../../app/components/AppPagination";
import CheckBoxButtons from "../../app/components/CheckBoxButtons";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {
  fetchFilters,
  fetchProductsAsync,
  productSelectors,
  setPageNumber,
  setProductsParams,
} from "./catalogSlice";
import ProductList from "./ProductList";
import ProductSearch from "./ProductSearch";

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price - High to low" },
  { value: "price", label: "Price - Low to High" },
];

export default function Catalog() {
  const products = useAppSelector(productSelectors.selectAll);
  const { productsLoaded, status, filtersLoaded,brands,types,productParams,metaData } = useAppSelector(
    (state) => state.catalog
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFilters());
  }, [dispatch, filtersLoaded]);

  if (!filtersLoaded)
   return <LoadingComponent message="Loading products ..." />;
  return (
    <Grid container columnSpacing={4}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2 }}>
          <ProductSearch />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <RadioButtonGroup 
            selectedValue={productParams.orderBy}
            options={sortOptions}
            onChange={(e)=>dispatch(setProductsParams({orderBy:e.target.value}))}
          />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckBoxButtons
          items = {brands}
          checked = {productParams.brands}
          onChange = {(items:string[])=>dispatch(setProductsParams({brands:items}))}
          />
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
        <CheckBoxButtons
          items = {types}
          checked = {productParams.types}
          onChange = {(items:string[])=>dispatch(setProductsParams({types:items}))}
          />
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <ProductList products={products} />
      </Grid>
      <Grid item xs={3} />
      <Grid item xs = {9} sx={{mb:4}}>
        {metaData&&
        <AppPagination 
           metaData={metaData}
           onPageChange={(page:number)=>dispatch(setPageNumber({pageNumber:page}))}
        />}
      </Grid>
    </Grid>
  );
}
