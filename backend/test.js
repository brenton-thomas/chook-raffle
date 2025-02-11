const url = 'https://eth-mainnet.g.alchemy.com/v2/se8Rw0K12aqFPhJHerW4lqhjiULBY1du';
const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

const body = JSON.stringify({
    id: 1,
    jsonrpc: "2.0",
    method: "alchemy_getAssetTransfers",
    params: [
        {
            fromBlock: "0x0",
            toBlock: "latest",
            toAddress: "0x5c43b1ed97e52d009611d89b74fa829fe4ac56b1",
            withMetadata: true,
            excludeZeroValue: true,
            maxCount: "0x3e8",
            category: [
                "external"
            ]
        }
    ]
});

fetch(url, {
    method: 'POST',
    headers: headers,
    body: body
})
.then(response => response.json())
.then(  data =>{ 
            console.log(data);
            data.result.transfers.forEach(element => {
                console.log(element);
            })
        }
    )
.catch(error => console.error('Error:', error));
