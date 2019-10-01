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
    // Hiển thị hình ảnh grid slide trong modal tất cả ảnh, tham số truyền vào là số ảnh được hiển thị trên 1 hàng.
    // Tham số chỉ được phép trong khoảng từ 1 đến 5
    gridPhotos(5);
  
  });
  