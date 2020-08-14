import path from 'path';
module.exports = {
    client:'sqlite3',
    connection: {
        filename:path.resolve(__dirname, 'src', 'Database', 'Database.sqlite')
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'Database', 'migrations')

    },
    useNullAsDefault:true,

};