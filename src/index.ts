import app from './app';
import './database';

const main = ()=>{

const port = app.get('port');

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});

}

main();
