import mongoose from 'mongoose';

const DailyLogSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  date: {
    type: String, 
    required: true,
  },
  count: {
    type: Number, 
    default: 0,
  },
}, {
  timestamps: true,
});

export const dailyLogDB = mongoose.model('dailyLogs', DailyLogSchema);
