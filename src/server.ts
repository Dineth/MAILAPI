import app from "./app";
import AppProps from './ApplicationProperties'

app.listen(AppProps.PORT, () => {
    console.log('server listening on port ' + AppProps.PORT);
})