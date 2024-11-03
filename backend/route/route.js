const {Router} = require('express');
const user = require('../controller/UserController')
const candidate = require('../controller/CandidateController')
const {authenticateToken}=require('../jwt')
const router = Router();

router.post('/signup',user.userSignup);
router.post('/signin',user.userSignin);

router.get('/profile',authenticateToken,user.profile);
router.put('/profile/password',authenticateToken,user.profilepassword);


//role=>user
router.get('/candidates',candidate.candidate)
router.post('/vote/:candidateId',candidate.candidate);
router.get('/vote/count',);


//role=>admin
router.post('/candidates')
router.put('/candidates/:candidateId')
router.delete('/candidate/:candidateId')

module.exports = router;