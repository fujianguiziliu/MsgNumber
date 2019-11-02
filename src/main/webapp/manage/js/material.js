var table_cols = [[
{
	field: 'mid',
	title: '序号',
	width:"16%",
	sort: true
},{
	field: 'mname', 
	title: '名称', 
	width:"32%"
},{
	field: 'sname', 
	title: '种类', 
	width:"24%"
},{
	field: 'do', 
	title: '操作', 
	width: "28%",
	align:'center', 
	toolbar: '#barUse'
}]];
setTableData();//数据初始化
function showAddForm(){//点击“添加”弹出addForm层
	layui.layer.open({
		skin : "layui-layer-lan",
		type : 1,
		area : [ "25%","50%"],
		title : "添加二级分类",
		content : $("#addForm").html()
	});
	layui.form.render()
}
layui.form.on("submit(addAction)", function(data) {//添加表单提交
	var mname = data.form[0].value// 二级分类名
	var sname = data.form[2].value//一级分类名
	$.ajax({
		type:"post",
		async:true,
		url:$("#PageContext").val()+"/manage/addMaterial",
		data:{
			mname:mname,
			sname:sname
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
			layer.msg('添加失败！', {icon: 5});
		}
	})
	return false;
})
layui.form.on("submit(editAction)", function(data) {//修改表单提交
	var mid = data.form[0].value//ID
	var mname = data.form[1].value// 二级分类名
	var sname = data.form[3].value//一级分类名
	var isCheckedGoods = data.form[4].checked//是否联动修改商品
	var oldMname = data.form[4].name//用于联动修改商品
	$.ajax({
		type:"post",
		async:true,
		url:$("#PageContext").val()+"/manage/editMaterial",
		data:{
			mid:mid,
			mname:mname,
			sname:sname,
			isCheckedGoods:isCheckedGoods,
			oldMname:oldMname
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
})
layui.form.on("submit(delAction)", function(data) {//修改表单提交
	var mid = data.form[0].value//ID
	var isCheckedGoods = data.form[1].checked//是否联动修改商品
	var oldMname = data.form[1].name//用于联动修改商品
	$.ajax({
		type:"post",
		async:true,
		url:$("#PageContext").val()+"/manage/delMaterial",
		data:{
			mid:mid,
			isCheckedGoods:isCheckedGoods,
			oldMname:oldMname
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
			layer.msg('删除失败！', {icon: 5});
		}
	})
	return false;
})
layui.table.on('tool(tableData)', function(obj) {
	var mid = obj.data.mid //ID
	var mname = obj.data.mname//二级分类名
	var sname = obj.data.sname//一级分类名
	var event = obj.event//事件
	if (event == "updateData") {// 后台修改并获取数据
		$("#editMname").attr("value", mname);
		$("#editMid").attr("value",mid);
		$("#editOldMname").attr("name",mname);
		layui.layer.open({
			skin : "layui-layer-lan",
			type : 1,
			area : [ "25%" ],
			title : "修改信息",
			content : $("#editForm").html()
		});
		layui.form.render()
	} else if (event == "removeData") {// 后台删除并获取数据
		$("#delMid").attr("value", mid);
		$("#delOldMname").attr("name",mname);
		layui.layer.open({
			skin : "layui-layer-lan",
			type : 1,
			area : [ "25%" ],
			title : "删除信息",
			content : $("#delForm").html()
		});
		layui.form.render();
	}
})
function setTableData(){
	$.ajax({
		type : "get",
		async : true,
		url : $("#PageContext").val()+"/manage/getMaterialData",
		success : function(data) {
			var resData = JSON.parse(data);
			var sortList = resData[1];
			var materialList = resData[0];
			if(sortList.length <= 0){
				layer.msg('您尚未添加一级分类，即将前往一级分类界面！', {icon: 5});
				setTimeout(function () { 
					window.location.href = projectName+"/manage/sort";
			    }, 1000);
				return;
			}
			var optionsStr = "";
			$("#addSname").find("option").remove();
			$("#editSname").find("option").remove();
			for (var i = 0; i < sortList.length; i++) {
				optionsStr += "<option value='" + i + "'>" + sortList[i].sname
				+ "</option>"
			}
			$("#addSname").append(optionsStr);
			$("#editSname").append(optionsStr);
			if (materialList.length <= 0) {
//				$("#nullDataImg").css("display", "block")
//				$("#cardBody").css("display", "none")
				layui.layer.open({
					skin : 'layui-layer-lan'
					,
					title : "提示",
					anim : 3,
					content : "您尚未添加过二级分类，是否开始添加？",
					btn : [ "确定", "取消" ],
					shade : [ 0.8, '#393D49' ],
					yes : function() {
						layui.layer.open({
							skin : "layui-layer-lan",
							type : 1,
							area : [ "25%" ],
							title : "添加类型",
							content : $("#addform").html()
						});
						layui.form.render()
					},
					btn2 : function() {
						layer.closeAll()
					}
				});
			} else {
//				$("#cardBody").css("display", "block")
//				$("#nullDataImg").css("display", "none")
				// 渲染table
				layui.table.render({
					elem : '#tableData',
					cols : table_cols,
					data : materialList,
					skin : 'line',// 表格风格
					limit:materialList.length,
					even : true,
				});
			}
		},
	});
}