$(function(){ 
  function buildHTML(message){
    if ( message.image ) {
      var html =
      `
        <div class="chat_main__message__list__message" data-message-id=${message.id}>
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
          <img src= ${message.image} >
        </div>
        `
      return html;
    } 
    else {
      var html =
      `
        <div class="chat_main__message__list__message" data-message-id=${message.id}>
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
        </div>
        `
      return html;
    };
  }
$('#new_message').on('submit', function(e){
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
    .done(function(data){
      var html = buildHTML(data);
      $('.chat_main__message').append(html);      
      $('form')[0].reset();
      $('.box').animate({'height' : '200px'});
      $('.chat_main__message').animate({ scrollTop: $('.chat_main__message')[0].scrollHeight});
      $('.form__submit').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })
});
