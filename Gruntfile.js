var child_process = require('child_process'),
    exec = child_process.exec;

module.exports = function(grunt) {

	grunt.registerTask('populate', 'print connection string', function(){
        var done = this.async(),
        	cmd = 'mongo --host localhost --port 27017 blog tools/test_data.js';
    
    	child = exec(cmd, function(err, stdout, stderr){
      		if(err){
        		done(Error('Error occured: ' + err.stack));
      		} else {
        		grunt.log.write('Populated successfull: ' + stdout);
        		done();
      		}
    	});
  	});
};