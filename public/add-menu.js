document.getElementById('menuForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');

  const menuName = document.getElementById('menuName').value;
  const menuDescription = document.getElementById('menuDescription').value;
  const menuImage = document.getElementById('menuImage').files[0];

  if(menuImage && category) {
    const savedMenus = JSON.parse(localStorage.getItem('menus')) || [];

    // 메뉴 중복 확인
    const isDuplicate = savedMenus.some(menu => menu.name === menuName && menu.category === category);
    if (isDuplicate) {
        alert('이미 등록된 메뉴 이름입니다.');
        return;  // 중복되면 더 이상 진행하지 않음
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const imgSrc = e.target.result;

        const newMenu = {
            name: menuName,
            description: menuDescription,
            image: imgSrc,
            category: category
        };

          
        savedMenus.push(newMenu);
        localStorage.setItem('menus', JSON.stringify(savedMenus));

        alert('메뉴가 추가되었습니다.');
        window.location.href = `${category}.html`;
    }
    reader.readAsDataURL(menuImage);
    } 
    
    else 
    {
        alert('카테고리 정보가 없습니다.');
    }
});
