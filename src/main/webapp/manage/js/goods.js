var table_cols = [[
{
	field: 'gid',
	title: '序号',
	width:"7%",
	sort: true
},{
	field: 'gname', 
	title: '商品名', 
	width:"30%"
},{
	field: 'gprice', 
	title: '价格', 
	width:"10%"
},
{
	field: 'mname', 
	title: '二级分类', 
	width:"13%"
},
{
	field: 'sname', 
	title: '一级分类', 
	width:"10%"
},
{
	field: 'gstate', 
	title: '推荐状态', 
	width:"7%"
},{
	field: 'do', 
	title: '操作', 
	width: "23%",
	align:'center', 
	toolbar: '#barUse'
}]];
var masterTable_cols = [[
{
	field: 'mgid',
	//title: '序号',
	width:"20%",
	sort: true
} ,{
	field: 'mgimg', 
	//title: '图片',
	width:"40%",
	templet:'<div><img src="'+ $("#PageContext").val() +'/{{d.mgimg}}"></div>'
},{
	field: 'MasterCtrl', 
	//title: '操作', 
	width: "40%",
	align:'center', 
	toolbar: '#MasterBarUse'
}]];
var detailTable_cols = [[
{
	field: 'dgid',
	//title: '序号',
	width:"20%",
	sort: true
} ,{
	field: 'dgimg', 
	//title: '图片',
	width:"40%",
	templet:'<div><img src="'+ $("#PageContext").val() +'/{{d.dgimg}}"></div>'
},{
	field: 'DetailCtrl', 
	//title: '操作', 
	width: "40%",
	align:'center', 
	toolbar: '#DetailBarUse'
}]];
var public_mgid = 0;//用于主图上传
var public_mgimg = "";//用于主图上传
var public_dgid = 0;//用于详情图上传
var public_dgimg = "";//用于详情图上传
var public_fileCount = 0;//用于批量上传图片计数
setTableData();//数据初始化
layui.form.on("submit(editGoodsAction)", function(data) {//修改表单提交
	var gid = data.form[0].value;//gid
	var gname = data.form[1].value;//商品名
	var gprice = data.form[2].value;//价格
	var mname = data.form[4].value;//二级分类名
	var sname = data.form[6].value;//一级分类名
	var gstate = data.form[7].value;//商品状态
	$.ajax({
		type:"post",
		async:true,
		url:$("#PageContext").val()+"/manage/editGoods",
		data:{
			gid:gid,
			gname:gname,
			gprice:gprice,
			mname:mname,
			sname:sname,
			gstate:gstate
		},
		success:function(){
			layui.layer.open({
				content : '操作成功！',
				skin : "layui-layer-lan",
				icon : 6,
				yes : function(layero, index) {
					layer.closeAll();// 关闭弹窗
				}
			});
			setTableData();
		},
		error:function(){
			layer.msg('修改失败！', {icon: 5});
		}
	})
	return false;
});
layui.table.on('tool(masterTableData)',function(obj){//masterTableData
	console.log(obj.data)
	var event = obj.event;
	var mgid = obj.data.mgid;
	public_mgid = mgid;
	var mgimg = obj.data.mgimg;
	public_mgimg = mgimg;
	var gid = obj.data.gid;
	if(event == "updateMaster"){

	}else if(event == "removeMaster"){
		var index = layui.layer.open({
			skin : "layui-layer-lan",
			content : "确定删除该主图吗？",
			btn : [ "确定", "取消" ],
			yes : function() {
				$.ajax({
					type:"post",
					async:true,
					url:$("#PageContext").val()+"/manage/delMasterByMgid",
					data:{
						gid:gid,
						mgid:mgid,
						mgimg:mgimg
					},
					success:function(data){
						if(data == "false"){
							layer.msg('删除失败！', {icon: 5});
							layui.layer.close(index);
							return;
						}
						layer.msg('删除成功！', {icon: 6});
						layui.layer.close(index);
						var masterTable = layui.table.render({
							elem : '#masterTableData',
							cols : masterTable_cols,
							url: $("#PageContext").val()+"/manage/getMasterByGid",
							where:{
								gid:gid
							},
							skin : 'line',// 表格风格
							even : true,
							done:function(){
								layui.upload.render({
								    elem: ".updateMaster" //绑定元素
							    	,url:$("#PageContext").val()+"/manage/updateMaster"
								    ,before:function(){
								    	this.data = {
							    			gid:gid,
							    			mgid:public_mgid,
							    			mgimg:public_mgimg
								    	};
								    }
								    ,done: function(res,index,upload){
								    	layer.msg('更新成功！', {icon: 6});
								    	masterTable.reload();
								    }
								    ,error: function(){
								    	layer.msg('更新失败！', {icon: 5});
								    }
							  });
							}
						});
					},
					error:function(data, XMLHttpRequest, textStatus, errorThrown){
						layer.msg('删除失败！', {icon: 5});
						layui.layer.close(index);
					}
				})
			}
		})
	}
});
layui.table.on('tool(detailTableData)',function(obj){//detailTableData
	console.log(obj.data)
	var event = obj.event;
	var dgid = obj.data.dgid;
	public_dgid = dgid
	var dgimg = obj.data.dgimg;
	public_dgimg = dgimg;
	var gid = obj.data.gid;
	if(event == "updateDetail"){
		
	}else if(event == "removeDetail"){
		var index = layui.layer.open({
			skin : "layui-layer-lan",
			content : "确定删除该详情图吗？",
			btn : [ "确定", "取消" ],
			yes : function() {
				$.ajax({
					type:"post",
					async:true,
					url:$("#PageContext").val()+"/manage/delDetailByDgid",
					data:{
						gid:gid,
						dgid:dgid,
						dgimg:dgimg
					},
					success:function(data){
						if(data == "false"){
							layer.msg('删除失败！', {icon: 5});
							layui.layer.close(index);
							return;
						}
						layer.msg('删除成功！', {icon: 6});
						layui.layer.close(index);
						layui.table.render({
							elem : '#detailTableData',
							cols : detailTable_cols,
							url: $("#PageContext").val()+"/manage/getDetailByGid",
							where:{
								gid:gid
							},
							skin : 'line',// 表格风格
							even : true,
						});
					},
					error:function(){
						layer.msg('删除失败！', {icon: 5});
						layui.layer.close(index);
					}
				})
			}
		})
	}
});
layui.table.on('tool(tableData)', function(obj) {//goodsTable
	var gid = obj.data.gid;
	var gname = obj.data.gname;
	var gprice = obj.data.gprice;
	var gstate = obj.data.gstate;
	var event = obj.event;//事件
	console.log(obj)
	if (event == "updateData") {// 后台修改并获取数据
		$("#editGid").attr("value",gid);
		$("#editGname").attr("value", gname);
		$("#editGprice").attr("value",gprice);
		layui.layer.open({
			skin : "layui-layer-lan",
			type : 1,
			area : [ "35%" ],
			title : "修改信息",
			content : $("#editGoods").html()
		});
		layui.form.render()
	} else if (event == "removeData") {// 后台删除并获取数据
		layui.layer.open({
			skin : "layui-layer-lan",
			content : "确定删除该商品？（注：确定删除后系统将为您自动清空该商品下的主图与详情图！）",
			btn : [ "确定", "取消" ],
			yes : function() {
				$.ajax({
					type:"post",
					async:true,
					url:$("#PageContext").val()+"/manage/delGoodsByGid",
					data:{
						gid:gid
					},
//					success:function(){
//						layui.layer.open({
//							content : '操作成功！',
//							skin : "layui-layer-lan",
//							icon : 6,
//							time : 1500,
//							closeBtn : 0
//						});
//						setTableData();
//					},
//					error:function(){
//						layer.msg('删除失败！', {icon: 5});
//					}
				})
				layui.layer.open({
					content : '操作成功！',
					skin : "layui-layer-lan",
					icon : 6,
					time : 1500,
					closeBtn : 0
				});
				setTableData();
			}
		})
	}else if(event == "showMaster"){
		public_fileCount = 0;//初始化
		layui.layer.open({
			skin : "layui-layer-lan",
			type : 1,
			area : ["45%","95%"],
			title : "主图信息",
			content : '<table id="masterTableData" lay-filter="masterTableData"></table><div style="float:right;padding-right:9%;padding-top:3%;padding-bottom:3%"><button type="button" class="layui-btn" id="uploadMaster"><i class="layui-icon">&#xe67c;</i>上传图片 （图片最大为10M）</button><button type="button" class="layui-btn" name="closeLayer">取消</button></div>',
			success:function(){
				var masterTable = layui.table.render({
					elem : '#masterTableData',
					cols : masterTable_cols,
					url: $("#PageContext").val()+"/manage/getMasterByGid",
					where:{
						gid:gid
					},
					skin : 'line',// 表格风格
					even : true,
					done:function(){
						layui.upload.render({//更新主图
						    elem: ".updateMaster"
					    	,url:$("#PageContext").val()+"/manage/updateMaster"
						    ,before:function(){
						    	this.data = {
					    			gid:gid,
					    			mgid:public_mgid,
					    			mgimg:public_mgimg
						    	};
						    }
						    ,done: function(res,index,upload){
						    	//var item = this.item;
						    	layer.msg('更新成功！', {icon: 6});
						    	masterTable.reload();
						    }
						    ,error: function(){
						    	layer.msg('更新失败！', {icon: 5});
						    }
						});
						layui.upload.render({//上传主图（单张上传）
							elem:"#uploadMaster",
							url:$("#PageContext").val()+"/manage/uploadMaster",
//							auto: false,
//							bindAction: '#uploadMasterAction',
							size:10240,
//							multiple:true,//开启多文件上传
//							number:5,
//							choose:function(obj){
//								var fileCount = 0;
//							    obj.preview(function(index, file, result){
//							    	fileCount++;
//							    	//public_fileCount = fileCount
//							    	public_fileCount++;
//							    });
//							    setTimeout(function () { 
//							    	console.log("oo"+public_fileCount);
//							    }, 100);
//							    console.log("文件数"+public_fileCount)
////								this.data = {
////										fileCount:public_fileCount,
////										gid:gid
////								}
//							},
							before:function(){
								this.data = {
										gid:gid
								}
							},
							done:function(){
								layer.msg('上传成功！', {icon: 6});
						    	masterTable.reload();
							},
							error: function(){
						    	layer.msg('更新失败！', {icon: 5});
						    }
						})
					}
				});
			},
		});
	}else if(event == "showDetail"){
		layui.layer.open({
			skin : "layui-layer-lan",
			type : 1,
			area : ["45%","95%"],
			title : "详情图信息",
			content : '<table id="detailTableData" lay-filter="detailTableData"></table><div style="float:right;padding-right:3%;padding-top:3%;padding-bottom:3%"><button type="button" class="layui-btn" id="uploadDetail"><i class="layui-icon">&#xe67c;</i>上传图片 （图片最大为10M）</button><button type="button" class="layui-btn" name="closeLayer">关闭</button></div>',
			success:function(){
				var detailTable = layui.table.render({
					elem : '#detailTableData',
					cols : detailTable_cols,
					url: $("#PageContext").val()+"/manage/getDetailByGid",
					where:{
						gid:gid
					},
					skin : 'line',// 表格风格
					even : true,
					done:function(){
						layui.upload.render({
						    elem: ".updateDetail" //绑定元素
					    	,url:$("#PageContext").val()+"/manage/updateDetail"
						    ,before:function(){
						    	this.data = {
					    			gid:gid,
					    			dgid:public_dgid,
					    			dgimg:public_dgimg
						    	};
						    }
//				            , choose: function (obj) {
//				            	console.log(onj)
//				                //预读本地文件示例，不支持ie8
//				                obj.preview(function (index, file, result) {
////				                    $('#qrshow').attr('src', result); //图片链接（base64）
//				                	console.log(result)
//				                });
//				            }
						    ,done: function(res,index,upload){
						    	//var item = this.item;
						    	layer.msg('更新成功！', {icon: 6});
						    	detailTable.reload();
						    }
						    ,error: function(){
						    	layer.msg('更新失败！', {icon: 5});
						    }
					  });
						layui.upload.render({//上传主图（单张上传）
							elem:"#uploadDetail",
							url:$("#PageContext").val()+"/manage/uploadDetail",
							size:10240,
							before:function(){
								this.data = {
										gid:gid
								}
							},
							done:function(){
								layer.msg('上传成功！', {icon: 6});
								detailTable.reload();
							},
							error: function(){
						    	layer.msg('更新失败！', {icon: 5});
						    }
						})
					}
				});
			},
		});
	}
});

