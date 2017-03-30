<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>

<%-- <form action="/saveTemplate" method="post">


</form> --%>

<form action="saveTemplate" method="POST" enctype="application/x-www-form-urlencoded">
<table>
	
		
	<tr>
		<td>
			<label path="name">
				<spring:message text="Name"/>
			</label>
		</td>
		<td>
			<input name="name" type="text" />
		</td> 
	</tr>
	<tr>
		<td>
			<label for="content">
				<spring:message text="content"/>
			</label>
		</td>
		<td>
			<textarea rows="20" cols="50" name="content"></textarea>
		</td>
	</tr>
	<tr>
		<td colspan = "2">
                  <input type = "submit" value = "Submit"/>
        </td>
	</tr>
	
</table>	
</form>

</body>
</html>