import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import nutritions from '../store/NutritionsStore';
import { view } from '@risingstack/react-easy-state';

export default view(AddNutrition = ({ route, navigation }) => {

    const [error, setError] = useState("Please fill all details before you submit");
    const [validationError, setValidationError] = useState(false);
    const [dessertName, setDessertName] = useState("");
    const [calories, setCalories] = useState("");
    const [fat, setFat] = useState("");
    const [carbs, setCarbs] = useState("");
    const [protein, setProtein] = useState("");
    const { editIndex } = route.params;


    const handleNameChange = (text) => {
        setDessertName(text);
    };
    const handleCaloriesChange = (text) => {
        setCalories(text);
    };
    const handleFatChange = (text) => {
        setFat(text);
    };
    const handleCarbsChange = (text) => {
        setCarbs(text);
    }
    const handleProteinChange = (text) => {
        setProtein(text);
    };
    const validateName = () => {
      result = nutritions.all.filter((obj) => obj.dessertName === dessertName)  
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
            let nutrition = {
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
            
            navigation.navigate('Home', {update: true});
        };

        useEffect(() => {
            if ( editIndex !== -1 ) {
                setDessertName(nutritions.all[editIndex].dessertName)
                setCalories(nutritions.all[editIndex].calories)
                setFat(nutritions.all[editIndex].fat)
                setCarbs(nutritions.all[editIndex].carbs)
                setProtein(nutritions.all[editIndex].protein)
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
});

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