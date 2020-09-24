// ALL VAR
var unlock = 'UNLOCKED';
var netdiff = '';
var title1 = '';
var title2 = '';
var maturity1 = '';
var maturity2 = '';
var maturity3 = '';
var maturity4 = '';
var maturity5 = '';
var currentdate = '';
var currentdate2 = '';
var validValue = 'true';
var lastvalidblock = '';
var chainHeight = '';
var lastpoolroundhash = '';
var maturityValue = 60;
var lastblockluck = '';

// TITLE
function UpdateTitle(){
	$('title').html(title1+' KH/s - '+title2+' Blocks');	 // BROWSER TITLE
}

// NETWORK
function UpdateNetworkStats(){
	$.getJSON("https://"+yourpool+"/api/network/stats", function(data) {
			$("#netcurrentblock span").html((data.height).toLocaleString());	// NETWORK CURRENT BLOCK
			chainHeight = parseInt(data.height);
			networkblockfound = data.ts * 1000;
			currentdate = new Date();
			currentdate2 = currentdate.getTime();
			networktime = parseInt(currentdate2) - parseInt(networkblockfound);
			networkdate = new Date(networktime);
			networkminute = networkdate.getUTCMinutes();
			datenetworkblockfound = new Date(networkblockfound);
			datestringnetworkblockfound = datenetworkblockfound.toLocaleString();
			$("#datenetworkblockfound span").html(datestringnetworkblockfound);	//  NETWORK DATE BLOCK FOUND
			$("#networktime span").html(networkminute+' minutes');	// NETWORK LAST BLOCK FOUND			
			$("#diff span").html((data.difficulty).toLocaleString());	// NETWORK DIFF
			$("#reward span").html(data.value / 1000000000000); // NETWORK REWARD
			netdiff = parseInt(data.difficulty);
			$("#networkhashrate span").html((netdiff / 120 / 1000000000).toFixed(1));	// NETWORK HASHRATE
	UpdatePoolStats();
	});
}

// POOL
function UpdatePoolStats(){
	$.getJSON("https://"+yourpool+"/api/pool/blocks/pplns?limit=5", function(data) {
			lastvalidblock = data[0].valid;
			lastpoolroundhash = parseInt(data[0].shares);
			lastnetdiff = parseInt(data[0].diff);
			lastblockluck = parseInt(((lastpoolroundhash / lastnetdiff) * 100).toFixed(0));
			if (validValue = data[0].valid){
				if (validValue = data[1].valid){$("#lastblockluck span").html(parseInt(((lastpoolroundhash / lastnetdiff) * 100).toFixed(0)));
					} else {$("#lastblockluck span").html(parseInt((((parseInt(data[0].shares) + parseInt(data[1].shares)) / parseInt(data[1].diff) * 100).toFixed(0))));}
			} else {$("#lastblockluck span").html(parseInt(((parseInt(data[1].shares) / parseInt(data[1].diff) * 100).toFixed(0))));};
			if (validValue = data[0].valid){
			maturity1 = 60 - (chainHeight - data[0].height);
			} else {maturity1 = 0};
			if (validValue = data[1].valid){
			maturity2 = 60 - (chainHeight - data[1].height)
			} else {maturity2 = 0};
			if (validValue = data[2].valid){
			maturity3 = 60 - (chainHeight - data[2].height);
			} else {maturity3 = 0};
			if (validValue = data[3].valid){
			maturity4 = 60 - (chainHeight - data[3].height);
			} else {maturity4 = 0};
			if (validValue = data[4].valid){
			maturity5 = 60 - (chainHeight - data[4].height);
			} else {maturity5 = 0};
	UpdateMaturity();
	});

	$.getJSON("https://"+yourpool+"/api/pool/stats/pplns", function(data) {
			$("#currentblock span").html((data.pool_statistics.lastBlockFound).toLocaleString());	// POOL CURRENT BLOCK
			currentblock = parseInt(data.pool_statistics.lastBlockFound);
			$("#network-poolblock span").html(chainHeight - currentblock);	// POOLtoNETWORK BLOCK
			$("#poolhashrate span").html((data.pool_statistics.hashRate / 1000000).toFixed(1));	//POOL HASH RATE
			$("#roundhash span").html((data.pool_statistics.roundHashes).toLocaleString());	//POOL CURRENT HASHES
			roundhash = parseInt(data.pool_statistics.roundHashes);			
//			Notification();	// BLOCK FOUND NOTIFICATION
//			CheckNotification = setInterval(Notification, 5000);
//			function Notification(){
//				if (validValue = lastvalidblock){
//					if (roundhash < 150000000){
//						alert("BLOCK FOUND!");
//					} else {return;}
//				} else {
//					if (roundhash < 150000000){
//						alert("BLOCK FOUND but ORPHAN!");
//					} else {return;}
//				}
//			}
//

			if (validValue = lastvalidblock){ 	//POOL CURRENT LUCK
				$("#luck span").html(parseInt(((roundhash / netdiff) * 100).toFixed(0)));}
			else {$("#luck span").html(parseInt((((roundhash + lastpoolroundhash)  / netdiff) * 100).toFixed(0)));}
			blockfound = data.pool_statistics.lastBlockFoundTime * 1000;
			time = parseInt(currentdate2) - parseInt(blockfound);
			date = new Date(time);
			hour = date.getUTCHours();
			minute = date.getUTCMinutes();
			dateblockfound = new Date(blockfound);
			datestringblockfound = dateblockfound.toLocaleString();
			$("#dateblockfound span").html(datestringblockfound); // POOL DATE BLOCK FOUND
			if (time < 3600000) {	// POOL LAST BLOCK FOUND
				$("#time span").html(minute+' minutes');
			} else {$("#time span").html(hour+' hours '+minute+' minutes');}
			totalblockfound = parseInt(data.pool_statistics.totalBlocksFound);
			$("#totalblockfound span").html((totalblockfound).toLocaleString());	// POOL TOTAL BLOCK FOUND
			title2 = parseInt(data.pool_statistics.totalBlocksFound);
//			if (validValue = lastvalidblock){
//				if (time < 20000){
//					alert('BLOCK FOUND with'+' '+lastblockluck+'% EFFORT');
//				} else {return;}
//			} else {
//				if (time < 20000){
//					alert('BLOCK FOUND with'+' '+lastblockluck+'% EFFORT but ORPHAN');
//				} else {return;}
//			}
	});
}


