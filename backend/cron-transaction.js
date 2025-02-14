// cron job that periodically queries a wallet to determine if it has received a donation.

//intended to be run by the unix cron table. This Stack Overlow post will be useful when I forget, as usual.
//https://stackoverflow.com/questions/5849402/how-can-you-execute-a-node-js-script-via-a-cron-job

//mysql query to find out the target wallet, the url, the api key, and the last block tested 

const util = require('./util');

async function get_donations() {
  
    //get the number of the last block processed  
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    const qstr='SELECT receive_account,alchemy_url,alchemy_api_key,last_donation_block FROM system_table';
   
    var x = await util.bt_query(qstr);     
    const receive_accnt = x[0].receive_account;
    const url = x[0].alchemy_url+x[0].alchemy_api_key;

    const start_block=x[0].last_donation_block+1;
    const start_block_str='0x'+start_block.toString(16);

    //now get the number of the latest block on chain.

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
    var latest_block_str=resp_json.result;
    var latest_block=+latest_block_str;

    //console.log("start_block",start_block,start_block_str);
    //console.log("latest_block",latest_block,latest_block_str);

    if (start_block > latest_block) return; //do nothing - we have already processed this
        
    console.log("debug >>> are blocks the same?",start_block,latest_block);

    const qstr2='UPDATE system_table set last_donation_block='+latest_block_str;   
    var x = await util.bt_query(qstr2);     

    const req2={
        id: 1,
        jsonrpc: "2.0",
        method: "alchemy_getAssetTransfers",
        params: [
            {
                fromBlock:start_block_str,
                toBlock: latest_block_str,
                toAddress: receive_accnt,
                withMetadata: true,
                excludeZeroValue: true,
                maxCount: "0x3e8",
                category: [
                    "external"
                ]
            }
        ]
    }

    var body2=JSON.stringify(req2)

    var response2=await fetch(url, {
        method: 'POST',
        headers: headers,
        body: body2
    });

    var resp_json2=await response2.json();
    var data=resp_json2.result;
    
    data.transfers.forEach(t => {

        const qstr3 = `INSERT INTO donations (account,hash,block_num,block_time,value)` +
                      ` VALUES (\'${t.from}\',\'${t.hash}\',${t.blockNum},\'${t.metadata.blockTimestamp}\',${t.value})`+
                      ' ON DUPLICATE KEY UPDATE hash=hash';
        
        var x = util.bt_query(qstr3);     

   }); 

   return x;
}

get_donations();

