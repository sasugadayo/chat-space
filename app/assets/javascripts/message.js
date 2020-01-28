$(function () {
  var buildHTML = function(message) {
    if (message.content && message.image) {
      var html = `<div class="message" data-message-id = ${message.id} >
        <div class="chat_main__message__list__message__upper-message">
          <div class="chat_main__message__list__message__upper-message__user-namee"> 
          ${message.user_name} 
          </div>
          <div class="chat_main__message__list__message__upper-message__date">
          ${message.created_at}
          </div>
        </div>
        <div class="lower-message">
          <p class="lower-message__content">
          ${message.content}
          </p>
          <img src= "${message.image}" class="lower-message__image" > 
        </div>
      </div>`

      return html;
    } else if (message.content) {
      var html = `<div class="message" data-message-id= ${message.id}>
        <div class="chat_main__message__list__message__upper-message">
          <div class="chat_main__message__list__message__upper-message__user-name">
          ${message.user_name}
          </div>
          <div class="chat_main__message__list__message__upper-message__date">
          ${message.created_at}
          </div>
        </div>
        <div class="lower-message">
          <p class="lower-message__content"> 
          ${message.content}
          </p> 
        </div> 
      </div>`
      return html;

    } else if (message.image) {
      var html = `<div class="message" data-message-id = ${message.id} >
        <div class="chat_main__message__list__message__upper-message">
          <div class="chat_main__message__list__message__upper-message__user-name">
          ${message.user_name}
          </div>
          <div class="chat_main__message__list__message__upper-message__date">
          ${message.created_at}
          </div>
        </div>
        <div class="lower-message">
          <img src= "${message.image}" class="lower-message__image" >
        </div>
      </div>`

      return html;
    };
  }
  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function(message){
        var html = buildHTML(message);
        $('.chat_main__message').append(html);      
        $('.new_message')[0].reset();
        $('.box').animate({'height' : '200px'});
        $('.chat_main__message').animate({ scrollTop: $('.chat_main__message')[0].scrollHeight});
        $('.form__submit').prop('disabled', false);
      })
      .fail(function() {
        alert("メッセージ送信に失敗しました");
      })
    });
  
  var reloadMessages = function() {
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
      .done(function(messages) {
        if (messages.length !== 0) {
          var insertHTML = '';
          $.each(messages, function(i, message) {
            insertHTML += buildHTML(message)
          });
          $('.chat_main__message').append(insertHTML);
          $('.chat_main__message').animate({ scrollTop: $('.chat_main__message')[0].scrollHeight});
          $("#new_message")[0].reset();
          $(".form__submit").prop("disabled", false);
        }
      })
      .fail(function () {
        alert('自動更新に失敗しました');
      })
    }
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
  setInterval(reloadMessages, 3000);
  }
});
