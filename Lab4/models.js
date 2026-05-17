const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    define: { 
        timestamps: false 
    }
});

// моделі з валідацією
const User = sequelize.define('User', {
    email: { 
        type: DataTypes.STRING, 
        unique: true, 
        allowNull: false,
        validate: {
            isEmail: true,
            notEmpty: true
        }
    },
    password: { 
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    }
}, { 
    tableName: 'users' 
});

const Category = sequelize.define('Category', {
    name: { 
        type: DataTypes.STRING, 
        allowNull: false,
        validate: { notEmpty: true }
    }
}, { 
    tableName: 'categories' 
});

const Product = sequelize.define('Product', {
    name: { 
        type: DataTypes.STRING, 
        allowNull: false,
        validate: { notEmpty: true }
    },
    price: { 
        type: DataTypes.DECIMAL(10, 2),
        validate: { isDecimal: true, min: 0 }
    },
    category_id: { 
        type: DataTypes.INTEGER 
    }
}, { 
    tableName: 'products',
    indexes: [{ 
        fields: ['name'] 
    }]
});

const Review = sequelize.define('Review', {
    product_id: { type: DataTypes.INTEGER },
    comment: { type: DataTypes.TEXT, validate: { notEmpty: true } },
    rating: { type: DataTypes.INTEGER, validate: { min: 1, max: 5 } }
}, { 
    tableName: 'reviews' 
});

Category.hasMany(Product, { foreignKey: 'category_id' });
Product.belongsTo(Category, { foreignKey: 'category_id' });

Product.hasMany(Review, { foreignKey: 'product_id' });
Review.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = { sequelize, User, Category, Product, Review };