$("#selGoodsButton").click(function(){
	var gname = $("#selGname").val();
	var mname = $("#selMname option:selected").html();
	var sname = $("#selSname option:selected").html();
	var gstate = $("#selGstate").val();
	if(gname == "" && mname == "请选择" && sname == "请选择" && gstate == "-1"){
		layer.msg('未输入筛选条件！', {icon: 5});
		return false;
	}
	$.ajax({
		type:"post",
		async:true,
		url:$("#PageContext").val()+"/manage/getSelGoodsWithPagingForDyn",
		data:{
			page:1,
			limit:10,
			gname:gname,
			mname:mname,
			sname:sname,
			gstate:gstate
		},
		success:function(data){
			data = JSON.parse(data)
			var sortList = data[0];
			var materialList = data[1];
			var goodsList = data[2].rows;
			var goodsTotal = data[2].total;
			layui.table.render({
				elem : '#tableData',
				cols : table_cols,
				data : goodsList,
				skin : 'line',// 表格风格
				even : true,
				limit:goodsList.length,
			});
			layui.laypage.render({
				layout: ['count', 'prev', 'page', 'next', 'skip','limit' ] //自定义分页布局
				,elem: 'paging' //注意，这里的 paging是 ID，不用加 #号
				,curr: 1 //设定初始在第 1 页
				,groups: 5 //只显示 5 个连续页码
				,first: true //显示首页
				,last: true //显示尾页
				,count: goodsTotal //数据总数，从服务端得到
				,jump:function(obj){
					//console.log(obj)
					var page = obj.curr;
					var limit = obj.limit;
					$.ajax({
						type : "post",
						async : true,
						url : $("#PageContext").val()+"/manage/getSelGoodsWithPagingForDyn",
						data:{
							page:page,
							limit:limit,
							gname:gname,
							mname:mname,
							sname:sname,
							gstate:gstate
						},
						success:function(data){
							data = JSON.parse(data)
							var goodsList = data[2].rows;
							var goodsTotal = data[2].total;
							layui.table.render({
								elem : '#tableData',
								cols : table_cols,
								data : goodsList,
								skin : 'line',// 表格风格
								even : true,
								limit:goodsList.length,	
							});
						}
					})
				}
			});
		},
		error:function(){
			layer.msg('未找到该商品，请稍后重试！', {icon: 5});
		}
	})
	return false;
})

