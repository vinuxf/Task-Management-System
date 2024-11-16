import express from 'express';
import { con } from '../utils/db.mjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const router = express.Router();

// Enable CORS
const corsOptions = {
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true,
};
router.use(cors(corsOptions));

// Admin login route
router.post('/adminlogin', (req, res) => {
  const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
  con.query(sql, [req.body.username, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });

    if (result.length > 0) {
      const user = result[0];
      const token = jwt.sign(
        { role: user.role, username: user.username },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie('token', token, { httpOnly: true });
      const redirectUrl = user.role === 0 ? "/dashboard" : "/dashboarduser";
      console.log('Redirect URL:', redirectUrl);
      return res.json({ loginStatus: true, redirect: redirectUrl });
    } else {
      return res.json({ loginStatus: false, Error: "Wrong credentials" });
    }
  });
});

// Dashboard route to get users with role 1
router.get('/dashboard', (req, res) => {
  const sql = "SELECT * FROM users WHERE role = 1";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, data: result });
  });
});

// Route to view tasks
router.get('/dashboard/view_tasks', (req, res) => {
  const sql = "SELECT * FROM tasks";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, data: result });
  });
});

// Route to add tasks
router.post('/dashboard/add_tasks', (req, res) => {
  const { taskTitle, description, creatorName, assignedTo } = req.body;

  console.log("Received data:", req.body);

  const query = `INSERT INTO tasks (title, description, CreaterName, assignedTo) VALUES (?, ?, ?, ?)`;
  const values = [taskTitle, description, creatorName, assignedTo];

  con.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting task:', err);
      return res.status(500).json({ message: 'Error adding task', error: err.message });
    }
    return res.status(201).json({ message: 'Task added successfully' });
  });
});

// API to get all usernames
router.get('/api/users', (req, res) => {
  const sql = "SELECT username FROM users"; 
  con.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).send('Server error');
    }
    const usernames = results.map(user => user.username);
    return res.json(usernames);
  });
});

router.put('/dashboard/update_task_status', (req, res) => {
  const { taskId, status } = req.body;

  if (!taskId || !status) {
    return res.status(400).json({ message: 'Task ID and status are required' });
  }

  const sql = "UPDATE tasks SET status = ? WHERE id = ?";
  con.query(sql, [status, taskId], (err, result) => {
    if (err) {
      console.error('Error updating task status:', err);
      return res.status(500).json({ message: 'Error updating task status', error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json({ message: 'Task status updated successfully' });
  });
});

export { router as adminRouter };
