/** Database connections
 *  To work on anything in the "back end folder" and see your changes, 
 *  switch dbUrl to point at localhost.
 * 
 *  To make it work on Google Cloud again, upload the changes to Google Cloud,
 *  then switch it back to dbUrl points at their cloud function.
 *  
 *  If there's an error, something in the code probably didn't get uploaded.
 */



// URL to back end when working locally
// export const dbUrl = 'http://localhost:3001' 


// URL to running google cloud function
export const dbUrl = 'https://us-central1-weeklydire.cloudfunctions.net/weeklydireexpress'
