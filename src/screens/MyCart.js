import React, { useState, useEffect } from 'react';
import { View, Text, ToastAndroid, ScrollView, TouchableOpacity, Image, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, Items } from '../data/Index';
import uuid from 'react-uuid';

const MyCart = ({ navigation, route }) => {

  const [total, setTotal] = useState();
  const [changeNumber, setChangeNumber] = useState(1);
  const { productId } = route.params;

  useEffect(() => {
    const unSubscribe = navigation.addListener('focus', () => {
      getDataFromDB();
    });

    return unSubscribe;
  }, [navigation]);

  const getDataFromDB = () => {
  }

  const checkOut = async () => {
    ToastAndroid.show('Venta Realizada...', ToastAndroid.SHORT);
    navigation.navigate('Home');
  }

  const increment = () => {
    setChangeNumber(changeNumber => changeNumber + 1);
  }

  const decrement = () => {
    setChangeNumber(changeNumber => changeNumber - 1);
    validateCouter();
  }

  const validateCouter = () => {
    if (changeNumber === 0) {
      alert('No se permiten agregar valores negativos o valores en 0')
    } else if (changeNumber <= 0) {
      alert('No se permiten agregar valores negativos o valores en 0')
    }
  }

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
          <View
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
              }} onPress={() => navigation.navigate('ProductoInfo', { productID: productId.id })}>
              <Image
                source={{ uri: productId.productImage }}
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
                  {productId.productName}
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
                    $ {productId.price}
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
                      <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#000' }}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity onPress={() => console.log('Remove')}>
                  <Image
                    style={{ width: 10, height: 10, padding: 12 }}
                    source={require('../assets/eliminar.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
                Total ${changeNumber * productId.price}
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
          onPress={() => (productId.price != 0 ? checkOut() : null)}
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
            Total a Pagar ${changeNumber * productId.price}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default React.memo(MyCart);