// MINERS
function UpdateMinerStats(){
	$.getJSON("https://"+yourpool+"/api/miner/"+wallet+"/stats", function(data) {
			$("#totaldue span").html((data.amtDue / 1000000000000).toFixed(10));	// MINER PENDING BALANCE
			$("#totalpaid span").html((data.amtPaid / 1000000000000).toFixed(10));	// MINER TOTAL PAID
			totalhashes = parseInt(data.totalHashes);
			$("#totalhash span").html((totalhashes).toLocaleString());	// MINER TOTAL HASH
			$("#hashrate span").html(data.hash / 1000);	// MINER GLOBAL HASHRATE
			title1 = parseInt(data.hash / 1000);
	});
	$.getJSON("https://"+yourpool+"/api/miner/"+wallet+"/identifiers", function(identifierData) {
			identifiers = identifierData;  // SORT THE IDENTIFIERS FOR CONSISTENT DISPLAY
			identifiers.sort();
			$.getJSON("https://"+yourpool+"/api/miner/"+wallet+"/stats/allWorkers", function(workerData) {
				$("#minerhashrate").html(workerData["global"].hash);	// GET ALL OF THE WORKERS HASHRATE
				
				var miner_divs = $("div.miner");	// CLEAR OUT THE OLD WORKERS DATA
				for(var i = 0; i < miner_divs.length; i++) {
					miner_divs[i].remove();
				}
				
				for(var i = 0; i < identifiers.length; i++) {		// REPLACE WITH THE NEW WORKERS DATA
					var minerid = i < 10 ? "0" + i : i;
					$("#miner").append(
						"<div class=\"data-section-item miner\" style=\"padding-bottom: 10px\">\n"+
						"<div class=\"data-item-name\" style=\"display: inline\"><span class=\"minerid\"><b><font color=\"4DC3FA\">"+minerid+" # </font></span><font color=\"0f0f0f\">"+identifiers[i]+":</font></b></div>\n"+
						"<div class=\"data-item-value\" id="+identifiers[i]+"\" style=\"display: inline\"><b><font color=\"red\">"+workerData[identifiers[i]].hash+"</font></b></div>\n"+
						"<div class=\"data-item-units\" style=\"display: inline\"><b><font color=\"5EFF33\"> H/s</font></b></div>\n"+
						"</div>\n"
					);
				}
			});
	});
}

