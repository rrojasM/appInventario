import React, { useState, useEffect } from 'react';
import { View, Text, ToastAndroid, ScrollView, TouchableOpacity, Image, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, Items } from '../data/Index';
import uuid from 'react-uuid';

const MyCart = ({ navigation }) => {

  const [product, setProduct] = useState();
  const [total, setTotal] = useState();
  const [changeNumber, setChangeNumber] = useState(1)

  /*  useEffect(() => {
     const unSubscribe = navigation.addListener('focus', () => {
       getDataFromDB();
     });
 
     return unSubscribe;
   }, [navigation]);
  */

  useEffect(() => {
    getDataFromDB();
  }, []);

  const getDataFromDB = async () => {
    let items = await AsyncStorage.getItem('cartItems');
    items = JSON.parse(items);

    let productData = [];

    if (items) {
      Items.forEach(data => {
        if (items.includes(data?.id)) {

          return productData.push(data);
        }
      });
      console.log('PRODUCT DATA =====> ', productData);
      setProduct(productData);
      getTotal(productData);
    } else {
      //setProduct(false);
      //getTotal(false);
    }
  }

  const getTotal = (productData) => {
    console.log('ProductDATA ', productData);
    console.log('ProductDATA ', productData.length);

    let total = 0;
    for (let index = 0; productData.length; index++) {
      let productPriceTotal = productData[index].price;
      total = total += productPriceTotal;
      alert('TOTAL INSIDE FOR: ', total);
    }
    //alert('TOTAL OUTSIDE FOR: ', total);
    setTotal(total);
  }

  const removeItemFromCart = async id => {
    let itemArray = await AsyncStorage.getItem('cartItems');
    itemArray = JSON.parse(itemArray);

    if (itemArray) {
      let array = itemArray;
      for (let index = 0; index < array.length; index++) {
        if (array[index] === id) {
          array.splice(index, 1);
        }

        await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        getDataFromDB();
      }
    }
  };


  const checkOut = async () => {
    try {
      await AsyncStorage.removeItem('cartItems');
    } catch (error) {
      return error;
    }

    ToastAndroid.show('Venta Realizada...', ToastAndroid.SHORT);
    navigation.navigate('Home');
  }

  const increment = () => {
    setChangeNumber(changeNumber => changeNumber + 1);
  }

  const decrement = () => {
    setChangeNumber(changeNumber => changeNumber - 1);
  }

  const renderProducts = (data, index) => {
    return (
      <>
        <View
          key={uuid()}
          style={{
            width: '100%',
            height: 100,
            marginVertical: 6,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              width: '30%',
              height: 100,
              padding: 14,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLORS.BACKGROUNDLIGHT,
              borderRadius: 10,
              marginRight: 22,
            }} onPress={() => navigation.navigate('ProductoInfo', { productID: data?.id })}>
            <Image
              source={{ uri: data?.productImage }}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              height: '100%',
              justifyContent: 'space-around',
            }}>
            <View style={{}}>
              <Text
                style={{
                  fontSize: 13,
                  maxWidth: '100%',
                  color: COLORS.BLACK,
                  fontWeight: '600',
                  letterSpacing: 1,
                }}>
                {data?.productName}
              </Text>
              <View
                style={{
                  marginTop: 4,
                  flexDirection: 'row',
                  alignItems: 'center',
                  opacity: 0.6,
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '400',
                    maxWidth: '85%',
                    marginRight: 4,
                  }}>
                  $ {data?.price}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    borderRadius: 100,
                    marginRight: 20,
                    padding: 4,
                    borderWidth: 1,
                    borderColor: COLORS.BACKGROUNDMEDIUM,
                    opacity: 0.5,
                  }}>
                  <TouchableOpacity onPress={decrement}>
                    {/* <Image style={{ width: 10, height: 10, padding: 12 }} source={require('../assets/minus.png')} /> */}
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#000' }}>-</Text>
                  </TouchableOpacity>
                </View>
                <Text>{changeNumber}</Text>
                <View
                  style={{
                    borderRadius: 100,
                    marginLeft: 20,
                    padding: 4,
                    borderWidth: 1,
                    borderColor: COLORS.BACKGROUNDMEDIUM,
                    opacity: 0.5,
                  }}>
                  <TouchableOpacity onPress={increment}>
                    {/* <Image style={{ width: 10, height: 10, padding: 12 }} source={require('../assets/plus.png')} /> */}
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#000' }}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity onPress={() => removeItemFromCart(data)}>
                <Image
                  style={{ width: 10, height: 10, padding: 12 }}
                  source={require('../assets/eliminar.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    );
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.WHITE,
        position: 'relative',
      }}>
      <ScrollView>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            paddingTop: 16,
            paddingHorizontal: 16,
            justifyContent: 'space-between',
            alignItems: 'center',

          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={{
                width: 10, height: 10, padding: 12
              }}
              source={require('../assets/atras.png')} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 18,
              color: COLORS.BLACK,
              fontWeight: 'bold',
            }}>
            Ordenes de Compras
          </Text>
          <View></View>
        </View>
        <Text
          style={{
            fontSize: 20,
            color: COLORS.BLACK,
            fontWeight: '500',
            letterSpacing: 1,
            paddingTop: 20,
            paddingLeft: 16,
            marginBottom: 10,
          }}>
          Mi Carrito
        </Text>
        <View style={{ paddingHorizontal: 16 }}>
          {product ? product.map(renderProducts) : null}
        </View>
        <View>


          <View
            style={{
              paddingHorizontal: 16,
              marginTop: 40,
              marginBottom: 80,
            }}>
            <Text
              style={{
                fontSize: 18,
                color: COLORS.BLACK,
                fontWeight: '500',
                letterSpacing: 1,
                marginBottom: 20,
              }}>
              Orden Info
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '400',
                  maxWidth: '80%',
                  color: COLORS.BLACK,
                  opacity: 0.5,
                }}>
                Total  ${total}
              </Text>
              {/*  <Text
                style={{
                  fontSize: 18,
                  fontWeight: '500',
                  color: COLORS.BLACK,
                }}>
               
              </Text> */}
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          bottom: 10,
          height: '8%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => (total != 0 ? checkOut() : null)}
          style={{
            width: '86%',
            height: '90%',
            backgroundColor: COLORS.GREEN,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
              letterSpacing: 1,
              color: COLORS.WHITE,
              textTransform: 'uppercase',
            }}>
            Total a Pagar ${total}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default React.memo(MyCart);