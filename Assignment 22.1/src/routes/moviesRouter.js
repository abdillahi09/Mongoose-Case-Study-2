const express = require('express');
const moviesRouter = express.Router();
const {MongoClient, ObjectID}  = require('mongodb');

function router(nav){
    moviesRouter.route('/')
    .get((req,res) => {
        const url = 'mongodb://localhost:27017';
        const dbName = 'acadgild_aug';

        (async function mongo(){
            let client;
            try{
                client  = await MongoClient.connect(url);
                const db = client.db(dbName);

                const col = await db.collection('books');
                const movies = await col.find().toArray();
                res.render('movies',{
                    title: `Movies `,
                    nav,
                    movies
                })
            }
            catch(err){
                console.log('no connection to the movies database')
            }
            client.close();
        }())
        
    }) 

    moviesRouter.route('/:id')
        .get((req,res) => {
            const {id} = req.params;
            const url = 'mongodb://localhost:27017';
            const dbName = 'acadgild_aug';

            (async function mongo(){
                let client;
                try{
                    client = await MongoClient.connect(url);
                    const db = client.db(dbName);
                    const col = await db.collection('books');
                    const movieDetail =  await col.findOne({_id:id})
                    res.render('moviesDetail',
                        {
                            title: 'Movies detail page',
                            movies: movieDetail,
                            nav
                        })
                }
                catch(err){
                    console.log("no connection to movies details")
                }
            }())

        })

    
    return moviesRouter
}


module.exports = router;