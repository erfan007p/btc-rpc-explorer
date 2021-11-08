"use strict";

const Decimal = require("decimal.js");
const Decimal8 = Decimal.clone({ precision:8, rounding:8 });
const gbxFun = require("./gbxFun.js");
const blockRewardEras = [ new Decimal8(50) ];
for (let i = 1; i < 34; i++) {
	let previous = blockRewardEras[i - 1];
	blockRewardEras.push(new Decimal8(previous).dividedBy(2));
}

const currencyUnits = [
	{
		type:"native",
		name:"GBX",
		multiplier:1,
		default:true,
		values:["", "gbx", "GBX"],
		decimalPlaces:8
	},
	{
		type:"native",
		name:"mGBX",
		multiplier:1000,
		values:["mgbx"],
		decimalPlaces:5
	},
	{
		type:"native",
		name:"bits",
		multiplier:1000000,
		values:["bits"],
		decimalPlaces:2
	},
	{
		type:"native",
		name:"sat",
		multiplier:100000000,
		values:["sat", "satoshi"],
		decimalPlaces:0
	},
	{
		type:"exchanged",
		name:"USD",
		multiplier:"usd",
		values:["usd"],
		decimalPlaces:2,
		symbol:"$"
	},
	{
		type:"exchanged",
		name:"EUR",
		multiplier:"eur",
		values:["eur"],
		decimalPlaces:2,
		symbol:"€"
	},
];

