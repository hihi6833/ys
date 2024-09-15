// script.js

// localStorage에서 'menus'를 가져와서 화면에 표시하는 함수
function loadMenus() {
    const menuList = document.getElementById('menuList');
    menuList.innerHTML = ''; // 기존 메뉴 목록 초기화

    const savedMenus = JSON.parse(localStorage.getItem('menus')) || [];

    if (savedMenus.length === 0) {
        const noMenuItem = document.createElement('li');
        noMenuItem.textContent = 'No menus available';
        menuList.appendChild(noMenuItem);
    } else {
        savedMenus.forEach((menu, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${index}: ${menu.name} - ${menu.description}`;
            menuList.appendChild(listItem);
        });
    }
}

// 특정 인덱스의 메뉴 삭제 함수
function deleteMenu() {
    const menuIndex = document.getElementById('menuIndex').value;
    const savedMenus = JSON.parse(localStorage.getItem('menus')) || [];

    if (menuIndex < 0 || menuIndex >= savedMenus.length) {
        alert('Invalid menu index!');
        return;
    }

    savedMenus.splice(menuIndex, 1); // 해당 인덱스의 메뉴 삭제
    localStorage.setItem('menus', JSON.stringify(savedMenus)); // 업데이트된 메뉴 목록 저장

    loadMenus(); // 업데이트된 메뉴 목록 다시 로드
    alert('Menu deleted successfully.');
}

// 모든 메뉴 삭제 함수
function deleteAllMenus() {
    if (confirm('Are you sure you want to delete all menus?')) {
        localStorage.removeItem('menus'); // localStorage에서 'menus' 삭제
        loadMenus(); // 업데이트된 메뉴 목록 다시 로드
        alert('All menus have been deleted.');
    }
}

// 이벤트 리스너 설정
document.getElementById('deleteAllMenus').addEventListener('click', deleteAllMenus);
document.getElementById('deleteMenu').addEventListener('click', deleteMenu);

// 페이지가 로드될 때 메뉴를 불러오기
window.onload = loadMenus;
