const Lead = require('../models/leadModel');

exports.getGraphsData = async (req, res) => {
  try {
    const { month, year } = req.query;

    // Month mapping for easier access
    const monthIndex = {
      January: 0, February: 1, March: 2, April: 3,
      May: 4, June: 5, July: 6, August: 7,
      September: 8, October: 9, November: 10, December: 11
    };

    // Parse year and validate month
    const yearInt = parseInt(year, 10);
    const monthInt = monthIndex[month];

    if (isNaN(yearInt) || monthInt === undefined) {
      console.error("Invalid month or year:", month, year);
      return res.status(400).json({ message: "Invalid month or year parameters" });
    }

    // Set start and end dates correctly
    const startDate = new Date(yearInt, monthInt, 1); // Start of the month
    const endDate = new Date(yearInt, monthInt + 1, 0, 23, 59, 59); // Last moment of the last day of the month



    // Fetch leads data within the specified date range
    const leads = await Lead.find({
      PolicyStartDate: { $gte: startDate, $lte: endDate }
    });


    // Check if leads were found
    if (leads.length === 0) {
      return res.status(404).json({ message: 'No leads found for the specified month and year' });
    }

    // Map the leads to required graph data format
    const graphData = leads.map(lead => ({
      date: lead.PolicyStartDate,
      ODPremium: lead.ODPremium,
      NetPremimum: lead.NetPremimum,
      FinalPremimum: lead.FinalPremimum,
      TPPremimum: lead.TPPremimum,
    }));

    // Return the formatted graph data
    res.json(graphData);
  } catch (error) {
    console.error('Error fetching graph data:', error);
    res.status(500).json({ message: 'Error retrieving data' });
  }
};
