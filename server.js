const express = require('express');
const { faker } = require('@faker-js/faker');
const path = require('path');
const app = express();
const port = 3001;

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/messages/unread', (req, res) => {
  const messages = Array.from({ length: faker.datatype.number({ min: 1, max: 5 }) }).map(() => ({
    id: faker.datatype.uuid(),
    from: faker.internet.email(),
    subject: faker.lorem.words(3),
    body: faker.lorem.paragraph(),
    received: Math.floor(faker.date.past().getTime() / 1000),
  }));

  res.json({
    status: "ok",
    timestamp: Math.floor(Date.now() / 1000),
    messages,
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});