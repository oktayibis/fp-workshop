import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';


// Recursive is one if FP concept that you create a function that calls itself. or component for react

// Recursive function
const factorial = (n: number): number => {
    if (n === 0) return 1;
    return n * factorial(n - 1);
};

// example: fibonacci series
const fibonacci = (n: number): number => {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
};

// example: sum of array
const sumOfArray = (arr: number[]): number => {
    if (arr.length === 0) return 0;
    // return arr.reduce((acc, curr) => acc + curr, 0);

    // or

    // extract first element and sum of rest of the array [1, 2, 3, 4, 5]
    // 1. Step : 1 + sumOfArray([2, 3, 4, 5])
    // 2. Step : 2 + sumOfArray([3, 4, 5])
    // 3. Step : 3 + sumOfArray([4, 5])
    // 4. Step : 4 + sumOfArray([5])
    // 5. Step : 5 + sumOfArray([])
    // 6. Step : 0
    // Output: 1 + 2 + 3 + 4 + 5 = 15
    return arr[0] + sumOfArray(arr.slice(1));
};

interface CommentType {
    id: number;
    text: string;
    replies: CommentType[];
}

// Recursive component to render nested comments
const Comment: React.FC<{ comment: CommentType; depth: number }> = ({ comment, depth }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => setExpanded(!expanded);

    return (
        <View style={{ marginLeft: depth * 20 }}>
            <Text style={styles.commentText}>{comment.text}</Text>
            {comment.replies.length > 0 && (
                <Button
                    title={expanded ? 'Hide Replies' : 'Show Replies'}
                    onPress={toggleExpanded}
                />
            )}
            {expanded && comment.replies.map(reply => (
                <Comment key={reply.id} comment={reply} depth={depth + 1} />
            ))}
        </View>
    );
};

// Example usage
export const RecursiveCommentThread: React.FC = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recursive Comment Thread</Text>
            <Comment comment={commentThread} depth={0} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    commentText: {
        marginVertical: 5,
    },
});

export default RecursiveCommentThread;

const commentThread: CommentType = {
    id: 1,
    text: "This is the main comment",
    replies: [
        {
            id: 2,
            text: "This is a reply",
            replies: [
                {
                    id: 3,
                    text: "This is a nested reply",
                    replies: []
                }
            ]
        },
        {
            id: 4,
            text: "This is another reply",
            replies: [
                {
                    id: 5,
                    text: "This is a nested reply",
                    replies: [
                        {
                            id: 6,
                            text: "This is a deeply nested reply",
                            replies: []
                        }
                    ]
                }
            ]
        }
    ]
};
