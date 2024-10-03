document.addEventListener('DOMContentLoaded', function() {
    const url = window.location.pathname;
    const category = url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.html'));

    const menuContainer = document.getElementById('menuContainer');

    // 서버에서 메뉴 데이터 가져오기
    fetch('https://recipeople-8b0228b8c755.herokuapp.com/menus')
    .then(response => {
        if (!response.ok) {
            throw new Error('메뉴 데이터를 가져오는 데 실패했습니다.');
        }
        return response.json();
    })
    .then(data => {
        const filteredMenus = data.filter(menu => menu.category === category);

        filteredMenus.forEach((menu, index) => {
            const menuItem = document.createElement('div');
            menuItem.classList.add('menuItem');

            const img = document.createElement('img');
            img.src = menu.image;
            menuItem.appendChild(img);

            const name = document.createElement('h3');
            name.textContent = menu.name;
            menuItem.appendChild(name);

            menuItem.addEventListener('click', function() {
                window.location.href = `menu-detail.html?category=${encodeURIComponent(category)}&menuIndex=${index}`;
            });

            menuContainer.appendChild(menuItem);
        });
    })
    .catch(error => {
        console.error('Error:', error);
        menuContainer.innerHTML = '<p>메뉴를 불러오는 중 오류가 발생했습니다.</p>';
    });
});
