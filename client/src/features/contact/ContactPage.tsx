import { Button, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { decrement, increment } from "./counterSlice";

export default function ContactPage(){
    const dispatch = useAppDispatch();
    const {data ,title} = useAppSelector(state => state.counter);
    return (
        <>
        <Typography variant='h2'>
            {title}
        </Typography>
        <Typography variant='h5'>
            The data value is : {data}
        </Typography>
        <Stack spacing ={1} direction = "row">
            <Button variant = "contained" 
                    onClick={() => dispatch(increment(1))}
                    color = "primary"
            >
                Increment
            </Button>
            <Button variant = "contained" 
                    onClick={() => dispatch(decrement(1))}
                    color = "error"
            >
                Decrement
            </Button>
        </Stack>
        </>
    )
}