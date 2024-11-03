const candidateModel = require('../model/Candidate');


exports.candidate=async (req,res)=>{
       try {
        const candidates = await candidateModel.find({},'name  party');

        res.status(200).json(candidates);
  
       } catch (error) {
        console.log(error);
        res.status(500).send({message: "error in fetching candidates list"});
        
       }
};


exports.candidateVote=async (req,res)=>{
       try {
        const vote= req.body;
        

        res.status(200).json(candidates);
  
       } catch (error) {
        console.log(error);
        res.status(500).send({message: "error in fetching candidates list"});
        
       }
};

exports.AllCandidate=async(req,res)=>{
       try {
              
              const Allcandidate = await candidateModel.find().sort({voteCount:'desc'});

              const voteRecord = Allcandidate.map((data)=>{
                     return {
                          party:data.party,
                          votecount:data.voteCount
                     }
              })

              res.status(200).json(voteRecord);
       } catch (error) {
              console.log(error);
              res.status(500).json({message:"intrnal error occured"});
       }
}





