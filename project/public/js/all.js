var send = document.getElementById('send');
var content = document.getElementById('content');

send.addEventListener('click', function (e) {
  e.preventDefault();
  var str = content.value;

  var xhr = new XMLHttpRequest();
  xhr.open('post', '/searchAJAX');
  xhr.setRequestHeader('Content-Type', 'application/json');
  var data = JSON.stringify({'content': str, 'list': [1, 2, 3]});
  xhr.send(data);
  xhr.onload = function () {
    console.log(xhr.responseText);
  }
});