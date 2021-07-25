module.exports = {
    devServer: {
        proxy: {
            '^/battleship/api': {
                target: 'http://localhost:8088'
            }
        }
    }
}