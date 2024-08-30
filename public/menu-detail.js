document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const menuIndex = urlParams.get('menuIndex');

  const savedMenus = JSON.parse(localStorage.getItem('menus')) || [];
  const menu = savedMenus[menuIndex];

  if (menu) {
      document.getElementById('menuName').textContent = menu.name;
      document.getElementById('menuImage').src = menu.image;
      document.getElementById('menuDescription').textContent = menu.description;

      document.getElementById('deleteMenuBtn').addEventListener('click', function() {
          if (confirm('정말로 이 메뉴를 삭제하시겠습니까?')) {
              savedMenus.splice(menuIndex, 1);
              localStorage.setItem('menus', JSON.stringify(savedMenus));
              alert('메뉴가 삭제되었습니다.');
              window.location.href = 'index.html';
          }
      });
  } else {
      alert('해당 메뉴를 찾을 수 없습니다.');
      window.location.href = 'breakfast.html';
  }
});
