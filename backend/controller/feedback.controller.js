import Feedback from '../model/feedback.js';

export const createFeedback = async (req, res) => {
  try {
    const { fullName, email, message } = req.body;

    if (!fullName || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const feedback = new Feedback({
      fullName,
      email,
      message
    });

    await feedback.save();

    res.status(201).json({ 
      success: true, 
      message: 'Feedback submitted successfully',
      feedback 
    });

  } catch (error) {
    console.error('Feedback submission error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error submitting feedback' 
    });
  }
};

export const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedback' });
  }
};