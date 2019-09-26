const FlexContract = require('flex-contract');
const abi = require('./izi.abi.json');
const deployed_at = "0xdf59c8ba19b4d1437d80836b45f1319d9a429eed";
//0xdac17f958d2ee523a2206206994597c13d831ec7
const contract = (abi, deployed_at) => {
    return new FlexContract(abi, deployed_at);
}

function live(contract,from,to,cb){
    try {
        let watcher = contract.Transfer.watch({
            args: {
                'from': from, // Addr of user
                'to': to // Addr of astra
            }
         });
         watcher.on('data', (event) => {
             cb(event)
             //watcher.close();
         });
    } catch (err) {
        console.log(err);
    }
}
//0x94edbfcF609A410474de5fA5050Dc804163C2AA2
live(contract(abi,deployed_at),'0x01F8505B9B33e88c339E02C7338F7d95DDeb1b48','0xB814152c37a5a0706D5ef54377672a844e5811aa',(event) => {
    console.log(event.args);
})

module.exports = {
    live: live,
    contract: contract,
    abi: abi,
    deployed_at: deployed_at
};