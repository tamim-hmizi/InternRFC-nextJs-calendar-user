
import AWS from 'aws-sdk';

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

export default async function handler(req, res) {
  console.log('API handler reached');

  if (req.method === 'GET') {
    try {
      const { personId } = req.query;

      if (!personId) {
        return res.status(400).json({ error: 'Missing personId' });
      }
      console.log('personId is:', personId);

      const params = {
        TableName: 'WorkSession',
        Key: { personId }
      };

      const data = await dynamodb.get(params).promise();
      console.log('data retrieved:', data);

      if (!data.Item) {
        return res.status(404).json({ error: 'No events found for this personId' });
      }

      res.status(200).json({ events: data.Item.events });
    } catch (error) {
      console.error('Error retrieving events from DynamoDB:', error);
      res.status(500).json({ error: 'Error retrieving events', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
