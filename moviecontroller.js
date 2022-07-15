require('../models/db')
const Movie = require('../models/movie');






exports.listMovies = async(req,res)=> {

    console.log(req.query);

    let{limit = 10,page = 1,category,q} = req.query;
    const limitRecords = parseInt(limit);
   const skip = (page-1)*limit;

   let  query = {};
   if(category) query.category = category;
   if(q) {
       query = {$text: {$search:q}};
   }



    try{

        const movies = await Movie.find(query).limit(limitRecords).skip(skip);
        res.json(movies);

    } catch (error){
        res.status(400).json({message:err})
    }


    
}


exports.insertSingleMovie = async(req,res)=> {


    const newMovie = new Movie({
       name: req.body.name,
       description: req.body.description,
       category: req.body.category,
       thumbnail: req.body.thumbnail,


    });

    try{
        await newMovie.save();
        res.json(newMovie);
    } catch(error) {
        res.status(400).json({message:err})
    }
}


exports.updateSingleMovie = async(req,res)=>{

    let paramID  = req.params.id;
    let name = req.body.name;

    try{
        const updateMovie = await Movie.updateOne({_id:paramID},{name:name});
        res.json(updateMovie);

    }catch(err){
        res.status(400).json({message:err})
    }
}

exports.deleteSingleMovie = async(req,res)=>{

    let paramID  = req.params.id;
    

    try{
        const data = await Movie.deleteOne({_id:paramID});
        res.json(data);

    }catch(error){
        res.status(400).json({message:err})
    }
}










