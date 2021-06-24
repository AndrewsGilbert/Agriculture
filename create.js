var fs = require('fs');

var read = fs.readFileSync('agri.js', 'utf8');



fs.writeFileSync('/home/androws/Documents/Zoho/Agriculture/store/copy_agri.js', read);
