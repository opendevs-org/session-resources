const { Router } = require('express')

const router = Router()

const globalVariable = {
  randomNumber: Math.random()
}

/**
 * /api/hello/world
 */
router.get('/world', (req, res) => {
  return res.send(`Random no: ${globalVariable.randomNumber}`)
})

/**
 * /api/hello/<anything>
 */
router.get('/:id', (req, res) => {
  return res.send(`Hello ${req.params.id}`)
})

module.exports = router
