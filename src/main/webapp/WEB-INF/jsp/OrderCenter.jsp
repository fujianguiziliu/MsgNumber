<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>订单中心</title>
	 <meta name="keywords" content="index">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="renderer" content="webkit">
    <meta http-equiv="Cache-Control" content="no-siteapp"/>
    <link rel="apple-touch-icon-precomposed" href="${pageContext.request.contextPath }/manage/i/app-icon72x72@2x.png">
    <meta name="apple-mobile-web-app-title" content="Amaze UI"/>
    <link rel = "Shortcut Icon" href="${pageContext.request.contextPath }/pc/images/picture/logo.jpg">
    <link rel="stylesheet" href="${pageContext.request.contextPath }/manage/css/amazeui.min.css"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath }/manage/css/admin.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath }/manage/css/app.css">
   
	 <link rel="stylesheet" href="${pageContext.request.contextPath }/manage/layui/css/layui.css" media="all">
	<style type="text/css">
		body{
		 background-image:url(https://img.alicdn.com/tps/TB1h9xxIFXXXXbKXXXXXXXXXXXX.jpg);
	    -moz-background-size:cover;
	    -webkit-background-size:cover;
	    -o-background-size:cover;
	    background-size:cover;
	    }
	    .layui-textarea{
	    	min-height:278px;
	    }
	</style>
</head>
<body>
	 <header class="am-topbar am-topbar-inverse admin-header">
     
    
       <div class="am-collapse am-topbar-collapse" style="background-color:#0f1e45" id="topbar-collapse">
            <ul class="am-nav am-nav-pills am-topbar-nav am-topbar-right admin-header-list tpl-header-list">
				<li class="am-dropdown" data-am-dropdown data-am-dropdown-toggle>
                    <a class="am-dropdown-toggle tpl-header-list-link" onclick="selectParam()">
                        <span class="tpl-header-list-user-nick">${user.uname}</span><span class="tpl-header-list-user-ico">
                        	<img src="${pageContext.request.contextPath}/manage/images/user01.png">
                        </span>
                    </a>
                    <ul class="am-dropdown-content">
                        <li><a onclick="orderCenter()" style="color:white"><span class="am-icon-bell-o"></span>订单中心</a></li>
                        <li><a onclick="asumePoint()" style="color:white"><span class="am-icon-power-off"></span>消费积分</a></li>
                        <li><a onclick="editPassword()" style="color:white"><span class="am-icon-bell-o"></span>修改密码</a></li>
                        <li><a onclick="exitUser()" style="color:white"><span class="am-icon-power-off"></span>退出账号</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </header>
	<div class="form-box" style='padding-top:60px'>
		<table id="orderCenter" lay-filter="orderAction"></table>						
	</div>
	<script src="${pageContext.request.contextPath }/manage/layui/layui.all.js"></script>
	<script src="${pageContext.request.contextPath}/assets/js/my.js" type="text/javascript"></script>
    <script src="${pageContext.request.contextPath }/manage/js/amazeui.min.js"></script>
    <script src="${pageContext.request.contextPath }/manage/js/app.js"></script>	
	
	<script type="text/javascript" src="${pageContext.request.contextPath }/jquery/jquery-2.1.1.js"></script>
	<script>
	function selectParam(){
		 alert("hello world!");
		}
	</script>
</body>
</html>