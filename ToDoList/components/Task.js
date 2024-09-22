import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Task = (props) => {
    const [isChecked, setIsChecked] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // Track if task is being edited
    const [newTaskText, setNewTaskText] = useState(props.text); // Store updated task text

    const handleCheck = () => {
        setIsChecked(!isChecked);
    };

    const handleDelete = () => {
        props.onDelete(props.index);
    };

    const handleUpdate = () => {
        if (isEditing) {
            props.onUpdate(props.index, newTaskText); // Call the update function
        }
        setIsEditing(!isEditing); // Toggle editing mode
    };

    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <TouchableOpacity onPress={handleCheck}>
                    <Ionicons
                        name={isChecked ? "checkmark-circle-outline" : "checkmark-circle-outline"}
                        size={24}
                        color={isChecked ? "green" : "#002A5A"}
                    />
                </TouchableOpacity>

                {/* Show input field if editing, otherwise show task text */}
                {isEditing ? (
                    <TextInput
                        style={styles.input}
                        value={newTaskText}
                        onChangeText={setNewTaskText}
                    />
                ) : (
                    <Text style={[styles.itemText, isChecked && styles.checkedText]}>
                        {props.text}
                    </Text>
                )}
            </View>

            {/* Buttons (Update and Delete) side by side */}
            <View style={styles.buttonsContainer}>
                {/* Edit Icon */}
                <TouchableOpacity onPress={handleUpdate} style={styles.button}>
                    <Ionicons name={isEditing ? "checkmark-outline" : "create-outline"} size={20} color="gray" />
                </TouchableOpacity>

                {/* Delete Icon */}
                <TouchableOpacity onPress={handleDelete} style={styles.button}>
                    <Ionicons name="close-outline" size={24} color="gray" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 8,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    itemText: {
        fontSize: 16,
    },
    checkedText: {
        textDecorationLine: 'line-through',
        color: 'gray',
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#002A5A',
        fontSize: 16,
        width: 150,
    },
    buttonsContainer: {
        flexDirection: 'row', // Align buttons side by side
        alignItems: 'center',
    },
    button: {
        marginLeft: 10, // Add some space between the buttons
    },
});

export default Task;
