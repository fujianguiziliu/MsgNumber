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
		      ,{field: 'sn_tel', title: '用户提交订单的手机号明细', width:"25%"}
		      ,{field: 'sn_detail', title: '用户提交订单的详细短信息', width:"25%"}
		      ,{field: 'sn_points', title: '扣除积分', width:"10%"}
		      ,{field: 'sn_uid', title: '会员名', width:"15%"}
		      ,{field: 'gmt_create', title: '最近查看时间', width:"15%"}
		    ]]
		    ,skin: 'line' //表格风格
		    	
		  });
}














  





		