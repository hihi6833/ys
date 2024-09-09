document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const menuIndex = parseInt(urlParams.get('menuIndex'), 10);  // 문자열을 정수로 변환
    const category = urlParams.get('category');

    const savedMenus = JSON.parse(localStorage.getItem('menus')) || [];
    const categoryMenus = savedMenus.filter(menu => menu.category === category);

    // 메뉴가 존재하는지 확인
    if (categoryMenus[menuIndex]) {
        const menu = categoryMenus[menuIndex];

        document.getElementById('menuName').textContent = menu.name;
        document.getElementById('menuImage').src = menu.image;
        document.getElementById('menuDescription').textContent = menu.description;

        // 뒤로가기 버튼을 카테고리 페이지로 연결
        document.getElementById('backBtn').addEventListener('click', function() {
            window.location.href = `${category}.html`;
        });

        // 삭제 버튼 동작
        document.getElementById('deleteMenuBtn').addEventListener('click', function() {
            if (confirm('정말로 이 메뉴를 삭제하시겠습니까?')) {
                // 메뉴 삭제
                const filteredMenus = savedMenus.filter(menu => !(menu.category === category && categoryMenus.indexOf(menu) === menuIndex));
                localStorage.setItem('menus', JSON.stringify(filteredMenus));
                alert('메뉴가 삭제되었습니다.');
                window.location.href = `${category}.html`;
            }
        });
    } else {
        alert('해당 메뉴를 찾을 수 없습니다.');
        window.location.href = `${category}.html`;
    }
});
