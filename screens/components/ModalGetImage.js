import React from "react";
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const ModalGetImage = (props) =>{

    return(

        <View style={styles.container}>

            <Pressable onPress={()=>{props.setShowImageSelectionModal(!props.showImageSelectionModal)}} style={styles.out}></Pressable>

            <View style={styles.bottom}>

                <TouchableOpacity onPress={()=>{props.getImageFromGallery()}} style={styles.galleryContainer}>
                    <Entypo name="image-inverted" size={30} color="#8000AD" />
                    <Text>Galeria</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={()=>{props.getImageFromCamera()}} style={styles.cameraContainer}>
                    <AntDesign name="camera" size={30} color="#8000AD" />
                    <Text>Câmera</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    container:{

        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.6)"
    },

    out:{

        flex: 1
    },

    bottom:{

        width: "100%",
        justifyContent: "center",
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        backgroundColor: "white",
        padding: 20
    },

    galleryContainer:{

        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 30
    },

    cameraContainer:{

        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 30
    }
});

export default ModalGetImage;