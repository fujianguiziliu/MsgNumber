<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>短信代发平台</title>
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
	<div style="padding:5%;padding-left:20%;padding-right:20%">
		<form class="layui-form">
		  <div class="layui-form-item layui-form-text">
		    <label class="layui-form-label" style="color:white">编辑短信息</label>
		    <div class="layui-input-block">
		      <textarea placeholder="请输入" class="layui-textarea" style="min-height:100px"></textarea>
		    </div>
		  </div>
		  <div class="layui-form-item layui-form-text">
		    <label class="layui-form-label" style="color:white">编辑手机号</label>
		    <div class="layui-input-block">
		      <textarea height="300px" placeholder="请输入" class="layui-textarea"></textarea>
		    </div>
		  </div>
		  <div class="layui-form-item" style="text-align:right">
		    <div class="layui-input-block">
		    	<button class="layui-btn" >上传文件</button>
		      <button class="layui-btn" lay-submit lay-filter="*">立即提交</button>
		      <button type="reset" class="layui-btn layui-btn-primary">重置</button>
		    </div>
		  </div>
		</form>
	</div>
	<script type="text/javascript" src="${pageContext.request.contextPath }/jquery/jquery-1.7.2.min.js" charset="utf-8"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath }/manage/layui/layui.all.js"></script>
</body>
</html>