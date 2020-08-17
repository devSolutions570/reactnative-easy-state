import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import nutritions from '../store/NutritionsStore';
import { view } from '@risingstack/react-easy-state';
import { RouteProp } from '@react-navigation/native';
import { NavigationParams } from 'react-navigation';
import { Nutrition } from '../types/types'

type RootStackParamList = {
    params: {
        editIndex: number;
    }
};

type NutritionScreenRouteProp = RouteProp<RootStackParamList, 'params'>;

type Props = {
    route: NutritionScreenRouteProp;
    navigation: NavigationParams;
};

const AddNutrition: React.FC<Props> = ({ route, navigation }) => {

    const [error, setError] = useState("Please fill all details before you submit");
    const [validationError, setValidationError] = useState(false);
    const [dessertName, setDessertName] = useState("");
    const [calories, setCalories] = useState("");
    const [fat, setFat] = useState("");
    const [carbs, setCarbs] = useState("");
    const [protein, setProtein] = useState("");
    const { editIndex } = route.params;


    const handleNameChange = (text: string) => {
        setDessertName(text);
    };
    const handleCaloriesChange = (text: string) => {
        setCalories(text);
    };
    const handleFatChange = (text: string) => {
        setFat(text);
    };
    const handleCarbsChange = (text: string) => {
        setCarbs(text);
    }
    const handleProteinChange = (text: string) => {
        setProtein(text);
    };
    const validateName = () => {
        let result: Nutrition[];
        result = nutritions.all.filter((obj: Nutrition) => obj.dessertName === dessertName)  
        return (result.length > 0)
    }
    const handleSubmitButtonClick = () => {
        if(
            dessertName.length < 1 ||
            calories.length < 1 ||
            fat.length < 1 ||
            carbs.length < 1 ||
            protein.length < 1
        ) {
            setError("Please fill all details before you submit")
            setValidationError(true);
            return;
        } else {
            if (validateName()) {
                setError("The same Dessert name is exist!");
                setValidationError(true);
                return;
            }
            if (!(/^\d+$/.test(calories))) {
                setError("calories value should be set number!");
                setValidationError(true);
                return;
            }
            if (!(/^\d+$/.test(fat))) {
                setError("fat value should be set number!");
                setValidationError(true);
                return;
            }
            if (!(/^\d+$/.test(carbs))) {
                setError("carbs value should be set number!");
                setValidationError(true);
                return;
            }
            if (!(/^\d+$/.test(protein))) {
                setError("protein value should be set number!");
                setValidationError(true);
                return;
            }
        }
        setValidationError(false);
            let nutrition: Nutrition = {
                id: 0,
                dessertName,
                calories,
                fat,
                carbs,
                protein
            };
            if ( editIndex === -1) {
                nutritions.create(nutrition);
            } else {
                nutritions.update(editIndex, nutrition);
            }
            
            let home: string = 'Home';
            navigation.navigate(home, {update: true});
        };

        useEffect(() => {
            if ( editIndex !== -1 ) {
                let nutritionObject: Nutrition = nutritions.all[editIndex];
                setDessertName(nutritionObject.dessertName)
                setCalories(nutritionObject.calories)
                setFat(nutritionObject.fat)
                setCarbs(nutritionObject.carbs)
                setProtein(nutritionObject.protein)
            }
        }, [editIndex]);

        return (
        <View style={styles.container}>
            {validationError == true && 
                <View style={styles.errorMessageView}>
                    <Icon name="replay" color="#ffffff" size={20} />
                    <Text style={styles.errorMessage}>
                        {error}
                    </Text>
                </View>
            }
            <View style={styles.inputView}>
                <Text style={styles.inputTitle}>
                    Dessert Name *
                </Text>
                <TextInput
                    onChangeText={ handleNameChange }
                    value={dessertName}
                    editable={true}
                    maxLength={200}
                    autoCapitalize="none"
                    style={styles.textInput}
                />
            </View>
            <View style={styles.inputView}>
                <Text style={styles.inputTitle}>
                    Calories*
                </Text>
                <TextInput
                    onChangeText={ handleCaloriesChange }
                    value={calories}
                    editable={true}
                    maxLength={200}
                    autoCapitalize="none"
                    style={styles.textInput}
                    keyboardType='numeric'
                />
            </View>
            <View style={styles.inputView}>
                <Text style={styles.inputTitle}>
                    Fat*
                </Text>
                <TextInput
                    onChangeText={ handleFatChange}
                    value={fat}
                    editable={true}
                    maxLength={200}
                    autoCapitalize="none"
                    style={styles.textInput}
                    keyboardType='numeric'
                />
            </View>
            <View style={styles.inputView}>
                <Text style={styles.inputTitle}>
                    Carbs*
                </Text>
                <TextInput
                    onChangeText={ handleCarbsChange }
                    value={carbs}
                    editable={true}
                    maxLength={200}
                    autoCapitalize="none"
                    style={styles.textInput}
                    keyboardType='numeric'
                />
            </View>
            <View style={styles.inputView}>
                <Text style={styles.inputTitle}>
                    Protein*
                </Text>
                <TextInput
                    onChangeText={ handleProteinChange}
                    value={protein}
                    editable={true}
                    maxLength={200}
                    autoCapitalize="none"
                    style={styles.textInput}
                    keyboardType='numeric'
                />
            </View>

            <View style={styles.inputView}>            
                <TouchableOpacity style={styles.submitButtonView} onPress={ handleSubmitButtonClick }>
                    <Text style={styles.submitButton}>SUBMIT</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default view(AddNutrition);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 30,
    },
    errorMessageView: {
        backgroundColor: '#F5B840',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorMessage: {
        marginLeft: 10,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    inputView: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 20,
        height: 50,
    },
    inputTitle: {
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 3,
        height: 30,
    },
    submitButtonView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        backgroundColor: "#377555",
        borderRadius: 3,
        marginTop: 10,
    },
    submitButton: {
        color: "#ffffff",
        fontWeight: 'bold',
    },
});