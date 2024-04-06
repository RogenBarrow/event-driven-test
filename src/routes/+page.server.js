import client from '../server/redis.js';


export const actions = {
    default: async ({ request }) => {
        const insertData = await request.formData();
        const obj = Object.fromEntries(insertData.entries());
        //const stream = 'ORDER_ENTRY';
        const date = new Date()
        
        console.log(obj);

        
       //const redisData = JSON.stringify(obj);

        //console.log(redisData);

        // Serialize the form data into a string
        const serializedData = JSON.stringify(obj);
        console.log(serializedData);
        
        client.xAdd('order_entry','*', obj)
        .then((result) => {
            console.log('Message published successfully:', result);
            })
        .catch((err) => {
        console.error('Error publishing message:', err);
         });

// Set the serialized data in Redis
// client.set('formData', serializedData)
//   .then(() => {
//     console.log('Form data stored in Redis successfully.');
//   })
//   .catch((err) => {
//     console.error('Error storing form data in