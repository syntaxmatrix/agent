import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

// One year in milliseconds for subscription expiry
const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      // unique: true,
    },
    name: {
        type: String,
        // required: true,    
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    securityCode: {
        type: String,
        default: null,
    },
    securityCodeExpiry: {
        type: Date,
        default: null,
    },
    subscription: {
        type: String,
        enum: ['Free', 'Premium'],
        default: 'Free',
        required: true,
    },
    subscriptionExpiry: {
        type: Date,
        default: null,
    },
    googleRefreshToken: {
        type: String, 
        default: null
    }
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to check if the subscription is active
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { _id: this._id, email: this.email, name: this.name },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

// Method to generate a refresh token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};



const User = mongoose.model('User', userSchema);

export default User;
