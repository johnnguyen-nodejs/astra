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
  
  function gridPhotos(layoutNumber) {
    let countRows = Math.ceil($('#imagesModal').find('div.all-images>img').length / layoutNumber);
    let layoutStr = new Array(countRows).fill(layoutNumber).join("");
    $('#imagesModal').find('div.all-images').photosetGrid({
      highresLinks: true,
      rel: 'withhearts-gallery',
      gutter: '2px',
      layout: layoutStr,
      onComplete: function() {
        $('.all-images').css({
          'visibility': 'visible'
        });
        $('.all-images a').colorbox({
          photo: true,
          scalePhotos: true,
          maxHeight: '90%',
          maxWidth: '90%'
        });
      }
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
  