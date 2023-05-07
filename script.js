const productsContainer = document.querySelector('.frame__products')

const createProduct = obj => {
    const div = document.createElement('div');
    div.className = 'product';

    const link = document.createElement('a');
    link.href = '#';
    div.appendChild(link);

    const img = document.createElement('img');
    img.className = 'product__img';
    img.src = obj.image;
    img.alt = obj.title;
    link.appendChild(img);

    const nameLink = document.createElement('a');
    nameLink.className = 'product__name';
    nameLink.href = '#';
    nameLink.textContent = obj.title;
    div.appendChild(nameLink);

    const price = document.createElement('p');
    price.className = 'product__price';
    price.textContent = obj.price + ' €';
    div.appendChild(price);

    const button = document.createElement('button');
    button.className = 'product__button';
    button.dataset.id = obj.id
    button.textContent = 'Add to cart';
    div.appendChild(button);

    productsContainer.appendChild(div);
}

const initFrame = () => {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(json => {
            for (let el in json) {
                createProduct(json[el])
            }
            initialSlick();
            listenToAddToCart();
        })
}



const listenToAddToCart = () => {
    const buttons = [...document.querySelectorAll('.product__button')];
    buttons.forEach(button => {
        button.addEventListener('click', e => {
            addToCart(e.target.dataset.id)
        })
    });
}

const addToCart = id => {
    // const url = 'https://www.fakesomedomain.com'
    // fetch(`${url}?addToCart=${id}`)
    //     .then(() => {
    //         showInfo()
    //     })
    showInfo()
}

const showInfo = () => {
    const info = document.querySelector('.frame__cartInfo')
    info.style.display = 'block'
    setTimeout(() => {
        info.style.display = 'none'
    }, 800)
}

const initialSlick = () => {
    $(".frame__products").slick({
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnFocus: false,
        pauseOnHover: false,
        prevArrow: $(".frame__arrow--left"),
        nextArrow: $(".frame__arrow--right"),
        responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 5
                },
            },
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 4
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3
                },
            },
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 2
                },
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1
                },
            },
        ],
    });
}

initFrame();