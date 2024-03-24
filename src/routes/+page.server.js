import client from '../server/redis.js';

client.get('formData')
  .then((serializedData) => {
    if (serializedData) {
      // Parse the serialized data back into a JavaScript object
      const formData = JSON.parse(serializedData);
      console.log('Form data retrieved from Redis:', formData);
    } else {
      console.log('No form data found in Redis.');
    }
  })
  .catch((err) => {
    console.error('Error retrieving form data from Redis:', err);
  });


export const actions = {
    default: async ({ request }) => {
        const insertData = await request.formData();
        const obj = Object.fromEntries(insertData.entries());
        
        console.log(obj);

       //const redisData = JSON.stringify(obj);

        //console.log(redisData);

        // Serialize the form data into a string
const serializedData = JSON.stringify(obj);

// Set the serialized data in Redis
client.set('formData', serializedData)
  .then(() => {
    console.log('Form data stored in Redis successfully.');
  })
  .catch((err) => {
    console.error('Error storing form data in Redis:', err);
  });
    }


};