import { ButtonGroup, Container, Typography,Button, Alert, AlertTitle, List, ListItemText, ListItem} from "@mui/material";
import { useState } from "react";
import agent from "../../app/api/agent";

export default function AboutPage(){
    const [validationErrors,setValidationErrors]=useState<string[]>([]);

    function getValidationError(){
        agent.TestErrors.getValidationError()
        .then(()=>console.log('should not see this'))
        .catch(error=>setValidationErrors(error))
    }
    return (
        <Container>
            <Typography gutterBottom variant='h2'>Error for testing purposes</Typography>
            <ButtonGroup fullWidth>
                <Button variant='contained' onClick={()=> agent.TestErrors.get400Error().catch(error=>console.log(error))}>Test 400 Error</Button>
                <Button variant='contained' onClick={()=> agent.TestErrors.get401Error().catch(error=>console.log(error))}>Test 401 Error</Button>
                <Button variant='contained' onClick={()=> agent.TestErrors.get404Error().catch(error=>console.log(error))}>Test 404 Error</Button>
                <Button variant='contained' onClick={()=> agent.TestErrors.get500Error().catch(error=>console.log(error))}>Test 500 Error</Button>
                <Button variant='contained' onClick={getValidationError}>Test Validation Error</Button>
            </ButtonGroup>
            {validationErrors.length > 0 && 
              <Alert severity='error'>
                  <AlertTitle>Validation errors</AlertTitle>
                  <List>
                      {validationErrors.map(error => {
                          return(
                            <ListItem key="1">
                               <ListItemText>{error}</ListItemText>
                            </ListItem>
                          );
                          
                      })}
                  </List>
              </Alert> 
            }
        </Container>
    )
}