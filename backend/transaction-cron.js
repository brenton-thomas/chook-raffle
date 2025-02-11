// cron job that periodically queries a wallet to determine if it has received a donation.

//intended to be run by the unix cron table. This SO post will be useful when I forget as usual
//https://stackoverflow.com/questions/5849402/how-can-you-execute-a-node-js-script-via-a-cron-job


//mysql query to find out the target wallet, the url, the api key, and the last time the job ran

//update the system table with the current time stamp

//iterate through the transaction list to find all transactions after the previous time and less than or equal to the current 
//time   prev < t <= current.   Insert these into the donations table 


async function prev_time() {

    const qstr='SELECT donation_timestamp FROM system_table';
    var x = await bt.util.query(qstr);
    return x;
}

async function current_time() {

    const qstr='CALL donation_timestamp()';
    var x = await bt.util.query(qstr);
    return x;
}


