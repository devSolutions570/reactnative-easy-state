import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import LinearGradient from "react-native-linear-gradient";
import Icon from 'react-native-vector-icons/MaterialIcons';
import nutritions from '../store/NutritionsStore';
import { useFocusEffect } from '@react-navigation/native';
import { view } from '@risingstack/react-easy-state';
import { NavigationParams } from 'react-navigation';
import { NutritionCheck } from '../types/types'
import CheckBox from '@react-native-community/checkbox';

type Props = {
    update: string;
    navigation: NavigationParams;
};

const NutritionList: React.FC<Props> = ({ navigation, update }) => {
    const [checkedIDs, setCheckedIDs] = useState<NutritionCheck[]>([]);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedCount, setSelectedCount] = useState(0);

    useFocusEffect(
        React.useCallback(() => {
            let newCheckIDs: NutritionCheck[] = [];
            nutritions.all.map((nutrition, i) => {
                newCheckIDs[i] = {
                    id: nutrition.id,
                    checked: false
                }
            })
            setCheckedIDs(newCheckIDs);
            navigation.navigate("Home", { update: false })
        }, [])
    );

    const handleResetDataClick = () => {
        nutritions.reset();
        setSelectedCount(0);
        setSelectAll(false);
        navigation.navigate('Home', { update: false });
    }

    const handleAddNutritionClick = () => {
        let index = -1;
        setSelectedCount(0);
        navigation.navigate('AddNutrition', { editIndex: index });
    }

    const handleDeleteNutritionClick = () => {
        if (checkedIDs.length > 0) {
            Alert.alert(
                'Warning',
                'Do you want really remove the Nutritions',
                [
                    {
                        text: 'YES', onPress: () => {
                            checkedIDs.map((obj, i) => {
                                if (obj.checked === true) {
                                    nutritions.delete(obj.id);
                                }
                            });
                            for (let i = 0; i < checkedIDs.length; i++) {
                                if (checkedIDs[i].checked === true) {
                                    checkedIDs.splice(i, 1);
                                    i--;
                                }
                            }
                            setSelectAll(false);
                            setSelectedCount(0);
                            setCheckedIDs(checkedIDs);
                            navigation.navigate('Home', { update: false });
                        }
                    },
                    { text: 'NO', onPress: () => console.warn('canceled the delete operation'), style: 'cancel' },
                ]
            )
        }
    }

    const selectRow = (id: number) => {
        let selectedNutrition: NutritionCheck[];
        selectedNutrition = checkedIDs.filter(item => item.id === id);
        selectedNutrition[0].checked = !selectedNutrition[0].checked;
        if (selectedNutrition[0].checked === true) {
            setSelectedCount(selectedCount + 1);
        } else {
            setSelectedCount(selectedCount - 1);
        }
        setCheckedIDs(checkedIDs);
        // navigation.navigate("Home", { update: false })
    }

    const handleSelectAllChange = (newValue: boolean) => {

        let newCheckIDs: NutritionCheck[] = [];
        nutritions.all.map((nutrition, i) => {
            newCheckIDs[i] = {
                id: nutrition.id,
                checked: newValue
            }
        })
        if (selectAll === true) {
            setSelectedCount(0);
        } else {
            setSelectedCount(nutritions.all.length);
        }
        setCheckedIDs(newCheckIDs);
        setSelectAll(!selectAll)
        navigation.navigate("Home", { update: false })
    }

    return (
        <View style={styles.container}>
            <View style={styles.pageTitleContainer}>
                <Text style={styles.pageTitle}>Nutrition List</Text>
                <TouchableOpacity onPress={ handleResetDataClick }>
                    <LinearGradient
                        colors={["#004d40", "#009688"]}
                        style={styles.appButtonContainer}
                    >
                        <Icon name="replay" color="#ffffff" size={20} />
                        <Text style={styles.appButtonText}>RESET DATA</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            <View>
                <View style={styles.tableHeaderBar}>
                    <Text style={styles.tableHeaderTitle}>{selectedCount} selected</Text>
                    <View style={styles.tableButtonCotainer}>
                        <TouchableOpacity style={styles.tableButton} onPress={ handleAddNutritionClick }>
                            <Icon name="add" color='#036F44' size={20} />
                            <Text style={styles.newButtonText}>ADD NEW</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.tableButton} onPress={ handleDeleteNutritionClick }>
                            <Icon name="delete-forever" color="red" size={20} />
                            <Text style={styles.deleteButtonText}>DELETE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView horizontal={true}>
                    <DataTable style={styles.dataTable}>
                        <DataTable.Header style={styles.tableHeader}>
                            <DataTable.Title ><View style={styles.checkboxContainer}><CheckBox checkboxSize={5} style={styles.checkbox} boxType="square" value={selectAll} onValueChange={ handleSelectAllChange } /></View></DataTable.Title>
                            <DataTable.Title numeric>Dessert(100g serving)</DataTable.Title>
                            <DataTable.Title numeric>Calories</DataTable.Title>
                            <DataTable.Title numeric>Fat (g)</DataTable.Title>
                            <DataTable.Title numeric>Carbs (g)</DataTable.Title>
                            <DataTable.Title numeric>Protein (g)</DataTable.Title>
                        </DataTable.Header>
                        {nutritions.all.map((nutrition, i) => {
                            return (
                                <DataTable.Row style={styles.tableRow} key={i} >
                                    <DataTable.Cell><CheckBox boxType="square" value={(checkedIDs[i] !== undefined) ? checkedIDs[i].checked : false} onValueChange={() => {
                                        selectRow(nutrition.id);
                                    }} key={nutrition.id} /></DataTable.Cell>
                                    <DataTable.Cell numeric onPress={() => {
                                        setSelectedCount(0);
                                        navigation.navigate('EditNutrition', { editIndex: i });
                                    }}>{nutrition.dessertName}</DataTable.Cell>
                                    <DataTable.Cell numeric onPress={() => {
                                        setSelectedCount(0);
                                        navigation.navigate('EditNutrition', { editIndex: i });
                                    }}>{nutrition.calories}</DataTable.Cell>
                                    <DataTable.Cell numeric>{nutrition.fat}</DataTable.Cell>
                                    <DataTable.Cell numeric>{nutrition.carbs}</DataTable.Cell>
                                    <DataTable.Cell numeric>{nutrition.protein}</DataTable.Cell>
                                </DataTable.Row>
                            );
                        })}
                        {/* <DataTable.Pagination
                            page={1}
                            numberOfPages={3}
                            onPageChange={page => {
                                console.log(page);
                            }}
                            label="1-2 of 6"
                        /> */}
                    </DataTable>
                </ScrollView>
            </View>
        </View>
    );
};

export default view(NutritionList);

const styles = StyleSheet.create({
    container: {
        padding: 30,
        marginTop: 50,
    },
    pageTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        marginBottom: 10,
    },
    pageTitle: {
        fontSize: 24,
    },
    textStyle: {
        color: '#000',
    },
    appButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        borderRadius: 5,
    },
    appButtonText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#ffffff',
    },
    tableHeaderBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FFDFE0',
        alignItems: 'center',
    },
    tableHeaderTitle: {
        color: '#D50C8D',
        padding: 15,
    },
    tableButtonCotainer: {
        flexDirection: 'row',
    },
    tableButton: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
    newButtonText: {
        fontSize: 12,
        color: '#036F44',
        fontWeight: 'bold'
    },
    deleteButtonText: {
        fontSize: 12,
        color: 'red',
        fontWeight: 'bold'
    },
    tableHeader: {
        backgroundColor: '#ffffff'
    },
    tableRow: {
        alignSelf: 'stretch',
    },
    dataTable: {
        width: 400,
    },
    checkboxContainer: {
        flexDirection: "row",
        margin: 100,
    },
    checkbox: {
        alignSelf: "center",
    },
});