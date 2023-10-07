const jwt = require('jsonwebtoken');
const { secretKey } = require('../controllers/authController'); // Импортируйте секретный ключ из конфигурационного файла

function checkRole(role) {
  return (req, res, next) => {
    const token = req.headers.authorization.replace('Bearer ', '');



    if (!token) {
      return res.status(401).json({ message: 'Токен отсутствует. Вы не аутентифицированы.' });
    }

    jwt.verify(token, secretKey, (err, decoded) => { // Используйте секретный ключ из конфигурационного файла
      if (err) {
        return res.status(403).json({ message: 'Токен недействителен.' });
      }

      if (decoded.role === role) {
        // Роль пользователя совпадает с ожидаемой ролью (например, "admin")
        next(); // Продолжаем выполнение запроса
      } else {
        return res.status(403).json({ message: 'У вас нет доступа к этому действию.' });
      }
    });
  };
}

module.exports = checkRole;
