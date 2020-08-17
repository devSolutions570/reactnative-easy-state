import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NutritionList from '../components/NutritionList'

export default Home = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <NutritionList navigation={navigation}/>
        </View>
    );
}

const styles = StyleSheet.create({
    textStyle: {
        color: '#000',
    }
});