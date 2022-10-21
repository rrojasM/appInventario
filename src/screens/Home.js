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
import { COLORS } from "../data/Index";
import FormularioInventario from "../components/FormularioInventario";

const Home = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await fetchDataInventario();
    })()

  }, [])

  const fetchDataInventario = () => {
    fetch('https://b1b6-2806-262-401-9631-7085-b7eb-af28-f022.ngrok.io/api/inventario')
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
          <TouchableOpacity onPress={() => navigation.navigate("Inventario", { data: products[0] })}>
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
          {/*  <TouchableOpacity onPress={() => navigation.navigate("MyCart")}>
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
          </TouchableOpacity> */}
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
            <TouchableOpacity onPress={fetchDataInventario}>
              <Text style={{ fontSize: 14, color: COLORS.BLUE, fontWeight: "400" }}>
                Actualizar Productos
              </Text>
            </TouchableOpacity>
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