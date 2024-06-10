import { User } from '../model/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '10d',
  });
};

// Register a new user
export const registerUser = async ({ name, email, password, role, phone,createdBy }) => {
  const userExists = await User.findOne({ $or: [{ email }, { phone }] });

  if (userExists) {
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
    phone,
    createdBy
  });

  if(createdBy){
    const creator = await User.findById(createdBy);
    if (creator) {
      creator.createdUsers.push(user._id);
      await creator.save();
    }
  }

  if (user) {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      createdBy: user.createdBy,
      token: generateToken(user._id),
    };
  } else {
    throw new Error('Invalid user data');
  }
};

// Authenticate user & get token
export const loginUser = async ({ email, phone, password }) => {
  let user;

  if (email) {
    user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password');
    } else if (!['admin', 'procurement_manager', 'client'].includes(user.role)) {
      throw new Error('Email login not allowed for this role');
    }
  } else if (phone) {
    user = await User.findOne({ phone });
    if (!user) {
      throw new Error('Invalid phone number or password');
    } else if (user.role !== 'inspection_manager') {
      throw new Error('Phone login not allowed for this role');
    }
  } else {
    throw new Error('Email or phone number is required');
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      token: generateToken(user._id),
      message: `Login successful for role: ${user.role}`
    };
  } else {
    throw new Error('Invalid password');
  }
};

// Create a procurement manager
export const createProcurementManager = async ({ name, email, password, phone }) => {
  return await registerUser({ name, email, password, role: 'procurement_manager', phone });
};

// Create an inspection manager
export const createInspectionManager = async ({ name, email, password, phone, adminId }) => {
  const existingUser = await User.findOne({ phone, role: 'inspection_manager' });

  if (existingUser) {
    throw new Error('Inspection manager already present, please contact the admin');
  }

  const admin = await User.findById(adminId);
  console.log(admin,"admin role details",admin.role)
  if (!admin || (admin.role !== 'admin'&& admin.role!=='procurement_manager')) {
    throw new Error('Invalid admin or procurement manager');
  }

  return await registerUser({ name, email, password, role: 'inspection_manager', phone });
};

// Assign an inspection manager
export const assignInspectionManager = async (inspectionManagerId, managerId) => {
  const inspectionManager = await User.findById(inspectionManagerId);

  if (!inspectionManager) {
    throw new Error('Inspection manager not found');
  }

  if (inspectionManager.role !== 'inspection_manager') {
    throw new Error('User is not an inspection manager');
  }

  const manager = await User.findById(managerId);

  if (!manager || !['admin', 'procurement_manager'].includes(manager.role)) {
    throw new Error('Invalid manager');
  }

  inspectionManager.manager = managerId;
  await inspectionManager.save();

  return inspectionManager;
};

// Unassign an inspection manager
export const unassignInspectionManager = async (inspectionManagerId) => {
  const inspectionManager = await User.findById(inspectionManagerId);

  if (!inspectionManager) {
    throw new Error('Inspection manager not found');
  }

  if (inspectionManager.role !== 'inspection_manager') {
    throw new Error('User is not an inspection manager');
  }

  inspectionManager.manager = null;
  await inspectionManager.save();

  return inspectionManager;
};
