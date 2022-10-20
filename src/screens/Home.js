import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal
} from "react-native";
import { COLORS, Items } from "../data/Index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FormularioInventario from "../components/FormularioInventario";

const Home = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [modal, setModal] = useState(false);

  /* useEffect(() => {
    const unSubscribe = navigation.addListener("focus", () => {
      getData();
      //getDataFromData();
    });
    return unSubscribe;
  }, [navigation]); */

  /* useEffect(() => {
    getData();
    getData2();
  }, []) */

  /* const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('database');
      if (value !== null) {
        console.log('GET DATA =====> ', JSON.parse(value));
        setProducts(JSON.parse(value));
      }

    } catch (e) {
      console.log('ERROR', e);
    }
  }

  const getData2 = async () => {
    try {
      const value = await AsyncStorage.getItem('newData');
      if (value !== null) {
        console.log('GET DATA 2 =====> ', JSON.parse(value));
        //setProducts(JSON.parse(value));
      }

    } catch (e) {
      console.log('ERROR', e);
    }
  } */

  /*  const getDataFromData = async () => {
     let productList = [];
     let bebidasList = [];
 
     for (let index = 0; index < Items.length; index++) {
       if (Items[index].category == "product") {
         productList.push(Items[index]);
       } else if (Items[index].category == "bebidas") {
         bebidasList.push(Items[index]);
       }
     }
     setProducts(productList);
   }; */


   useEffect(() => {
    fetchDataInventario();
   }, [])
   


  const fetchDataInventario = () => {
    fetch('https://4d74-2806-262-401-9631-7085-b7eb-af28-f022.ngrok.io/api/inventario')
      .then(response => response.json())
      .then(data => setProducts(data))
  }

  const ProductCard = ({ data }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ProductoInfo", { productID: data })
        }
        style={{ width: "48%", marginVertical: 14 }}
      >
        <View
          style={{
            width: "100%",
            height: 100,
            borderRadius: 10,
            backgroundColor: COLORS.BACKGROUNDLIGHT,
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          {/*  {data.isOff ? (
            <View
              style={{
                position: "absolute",
                width: "20%",
                height: "24%",
                backgroundColor: COLORS.GREEN,
                top: 0,
                left: 0,
                borderTopLeftRadius: 10,
                borderBottomRightRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: COLORS.WHITE,
                  fontWeight: "bold",
                  letterSpacing: 1,
                }}
              >
                {data.offPercentage}%
              </Text>
            </View>
          ) : null} */}
          <Image
            source={{ uri: data.productImage }}
            style={{
              width: "80%",
              height: "80%",
              resizeMode: "contain"
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 12,
            color: COLORS.BLACK,
            fontWeight: "600",
            marginBottom: 2,
          }}
        >
          {data.productName}
        </Text>
        {data.category === "bebidas" ? (
          data.isAvailable ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome
                name="circle"
                style={{
                  fontSize: 12,
                  marginRight: 6,
                  color: COLORS.GREEN,
                }}
              />
              <Text style={{ fontSize: 12, color: COLORS.GREEN }}>
                Disponible
              </Text>
            </View>
          ) : (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome
                name="circle"
                style={{
                  fontSize: 12,
                  marginRight: 6,
                  color: COLORS.RED,
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
    );
  };

  return (
    <View style={{ width: "100%", height: "100%", backgroundColor: "#FFF" }}>
      <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
      <ScrollView>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 16,
            backgroundColor: COLORS.GREEN,
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Inventario")}>
            <Image
              source={require("../assets/inventario.png")}
              style={{
                width: 35,
                height: 35,
                fontSize: 12,
                marginRight: 6,
                color: COLORS.GREEN,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("MyCart")}>
            <Image
              source={require("../assets/carrito-de-compras.png")}
              style={{
                width: 35,
                height: 35,
                fontSize: 12,
                marginRight: 6,
                color: COLORS.GREEN,
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginBottom: 10,
            padding: 16,
            backgroundColor: COLORS.GREEN,
          }}
        >
          <Text
            style={{
              fontSize: 26,
              color: "#000",
              fontWeight: "500",
              letterSpacing: 1,
              marginBottom: 10,
            }}
          >
            Demo Inventario
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#000",
              fontWeight: "400",
              letterSpacing: 1,
              lineHeight: 24,
            }}
          >
            Prueba de consepto Inventario
          </Text>
        </View>
        <View style={{ padding: 16 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 18,
                  color: "#000",
                  fontWeight: "500",
                  letterSpacing: 1,
                }}
              >
                Productos
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#000",
                  fontWeight: "400",
                  opacity: 0.5,
                  marginLeft: 10,
                }}
              >
                {products.length}
              </Text>
            </View>
            <Text
              style={{ fontSize: 14, color: COLORS.BLUE, fontWeight: "400" }}
            >
              Ver Todos
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            {products.map((data) => {
              return <ProductCard data={data} key={data.id} />;
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

      {
        modal && (
          <Modal
            animationType="slide"
            visible={modal}
            onRequestClose={() => {
              setModal(!modal);
            }}
          >
            <FormularioInventario
              setModal={setModal}
            />
          </Modal>
        )
      }

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.touchableOpacity}
        onPress={() => setModal(!modal)}
      >
        <Image
          style={styles.floatImage}
          source={require('../assets/add.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(Home);


const styles = StyleSheet.create({
  touchableOpacity: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 30,
    borderRadius: 10
  },
  floatImage: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  }
})