// OVERALL LUCK
function LuckAvg(){
	$.getJSON("https://"+yourpool+"/api/pool/blocks/pplns?limit=500000", function(data) {
			sumpoolroundhash = 0;
			for (var i = 0; i < data.length; i++){
				sumpoolroundhash += parseInt(data[i].shares);
			}
			avgroundhash = parseInt(sumpoolroundhash / data.length);
			sumnetdiff = 0;
			for (var x = 0; x < data.length; x++){
				sumnetdiff += parseInt(data[x].diff);
			}
			avgnetdiff = parseInt(sumnetdiff / data.length);
			$("#luckavg span").html(((avgroundhash / avgnetdiff) * 100).toFixed(4));	// POOL OVERALL LUCK
	});
}

// MARKET & EXCHANGE
function UpdateMarketExchange(){
	$.getJSON("https://min-api.cryptocompare.com/data/pricemulti?fsyms=XMR&tsyms=USD", function(data) {
			$("#xmr-usd1 span").html(data.XMR.USD * 1);											// CRYPTOCOMPARE XMR/USD RATE
	});
	$.getJSON("https://api.cryptonator.com/api/ticker/xmr-usd", function(data) {
			$("#xmr-usd2 span").html((data.ticker.price * 1).toFixed(2));						// CRYPTONATOR XMR/USD RATE
	});
}


