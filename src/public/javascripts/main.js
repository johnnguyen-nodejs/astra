/**
 * main page javascripts
 */ 
  function spinLoaded() {
    $('#loader').css('display', 'none');
  }
  
  function spinLoading() {
    $('#loader').css('display', 'block');
  }
  
  function ajaxLoading() {
    $(document)
      .ajaxStart(function() {
        spinLoading();
      })
      .ajaxStop(function() {
        spinLoaded();
      });
  }
  
  function configUserMenu() {
    $('#user-setting').click(function() {
      $('#user-info').fadeToggle('fast', 'linear');
      return false;
    });
    $(document).click(function() {
      $('#user-info').fadeOut('fast', 'linear');
    });
  }

  function downMenuDashboard(){
    $("#click-menu-dashboard-down").bind("click", function(){
      $(".click-menu-down").toggleClass("active");
      socket.emit("new-invester", "have a new invester in your network");
    });
  }
  
  $(document).ready(function() { 
    configUserMenu();
    downMenuDashboard();    
    // Icon loading khi chạy ajax
    ajaxLoading();
  
  });
  