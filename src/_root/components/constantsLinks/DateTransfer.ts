import { formatDistanceToNow, parseISO } from 'date-fns';


export const useDateTransfer = (prop:any)=>{
    const timeString = prop;
const date = parseISO(timeString);
const timeAgo = formatDistanceToNow(date, { addSuffix: true });
return timeAgo
}

