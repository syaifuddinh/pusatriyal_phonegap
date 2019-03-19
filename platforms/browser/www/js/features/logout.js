$(document).ready(function() {
  $('#logout-btn').on('click', function() {
    LogoutUser();
  })

  function LogoutUser()
  {
    $.ajax({
      url: 'http://localhost/pusatriyal/logout',
      type: 'get',
      success: function(res) {
        window.open('index.html');
      },
      error: function(err) {
        alert('Logout error, hubungi pengembang !');
      }
    })
    // window.open('index.html');
  }
});
