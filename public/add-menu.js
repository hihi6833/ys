document.getElementById('menuForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');

  const menuName = document.getElementById('menuName').value;
  const menuDescription = document.getElementById('menuDescription').value;
  const menuImage = document.getElementById('menuImage').files[0];

  if(menuImage && category) {
      const reader = new FileReader();
      reader.onload = function(e) {
          const imgSrc = e.target.result;

          const newMenu = {
              name: menuName,
              description: menuDescription,
              image: imgSrc,
              category: category
          };

          const savedMenus = JSON.parse(localStorage.getItem('menus')) || [];
          savedMenus.push(newMenu);
          localStorage.setItem('menus', JSON.stringify(savedMenus));

          alert('메뉴가 추가되었습니다.');
          window.location.href = `${category}.html`;
      }
      reader.readAsDataURL(menuImage);
  } else {
      alert('카테고리 정보가 없습니다.');
  }
});
