var todos= {};

$.ajax("http://localhost:3500/todos").done(function(result){
  console.log(result);

  todos=result;
  for (const todo of Object.keys(todos)) {
    $(".contents ul").append(liTemplate(todo,todos[todo]));
  }
});

var todos = new Array();

$("#addButton").click(function() {
  var text = $("#inputBox").val();
  todos[text]=false;
  $("#inputBox").val("");
  console.log(todos);

  $(".contents ul").append(liTemplate(text,false)); //text에 있는거 리스트 추가
  saveTodos(); //추가하기 . 서버 전송 후 저장.
});

function inputTemplate(text,checked){
  var inputTag= $('<input type="checkbox" id="checkBox">');
  inputTag.data("value", text);
  inputTag.attr("checked", checked);
  return inputTag;
}
function buttonTemplate(text){
  var buttonTag=$('<button id="deleteButton">X</button>');
  buttonTag.data("value",text);
  return buttonTag;
}
function liTemplate(text,checked) {
  var li= $("<li></li>");

  li.attr("value",text);
  li.append(inputTemplate(text,checked));
  li.append(text);
  li.append(buttonTemplate(text));

  li.click(function(event) {
    var el= $(event.target); //무슨 이벤트인지 확인.
    console.log(el.data("value"));

    if (el.is("button")) {
      delete todos[text];
      $(`li[value='${text}']`).remove();
      } else if (el.is("input[type='checkbox']")) {
      var isChecked = el.is(":checked");
      if (isChecked) {
        $(`li[value='${text}']`).addClass("checked");
        todos[text]=true;
      } else {
        $(`li[value='${text}']`).removeClass("checked");
        todos[text]=false;
      }
    }
    saveTodos() //수정시 서버 전송 후 저장.
  });
}

function saveTodos() {
  $.ajax({
    url: "http://localhost:3500/todos",
    method: "POST",
    data: JSON.stringify({ todos : todos }), //todos 정보 문자열 변경 후 전송
    dataType: "json",
    contentType: "application/json"
  }).done(function(){
    console.log("POST done");
  });
}
