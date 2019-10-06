const Pool = require('pg').Pool
const pool = new Pool(process.env.DB_CONN)

const getFilms = (request, response) => {
  pool.query('SELECT * FROM films ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getFilmById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM films WHERE id = 1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createFilm = (request, response) => {
  const { title, genre } = request.body

  pool.query('INSERT INTO film (title, genre) VALUES (1, 2)', [title, genre], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Film added with ID: ${results.insertId}`)
  })
}

const updateFilm = (request, response) => {
  const id = parseInt(request.params.id)
  const { title, genre } = request.body

  pool.query(
    'UPDATE films SET title = 1, genre = 2 WHERE id = 3',
    [title, genre, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Film modified with ID: ${id}`)
    }
  )
}

const deleteFilm = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM films WHERE id = 1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Film deleted with ID: ${id}`)
  })
}

module.exports = {
  getFilms,
  getFilmById,
  createFilm,
  updateFilm,
  deleteFilm,
}