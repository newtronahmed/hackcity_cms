const app = require('./index')

// const PORT = process.env.PORT || 8000;
const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
module.exports = app;