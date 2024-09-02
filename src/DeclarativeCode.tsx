import React, { useState, useCallback, useMemo } from 'react';
import {View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Button} from 'react-native';

// What is Declarative Programming?
// Declarative programming is a programming paradigm that expresses the logic of a computation without describing its control flow.

// Imperative vs Declarative
// Imperative programming is a programming paradigm that uses statements that change a program's state.
// Declarative programming is a programming paradigm that expresses the logic of a computation without describing its control flow.

// Imperative Programming
// const numbers = [1, 2, 3, 4, 5];
// const doubledNumbers = [];
// for (let i = 0; i < numbers.length; i++) {
//     doubledNumbers.push(numbers[i] * 2); ....

// Declarative Programming
// const numbers = [1, 2, 3, 4, 5];
// const doubledNumbers = numbers.map(num => num * 2);


// Define the structure of a task
// This is a TypeScript interface, which helps us ensure our task objects always have the correct shape
interface Task {
    id: string;
    text: string;
    completed: boolean;
}

// Custom hook for managing tasks
// Custom hooks are a way to reuse stateful logic across components
const useTasks = () => {
    // useState is a React Hook that lets us add state to functional components
    // Here, we're storing an array of Task objects
    const [tasks, setTasks] = useState<Task[]>([]);

    // useCallback is a Hook that returns a memoized version of the callback function
    // This helps optimize performance by preventing unnecessary re-renders

    // Function to add a new task
    const addTask = useCallback((text: string) => {
        // We use the functional form of setState to ensure we're working with the most up-to-date state
        setTasks(prevTasks => [...prevTasks, { id: Date.now().toString(), text, completed: false }]);
        // The spread operator (...) is used to create a new array with all previous tasks plus the new one
    }, []);

    // Function to toggle a task's completed status
    const toggleTask = useCallback((id: string) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
        // We use map to create a new array, updating only the task with the matching id
    }, []);

    // Function to delete a task
    const deleteTask = useCallback((id: string) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
        // filter creates a new array with all tasks except the one with the matching id
    }, []);

    // Return an object with the tasks and functions to manipulate them
    return { tasks, addTask, toggleTask, deleteTask };
};

// Custom hook for input handling
// This simplifies the logic for managing input fields
const useInput = (initialValue: string = '') => {
    const [value, setValue] = useState(initialValue);
    const onChangeText = useCallback((text: string) => setValue(text), []);
    const reset = useCallback(() => setValue(''), []);
    return { value, onChangeText, reset };
};

// Task item component
// This is a functional component that represents a single task item
const TaskItem: React.FC<{
    task: Task;
    onToggle: () => void;
    onDelete: () => void;
}> = ({ task, onToggle, onDelete }) => (
    <View style={styles.taskItem}>
        <TouchableOpacity onPress={onToggle} style={styles.taskTextContainer}>
            <Text style={[styles.taskText, task.completed && styles.completedTask]}>
                {task.completed ? '✓ ' : '○ '}{task.text}
            </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
    </View>
);

// Main component
const DeclarativeTaskManager: React.FC = () => {
    // Use our custom hooks
    const { tasks, addTask, toggleTask, deleteTask } = useTasks();
    const newTaskInput = useInput('');

    // Function to handle adding a new task
    const handleAddTask = useCallback(() => {
        if (newTaskInput.value.trim()) {
            addTask(newTaskInput.value.trim());
            newTaskInput.reset();
        }
    }, [addTask, newTaskInput]);

    // useMemo is used to compute derived state
    // It will only recompute the statistics when the tasks array changes
    const statistics = useMemo(() => {
        const completed = tasks.filter(task => task.completed).length;
        return {
            total: tasks.length,
            completed,
            remaining: tasks.length - completed
        };
    }, [tasks]);

    // The component's return statement describes what should be rendered
    // This is the declarative part: we describe what we want, not how to do it
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Task Manager</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Add a new task..."
                    {...newTaskInput} // This spreads the properties from our custom hook
                />

                <Button title="Add" onPress={handleAddTask} />
            </View>

            {/* FlatList is a performant way to render scrollable lists */}
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TaskItem
                        task={item}
                        onToggle={() => toggleTask(item.id)}
                        onDelete={() => deleteTask(item.id)}
                    />
                )}
            />

            <View style={styles.statsContainer}>
                <Text style={styles.statsText}>Total: {statistics.total}</Text>
                <Text style={styles.statsText}>Completed: {statistics.completed}</Text>
                <Text style={styles.statsText}>Remaining: {statistics.remaining}</Text>
            </View>
        </View>
    );
};

// Styles are defined separately for clarity
// This is a common pattern in React Native
const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    addButton: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        marginLeft: 10,
        justifyContent: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    taskItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
        alignItems: 'center',
    },
    taskTextContainer: {
        flex: 1,
    },
    taskText: {
        fontSize: 16,
        color: '#333',
    },
    completedTask: {
        textDecorationLine: 'line-through',
        color: '#888',
    },
    deleteButton: {
        backgroundColor: '#FF3B30',
        padding: 5,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    statsContainer: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statsText: {
        fontSize: 14,
        color: '#555',
    },
});

export default DeclarativeTaskManager;
