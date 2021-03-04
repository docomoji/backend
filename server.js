import { App } from '@tinyhttp/app'

const app = new App()

app.all((req, res) => {
    res.write('Hello')
    res.end()
})

app.listen(8080, () => console.log('Server is running'))