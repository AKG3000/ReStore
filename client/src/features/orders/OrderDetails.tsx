import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { BasketItem } from "../../app/models/basket";
import { Order } from "../../app/models/order";
import { currencyFormat } from "../../app/utils/util";
import BasketSummary from "../basket/BasketSummary";
import BasketTable from "../basket/BasketTable";

interface Props {
  order: Order;
  setSelectedOrder: (orderId: number) => void;
}

export default function OrderDetails({ order, setSelectedOrder }: Props) {
  const subtotal = order.orderItems.reduce((sum,item)=>sum+(item.quantity*item.price),0)??0;
  return (
    <>
    <Typography sx={{p:2}} gutterBottom variant="h4">Order# {order.id} - {order.orderStatus}</Typography>
      <Button onClick={() => setSelectedOrder(0)} color="secondary">
        Return to Order List
      </Button>
      <BasketTable items={order.orderItems as BasketItem[]} isBasket={false}/>
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary subtotal={subtotal}/>
        </Grid>
      </Grid>
    </>
  );
}
