const express = require('express');
const app = express();
const PORT = 3000;

// Mock database
let tasks = [
    { id: 1, title: 'Buy groceries', done: false },
    { id: 2, title: 'Learn APIs', done: true }
];

// --- API Endpoints ---

// Endpoint 1: GET a task by ID
// Route: GET /api/tasks/:id
app.get('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);

    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
});

// Endpoint 2: DELETE a task by ID
// Route: DELETE /api/tasks/:id
app.delete('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }

    // Remove the task from the array
    tasks.splice(taskIndex, 1);

    res.json({ result: true, message: `Task ${taskId} deleted` });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    // You can access these endpoints at:
    // http://localhost:3000/api/tasks/1 (GET or DELETE)
});