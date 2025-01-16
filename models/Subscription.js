import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    enum: ['Basic', 'Pro'], // Only allow these plan names
  },
  status: {
    type: String,
    required: true,
    enum: ['active', 'inactive', 'cancelled'],
    default: 'active',
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  validUntil: {
    type: Date,
    required: true,
  },
  features: {
    users: {
      type: Number,
      required: true,
    },
    storage: {
      type: Number,
      required: true,
    },
    supportLevel: {
      type: String,
      required: true,
      enum: ['basic', 'priority'],
    },
  },
  paymentHistory: [{
    razorpayPaymentId: String,
    razorpayOrderId: String,
    amount: Number,
    currency: String,
    status: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Create indexes for better query performance
subscriptionSchema.index({ userEmail: 1 });
subscriptionSchema.index({ status: 1 });
subscriptionSchema.index({ validUntil: 1 });

// Add a method to check if subscription is active
subscriptionSchema.methods.isActive = function() {
  return this.status === 'active' && this.validUntil > new Date();
};

// Add a method to extend subscription
subscriptionSchema.methods.extend = function(days) {
  const currentValidUntil = this.validUntil > new Date() ? this.validUntil : new Date();
  this.validUntil = new Date(currentValidUntil.getTime() + days * 24 * 60 * 60 * 1000);
};

const Subscription = mongoose.models.Subscription || mongoose.model('Subscription', subscriptionSchema);

export default Subscription; 