function setMasterTableData(){//初始化MasterTable数据
	var masterTable = layui.table.render({
		elem : '#masterTableData',
		cols : masterTable_cols,
		url: $("#PageContext").val()+"/manage/getMasterByGid",
		where:{
			gid:gid
		},
		skin : 'line',// 表格风格
		even : true,
		done:function(){
			layui.upload.render({
			    elem: ".updateMaster" //绑定元素
		    	,url:$("#PageContext").val()+"/manage/updateMaster"
			    ,before:function(){
			    	this.data = {
		    			gid:gid,
		    			mgid:public_mgid,
		    			mgimg:public_mgimg
			    	};
			    }
//	            , choose: function (obj) {
//	            	console.log(onj)
//	                //预读本地文件示例，不支持ie8
//	                obj.preview(function (index, file, result) {
////	                    $('#qrshow').attr('src', result); //图片链接（base64）
//	                	console.log(result)
//	                });
//	            }
			    ,done: function(res,index,upload){
			      //上传完毕回调
			    	//var item = this.item;
			    	layer.msg('更新成功！', {icon: 6});
			    	masterTable.reload();
			    }
			    ,error: function(){
			      //请求异常回调
			    	layer.msg('更新失败！', {icon: 5});
			    }
		  });
		}
	});
}

