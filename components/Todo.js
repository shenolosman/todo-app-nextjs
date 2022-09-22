import { ListItem, ListItemText } from "@mui/material";
import moment from "moment";
import 'moment/locale/sw';

export default function Todo({ todo }) {
const {id,title,description,createdDate}=todo

  return (
    <ListItem sx={{mt:3,boxShadow:3}} style={{backgroundColor:"#fafafa"}}>
        <ListItemText primary={title}  />
        <ListItemText primary={title} secondary={moment(createdDate).format("LLL")} />
    </ListItem>
    )
}
