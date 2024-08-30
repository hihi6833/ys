document.addEventListener('DOMContentLoaded', function() {
  const url = window.location.pathname;
  const category = url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.html'));

  const savedMenus = JSON.parse(localStorage.getItem('menus')) || [];
  const menuContainer = document.getElementById('menuContainer');

  savedMenus
      .filter(menu => menu.category === category)
      .forEach((menu, index) => {
          const menuItem = document.createElement('div');
          menuItem.classList.add('menuItem');

          const img = document.createElement('img');
          img.src = menu.image;
          menuItem.appendChild(img);

          const name = document.createElement('h3');
          name.textContent = menu.name;
          menuItem.appendChild(name);

          const description = document.createElement('p');
          description.textContent = menu.description;
          menuItem.appendChild(description);

          menuItem.addEventListener('click', function() {
              window.location.href = `menu-detail.html?menuIndex=${index}`;
          });

          menuContainer.appendChild(menuItem);
      });
});