function setTableData(){
	var gname = $("#selGname").val();
	var mname = $("#selMname option:selected").html();
	var sname = $("#selSname option:selected").html();
	var gstate = $("#selGstate").val();
	$.ajax({
		type : "post",
		async : true,
		url : $("#PageContext").val()+"/manage/getSelGoodsWithPagingForDyn",
		data:{
			page:1,
			limit:10,
			gname:gname,
			mname:mname,
			sname:sname,
			gstate:gstate
		},
		success : function(data) {
			if(data == "1"){
				layer.msg('您尚未添加一级分类，即将前往一级分类界面！', {icon: 5});
				setTimeout(function () { 
					window.location.href = projectName+"/manage/sort";
			    }, 1000);
				return;
			}else if(data == "2"){
				layer.msg('您尚未添加二级分类，即将前往二级分类界面！', {icon: 5});
				setTimeout(function () { 
					window.location.href = projectName+"/manage/material";
			    }, 1000);
				return;
			}else{
				data = JSON.parse(data)
			}
			console.log(data)
			var sortList = data[0];
			var materialList = data[1];
			var goodsList = data[2].rows;
			var goodsTotal = data[2].total;
			var sortOptionStr = "";
			var materialOptionStr = "";
			$("#editMaterial").find("option").remove();
			$("#editSname").find("option").remove();
			$("#selMname").find("option").remove();
			$("#selSname").find("option").remove();
			for(var i = 0; i < materialList.length;i++){
				materialOptionStr += "<option value='" + i + "'>" + materialList[i].mname
				+ "</option>"
			}
			for (var i = 0; i < sortList.length; i++) {
				sortOptionStr += "<option value='" + i + "'>" + sortList[i].sname
				+ "</option>"
			}
			$("#editMaterial").append(materialOptionStr);
			$("#editSname").append(sortOptionStr);
			$("#selMname").append("<option value=\"-1\">请选择</option>"+materialOptionStr);
			$("#selSname").append("<option value=\"-1\">请选择</option>"+sortOptionStr);
			layui.form.render('select');//更新选择框
			layui.table.render({
				elem : '#tableData',
				cols : table_cols,
				data : goodsList,
				skin : 'line',// 表格风格
				even : true,
				limit:goodsList.length,
			}); 
			layui.laypage.render({
				layout: ['count', 'prev', 'page', 'next', 'skip','limit' ] //自定义分页布局
				,elem: 'paging' //注意，这里的 paging是 ID，不用加 #号
				,curr: 1 //设定初始在第 1 页
				,groups: 5 //只显示 5 个连续页码
				,first: true //显示首页
				,last: true //显示尾页
				,count: goodsTotal //数据总数，从服务端得到
				,jump:function(obj){
					//console.log(obj)
					var page = obj.curr;
					var limit = obj.limit;
					$.ajax({
						type : "post",
						async : true,
						url : $("#PageContext").val()+"/manage/getSelGoodsWithPagingForDyn",
						data:{
							page:page,
							limit:limit,
							gname:gname,
							mname:mname,
							sname:sname,
							gstate:gstate
						},
						success:function(data){
							data = JSON.parse(data)
							var goodsList = data[2].rows;
							var goodsTotal = data[2].total;
							layui.table.render({
								elem : '#tableData',
								cols : table_cols,
								data : goodsList,
								skin : 'line',// 表格风格
								even : true,
								limit:goodsList.length,	
							});
						}
					})
				}
			});
		},
		error:function(){
			layer.msg('获取数据失败，请稍后刷新页面重试！', {icon: 5});
		}
	})
}