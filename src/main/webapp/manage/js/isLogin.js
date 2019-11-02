var projectName = $("#PageContext").val();
var uname = $("#uname").val();
var upassword = $("#upassword").val();
if(uname == "" || upassword == ""){
	layer.msg('您尚未登录账号，即将前往登录界面！', {icon: 5});
	setTimeout(function () { 
		window.location.href = projectName+"/manage/login";
    }, 500);
}

function editAccount(){
	$("#editUid").attr("value",$("#uid").val());
	$("#editUname").attr("value",$("#uname").val());
	$("#editUpassword").attr("value",$("#upassword").val());
	layui.layer.open({
		skin : "layui-layer-lan",
		type : 1,
		area : [ "25%"],
		title : "添加二级分类",
		content : $("#editAccount").html()
	});
	layui.form.render()
}

layui.form.on("submit(editAccountAction)", function(data) {//添加表单提交
	var uid = data.form[0].value// uid
	var uname = data.form[1].value//账号
	var upassword = data.form[2].value//密码
	$.ajax({
		type:"post",
		async:true,
		url:$("#PageContext").val()+"/manage/editAccount",
		data:{
			uid:uid,
			uname:uname,
			upassword:upassword
		},
		success:function(){
			layer.msg('修改成功，请重新登录账号！', {icon: 6});
			setTimeout(function(){
				window.location.href = projectName+"/manage/login";
			},1000) 
		},
		error:function(){
			layer.msg('修改失败！', {icon: 5});
		}
	})
	return false;
});

function exitAccount(){
	layui.layer.open({
		skin : "layui-layer-lan",
		content : "是否退出账号？",
		btn : [ "确定", "取消" ],
		yes : function() {
			$.ajax({
				type:"get",
				async:true,
				url:projectName+"/manage/exitAccount",
				success:function(){
					layer.msg('退出成功，即将前往登录界面！', {icon: 6});
					setTimeout(function(){
						window.location.href = projectName+"/manage/login";
					},1000) 
				},
				error:function(){
					layer.msg('退出失败！', {icon: 5});
				}
			})
		}
	})
}