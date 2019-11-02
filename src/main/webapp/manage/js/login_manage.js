var projectName = $("#PageContext").val();
function saveReport() {
	var uname = $("input[name='uname']").val()
	var upassword = $("input[name='upassword']").val()
	if(uname == "" || upassword == ""){
		layer.msg('请输入账号或密码！', {icon: 5});
	}else{
		$.ajax({
			type : "post",
			url : projectName+"/manage/managerLogin",
			data : $('#login_form').serialize(),
		}).success(function(res) {
			if(res == "-1"){
				layer.msg('登录失败，账号或密码有误！', {icon: 5});
			}else{
        		layer.msg('登录成功！', {icon: 6});
        		setTimeout(function () { 
        			window.location.href = projectName+"/manage/sort";
        	    }, 1000);
			}
		}).fail(function(err) {
			console.log(err)
		})
	}
	return false;
}