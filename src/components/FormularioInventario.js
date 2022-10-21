import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, SafeAreaView, StyleSheet, Pressable, Keyboard, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { COLORS } from '../data/Index';
const FormularioInventario = ({ setModal, navigation }) => {

    /* const [category, setCategory] = useState('product');
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState();
    const [description, setDescription] = useState('');
    const [available] = useState(true);
    const [productImage, setProductImage] = useState('');
    const [stock, setStock] = useState(0);
    const [off] = useState(false); */

    const [values, setValues] = useState({});

    const onChange = (value, key) => {
        setValues((val) => ({ ...val, [key]: value }));
    }




    const saveData = async () => {
        try {
            await fetch('https://b1b6-2806-262-401-9631-7085-b7eb-af28-f022.ngrok.io/api/inventario', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "category": "product",
                    "productName": values.productName,
                    "price": parseFloat(values.price),
                    "description": values.description,
                    "off": true,
                    "available": true,
                    "productImage": values.productImage,
                    "stock": Number(values.stock)
                })
            }).then((response) => response.json())
                .then((responseData) => {
                    console.log('responseData', responseData);
                    alert('Producto Agregado Correctamente');
                    setValues({});
                    setModal(false);
                    navigation.navigate("Home");
                })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>

            <React.Fragment>
                <ScrollView onPress={() => { Keyboard.dismiss() }}>
                    <View style={styles.contenedorBotones}>
                        <Pressable style={styles.btnCancelar} onPress={() => { setModal(false); }}>
                            <Text style={styles.btnText}>Cancelar</Text>
                        </Pressable>
                    </View>

                    <View style={styles.formulario}>
                        <Text style={styles.titulo}>Agregar Producto</Text>
                        <View style={styles.campo}>
                            <Text style={styles.label}>Producto</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Nombre del Producto"
                                value={values.productName}
                                onChangeText={(v) => onChange(v, 'productName')}
                            />
                        </View>
                        <View style={styles.campo}>
                            <Text style={styles.label}>Descripción</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Descripción del Producto"
                                value={values.description}
                                onChangeText={(v) => onChange(v, 'description')}
                            />
                        </View>
                        <View style={styles.campo}>
                            <Text style={styles.label}>Precio</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Precio del Producto"
                                keyboardType='numeric'
                                value={values.price}
                                onChangeText={(v) => onChange(v, 'price')}
                            />
                        </View>
                        <View style={styles.campo}>
                            <Text style={styles.label}>Stock</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Stock"
                                keyboardType='numeric'
                                value={values.stock}
                                onChangeText={(v) => { onChange(v, 'stock') }}
                            />
                        </View>
                        <View style={styles.campo}>
                            <Text style={styles.label}>Imagen</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Imagen del Producto"
                                value={values.productImage}
                                onChangeText={(v) => onChange(v, 'productImage')}
                            />
                        </View>

                        <TouchableOpacity onPress={saveData} style={styles.btnSubmit}>
                            <Text style={styles.btnText}>Guardar Producto</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </React.Fragment>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        flex: 1,
    },
    formulario: {
        backgroundColor: '#FFF',
        marginHorizontal: 20,
        borderRadius: 10,
        paddingVertical: 40,
        paddingHorizontal: 20,
        transform: [{ translateY: 50 }],
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        bottom: 25
    },
    titulo: {
        textAlign: 'center',
        fontSize: 30,
        marginBottom: 30,
        color: COLORS.BLACK
    },
    campo: {
        marginVertical: 10,
    },
    campoPicker: {
        marginVertical: 10,
        alignContent: 'center'
    },
    label: {
        color: COLORS.BLACK,
        textTransform: 'uppercase',
        fontSize: 20,
        fontWeight: '500'
    },
    input: {
        backgroundColor: COLORS.BACKGROUNDLIGHT,
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        color: '#64748B'
    },
    picker: {
        color: '#64748B'
    },
    btnSubmit: {
        backgroundColor: COLORS.GREEN,
        padding: 10,
        marginTop: 20,
        borderRadius: 5
    },
    btnText: {
        textAlign: 'center',
        color: COLORS.WHITE,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    btnCancelar: {
        backgroundColor: COLORS.RED,
        padding: 10,
        marginTop: 30,
        marginHorizontal: 10,
        borderRadius: 5,
        flex: 1
    },
    contenedorBotones: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default React.memo(FormularioInventario);