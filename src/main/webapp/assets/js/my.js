var form = layui.form;
var element = layui.element;
var table = layui.table;
  //展示已知数据
setTableData();
function setTableData(){
	  table.render({
			elem: '#orderCenter',
			
			//url: 'http://localhost:8080/*******',
			//method: 'POST',
			//parseData:function(res){
			//	return{
			//			"code":0,
			//			data:res,		
			//		}
			//	},
			  data: [
			            {
			            	"sn_id":1,
			                "sn_tel": "<span class=\"layui-badge-dot layui-bg-red\"></span>“健·悦”身心 别样“六.一” 唱响童年的欢歌 ——第十三届艺术节暨庆“六.一”表彰活动方案（草案）",
			                "sn_detail": "<span class=\"layui-badge-dot layui-bg-red\"></span>“健·悦”身心 别样“六.一” 唱响童年的欢歌 ——第十三届艺术节暨庆“六.一”表彰活动方案（草案）",
			                "sn_points": "20",
			                "sn_uid": "西门吹雪",
			                "gmt_create": "2018-11-10 11:34"
			            },
			            {
			            	"sn_id":5,
			                "sn_tel": "<span class=\"layui-badge-dot layui-bg-red\"></span>“健·悦”身心 别样“六.一” 唱响童年的欢歌 ——第十三届艺术节暨庆“六.一”表彰活动方案（草案）",
			                "sn_detail": "<span class=\"layui-badge-dot layui-bg-red\"></span>“健·悦”身心 别样“六.一” 唱响童年的欢歌 ——第十三届艺术节暨庆“六.一”表彰活动方案（草案）",
			              
			                "sn_points": "20",
			                "sn_uid": "科比",
			                "gmt_create": "2017-11-19 01:34"
			            },
			            {
			            	"sn_id":3,
			                "sn_tel": "<span class=\"layui-badge-dot layui-bg-red\"></span>“健·悦”身心 别样“六.一” 唱响童年的欢歌 ——第十三届艺术节暨庆“六.一”表彰活动方案（草案）11111111111111111健·悦”身心 别样“六.一” 唱响童年的欢歌 ——第十三届艺术节暨庆“六.一”表彰活动方案（草案）11111111111111111111111111",
			                "sn_detail": "<span class=\"layui-badge-dot layui-bg-red\"></span>“健·悦”身心 别样“六.一” 唱响童年的欢歌 ——第十三届艺术节暨庆“六.一”表彰活动方案（草案）",
			                
			                "sn_points": "30",
			                "sn_uid": "王主任",
			                "gmt_create": "2017-05-10 11:39"
			            }
			         ]
		    ,cols: [[ //表头
		      {field: 'sn_id', title: '序号', width:"10%", sort: true}
		      ,{field: 'sn_tel', title: '用户提交订单的手机号明细', width:"28%"}
		      ,{field: 'sn_detail', title: '用户提交订单的详细短信息', width:"28%"}
		      ,{field: 'sn_points', title: '扣除积分', width:"7%"}
		      ,{field: 'sn_uid', title: '会员名', width:"12%"}
		      ,{field: 'gmt_create', title: '最近查看时间', width:"15%"}
		    ]]
		    ,skin: 'line' //表格风格
		    	
		  });
}
function selectParam(){
	$("#addForm").toggle()
	event.stopPropagation()
}




var wb; //读取完成的数据
var aa = [];
var text = [];
var rABS = false; //是否将文件读取为二进制字符串

function importExcel(obj) { //导入
    if (!obj.files) {
        return;
    }
    const IMPORTFILE_MAXSIZE = 1 * 2048; //这里可以自定义控制导入文件大小
    var suffix = obj.files[0].name.split(".")[1]
    if (suffix != 'xls' && suffix != 'xlsx') {
        alert('导入的文件格式不正确!')
        return
    }
    if (obj.files[0].size / 1024 > IMPORTFILE_MAXSIZE) {
        alert('导入的表格文件不能大于2M')
        return
    }
    var f = obj.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        var data = e.target.result;
        if (rABS) {
            wb = XLSX.read(btoa(fixdata(data)), { //手动转化
                type: 'base64'
            });
        } else {
            wb = XLSX.read(data, {
                type: 'binary'
            });
        }
        //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
        //wb.Sheets[Sheet名]获取第一个Sheet的数据
        aa = JSON.stringify(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]));
        var u = eval('(' + aa + ')');
        document.getElementById("demo").innerHTML = JSON.stringify(XLSX.utils.sheet_to_json(wb.Sheets[wb
            .SheetNames[0]]));
		console.log(wb.Sheets[wb.SheetNames[0]])
		console.log(document.getElementById("demo").innerHTML)
        //获取表格中为address的那列存入text中
        for (var i = 0; i < u.length; i++) {
            text.push(u[i].address);
        }

    };
    if (rABS) {
        reader.readAsArrayBuffer(f);
    } else {
        reader.readAsBinaryString(f);
    }
}

  
let div = document.getElementById("div");//获取到div的id

function mouseover() {

	div.style.display = "block";

}
document.onclick = function () {

div.style.display = "none";

}
div.onclick = function (e) {

	e.stopPropagation();//阻止事件冒泡

	}


		