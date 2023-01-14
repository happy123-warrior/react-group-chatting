const { addGroup,allGroup,joinGroup } = require("../controllers/groupController");
const router = require("express").Router();

router.post('/addgroup', addGroup);
router.get('/allgroup', allGroup);
router.post('/joingroup',joinGroup);
module.exports = router;
