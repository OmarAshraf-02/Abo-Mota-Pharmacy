import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter';
import {useNavigate} from "react-router-dom";
import timeAgo from '../utils/timeAgo';
import { Typography as JoyTypography } from '@mui/joy';
import { useFetchUserQuery } from '../../store';



export default function MessageItem({message , key}){

    // const message = {
    //     content: messageContent,
    //     sender: loggedInUser._id,
    //     recipient: selectedRecipientId,
    //     date: new Date(),
    //   }
    const { data, isFetching, error } = useFetchUserQuery(message.sender);
    const navigate = useNavigate();
    if(isFetching) return <div>Loading...</div>;

    console.log("DATA", data);

    return(
        <ListItem alignItems="flex-start min-w-full" key={key} 
            className='group/item hover:bg-slate-100 cursor-pointer rounded-lg '
            onClick={()=> {navigate(`chat/${message.sender}`)}}>
            <ListItemAvatar> <Avatar size="md"> {capitalizeFirstLetter((data.name).charAt(0))}</Avatar> </ListItemAvatar>
            <ListItemText
              primary={<div className='flex justify-between min-w-full'>
                {data.name}
                <JoyTypography level="body-sm" color="neutral">
                {timeAgo(message.date)}
                </JoyTypography>
              </div>}
              secondary={
                <React.Fragment>
                  {message.content}
                  
                </React.Fragment>
              }
            />

        </ListItem>
    )
}