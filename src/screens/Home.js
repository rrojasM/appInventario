import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, ScrollView, TouchableOpacity, Image } from 'react-native';
import { COLORS, Items } from '../data/Index';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Home = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [bebidas, setBebidas] = useState([]);


    useEffect(() => {
        const unSubscribe = navigation.addListener('focus', () => {
            getDataFromData();
        });

        return unSubscribe;
    }, [navigation]);

    const getDataFromData = () => {
        let productList = [];
        let bebidasList = [];

        for (let index = 0; index < Items.length; index++) {
            if (Items[index].category == 'product') {
                productList.push(Items[index]);

            } else if (Items[index].category == 'bebidas') {
                bebidasList.push(Items[index]);
            }
        }

        setProducts(productList);
        setBebidas(bebidasList);
    }


    const ProductCard = ({ data }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('ProductoInfo', { productID: data.id })}
                style={{ width: '48%', marginVertical: 14 }}>
                <View style={{
                    width: '100%',
                    height: 100,
                    borderRadius: 10,
                    backgroundColor: COLORS.BACKGROUNDLIGHT,
                    position: 'relative',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 8
                }}>
                    {data.isOff ? (
                        <View
                            style={{
                                position: 'absolute',
                                width: '20%',
                                height: '24%',
                                backgroundColor: COLORS.GREEN,
                                top: 0,
                                left: 0,
                                borderTopLeftRadius: 10,
                                borderBottomRightRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Text style={{ fontSize: 12, color: COLORS.WHITE, fontWeight: 'bold', letterSpacing: 1 }}>{data.offPercentage}%</Text>
                        </View>
                    ) : null}
                    <Image
                        source={data.productImage}
                        style={{
                            width: '80%',
                            height: '80%',
                            resizeMode: 'contain'
                        }}
                    />
                </View>
                <Text style={{ fontSize: 12, color: COLORS.BLACK, fontWeight: '600', marginBottom: 2 }}>
                    {data.productName}
                </Text>
                {data.category === 'bebidas' ? (
                    data.isAvailable ? (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome
                                name='circle'
                                style={{
                                    fontSize: 12,
                                    marginRight: 6,
                                    color: COLORS.GREEN
                                }}
                            />
                            <Text style={{ fontSize: 12, color: COLORS.GREEN }}>
                                Disponible
                            </Text>
                        </View>
                    ) : (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome
                                name='circle'
                                style={{
                                    fontSize: 12,
                                    marginRight: 6,
                                    color: COLORS.RED
                                }}
                            />
                            <Text style={{ fontSize: 12, color: COLORS.RED }}>
                                No Disponible
                            </Text>
                        </View>
                    )
                ) : null}
                <Text>$ {data.price}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: '#FFF' }}>
            <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
            <ScrollView>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: COLORS.GREEN }}>
                    <TouchableOpacity>
                        <Image
                            source={require('../assets/bolso-de-la-tienda.png')}
                            style={{
                                width: 35,
                                height: 35,
                                fontSize: 12,
                                marginRight: 6,
                                color: COLORS.GREEN
                            }}
                        />
                        {/* <Entypo name='shopping-bag' style={{ fontSize: 18, color: COLORS.BACKGROUNDMEDIUM, padding: 12, borderRadius: 10, backgroundColor: COLORS.BACKGROUNDLIGHT }} /> */}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('MyCart')}>
                        {/*  <MaterialCommunityIcons
                            name='cart'
                            style={{ fontSize: 18, color: COLORS.BACKGROUNDMEDIUM, padding: 12, borderRadius: 10, borderWidth: 1, borderColor: COLORS.BACKGROUNDLIGHT }}
                        /> */}
                        <Image
                            source={require('../assets/carrito-de-compras.png')}
                            style={{
                                width: 35,
                                height: 35,
                                fontSize: 12,
                                marginRight: 6,
                                color: COLORS.GREEN
                            }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ marginBottom: 10, padding: 16, backgroundColor: COLORS.GREEN }}>
                    <Text style={{ fontSize: 26, color: '#000', fontWeight: '500', letterSpacing: 1, marginBottom: 10 }}>Demo Inventario</Text>
                    <Text style={{ fontSize: 14, color: '#000', fontWeight: '400', letterSpacing: 1, lineHeight: 24 }}>SubTitulo</Text>
                </View>
                <View style={{ padding: 16 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, color: '#000', fontWeight: '500', letterSpacing: 1 }}>Productos</Text>
                            <Text style={{ fontSize: 14, color: '#000', fontWeight: '400', opacity: 0.5, marginLeft: 10 }}>{products.length}</Text>
                        </View>
                        <Text style={{ fontSize: 14, color: COLORS.BLUE, fontWeight: '400' }}>Ver Todos</Text>
                    </View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                        {products.map(data => {
                            return <ProductCard data={data} key={data.id} />
                        })}
                    </View>
                </View>
                {/* <View style={{ padding: 16 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, color: '#000', fontWeight: '500', letterSpacing: 1 }}>Bebidas</Text>
                            <Text style={{ fontSize: 14, color: '#000', fontWeight: '400', opacity: 0.5, marginLeft: 10 }}>{products.length}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                            {bebidas.map(data => {
                                return <ProductCard data={data} key={data.id} />
                            })}
                        </View>
                    </View>
                </View> */}
            </ScrollView>
        </View>
    )
}

export default Home;