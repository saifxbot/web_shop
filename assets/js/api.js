// Fetch product data
fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
        const productList = document.querySelector('#productList');

        // Loop through the data and create product cards
        data.forEach(product => {
            // Create a list item for each product
            const listItem = document.createElement('li');
            listItem.classList.add('scrollbar-item');

            // Create a card container for each product
            const card = document.createElement('div');
            card.classList.add('shop-card');

            // Create card banner with product image
            const cardBanner = document.createElement('div');
            cardBanner.classList.add('card-banner', 'img-holder');
            cardBanner.style.cssText = 'width: 100%; height: auto; position: relative;';

            const img = document.createElement('img');
            img.src = product.image;
            img.alt = product.title;
            img.loading = 'lazy';
            img.classList.add('img-cover');

            // Make the image adjustable and responsive
            img.style.width = '100%';  // Ensure image stretches to fit the container
            img.style.height = 'auto'; // Maintain aspect ratio

            // Append image to the banner
            cardBanner.appendChild(img);

            // Create card actions (like Add to Cart, Wishlist, etc.)
            const cardActions = document.createElement('div');
            cardActions.classList.add('card-actions');

            const addToCartButton = document.createElement('button');
            addToCartButton.classList.add('action-btn');
            addToCartButton.setAttribute('aria-label', 'add to cart');
            addToCartButton.innerHTML = '<ion-icon name="bag-handle-outline" aria-hidden="true"></ion-icon>';
            cardActions.appendChild(addToCartButton);

            const addToWishlistButton = document.createElement('button');
            addToWishlistButton.classList.add('action-btn');
            addToWishlistButton.setAttribute('aria-label', 'add to wishlist');
            addToWishlistButton.innerHTML = '<ion-icon name="star-outline" aria-hidden="true"></ion-icon>';
            cardActions.appendChild(addToWishlistButton);

            const compareButton = document.createElement('button');
            compareButton.classList.add('action-btn');
            compareButton.setAttribute('aria-label', 'compare');
            compareButton.innerHTML = '<ion-icon name="repeat-outline" aria-hidden="true"></ion-icon>';
            cardActions.appendChild(compareButton);

            // Add card banner and actions to the card
            card.appendChild(cardBanner);
            card.appendChild(cardActions);

            // Create card content with title, price, and description
            const cardContent = document.createElement('div');
            cardContent.classList.add('card-content');

            // Add title
            const title = document.createElement('h3');
            const titleLink = document.createElement('a');
            titleLink.href = '#';
            titleLink.classList.add('card-title');
            titleLink.textContent = product.title;
            title.appendChild(titleLink);

            // Add price
            const price = document.createElement('p');
            price.classList.add('card-price');
            price.textContent = `$${product.price}`;

            // Add description
            const description = document.createElement('p');
            description.classList.add('card-description');
            description.textContent = product.description;

            // Add title, price, and description to card content
            cardContent.appendChild(title);
            cardContent.appendChild(price);
            cardContent.appendChild(description);

            // Add card content to the card
            card.appendChild(cardContent);

            // Append the card to the list item
            listItem.appendChild(card);

            // Append the list item to the product list container
            productList.appendChild(listItem);
        });
    })
    .catch(error => console.error('Error fetching data:', error));
