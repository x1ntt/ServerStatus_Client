// 用于循环请求api更新控件
function Status(){
	var server_index = 0;
	var server_list = {};
	var MAX_COL = 9;
	function fill_err_info(){
		console.log("获取信息错误");
	}
	
	function bytesToSize(bytes, precision, si)
	{
		var ret;
		si = typeof si !== 'undefined' ? si : 0;
		if(si != 0) {
			var megabyte = 1000 * 1000;
			var gigabyte = megabyte * 1000;
			var terabyte = gigabyte * 1000;
		} else {
			var megabyte = 1024 * 1024;
			var gigabyte = megabyte * 1024;
			var terabyte = gigabyte * 1024;
		}

		if ((bytes >= megabyte) && (bytes < gigabyte)) {
			ret = (bytes / megabyte).toFixed(precision) + ' M';

		} else if ((bytes >= gigabyte) && (bytes < terabyte)) {
			ret = (bytes / gigabyte).toFixed(precision) + ' G';

		} else if (bytes >= terabyte) {
			ret = (bytes / terabyte).toFixed(precision) + ' T';

		} else {
			return bytes + ' B';
		}
		return ret;
	}

	function getMonthTrafficStr(server){
		var monthtraffic = "";
		var trafficdiff_in = server.network_in - server.last_network_in;
		var trafficdiff_out = server.network_out - server.last_network_out;
		if(trafficdiff_in < 1024*1024*1024*1024)
			monthtraffic += (trafficdiff_in/1024/1024/1024).toFixed(1) + "G";
		else
			monthtraffic += (trafficdiff_in/1024/1024/1024/1024).toFixed(1) + "T";
		monthtraffic += " | "
		if(trafficdiff_out < 1024*1024*1024*1024)
			monthtraffic += (trafficdiff_out/1024/1024/1024).toFixed(1) + "G";
		else
			monthtraffic += (trafficdiff_out/1024/1024/1024/1024).toFixed(1) + "T";
		return monthtraffic;
	}
	
	function getNetworkStr(server){
		var netstr = "";
		if(server.network_rx < 1024*1024)
			netstr += (server.network_rx/1024).toFixed(1) + "K";
		else
			netstr += (server.network_rx/1024/1024).toFixed(1) + "M";
		netstr += " | "
		if(server.network_tx < 1024*1024)
			netstr += (server.network_tx/1024).toFixed(1) + "K";
		else
			netstr += (server.network_tx/1024/1024).toFixed(1) + "M";
		return netstr;
	}
	
	function getTrafficStr(server){
		var trafficstr = "";
		if(server.network_in < 1024*1024*1024*1024)
			trafficstr += (server.network_in/1024/1024/1024).toFixed(1) + "G";
		else
			trafficstr += (server.network_in/1024/1024/1024/1024).toFixed(1) + "T";
		trafficstr += " | "
		if(server.network_out < 1024*1024*1024*1024)
			trafficstr += (server.network_out/1024/1024/1024).toFixed(1) + "G";
		else
			trafficstr += (server.network_out/1024/1024/1024/1024).toFixed(1) + "T";
		return trafficstr;
	} 
	
	function clickTr(){
		if (this.nextSibling.style.display == "none"){
			this.nextSibling.style.display = "";
		}else{
			this.nextSibling.style.display = "none";
		}
	}
	
	function getSubInfoStr(server){
		str = ""
		str += "内存|虚存: " + bytesToSize(server.memory_used*1024, 1) + " / " + bytesToSize(server.memory_total*1024, 1) + " | " + bytesToSize(server.swap_used*1024, 0) + " / " + bytesToSize(server.swap_total*1024, 0);
		str += "<br>";
		var io = "";
		if(server.io_read < 1024*1024)
			io += parseInt(server.io_read/1024) + "K";
		else
			io += parseInt(server.io_read/1024/1024) + "M";
		io += " / "
		if(server.io_write < 1024*1024)
			io += parseInt(server.io_write/1024) + "K";
		else
			io += parseInt(server.io_write/1024/1024) + "M";
				
		str += "硬盘|读写: " + bytesToSize(server.hdd_used*1024*1024, 2) + " / " + bytesToSize(server.hdd_total*1024*1024, 2) + " | " + io;
		str += "<br>";
		
		str += "TCP/UDP/进/线: " + server.tcp_count + " / " + server.udp_count + " / " + server.process_count+ " / " + server.thread_count;
		str += "<br>";
		str += "联通/电信/移动: " + server.time_10010 + "ms / " + server.time_189 + "ms / " + server.time_10086 + "ms"
		str += "<br>";

		// ping
		var PING_10010 = server.ping_10010.toFixed(0);
		var PING_189 = server.ping_189.toFixed(0);
		var PING_10086 = server.ping_10086.toFixed(0);
		str += "丢包：联通/电信/移动: " + PING_10010 + "% / " + PING_189 + "% / " + PING_10086 + "%"
				
		return str;
	}
	
	function update_widget(server){
		if (server_list[server.name].widget == null){
			let tr = document.createElement("tr");
			tr.addEventListener("click", clickTr);
			tr.id = "r_"+server_list[server.name].index;
			for (let i=0; i<MAX_COL; i++){
				let td = document.createElement("td");
				td.id = "r_"+server_list[server.name].index+"_"+i;
				switch(i){
					case 0:
						td.innerHTML = "IPv4";
						if (server.online6){
							td.innerHTML = "IPv6";
						}		
						break;
					case 1:
						td.innerHTML = getMonthTrafficStr(server);
						break;
					case 2:
						td.innerHTML = server.name;
						break;
					case 3:
						td.innerHTML = server.load_1.toFixed(2);
						break;
					case 4:
						td.innerHTML = getNetworkStr(server);
						break;
					case 5:
						td.innerHTML = getTrafficStr(server);
						break;
					case 6:
						td.innerHTML = server.cpu+"%";
						break;
					case 7:
						td.innerHTML = ((server.memory_used/server.memory_total)*100.0).toFixed(0)+"%";
						break;
					case 8:
						td.innerHTML = ((server.hdd_used/server.hdd_total)*100.0).toFixed(0)+"%";
						break;
				}
				tr.appendChild(td);
			}
			
			let sub_tr = document.createElement("tr");
			let sub_td = document.createElement("td");
			sub_td.colSpan = MAX_COL;
			sub_td.innerHTML = getSubInfoStr(server);
			
			sub_tr.style.display = "none";
			sub_tr.appendChild(sub_td);
			
			document.getElementById("status_table").appendChild(tr);
			document.getElementById("status_table").appendChild(sub_tr);
			server_list[server.name].widget = tr;
			server_list[server.name].sub_widget = sub_tr;
			
		}else{
			for(let i=0; i<MAX_COL; i++){
				let tr = server_list[server.name].widget;
				let td = tr.childNodes[i];
				switch(i){
					case 0:
						td.innerHTML = "IPv4";
						if (server.online6){
							td.innerHTML = "IPv6";
						}		
						break;
					case 1:
						td.innerHTML = getMonthTrafficStr(server);
						break;
					case 2:
						td.innerHTML = server.name;
						break;
					case 3:
						td.innerHTML = server.load_1.toFixed(2);
						break;
					case 4:
						td.innerHTML = getNetworkStr(server);
						break;
					case 5:
						td.innerHTML = getTrafficStr(server);
						break;
					case 6:
						td.innerHTML = server.cpu+"%";
						break;
					case 7:
						td.innerHTML = ((server.memory_used/server.memory_total)*100.0).toFixed(0)+"%";
						break;
					case 8:
						td.innerHTML = ((server.hdd_used/server.hdd_total)*100.0).toFixed(0)+"%";
						break;
				}
			}
		}
	}
	
	function update_status_table(res){
		let s_table = document.getElementById('status_table');
		
		for (var i = 0, rlen=res.servers.length; i < rlen; i++) {
			let server = res.servers[i];
			if (server_list.hasOwnProperty(server.name)){
				update_widget(server);
			}else{
				let tmp = {
					server_name: server.name,
					info: server,
					index: server_index,
					widget: null,
					sub_widget: null
				};
				
				server_list[server.name] = tmp;
				update_widget(server);
				server_index += 1;
			}
		}
	}
	
	function update() {
		let xhr = new XMLHttpRequest();
		// xhr.overrideMimeType('application/json');//设置请求头
		xhr.open('GET', 'http://116.198.207.108/json/stats.json', true);//设置请求方式、路径及是同步还是异步请求
		xhr.send(null);//向服务器发送数据
		xhr.onreadystatechange = () => {
			if (xhr.readyState !== 4) {
				return ;
			}
			if (xhr.status === 0 || xhr.status === 200) {
				let res = JSON.parse(xhr.responseText);
				update_status_table(res);
			}
		}
	  }
	
	// update();
	setInterval(update, 2000);
}