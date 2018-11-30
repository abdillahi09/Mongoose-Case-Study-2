const express = require('express');
const artistRouter = express.Router();
const {MongoClient, ObjectID}  = require('mongodb');

function router(nav){
    artistRouter.route('/')
    .get((req,res) => {
        const url = 'mongodb://localhost:27017';
        const dbName = 'acadgild_aug';

        (async function mongo(){
            let client;
            try{
                client  = await MongoClient.connect(url);
                const db = client.db(dbName);

                const col = await db.collection('series');
                const artist = await col.find().toArray();
                res.render('artists',{
                    title: `Artist `,
                    nav,
                    artist
                })
            }
            catch(err){
                console.log('no connection to the artist database')
            }
            client.close();
        }())
        
    }) 

    artistRouter.route('/:id')
        .get((req,res) => {
            const {id} = req.params;
            const url = 'mongodb://localhost:27017';
            const dbName = 'acadgild_aug';

            (async function mongo(){
                let client;
                try{
                    client = await MongoClient.connect(url);
                    const db = client.db(dbName);
                    const col = await db.collection('series');
                    const artistsDetail =  await col.findOne({_id:id})
                    res.render('artistsDetail',
                        {
                            title: 'Artist detail page',
                            movies: artistsDetail,
                            nav
                        })
                }
                catch(err){
                    console.log("no connection to artists details")
                }
            }())

        })

    
    return artistRouter;
}


module.exports = router;














/* Old Code Stuff */
// let movies = [
//     {
//       "_id": "5ab12612f36d2879268f284a",
//       "name": "Black Panther",
//       "language": "ENGLISH",
//       "rate": 4.5,
//       "type": "Action Adventure Fantasy",
//       "imageUrl": "https://image.ibb.co/f0hhZc/bp.jpg"
//     },
//     {
//       "_id": "5ab12666f36d2879268f2902",
//       "name": "Death Wish",
//       "language": "ENGLISH",
//       "type": "Action Crime Thriller",
//       "rate": 3.2,
//       "imageUrl": "https://image.ibb.co/gC9PfH/dw.jpg"
//     },
//     {
//       "_id": "5ab12678f36d2879268f291d",
//       "name": "Coco",
//       "language": "ENGLISH",
//       "type": "Adventure Animation Family",
//       "rate": 5,
//       "imageUrl": "https://image.ibb.co/dQwWSx/coco.jpg"
//     },
//     {
//       "_id": "5ab126b6f36d2879268f2943",
//       "name": "Avengers",
//       "language": "ENGLISH",
//       "type": "Actione",
//       "rate": 2,
//       "imageUrl": "https://www.hindustantimes.com/rf/image_size_960x540/HT/p2/2018/04/01/Pictures/_46a0b2c0-3590-11e8-8c5f-3c6cc031651e.jpg"
//     },
//     {
//       "_id": "5ab4e66b0c1d2b27846c6407",
//       "name": "Black Friday",
//       "language": "ENGLISH",
//       "rate": 4.5,
//       "type": "Action Adventure Fantasy",
//       "imageUrl": "https://image.ibb.co/f0hhZc/bp.jpg"
//     }
// ]

// function router(nav){
//     artistRouter.route('/')
//         .get((req, res) => {
//             res.render('artists', {
//                 title: 'Artists Page', 
//                 nav, 
//                 movies
//             })
//         })

//     artistRouter.route('/details')
//         .get((req, res)=> {
//             res.render('artistsDetail', {
//                 title: 'Artists Detail Page', 
//                 nav,
//                 movies
//         })
//     })
//     return artistRouter;
// }

// module.exports = router;

