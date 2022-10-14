export const COLORS ={
    WHITE: '#FFFFFF',
    BLACK: '#000000',
    GREEN: '#00AC76',
    RED: '#C04345',
    BLUE: '#0043F9',
    BACKGROUNDLIGHT: '#F0F0F3',
    BACKGROUNDMEDIUM: '#B9B9B9',
    BACKGROUNDDARK: '#777777'
}


export const Items = [
    {
        id: 1,
        category: 'product',
        productName: 'Botella de agua',
        price: 99,
        description: 'Refrescante botella de agua',
        isOff:true ,
        offPercentage:10 ,
        productImage: require('../assets/products/productos.png'),
        productImageList:[
            require('../assets/products/productos.png'),
            require('../assets/products/productos-normal.png'),
            require('../assets/products/productos-lacteos.png')
        ],
        stock: 10,   
    },
    {
        id: 2,
        category: 'product',
        productName: 'Vino Tito',
        price: 199,
        description: 'Vino tinto',
        isOff:true ,
        offPercentage:10 ,
        productImage: require('../assets/products/productos.png'),
        productImageList:[
            require('../assets/products/productos.png'),
            require('../assets/products/productos-normal.png'),
            require('../assets/products/productos-lacteos.png')
        ]   
    },
    {
        id: 3,
        category: 'bebidas',
        productName: 'Bebida energetica Monster',
        price: 50,
        description: 'Bebida Energetica',
        isOff:true ,
        offPercentage:10 ,
        productImage: require('../assets/accesorios/bebida-energetica.png'),
        productImageList:[
            require('../assets/accesorios/espiritu.png'),
            require('../assets/accesorios/bebida-energetica.png'),
            require('../assets/accesorios/bebida-sin-alcohol.png')
        ]   
    }
]