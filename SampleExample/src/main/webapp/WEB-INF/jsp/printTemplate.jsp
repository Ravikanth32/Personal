<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script type="text/javascript" src="/js/jquery.min.js"></script>
<script type="text/javascript" src="/js/jquery-ui.js"></script>
<script type="text/javascript">
$("document").ready(function(){
	$('body').find('input,textarea').each(function() {
		  $(this).replaceWith($("<span />").text(this.value));
		});
});
</script>
</head>
<body>

Name:${template.name }<br>
Content:${template.content }

</body>
</html>