module.exports = {
	name:"GoByte",
	ticker:"GBX",
	logoUrlsByNetwork:{
		"main":"./img/logo/mainnet/logo.svg",
		"test":"./img/logo/testnet/logo.svg",
		"regtest":"./img/logo/regtest/logo.svg",
		"signet":"./img/logo/signet/logo.svg"
	},
	coinIconUrlsByNetwork:{
		"main":"./img/logo/mainnet/coin-icon.svg",
		"test":"./img/logo/testnet/coin-icon.svg",
		"signet":"./img/logo/signet/coin-icon.svg"
	},
	coinColorsByNetwork: {
		"main": "#F7931A",
		"test": "#1daf00",
		"signet": "#af008c",
		"regtest": "#777"
	},
	siteTitlesByNetwork: {
		"main":"GoByte Explorer",
		"test":"Testnet Explorer",
		"regtest":"Regtest Explorer",
		"signet":"Signet Explorer",
	},
	demoSiteUrlsByNetwork: {
		"main": "https://blockchain.gobyte.network",
		"test": "https://test.prenges.online",
		"signet": "https://signet.prenges.online",
	},
	knownTransactionsByNetwork: {
		main: "dc9a719dc1bcda39107ea55424f00cab512170a1cb69efa08531f483f2399f21",
		test: "dc9a719dc1bcda39107ea55424f00cab512170a1cb69efa08531f483f2399f21",
		devnet: "dc9a719dc1bcda39107ea55424f00cab512170a1cb69efa08531f483f2399f21"
	},
	miningPoolsConfigUrls:[
		"https://raw.githubusercontent.com/erfan007p/GoByte-Known-Miners/master/miners.json",
	],
	maxBlockWeight: 4000000,
	maxBlockSize: 1000000,
	minTxBytes: 166, // ref: https://en.bitcoin.it/wiki/Maximum_transaction_rate
	minTxWeight: 166 * 4, // hack
	difficultyAdjustmentBlockCount: 700,
	maxSupplyByNetwork: {
		"main": new Decimal(31800000), // ref: src/amount.h
		"test": new Decimal(31800000),
		"regtest": new Decimal(31800000),
		"signet": new Decimal(31800000)
	},
	targetBlockTimeSeconds: 150,
	targetBlockTimeMinutes: 2.5,
	currencyUnits:currencyUnits,
	currencyUnitsByName:{"GBX":currencyUnits[0], "mGBX":currencyUnits[1], "bits":currencyUnits[2], "sat":currencyUnits[3]},
	baseCurrencyUnit:currencyUnits[3],
	defaultCurrencyUnit:currencyUnits[0],
	feeSatoshiPerByteBucketMaxima: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 50, 75, 100, 150],

	halvingBlockIntervalsByNetwork: {
		"main": 210240,
		"test": 210240,
		"regtest": 150,
		"signet": 210240
	},

	// used for supply estimates that don't need full gettxoutset accuracy
	coinSupplyCheckpointsByNetwork: {
		"main": [ 0, new Decimal(0) ],
		"test": [ 0, new Decimal(0) ],
		"signet": [ 0, new Decimal(0) ],
		"regtest": [ 0, new Decimal(0) ]
	},

  // source gettxoutsetinfo rpc
	utxoSetCheckpointsByNetwork: {
		"main": {"height":793959,"bestblock":"0000000057c1e680934d7d4cd1e971f8a6ebd46014d2214ab6d37997fd5f89f1","transactions":222447,"txouts":680734,"bogosize":51061076,"hash_serialized_2":"5cb1034d684f79921213474d8fdcefdedf3e0c83a7fe7e22b20fa4e61f9260c1","disk_size":37873357,"total_amount":"10999799.04279729","lastUpdated":1636371286}
	},

	genesisBlockHashesByNetwork:{
		"main":	"0000033b01055cf8df90b01a14734cae92f7039b9b0e48887b4e33a469d7bc07",
		"test":	"00000a63181b01cd202a3e28380b334d107f01cbc0a831c2ab0751bb3370fe7a",
		"regtest": "00000dbc9aa1686b4dfb177300185c6a3e0b13d1d4d346c5bccdd19fdf9ebc5a",
		"signet":  "0000016e388ef82ceeee54a65f885b66216cd0bbf8f30d31ce3ec995d9374d68",
	},
	genesisCoinbaseTransactionIdsByNetwork: {
		"main":	"dc9a719dc1bcda39107ea55424f00cab512170a1cb69efa08531f483f2399f21",
		"test":	"dc9a719dc1bcda39107ea55424f00cab512170a1cb69efa08531f483f2399f21",
		"regtest": "dc9a719dc1bcda39107ea55424f00cab512170a1cb69efa08531f483f2399f21",
		"signet":  "dc9a719dc1bcda39107ea55424f00cab512170a1cb69efa08531f483f2399f21"
	},
	genesisCoinbaseTransactionsByNetwork:{
		"main": {
			"hex": "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff4204ffff001d01043a5468652053746172204d616c61797369612031377468204e6f76656d626572203230313720476f427974652047656e65736973205265626f726effffffff0100f2052a010000004341043e5a5fbfbb2caa5f4b7c8fd24d890d6c244de254d579b5ba629f64c1b48275f59e0e1c834a60f6ffb4aaa022aaa4866434ca729a12465f80618fb2070045cb16ac00000000",
			"txid": "dc9a719dc1bcda39107ea55424f00cab512170a1cb69efa08531f483f2399f21",
			"hash": "0000033b01055cf8df90b01a14734cae92f7039b9b0e48887b4e33a469d7bc07",
			"size": 274,
			"vsize": 274,
			"version": 1,
			"confirmations":793458,
			"vin": [
				{
					"coinbase": "04ffff001d01043a5468652053746172204d616c61797369612031377468204e6f76656d626572203230313720476f427974652047656e65736973205265626f726e",
					"sequence": 4294967295
				}
			],
			"vout": [
				{
					"value": 50,
					"n": 0,
					"scriptPubKey": {
						"asm": "043e5a5fbfbb2caa5f4b7c8fd24d890d6c244de254d579b5ba629f64c1b48275f59e0e1c834a60f6ffb4aaa022aaa4866434ca729a12465f80618fb2070045cb16 OP_CHECKSIG",
						"hex": "41043e5a5fbfbb2caa5f4b7c8fd24d890d6c244de254d579b5ba629f64c1b48275f59e0e1c834a60f6ffb4aaa022aaa4866434ca729a12465f80618fb2070045cb16ac",
						"reqSigs": 1,
						"type": "pubkey",
						"addresses": [
							"GgezBbQkoQJs5eCLBj9uDyzU1U5PWwVHPD"
						]
					}
				}
			],
			"blockhash": "0000033b01055cf8df90b01a14734cae92f7039b9b0e48887b4e33a469d7bc07",
			"time": 1510848000,
			"blocktime": 1510848000
		},
		"test": {
			"hex": "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff4204ffff001d01043a5468652053746172204d616c61797369612031377468204e6f76656d626572203230313720476f427974652047656e65736973205265626f726effffffff0100f2052a010000004341043e5a5fbfbb2caa5f4b7c8fd24d890d6c244de254d579b5ba629f64c1b48275f59e0e1c834a60f6ffb4aaa022aaa4866434ca729a12465f80618fb2070045cb16ac00000000",
			"txid": "dc9a719dc1bcda39107ea55424f00cab512170a1cb69efa08531f483f2399f21",
			"hash": "dc9a719dc1bcda39107ea55424f00cab512170a1cb69efa08531f483f2399f21",
			"version": 1,
			"size": 274,
			"vsize": 274,
			"locktime": 0,
			"vin": [
				{
					"coinbase": "04ffff001d01043a5468652053746172204d616c61797369612031377468204e6f76656d626572203230313720476f427974652047656e65736973205265626f726e",
					"sequence": 4294967295
				}
			],
			"vout": [
				{
					"value": 50.00000000,
					"n": 0,
					"scriptPubKey": {
						"asm": "043e5a5fbfbb2caa5f4b7c8fd24d890d6c244de254d579b5ba629f64c1b48275f59e0e1c834a60f6ffb4aaa022aaa4866434ca729a12465f80618fb2070045cb16 OP_CHECKSIG",
						"hex": "41043e5a5fbfbb2caa5f4b7c8fd24d890d6c244de254d579b5ba629f64c1b48275f59e0e1c834a60f6ffb4aaa022aaa4866434ca729a12465f80618fb2070045cb16ac",
						"reqSigs": 1,
						"type": "pubkey",
						"addresses": [
							"nTfd3dU5LkbhbiWjzmoV7G8gao9C5cowCV"
						]
					}
				}
			],
			"blockhash": "00000a63181b01cd202a3e28380b334d107f01cbc0a831c2ab0751bb3370fe7a",
			"time": 1621860500,
			"blocktime": 1621860500
		},
		// todo
		"regtest": {
			"hex": "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff4d04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73ffffffff0100f2052a01000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac00000000",
			"txid": "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
			"hash": "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
			"version": 1,
			"size": 204,
			"vsize": 204,
			"weight": 816,
			"locktime": 0,
			"vin": [
				{
					"coinbase": "04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73",
					"sequence": 4294967295
				}
			],
			"vout": [
				{
					"value": 50.00000000,
					"n": 0,
					"scriptPubKey": {
						"asm": "04678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f OP_CHECKSIG",
						"hex": "4104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac",
						"type": "pubkey"
					}
				}
			],
			"blockhash": "0f9188f13cb7b2c71f2a335e3a4fc328bf5beb436012afca590b1a11466e2206",
			"time": 1296688602,
			"blocktime": 1296688602
		},
		//todo
		"signet": {
			"hex": "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff4d04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73ffffffff0100f2052a01000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac00000000",
			"txid": "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
			"hash": "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
			"version": 1,
			"size": 204,
			"vsize": 204,
			"weight": 816,
			"locktime": 0,
			"vin": [
				{
					"coinbase": "04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73",
					"sequence": 4294967295
				}
			],
			"vout": [
				{
					"value": 50.00000000,
					"n": 0,
					"scriptPubKey": {
						"asm": "04678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f OP_CHECKSIG",
						"hex": "4104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac",
						"type": "pubkey"
					}
				}
			],
			"blockhash": "00000008819873e925422c1ff0f99f7cc9bbb232af63a077a480a3633bee1ef6",
			"time": 1598918400,
			"blocktime": 1598918400
		}
	},
	genesisBlockStatsByNetwork:{
		"main": {
			"avgfee": 0,
			"avgfeerate": 0,
			"avgtxsize": 0,
			"blockhash": "0000033b01055cf8df90b01a14734cae92f7039b9b0e48887b4e33a469d7bc07",
			"feerate_percentiles": [
				0,
				0,
				0,
				0,
				0
			],
			"height": 0,
			"ins": 0,
			"maxfee": 0,
			"maxfeerate": 0,
			"maxtxsize": 0,
			"medianfee": 0,
			"mediantime": 1510848000,
			"mediantxsize": 0,
			"minfee": 0,
			"minfeerate": 0,
			"mintxsize": 0,
			"outs": 1,
			"subsidy": 5000000000,
			"swtotal_size": 0,
			"swtotal_weight": 0,
			"swtxs": 0,
			"time": 1510848000,
			"total_out": 0,
			"total_size": 0,
			"total_weight": 0,
			"totalfee": 0,
			"txs": 1,
			"utxo_increase": 1,
			"utxo_size_inc": 117
		},
		"test": {
			"avgfee": 0,
			"avgfeerate": 0,
			"avgtxsize": 0,
			"blockhash": "00000a63181b01cd202a3e28380b334d107f01cbc0a831c2ab0751bb3370fe7a",
			"feerate_percentiles": [
				0,
				0,
				0,
				0,
				0
			],
			"height": 0,
			"ins": 0,
			"maxfee": 0,
			"maxfeerate": 0,
			"maxtxsize": 0,
			"medianfee": 0,
			"mediantime": 1621860500,
			"mediantxsize": 0,
			"minfee": 0,
			"minfeerate": 0,
			"mintxsize": 0,
			"outs": 1,
			"subsidy": 5000000000,
			"swtotal_size": 0,
			"swtotal_weight": 0,
			"swtxs": 0,
			"time": 1621860500,
			"total_out": 0,
			"total_size": 0,
			"total_weight": 0,
			"totalfee": 0,
			"txs": 1,
			"utxo_increase": 1,
			"utxo_size_inc": 117
		},
		//todo
		"regtest": {
			"avgfee": 0,
			"avgfeerate": 0,
			"avgtxsize": 0,
			"blockhash": "0f9188f13cb7b2c71f2a335e3a4fc328bf5beb436012afca590b1a11466e2206",
			"feerate_percentiles": [
				0,
				0,
				0,
				0,
				0
			],
			"height": 0,
			"ins": 0,
			"maxfee": 0,
			"maxfeerate": 0,
			"maxtxsize": 0,
			"medianfee": 0,
			"mediantime": 1510848000,
			"mediantxsize": 0,
			"minfee": 0,
			"minfeerate": 0,
			"mintxsize": 0,
			"outs": 1,
			"subsidy": 5000000000,
			"swtotal_size": 0,
			"swtotal_weight": 0,
			"swtxs": 0,
			"time": 1510848000,
			"total_out": 0,
			"total_size": 0,
			"total_weight": 0,
			"totalfee": 0,
			"txs": 1,
			"utxo_increase": 1,
			"utxo_size_inc": 117
		},
		//todo
		"signet": {
			"avgfee": 0,
			"avgfeerate": 0,
			"avgtxsize": 0,
			"blockhash": "00000008819873e925422c1ff0f99f7cc9bbb232af63a077a480a3633bee1ef6",
			"feerate_percentiles": [
				0,
				0,
				0,
				0,
				0
			],
			"height": 0,
			"ins": 0,
			"maxfee": 0,
			"maxfeerate": 0,
			"maxtxsize": 0,
			"medianfee": 0,
			"mediantime": 1510848000,
			"mediantxsize": 0,
			"minfee": 0,
			"minfeerate": 0,
			"mintxsize": 0,
			"outs": 1,
			"subsidy": 5000000000,
			"swtotal_size": 0,
			"swtotal_weight": 0,
			"swtxs": 0,
			"time": 1510848000,
			"total_out": 0,
			"total_size": 0,
			"total_weight": 0,
			"totalfee": 0,
			"txs": 1,
			"utxo_increase": 1,
			"utxo_size_inc": 117
		}
	},
	testData: {
		txDisplayTestList: {
			"65fa8d116ff98a227465487a25fd2dac786415775a30b637f2ff39178ca7fa0f" : {
				blockHeight: 10000, blockHash: "000000000003f11d79c24c81d487db25effa99dde189b2a970548532b2366c9f"
			},
			"3b48dc6ca7ffbdb9a3b16ba8d11ef3ab468f143f42cba7b08bf5e6bf90d9dd14" : {
				blockHeight: 200000, blockHash: "0000000000840404821b8cba3130fac1c78116fae33c11c8ae23e59dcbcceffe"
			},
			"c25fd02a4867273ffc2ad1fd8f8ae5802bb571ca266892fa7d666e3ead0d0289" : {
				blockHeight: 500000, blockHash: "0000000009dbbe76f7644ee699692c08b9e36472a1fcb4cfe505e307d45165e0"
			}
		}
	},
	// genesis address GgezBbQkoQJs5eCLBj9uDyzU1U5PWwVHPD
	// string = OP_DUP OP_HASH160 20 0xfa39763260eeee69469bc9dc1936a51c005661dd OP_EQUALVERIFY OP_CHECKSIG
  // asm = OP_DUP OP_HASH160 fa39763260eeee69469bc9dc1936a51c005661dd OP_EQUALVERIFY OP_CHECKSIG
  // sha256 76a914fa39763260eeee69469bc9dc1936a51c005661dd88a is b12bee3a8dd41ca1c669a3f8aaaf800fb9de0d8b8ecc4b87834448940310ce4e reversed e4ec01304984443878b4cce8b8d0ed9bf008faaa8f3a966c1ac14dd8a3eeb21b
	genesisCoinbaseOutputAddressScripthash:"e4ec01304984443878b4cce8b8d0ed9bf008faaa8f3a966c1ac14dd8a3eeb21b",
	historicalData: gbxFun.items,
	exchangeRateData:{
		jsonUrl:"https://api.coingecko.com/api/v3/simple/price?ids=gobyte&vs_currencies=usd,eur,gbp",
		responseBodySelectorFunction:function(responseBody) {
			//console.log("Exchange Rate Response: " + JSON.stringify(responseBody));

			var exchangedCurrencies = ["usd", "gbp", "eur"];

			if (responseBody.gobyte) {
				var exchangeRates = {};

				for (var i = 0; i < exchangedCurrencies.length; i++) {
					if (responseBody.gobyte[exchangedCurrencies[i]]) {
						exchangeRates[exchangedCurrencies[i].toLowerCase()] = responseBody.gobyte[exchangedCurrencies[i]].rate_float;
					}
				}

				return exchangeRates;
			}

			return null;
		}
	},
	goldExchangeRateData:{
		jsonUrl:"https://forex-data-feed.swissquote.com/public-quotes/bboquotes/instrument/XAU/USD",
		responseBodySelectorFunction:function(responseBody) {
			//console.log("Exchange Rate Response: " + JSON.stringify(responseBody));

			if (responseBody[0].topo && responseBody[0].topo.platform == "MT5") {
				var prices = responseBody[0].spreadProfilePrices[0];

				return {
					usd: prices.ask
				};
			}

			return null;
		}
	},
	blockRewardFunction:function(blockHeight, chain) {
		var nSubsidyHalvingInterval = 210240;
		var nBudgetPaymentsStartBlock = 1152;
		var nSubsidyBase = new Decimal8(15);
		var Genesisreward = new Decimal8(50);
		var Premine = new Decimal8(850000);
		function GetBlockSubsidy() {
			let nSubsidy = nSubsidyBase;
			if (blockHeight == 0) {
		    return Genesisreward;
			}
			if (blockHeight == 1) {
				return Premine;
			}
			for (var i = nSubsidyHalvingInterval; i <= blockHeight; i += nSubsidyHalvingInterval) {
				nSubsidy -= nSubsidy/12;
			}
			var nSuperblockPart = (blockHeight > nBudgetPaymentsStartBlock) ? nSubsidy/10 : 0
			return nSubsidy - nSuperblockPart;
		}
		return GetBlockSubsidy();
	}
};
