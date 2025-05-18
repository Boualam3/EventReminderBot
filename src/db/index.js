async function initDB() {
    try {
      console.log('To connect ...');
   
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      throw error; 
    }
  }
  
module.exports = {  
    initDB,
}