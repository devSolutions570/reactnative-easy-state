import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationParams } from 'react-navigation';
import NutritionList from '../components/NutritionList'

type Props = {
    navigation: NavigationParams;
};

const Home: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <NutritionList navigation={navigation} update="true"/>
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {},
    textStyle: {
        color: '#000',
    }
});