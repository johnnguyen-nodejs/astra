
function showRegisterForm() {
    $('.loginBox').fadeOut('fast', function() {
      $('.registerBox').fadeIn('fast');
      $('.login-footer').fadeOut('fast', function() {
        $('.register-footer').fadeIn('fast');
      });
      $('.modal-title').html('Sign Up');
    });
    $('.error').removeClass('alert alert-danger').html('');
  
  }
  
  function showLoginForm() {
    $('#loginModal .registerBox').fadeOut('fast', function() {
      $('.loginBox').fadeIn('fast');
      $('.register-footer').fadeOut('fast', function() {
        $('.login-footer').fadeIn('fast');
      });
  
      $('.modal-title').html('Log In');
    });
    $('.error').removeClass('alert alert-danger').html('');
  }
  
  function openLoginModal() {
    setTimeout(function() {
     window.$('#loginModal').modal('show');
      showLoginForm();
    }, 230);
    setTimeout(function() {
      $('#closeAlert').css('display', 'none');
    }, 4000);  
  }
  function openRegisterModal() {
    setTimeout(function() {
      window.$("#loginModal").modal('show');
      showRegisterForm();
    }, 230);
    setTimeout(function() {
      $('#closeAlert').css('display', 'none');
    }, 4000);
  }
  
