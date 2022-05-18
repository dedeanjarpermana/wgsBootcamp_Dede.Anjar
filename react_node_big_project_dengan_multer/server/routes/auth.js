const { Router } = require('express')

const { register, login, protected, logout } = require('../controllers/auth')
// const { validationMiddleware } = require('../middlewares/validations-middleware')
// const { registerValidation, loginValidation } = require('../validators/auth')
// const { userAuth } = require('../middlewares/auth-middleware')


// // const { getUser, deleteUser, getUserbyId, updateUser } = require('../controllers/dataUser')
// // const { getBarang, stok_barang } = require('../controllers/dataBarang')

const router = Router()







router.post('/login', loginValidation, validationMiddleware, login)
router.get('/login', loginValidation, validationMiddleware, login)


// module.exports = router