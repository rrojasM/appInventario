import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, Animated, ToastAndroid, Image, StatusBar, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS, Items } from '../data/Index';

const ProductoInfo = ({ route, navigation }) => {
  const { productID } = route.params;
  const [product, setProduct] = useState({});
  const width = Dimensions.get('window').width;
  const scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, width);

  useEffect(() => {
    const unSubscribe = navigation.addListener('focus', () => {
      getDataFromDB();
    });
    return unSubscribe;
  }, [navigation]);

  const getDataFromDB = async () => {
    for (let index = 0; index < Items.length; index++) {
      if (Items[index].id == productID) {
        await setProduct(Items[index]);
        return
      }
    }
  }



  const addToCard = async (id) => {
    let itemArray = await AsyncStorage.getItem('cartItems');
    itemArray = JSON.parse(itemArray);

    if (itemArray) {
      let array = itemArray;
      array.push(id);
      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        ToastAndroid.show(
          'Producto Agregado Correctamente',
          ToastAndroid.SHORT,
        );
        navigation.navigate('Home');
      } catch (error) {
        return error
      }
    } else {
      let array = [];
      array.push(id);
      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        ToastAndroid.show(
          'Producto Agregado Correctamente',
          ToastAndroid.SHORT,
        );
        navigation.navigate('Home');
      } catch (error) {
        return error;
      }
    }
  }

  /*  const renderProduct = ({ item, index }) => {
     return (
       <View style={{ width: width, height: 240, alignItems: 'center', justifyContent: 'center' }}>
         <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
       </View>
     )
   } */

  return (
    <View style={{ width: '100%', height: '100%', backgroundColor: COLORS.WHITE, position: 'relative' }}>
      <StatusBar backgroundColor={COLORS.BACKGROUNDLIGHT} barStyle="dark-content" />
      <ScrollView>
        <View style={{ width: '100%', backgroundColor: COLORS.BACKGROUNDLIGHT, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, position: 'relative', justifyContent: 'center', alignItems: 'center', marginBottom: 4 }}>
          <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 16, paddingLeft: 16 }}>
            <TouchableOpacity onPress={() => navigation.goBack('Home')}>
              <Image source={require('../assets/atras.png')} style={{ width: 10, height: 10, padding: 12, borderRadius: 10 }} />
            </TouchableOpacity>
          </View>

          {/* <FlatList
            data={product.productImageList ? product.productImageList : null}
            horizontal
            renderItem={renderProduct}
            showsHorizontalScrollIndicator={false}
            decelerationRate={0.8}
            snapToInterval={width}
            bounces={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
          /> */}

          <View style={{ width: width, height: 240, alignItems: 'center', justifyContent: 'center', marginBottom: 15 }}>
            <Image source={{ uri: product.productImage }} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
          </View>
          {/* <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 16, marginTop: 32 }}>
            {product.productImageList
              ? product.productImageList.map((data, index) => {
                let opacity = position.interpolate({
                  inputRange: [index - 1, index, index + 1],
                  outputRange: [0.2, 1, 0.2],
                  extrapolate: 'clamp',
                });
                return (
                  <Animated.View
                    key={index}
                    style={{
                      width: '16%',
                      height: 2.4,
                      backgroundColor: COLORS.BLACK,
                      opacity,
                      marginHorizontal: 4,
                      borderRadius: 100,
                    }}></Animated.View>
                );
              }) : null}
          </View> */}
        </View>

        <View style={{ paddingHorizontal: 16, marginTop: 6 }}>
          {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 14 }}>
            <Image source={require("../assets/carrito-de-compras.png")} style={{ width: 18, height: 18, marginRight: 6 }} />
            <Text style={{ fontSize: 12, color: '#000' }}>Carrito de Compras</Text>
          </View> */}
          <View style={{ flexDirection: 'row', marginVertical: 4, alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 24, fontWeight: '600', letterSpacing: 0.5, marginVertical: 10, color: '#000', maxWidth: '95%' }}>{product.productName}</Text>
          </View>
          <Text style={{ fontSize: 13, color: '#000', fontWeight: '400', letterSpacing: 1, opacity: 0.5, lineHeight: 20, marginBottom: 18, textAlign: 'justify' }}>{product.description}</Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold', maxWidth: '95%', color: '#000', marginBottom: 10 }}>Precio del Producto: ${product.price}</Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold', maxWidth: '95%', color: '#000', marginBottom: 10 }}>Disponibles en Stock: {product.stock}</Text>
          {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 14, borderBottomColor: COLORS.BACKGROUNDLIGHT, borderBottomWidth: 1, paddingBottom: 20 }}>
            <View style={{ flexDirection: 'row', width: '80%', alignItems: 'center' }}>
              <View style={{ color: COLORS.BLUE, backgroundColor: COLORS.BACKGROUNDLIGHT, alignItems: 'center', justifyContent: 'center', padding: 12, borderRadius: 100, marginRight: 10 }}>
                <Text style={{ fontSize: 16, color: '#000' }}>Demo</Text>
              </View>
            </View>
          </View> */}
        </View>
      </ScrollView>
      <View style={{ position: 'absolute', bottom: 10, height: '8%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => (product.isAvailable ? addToCard(product.id) : null)} style={{ width: '86%', height: '80%', backgroundColor: COLORS.GREEN, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 12, fontWeight: '500', letterSpacing: 1, color: '#FFF', textTransform: 'uppercase' }}>{product.isAvailable ? "Agregar al Carrito" : "No disponible"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ProductoInfo;