// MARTURITY
function showMaturityPanel(maturityAvailable){
	if (maturityAvailable) {
		$("#maturityOFF").hide();
		$("#maturityON").show();
	} else {
		$("#maturityON").hide();
		$("#maturityOFF").show();
	}
}
function UpdateMaturity(){
		if (maturity5 > 0) {
			showMaturityPanel(true);
			var maturity_divs = $("div.maturityON");
				for(var i = 0; i < maturity_divs.length; i++) {
					maturity_divs[i].remove();
				}
			$("#maturityON").append(
				"<div class=\"data-section-item maturityON\" style=\"padding-bottom: 5px\">\n"+
				"<div class=\"data-item-name\" style=\"display: inline\"><b><font color=\"4DC3FA\">MATURITY 1:</font></b></div>\n"+
				"<div class=\"data-item-value\" id="+maturity1+"\" style=\"display: inline\"><b><font color=\"red\">"+maturity1+"</font></b></div>\n"+
				"<div class=\"data-item-units\" style=\"display: inline\"><b><font color=\"5EFF33\"> to go</font></b></div>\n"+
				"</div>\n"+
				"<div class=\"data-section-item maturityON\" style=\"padding-bottom: 5px\">\n"+
				"<div class=\"data-item-name\" style=\"display: inline\"><b><font color=\"4DC3FA\">MATURITY 2:</font></b></div>\n"+
				"<div class=\"data-item-value\" id="+maturity2+"\" style=\"display: inline\"><b><font color=\"red\">"+maturity2+"</font></b></div>\n"+
				"<div class=\"data-item-units\" style=\"display: inline\"><b><font color=\"5EFF33\"> to go</font></b></div>\n"+
				"</div>\n"+
				"<div class=\"data-section-item maturityON\" style=\"padding-bottom: 5px\">\n"+
				"<div class=\"data-item-name\" style=\"display: inline\"><b><font color=\"4DC3FA\">MATURITY 3:</font></b></div>\n"+
				"<div class=\"data-item-value\" id="+maturity3+"\" style=\"display: inline\"><b><font color=\"red\">"+maturity3+"</font></b></div>\n"+
				"<div class=\"data-item-units\" style=\"display: inline\"><b><font color=\"5EFF33\"> to go</font></b></div>\n"+
				"</div>\n"+
				"<div class=\"data-section-item maturityON\" style=\"padding-bottom: 5px\">\n"+
				"<div class=\"data-item-name\" style=\"display: inline\"><b><font color=\"4DC3FA\">MATURITY 4:</font></b></div>\n"+
				"<div class=\"data-item-value\" id="+maturity4+"\" style=\"display: inline\"><b><font color=\"red\">"+maturity4+"</font></b></div>\n"+
				"<div class=\"data-item-units\" style=\"display: inline\"><b><font color=\"5EFF33\"> to go</font></b></div>\n"+
				"</div>\n"+
				"<div class=\"data-section-item maturityON\" style=\"padding-bottom: 5px\">\n"+
				"<div class=\"data-item-name\" style=\"display: inline\"><b><font color=\"4DC3FA\">MATURITY 5:</font></b></div>\n"+
				"<div class=\"data-item-value\" id="+maturity5+"\" style=\"display: inline\"><b><font color=\"red\">"+maturity5+"</font></b></div>\n"+
				"<div class=\"data-item-units\" style=\"display: inline\"><b><font color=\"5EFF33\"> to go</font></b></div>\n"+
				"</div>\n"
			);
		} else {
				if (maturity4 > 0) {
					showMaturityPanel(true);
					var maturity_divs = $("div.maturityON");
						for(var i = 0; i < maturity_divs.length; i++) {
							maturity_divs[i].remove();
						}
					$("#maturityON").append(
						"<div class=\"data-section-item maturityON\" style=\"padding-bottom: 5px\">\n"+
						"<div class=\"data-item-name\" style=\"display: inline\"><b><font color=\"4DC3FA\">MATURITY 1:</font></b></div>\n"+
						"<div class=\"data-item-value\" id="+maturity1+"\" style=\"display: inline\"><b><font color=\"red\">"+maturity1+"</font></b></div>\n"+
						"<div class=\"data-item-units\" style=\"display: inline\"><b><font color=\"5EFF33\"> to go</font></b></div>\n"+
						"</div>\n"+
						"<div class=\"data-section-item maturityON\" style=\"padding-bottom: 5px\">\n"+
						"<div class=\"data-item-name\" style=\"display: inline\"><b><font color=\"4DC3FA\">MATURITY 2:</font></b></div>\n"+
						"<div class=\"data-item-value\" id="+maturity2+"\" style=\"display: inline\"><b><font color=\"red\">"+maturity2+"</font></b></div>\n"+
						"<div class=\"data-item-units\" style=\"display: inline\"><b><font color=\"5EFF33\"> to go</font></b></div>\n"+
						"</div>\n"+
						"<div class=\"data-section-item maturityON\" style=\"padding-bottom: 5px\">\n"+
						"<div class=\"data-item-name\" style=\"display: inline\"><b><font color=\"4DC3FA\">MATURITY 3:</font></b></div>\n"+
						"<div class=\"data-item-value\" id="+maturity3+"\" style=\"display: inline\"><b><font color=\"red\">"+maturity3+"</font></b></div>\n"+
						"<div class=\"data-item-units\" style=\"display: inline\"><b><font color=\"5EFF33\"> to go</font></b></div>\n"+
						"</div>\n"+
						"<div class=\"data-section-item maturityON\" style=\"padding-bottom: 5px\">\n"+
						"<div class=\"data-item-name\" style=\"display: inline\"><b><font color=\"4DC3FA\">MATURITY 4:</font></b></div>\n"+
						"<div class=\"data-item-value\" id="+maturity4+"\" style=\"display: inline\"><b><font color=\"red\">"+maturity4+"</font></b></div>\n"+
						"<div class=\"data-item-units\" style=\"display: inline\"><b><font color=\"5EFF33\"> to go</font></b></div>\n"+
						"</div>\n"
			);
				} else {
					if (maturity3 > 0) {
						showMaturityPanel(true);
						var maturity_divs = $("div.maturityON");
							for(var i = 0; i < maturity_divs.length; i++) {
								maturity_divs[i].remove();
							}
						$("#maturityON").append(
							"<div class=\"data-section-item maturityON\" style=\"padding-bottom: 5px\">\n"+
							"<div class=\"data-item-name\" style=\"display: inline\"><b><font color=\"4DC3FA\">MATURITY 1:</font></b></div>\n"+
							"<div class=\"data-item-value\" id="+maturity1+"\" style=\"display: inline\"><b><font color=\"red\">"+maturity1+"</font></b></div>\n"+
							"<div class=\"data-item-units\" style=\"display: inline\"><b><font color=\"5EFF33\"> to go</font></b></div>\n"+
							"</div>\n"+
							"<div class=\"data-section-item maturityON\" style=\"padding-bottom: 5px\">\n"+
							"<div class=\"data-item-name\" style=\"display: inline\"><b><font color=\"4DC3FA\">MATURITY 2:</font></b></div>\n"+
							"<div class=\"data-item-value\" id="+maturity2+"\" style=\"display: inline\"><b><font color=\"red\">"+maturity2+"</font></b></div>\n"+
							"<div class=\"data-item-units\" style=\"display: inline\"><b><font color=\"5EFF33\"> to go</font></b></div>\n"+
							"</div>\n"+
							"<div class=\"data-section-item maturityON\" style=\"padding-bottom: 5px\">\n"+
							"<div class=\"data-item-name\" style=\"display: inline\"><b><font color=\"4DC3FA\">MATURITY 3:</font></b></div>\n"+
							"<div class=\"data-item-value\" id="+maturity3+"\" style=\"display: inline\"><b><font color=\"red\">"+maturity3+"</font></b></div>\n"+
							"<div class=\"data-item-units\" style=\"display: inline\"><b><font color=\"5EFF33\"> to go</font></b></div>\n"+
							"</div>\n"
						);
					} else {
						if (maturity2 > 0) {
							showMaturityPanel(true);
							var maturity_divs = $("div.maturityON");
								for(var i = 0; i < maturity_divs.length; i++) {
									maturity_divs[i].remove();
								}
							$("#maturityON").append(
								"<div class=\"data-section-item maturityON\" style=\"padding-bottom: 5px\">\n"+
								"<div class=\"data-item-name\" style=\"display: inline\"><b><font color=\"4DC3FA\">MATURITY 1:</font></b></div>\n"+
								"<div class=\"data-item-value\" id="+maturity1+"\" style=\"display: inline\"><b><font color=\"red\">"+maturity1+"</font></b></div>\n"+
								"<div class=\"data-item-units\" style=\"display: inline\"><b><font color=\"5EFF33\"> to go</font></b></div>\n"+
								"</div>\n"+
								"<div class=\"data-section-item maturityON\" style=\"padding-bottom: 5px\">\n"+
								"<div class=\"data-item-name\" style=\"display: inline\"><b><font color=\"4DC3FA\">MATURITY 2:</font></b></div>\n"+
								"<div class=\"data-item-value\" id="+maturity2+"\" style=\"display: inline\"><b><font color=\"red\">"+maturity2+"</font></b></div>\n"+
								"<div class=\"data-item-units\" style=\"display: inline\"><b><font color=\"5EFF33\"> to go</font></b></div>\n"+
								"</div>\n"
							);
						} else {
							if (maturity1 > 0) {
								showMaturityPanel(true);
								var maturity_divs = $("div.maturityON");
									for(var i = 0; i < maturity_divs.length; i++) {
										maturity_divs[i].remove();
									}
								$("#maturityON").append(
									"<div class=\"data-section-item maturityON\" style=\"padding-bottom: 5px\">\n"+
									"<div class=\"data-item-name\" style=\"display: inline\"><b><font color=\"4DC3FA\">MATURITY 1:</font></b></div>\n"+
									"<div class=\"data-item-value\" id="+maturity1+"\" style=\"display: inline\"><b><font color=\"red\">"+maturity1+"</font></b></div>\n"+
									"<div class=\"data-item-units\" style=\"display: inline\"><b><font color=\"5EFF33\"> to go</font></b></div>\n"+
									"</div>\n"
								);
							} else {
								showMaturityPanel(false);
							}
						}
					}
				}
		}
}

// UPDATE INTERVAL
function UpdateAllStats(){
	UpdateMinerStats();
	UpdateMaturity();
//	UpdatePoolStats();
	UpdateNetworkStats();
	UpdateMarketExchange();
	UpdateTitle();
	LuckAvg();
}

// SET TIME TO REFRESH ALL VALUE in SECOND
var time = 10;
$(window).on("load", function() {
	UpdateAllStats();
	setInterval(UpdateAllStats, time * 1000);
});

var time2 = 5;
$(window).on("load", function() {
	UpdatePoolStats();
	setInterval(UpdatePoolStats, time2 * 1000);
});
