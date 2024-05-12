const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path'); // Importar el módulo 'path'

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/parqueadero', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
    UserName: String,
    PhoneNumber: String,
    Plate: String,
    Password: String
});

userSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('Password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.Password, salt);
        user.Password = hash;
        next();
    } catch (error) {
        return next(error);
    }
});

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.Password);
};

const User = mongoose.model('User', userSchema);


// Configurar middleware para procesar datos JSON y URL codificada
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/register', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.send('Registro exitoso');
    } catch (error) {
        res.status(400).send(error);
    }
});

// Ruta para iniciar sesión
app.post('/login', async (req, res) => {
    try {
        if (!req.body.UserName || !req.body.Password) {
            return res.status(400).json({ message: 'Nombre de usuario y contraseña son requeridos' });
        }

        const user = await User.findOne({ UserName: req.body.UserName }).select('+Password');
        if (!user || !(await user.comparePassword(req.body.Password))) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        // Si las credenciales son correctas, redirige al usuario a administrador.html
        res.redirect('/administrador.html');
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

function verificarToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'Token no proporcionado' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }
        req.userId = decoded.id;
        next();
    });
}

// Ruta protegida (ejemplo)
app.get('/protegido', verificarToken, (req, res) => {
    res.json({ message: 'Ruta protegida' });
});

// Manejar la solicitud GET para /administrador.html
app.get('/administrador.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public','administrador.html'));
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});