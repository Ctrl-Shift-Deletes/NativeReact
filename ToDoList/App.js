import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Task from './components/Task';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const addTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, taskInput]);
      setTaskInput('');
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const updateTask = (index, newTaskText) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = newTaskText;
    setTasks(updatedTasks);
  };

  const toggleSearch = () => {
    setIsSearching(!isSearching);
    setSearchInput('');
  };

  const filteredTasks = tasks.filter(task =>
    task.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <View style={styles.container}>
      
      {/* Header Section */}
      <View style={styles.firstBox}>
        <View style={styles.textContainer}>
          <Text style={styles.Sectiontext}> Hello, Jomar</Text>
          <Text style={styles.paraGraph}> Have a nice Day!</Text>
        </View>

        <TouchableOpacity onPress={toggleSearch}>
          <Ionicons name="search-circle-outline" size={60} color="white" style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Search Input */}
      {isSearching && (
        <TextInput
          style={styles.input}
          placeholder="Search Tasks"
          value={searchInput}
          onChangeText={setSearchInput}
        />
      )}

      {/* Task List Section */}
      <View style={styles.ToDo}>
        <View style={styles.iconToDo}>
          <Text style={styles.Title}> To-DO</Text>
          <TouchableOpacity onPress={addTask}>
            <Ionicons name="add-circle-outline" size={60} color="#002A5A" style={styles.icon} />
          </TouchableOpacity>
        </View>

        {/* Add Task Input */}
        <TextInput
          style={styles.input}
          placeholder="Add a new Task"
          value={taskInput}
          onChangeText={setTaskInput}
        />
        
        {/* Task List */}
        <View style={styles.items}>
          {(isSearching ? filteredTasks : tasks).map((task, index) => (
            <Task key={index} text={task} index={index} onDelete={deleteTask} onUpdate={updateTask} />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  firstBox: {
    backgroundColor: '#002A5A',
    paddingHorizontal: 25,
    paddingVertical: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Sectiontext: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  paraGraph: {
    color: 'white',
    fontSize: 16,
    marginLeft: 25,
    fontStyle: 'italic',
  },
  Title: {
    paddingTop: 10,
    paddingBottom: 30,
    color: '#002A5A',
    marginLeft: -10,
    fontSize: 40,
    fontWeight: 'bold',
  },
  ToDo: {
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    padding: 30,
    margin: 20,
    shadowColor: '#000',
  },
  iconToDo: {
    flexDirection: 'row',
    paddingLeft: 10,
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 1,
    borderColor: '#002A5A',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    fontSize: 16,
  },
});
