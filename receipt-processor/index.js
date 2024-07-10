const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

const receipts = {};

const calculatePoints = (receipt) => {
  let points = 0;

try {
  // 1 point for every alphanumeric character in the retailer name
  points += receipt.retailer.replace(/[^a-zA-Z0-9]/g, '').length;
} catch (error) {
  console.error('Error calculating points for retailer name:', error);
}

try {
  // 50 points if the total is a round dollar amount with no cents
  if (parseFloat(receipt.total) % 1 === 0) {
    points += 50;
  }
} catch (error) {
  console.error('Error calculating points for total amount (round dollar):', error);
}

try {
  // 25 points if the total is a multiple of 0.25
  if (parseFloat(receipt.total) % 0.25 === 0) {
    points += 25;
  }
} catch (error) {
  console.error('Error calculating points for total amount (multiple of 0.25):', error);
}

try {
  // 5 points for every two items on the receipt
  points += Math.floor(receipt.items.length / 2) * 5;
} catch (error) {
  console.error('Error calculating points for number of items:', error);
}

try {
  // Points for item descriptions
  receipt.items.forEach(item => {
    try {
      const trimmedLength = item.shortDescription.trim().length;
      if (trimmedLength % 3 === 0) {
        points += Math.ceil(parseFloat(item.price) * 0.2);
      }
    } catch (error) {
      console.error('Error calculating points for item description:', error);
    }
  });
} catch (error) {
  console.error('Error processing items:', error);
}

try {
  // 6 points if the day in the purchase date is odd
  const purchaseDay = parseInt(receipt.purchaseDate.split('-')[2]);
  if (purchaseDay % 2 !== 0) {
    points += 6;
  }
} catch (error) {
  console.error('Error calculating points for purchase date:', error);
}

try {
  // 10 points if the time of purchase is after 2:00pm and before 4:00pm
  const purchaseTime = receipt.purchaseTime.split(':');
  const purchaseHour = parseInt(purchaseTime[0]);
  const purchaseMinute = parseInt(purchaseTime[1]);
  if ((purchaseHour === 14) || (purchaseHour === 15 && purchaseMinute < 60)) {
    points += 10;
  }
} catch (error) {
  console.error('Error calculating points for purchase time:', error);
}

  return points;
};

app.post('/receipts/process', (req, res) => {
  const receipt = req.body;
  const id = uuidv4();
  receipts[id] = {
    receipt,
    points: calculatePoints(receipt)
  };
  res.json({ id });
});

app.get('/receipts/:id/points', (req, res) => {
  const id = req.params.id;
  if (receipts[id]) {
    res.json({ points: receipts[id].points });
  } else {
    res.status(404).json({ error: 'Receipt not found' });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
