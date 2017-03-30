<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
     <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
<script type="text/javascript" src="/js/jquery.min.js"></script>
	 <script type="text/javascript" src="/js/jquery-ui.js"></script>
	 <style type="text/css">
	 #iframe{
	 border:1px solid black;
    background: url(paper.gif);
    background-position: left top;
    background-repeat: repeat;
    padding: 20px; 
    width: 400px;
    height:100%
	 }
	 </style>
<script type="text/javascript">
$("document").ready(function(){
	/* var $iframe = $('#iframe');
	var content=$("#contentId").html();
	 $iframe.ready(function() {
	    $iframe.contents().find("body").append(content);
	});
	
	 $("#buttonId").click(function(){
		var content=$iframe.contents().find("html").html();
		$("#hiddenContentId").val(content)
		alert($("#hiddenContentId").val())
	})  */
	
	$("#buttonId").click(function(){
		
		$("#iframe").find(':input').each(function(){
				 var $this = $(this);
				 if ($this.is("input")) {
					 $(this).attr("value",$(this).val());
				    } else if ($this.is("select")) {
				    	alert("select")
				    } else if ($this.is("textarea")) {
				       $this.html($(this).val());
				    }
				
		});
		$("#hiddenContentId").val($("#iframe").html());
	})
	
	
	
})

</script>
</head>
<body>
<form action="/templates/saveTemplate" method="POST">
<table>
	<tr>
		<td>
		<input name="id" type="hidden" value="${template.id}" />
		Name:	<input name="name" type="text" value="${template.name}" />
			<input name="content" type="hidden" id="hiddenContentId" />
		</td> 
	</tr>
	<tr>
		<td>
		Content:<div  id="iframe"> ${template.content}</div>
		</td>
	</tr>
	<tr>
		<td colspan = "2">
                  <button id="buttonId">Submit</button>
        </td>
	</tr>
	
</table>	
</form>
</body>
</html>