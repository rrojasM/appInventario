import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { COLORS } from '../data/Index';
const Inventario = ({ navigation, route }) => {
  const { data } = route.params;

  return (
    <View style={{
      width: '100%',
      height: '100%',
      backgroundColor: COLORS.WHITE,
    }}>

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          paddingTop: 16,
          paddingHorizontal: 10,
          justifyContent: 'space-between',
          alignItems: 'center',

        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={{ width: 10, height: 10, padding: 12 }} source={require('../assets/atras.png')} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 18,
            color: COLORS.BLACK,
            fontWeight: 'bold',
            textAlign: 'center',
            right: 80
          }}>
          Inventario de Productos
        </Text>
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
        Productos Vendidos
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
          <View
            style={{
              width: '30%',
              height: 100,
              padding: 14,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLORS.BACKGROUNDLIGHT,
              borderRadius: 10,
              marginRight: 22,
            }}>
            <Image
              source={{ uri: data.productImage }}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              height: '100%',
              justifyContent: 'space-around',
            }}>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  maxWidth: '100%',
                  color: COLORS.BLACK,
                  fontWeight: '600',
                  letterSpacing: 1,
                }}>
                {data.productName}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '400',
                  maxWidth: '85%',
                  marginRight: 4,
                  color: COLORS.BLACK,

                }}>
                $ {data.price}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  maxWidth: '85%',
                  marginRight: 4,
                  color: COLORS.BLACK,
                }}>
                En Stock {data.stock}
              </Text>

              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '400',
                  maxWidth: '85%',
                  marginRight: 4,
                  color: COLORS.BLACK,
                }}>
                Producto {data.available ? 'Disponible' : 'No Disponible'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default React.memo(Inventario)