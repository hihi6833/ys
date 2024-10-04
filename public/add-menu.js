document.getElementById('menuForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    const menuName = document.getElementById('menuName').value.trim();
    const menuDescription = document.getElementById('menuDescription').value.trim();
    const menuImage = document.getElementById('menuImage').files[0];
    const menuIngredientsInput = document.getElementById('menuIngredients').value.trim();
    const menuRecipe = document.getElementById('menuRecipe').value.trim();

    // 재료 입력 유효성 검사
    if (!menuIngredientsInput) {
        alert('재료를 입력해주세요.');
        return;
    }

    // 레시피 입력 유효성 검사
    if (!menuRecipe) {
        alert('레시피를 입력해주세요.');
        return;
    }

    const menuIngredients = menuIngredientsInput.split(',')
        .map(ingredient => ingredient.trim().toLowerCase())
        .filter(ingredient => ingredient !== '');

    if (menuIngredients.length === 0) {
        alert('유효한 재료를 입력해주세요.');
        return;
    }

    if (menuImage && category) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imgSrc = e.target.result;

            const newMenu = {
                name: menuName,
                description: menuDescription,
                image: imgSrc,
                category: category,
                views: 0,
                createdAt: Date.now(),
                ingredients: menuIngredients,
                recipe: menuRecipe
            };

            // 서버에 메뉴 추가 요청
            fetch('http://localhost:3000/menus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newMenu),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('메뉴 추가에 실패했습니다.');
                }
                return response.json();
            })
            .then(data => {
                alert('메뉴가 추가되었습니다.');
                const redirectUrl = `${category}.html`;
                window.location.href = redirectUrl;
            })
            .catch(error => {
                console.error('Error:', error);
                alert('메뉴 추가 중 오류가 발생했습니다.');
            });
        }
        reader.readAsDataURL(menuImage);
    } else {
        alert('메뉴 이미지 또는 카테고리 정보가 없습니다.');
    }
});
