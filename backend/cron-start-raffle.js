//a simple job that sets the start time of the raffle to the current block

const util = require('./util');

async function stamp_current_block() {
  
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    
    const qstr='SELECT alchemy_url,alchemy_api_key,last_donation_block FROM system_table';
   
    var x = await util.bt_query(qstr);     
    const url = x[0].alchemy_url+x[0].alchemy_api_key;

    const req={
        id: 1,
        jsonrpc: "2.0",
        method: "eth_blockNumber",
        params:[]
    }

    var body=JSON.stringify(req)

    var response=await fetch(url, {
        method: 'POST',
        headers: headers,
        body: body
    });

    var resp_json=await response.json();
    var latest_block=resp_json.result;
    
    const qstr2=`UPDATE system_table set last_donation_block=${latest_block},raffle_state=\'running\'`;   
    var x = await util.bt_query(qstr2);     
}

stamp_current_block();

