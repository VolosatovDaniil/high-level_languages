const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { sequelize, User, Product, Category, Review } = require('./models');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.static('public')); 

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// авторизація
app.post('/auth/register', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password || email.trim() === "" || password.trim() === "") {
        return res.status(400).json({ 
            message: "Email та пароль обов'язкові!" 
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword });
        res.json({ 
            message: "Користувач створений", id: user.id 
        });
    } catch (e) {
        res.status(400).json({ 
            message: "Помилка: можливо, такий email вже існує або дані невірні" 
        });
    }
});

app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send('Введіть дані');

    const user = await User.findOne({ 
        where: { email } 
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send('Невірні дані');
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.json({ token });
});

app.get('/products', async (req, res) => {
    const products = await Product.findAll({ 
        include: [Category, Review] 
    });
    res.json(products);
});

// створення товару
app.post('/products', authenticateToken, async (req, res) => {
    if (!req.body.name || !req.body.category_id) {
        return res.status(400).json({ 
            message: "Назва та категорія обов'язкові" 
        });
    }
    try {
        const product = await Product.create(req.body);
        res.json(product);
    } catch (e) { 
        res.status(400).json({ message: e.message }); 
    }
});

// видалення товару
app.delete('/products/:id', authenticateToken, async (req, res) => {
    await Product.destroy({ 
        where: { id: req.params.id } 
    });
    res.json({ 
        message: "Видалено" 
    });
});

// створення відгуку
app.post('/reviews', async (req, res) => {
    if (!req.body.comment || !req.body.product_id) return res.status(400).send('Дані відгуку неповні');
    const review = await Review.create(req.body);
    res.json(review);
});

app.listen(3000, async () => {
    console.log('Сервер: http://localhost:3000');
    try { 
        await sequelize.authenticate(); 
        console.log('БД підключена...'); 
    } 
    catch (e) { 
        console.error('Помилка БД:', e); 
    }
});