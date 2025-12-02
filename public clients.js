<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>Simple Chat</title>
<style>
body{font-family:tahoma; margin:20px}
#messages{height:300px; overflow:auto; border:1px solid #ccc; padding:10px}
#users{border:1px solid #eee; padding:10px; max-height:200px; overflow:auto}
.row{display:flex; gap:20px}
</style>
</head>
<body>
<h2>Chat</h2>
<div>
اسمك: <input id="username" placeholder="اكتب اسمك" />
<button id="reg">تسجيل</button>
</div>


<div class="row" style="margin-top:10px">
<div style="flex:1">
<div id="messages"></div>
<input id="text" placeholder="اكتب رسالة" style="width:80%" />
<button id="send">إرسال</button>
</div>
<div style="width:200px">
<h4>المستخدمين</h4>
<div id="users"></div>
</div>
</div>


<script src="/socket.io/socket.io.js"></script>
<script src="client.js"></script>
</body>
</html>
